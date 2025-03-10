export interface Author {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  nationality: string;
}

export enum BookTypeEnum {
  DataScience = "datascience",
  datascience = "datascience",
  web = "web",
  algebra = "algebra",
  optimization = "optimization",
  phylosophy = "phylosophy",
  literary = "literary",
  system = "system",
  network = "network",
  physic = "physic",
  chemistry = "chemistry",
  optic = "optic",
  electronic = "electronic"
}

export interface Book {
  _id?: string;
  author_id: string;
  title: string;
  description?: string;
  location: string;
  label: string;
  type: BookTypeEnum;
  publishDate: string;
  publisher: string;
  language: string;
  link: string;
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
  book_id: string;
  adherent_id: string;
  loanDate: string;
  returnDate: string;
}

export interface EnrichedLoan extends Loan {
  book?: Book | null;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface Token {
  accessToken: string;
  tokenType: string;
}
