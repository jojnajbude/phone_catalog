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

let data: Contact[] = require('../data/contacts.json');

const getContacts = () => {
  return data;
};

const getContactById = (id: number) => {
  return data.find(contact => contact.id === id);
};

const addContact = (contactFromForm: ContactFromForm) => {
  const newId = data.length + 1;

  const newContact = Object.assign({ id: newId }, contactFromForm);

  data.push(newContact);
};

const editContact = (contact: Contact) => {
  const findedContact = data.find(finded => finded.id === contact.id);

  if (findedContact) {
    Object.assign(findedContact, contact);
  }
};

const deleteContact = (contactId: number) => {
  data = data.filter((contact: Contact) => contact.id !== contactId);

  return data;
};

export const contactApi = {
  getContacts,
  getContactById,
  addContact,
  editContact,
  deleteContact,
};