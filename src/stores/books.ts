import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '../types';

export const useBookStore = defineStore('books', () => {
  const books = ref<Book[]>([]);
  const loading = ref(false);

  async function fetchBooks() {
    loading.value = true;
    try {
      const response = await axios.get('/books');
      const booksData: Book[] = response.data;
      
      const enrichedBooks = await Promise.all(
        booksData.map(async (book) => {
          try {
            const authorResponse = await axios.get(`/authors/${book.author_id}`);
            const author = authorResponse.data;
            return {
              ...book,
              id: String(book._id),
              author: {
                first_name: author.first_name,
                last_name: author.last_name
              }
            };
          } catch (error) {
            console.error(`Error retrieving author for book ${book._id}:`, error);
            return {
              ...book,
              id: String(book._id),
              author: {
                first_name: 'Unknown',
                last_name: ''
              }
            };
          }
        })
      );
      books.value = enrichedBooks;
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      loading.value = false;
    }
  }  

  return {
    books,
    loading,
    fetchBooks
  };
});
