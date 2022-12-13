interface ContactFromForm {
  name: string,
  lastName: string,
  address: string,
  city: string,
  country: string,
  email: string,
  number: string,
};

const getContacts = () => {
  const data = require('../data/contacts.json');

  return data;
};

const addContact = (contactFromForm: ContactFromForm) => {
  const data = getContacts();

  const newId = data.length + 1;
  const newContact = Object.assign({ id: newId }, contactFromForm);

  data.push(newContact);
}

export const contactApi = {
  getContacts,
  addContact,
};