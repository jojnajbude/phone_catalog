import classNames from 'classnames';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { contactApi } from '../../api/service/contactApi';
import { Contact } from '../../types/Contact';
import { FormField } from '../FormField';
import { FormFieldArray } from '../FormFieldArray';

import './CreateEditContact.scss';

type Props = {};

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

export const CreateEditContact: FC<Props> = () => {
  const navigator = useNavigate();
  const { contactId } = useParams();

  const contactToEdit = contactId ? contactApi.getContactById(+contactId) : null;

  console.log(contactToEdit);

  const [contact, setContact] = useState(contactToEdit
    ? contactToEdit
    : {
      id: 0,
      name: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      email: [{id: 1, value: ''}],
      number: [{id: 1, value: ''}],
    }
  );

  const setNewField = (field: any, value: any) => {
    setContact(currContact => {
      return Object
      .assign({}, currContact, { [field]: value });
    }
    );

    console.log(contact);
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

      console.log(newData, newValue);

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
          value={contact.name}
        />

        <FormField
          name={'lastName'}
          label={'Last Name'}
          onChange={setNewField}
          value={contact.lastName}
        />

        <FormField
          name={'address'}
          label={'Address'}
          onChange={setNewField}
          value={contact.address}
        />

        <FormField
          name={'city'}
          label={'City'}
          onChange={setNewField}
          value={contact.city}
        />

        <FormField
          name={'country'}
          label={'Country'}
          onChange={setNewField}
          value={contact.country}
        />

        <FormFieldArray
          name={'email'}
          label={'Email'}
          onChange={setNewFieldArray}
          value={contact.email}
          type={'email'}
        />

        <FormFieldArray
          name={'number'}
          label={'Number'}
          onChange={setNewFieldArray}
          value={contact.number}
        />
      
        <div className="mt-3">
          <button
            className='button is-danger mr-3 px-3'
            style={{ width: 'min-content'}}
            onClick={() => {
              navigator('/');
            }}
          > 
            Cancel
          </button>

          <button
            className='button is-info px-5'
            style={{ width: 'min-content'}}
            type='submit'
            onClick={(event) => {
              event.preventDefault();

              console.log(contact);

              if (contactToEdit) {
                contactApi.editContact(contact);
              } else {
                contactApi.addContact(contact);
              }
              
              navigator('/');
            }}
          > 
            Save 
          </button>
        </div>
      </div>
    </div>
  );
};