import { Email } from "./Email";
import { Number } from "./Number";

export interface Contact {
  id: number
  name: string,
  lastName: string,
  address: string,
  city: string,
  country: string,
  email: Email[],
  number: Number[],
}