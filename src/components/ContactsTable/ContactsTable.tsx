import { FC, useEffect, useState } from 'react';
import { getContacts } from '../../api/contacts-service/getContacts';
import { Contact } from '../../types/Contact';

import './ContactsTable.scss';

const tableHeaders: string[] = [
  'Name',
  'Last Name',
  'Address',
  'City',
  'Country',
  'Email',
  'Number',
  'Edit',
  'Delete',
]

export const ContactsTable: FC = () => {
  const [contacts, setContacts] = useState<Contact[]>();

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  return (
    contacts
    ? (
      <table className='table is-striped is-bordered'>
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th key={header} className='has-text-centered'>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {contacts.map(contact => (
            <tr
              key={contact.id}
              className='has-text-centered'
            >
              
            </tr>
          ))}
        </tbody>
      </table>
    )
    : (
      <h3>No Contacts</h3>
    )
  );
};