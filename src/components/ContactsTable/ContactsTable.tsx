import { FC, useEffect, useState } from 'react';
import { contactApi } from '../../api/service/contacts-service';
import { Contact } from '../../types/Contact';

import './ContactsTable.scss';

export const ContactsTable: FC = () => {
  const [contacts, setContacts] = useState<Contact[]>();

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
  ];

  useEffect(() => {
    setContacts(contactApi.getContacts());
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
          {contacts.map(contact => {
            const contactData: any[] = Object.keys(contact)
              .reduce((data: any[], item) => {
                if (item !== 'id') {
                  data.push(contact[item as keyof Contact]);
                }

                return data;
            }, []);

            return (
              <tr
                key={contact.id}
                className='has-text-centered'
              >
                {contactData.map((cell, i) => (
                  <th
                    key={i}
                    className='has-text-weight-normal'
                  >
                    {cell}
                  </th>
                ))}

                <th className='has-text-centered'>
                  <button className='button is-success'>
                    Edit
                  </button>
                </th>

                <th className='has-text-centered'>
                  <button className='button is-danger'>
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
    : (
      <h3>No Contacts</h3>
    )
  );
};