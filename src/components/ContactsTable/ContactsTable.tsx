import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactApi } from '../../api/service/contactApi';
import { Contact } from '../../types/Contact';
import { Email } from '../../types/Email';
import { Number } from '../../types/Number';

import './ContactsTable.scss';

export const ContactsTable: FC = () => {
  const navigate = useNavigate();

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
    contacts?.length
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
                    {typeof cell !== 'object'
                      ? cell
                      : cell
                        .map((item: Email | Number) => (
                          <p key={item.id}>{item.value}</p>
                        ))
                    }
                  </th>
                ))}

                <th className='has-text-centered'>
                  <button
                    className='button is-success'
                    onClick={() => {
                      navigate(`/edit-contact/${contact.id}`)
                    }}
                  >
                    Edit
                  </button>
                </th>

                <th className='has-text-centered'>
                  <button
                    className='button is-danger'
                    onClick={() => setContacts(contactApi.deleteContact(contact.id))}
                  >
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