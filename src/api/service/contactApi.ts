import { Contact } from "../../types/Contact";
import { Email } from "../../types/Email";
import { Number } from "../../types/Number";

interface ContactFromForm {
  name: string,
  lastName: string,
  address: string,
  city: string,
  country: string,
  email: Email[],
  number: Number[],
};

let data = require('../data/contacts.json')

const getContacts = () => {
  return data;
};

const addContact = (contactFromForm: ContactFromForm) => {
  const newId = data.length + 1;
  const newContact = Object.assign({ id: newId }, contactFromForm);

  data.push(newContact);
}

const deleteContact = (contactId: number) => {
  data = data.filter((contact: Contact) => contact.id !== contactId);

  return data;
}

export const contactApi = {
  getContacts,
  addContact,
  deleteContact,
};