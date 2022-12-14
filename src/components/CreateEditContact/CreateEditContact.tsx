import classNames from 'classnames';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactApi } from '../../api/service/contactApi';
import { Contact } from '../../types/Contact';
import { FormField } from '../FormField';
import { FormFieldArray } from '../FormFieldArray';

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
    email: [{id: 1, value: ''}],
    number: [{id: 1, value: ''}],
  });

  const setNewField = (field: any, value: any) => {
    setContact(currContact => {
      return Object
      .assign({}, currContact, { [field]: value });
    }
    );

    console.log(formContact);
  };

  const setNewFieldArray = (
    field: string,
    id: number,
    newValue: any
  ) => {
    setContact(currContact => {
      const newData = currContact[field as 'email' | 'number']
        .find(item => item.id === id);
      if (newData) {
        newData.value = newValue;
      }

      console.log(newData);

      return Object.assign({}, currContact, {});
    });
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
        <FormField
          name={'name'}
          label={'Name'}
          onChange={setNewField}
          value={formContact.name}
        />

        <FormField
          name={'lastName'}
          label={'Last Name'}
          onChange={setNewField}
          value={formContact.lastName}
        />

        <FormField
          name={'address'}
          label={'Address'}
          onChange={setNewField}
          value={formContact.address}
        />

        <FormField
          name={'city'}
          label={'City'}
          onChange={setNewField}
          value={formContact.city}
        />

        <FormField
          name={'country'}
          label={'Country'}
          onChange={setNewField}
          value={formContact.country}
        />

        <FormFieldArray
          name={'email'}
          label={'Email'}
          onChange={setNewFieldArray}
          value={formContact.email}
          type={'email'}
        />

        <FormFieldArray
          name={'number'}
          label={'Number'}
          onChange={setNewFieldArray}
          value={formContact.number}
        />
      
        <button
          className='button is-info mt-3'
          style={{ width: 'min-content'}}
          onClick={(event) => {
            event.preventDefault();

            console.log(formContact);

            contactApi.addContact(formContact);
            
            navigator('/');
          }}
        > 
          Save 
        </button>
      </div>
    </div>
  );
};