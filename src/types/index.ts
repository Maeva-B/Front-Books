export interface User {
  id: number;
  username: string;
  token?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

export interface Loan {
  id: number;
  bookId: number;
  book: Book;
  userId: number;
  borrowDate: string;
  dueDate: string;
}