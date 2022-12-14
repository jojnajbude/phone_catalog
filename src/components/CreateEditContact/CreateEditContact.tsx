import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { contactApi } from '../../api/service/contactApi';
import { Contact } from '../../types/Contact';
import { FormField } from '../FormField';
import { FormFieldArray } from '../FormFieldArray';

type Props = {};

export const CreateEditContact: FC<Props> = () => {
  const navigator = useNavigate();
  const { contactId } = useParams();
  const requiredField = ['name', 'lastName', 'email', 'number'];

  const contactToEdit = contactId ? contactApi.getContactById(+contactId) : null;

  const [contact, setContact] = useState<Contact>(contactToEdit
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

  const [canSubmit, setCanSubmit] = useState(false);

  const checkFields = () => {
    // for (const field in contact) {
    //   switch (field) {
    //     case 'name':
    //     case 'lastName':
    //     case 'city':
    //     case 'Country':
    //       if (!/[a-zA-Z]+/.test(field)) {
    //         setErrorFields(curr => [...curr, field]);
    //       }
    //   }
    // }

    // console.log(errorFields);

    console.log(Object.values(contact).every(value => value !== ''));
  };

  const setNewField = (field: any, value: any) => {
    setContact(currContact => {
      return Object
      .assign({}, currContact, { [field]: value });
    }
    );
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

      return Object.assign({}, currContact, {});
    });
  };


  useEffect(() => {
    const allEntered = requiredField.map(item => {
      if (item === 'email' || item === 'number') {
        return contact[item].every(itemValue => Boolean(itemValue.value));
      }

      return Boolean(contact[item as keyof Contact]);
    })
      .every(item => item);

    setCanSubmit(allEntered);
  }, [contact, canSubmit]);

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
          requiere
        />

        <FormField
          name={'lastName'}
          label={'Last Name'}
          onChange={setNewField}
          value={contact.lastName}
          requiere
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
          toRemove={setNewField}
          type={'email'}
          require
        />

        <FormFieldArray
          name={'number'}
          label={'Number'}
          onChange={setNewFieldArray}
          toRemove={setNewField}
          value={contact.number}
          require
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
            className='button px-5 is-info'
            style={{ width: 'min-content'}}
            type='submit'
            onClick={(event) => {
              event.preventDefault();

              if (contactToEdit) {
                contactApi.editContact(contact);
              } else {
                contactApi.addContact(contact);
              }
              
              navigator('/');
            }}
            disabled={!canSubmit}
          > 
            Save 
          </button>
        </div>
      </div>
    </div>
  );
};