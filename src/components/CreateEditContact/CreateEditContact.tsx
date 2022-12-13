import classNames from 'classnames';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactApi } from '../../api/service/contactApi';
import { Contact } from '../../types/Contact';
import { FormField } from '../FormField';

import './CreateEditContact.scss';

type Props = {
  contact?: Contact
};

const formInputs = {
  id: 'Id',
  name: 'Name',
  lastName: 'Last Name',
  address: 'Address',
  city: 'City',
  country: 'Country',
  email: 'Email',
  number: 'Number',
};

export const CreateEditContact: FC<Props> = ({ contact }) => {
  const navigator = useNavigate();

  const [formContact, setContact] = useState(contact ? contact : {
    id: 0,
    name: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    email: [],
    number: [],
  });

  const setNewField = (field: any, value: any) => {
    setContact(currContact => {
      return Object
      .assign({}, currContact, { [field]: value });
    }
    );
  };

  return (
    <div
      className={classNames(
        'create-edit-page container',
        'is-max-desktop mb-5',
        'is-flex is-justify-content-start is-flex-direction-column'
      )}
    >
      <h2 className='title is-3'>Register new contact</h2>

      <div className="form is-flex is-flex-direction-column">
        {Object.keys(formContact)
          .filter(key => key !== 'id')
          .map(input => {

          return (
            <FormField 
              key={input}
              name={input}
              label={formInputs[input as keyof Contact]}
              onChange={setNewField}
              value={formContact[input as keyof Contact]}
            />
          );
        })}

      
        <button
          className='button is-info mt-3'
          style={{ width: 'min-content'}}
          onClick={(event) => {
            event.preventDefault();

            console.log(formContact);

            contactApi.addContact(formContact);
            
            navigator('/');
          }}
        > Save </button>
      </div>
    </div>
  );
};