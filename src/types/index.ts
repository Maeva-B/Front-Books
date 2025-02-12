export interface Author {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  nationality: string;
}

export interface Book {
  id?: string;
  author: Author;
  title: string;
  description?: string;
  location: string;
  type: string;
  publicationYear: number;
  language: string;
  editor: string;
}

export enum RoleEnum {
  PROFESSOR = "professor",
  LIBRARIAN = "librarian",
  STUDENT = "student",
}

export interface Adherent {
  id?: string;
  first_name: string;
  last_name: string;
  membership_number: string;
  login: string;
  role: RoleEnum;
}

export interface Loan {
  id?: string;
  bookId: string;
  book: Book;
  adherentId: string;
  loanDate: string;
  returnDate: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface Token {
  accessToken: string;
  tokenType: string;
}
