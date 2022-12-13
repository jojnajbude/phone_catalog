import classNames from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactApi } from '../../api/service/contacts-service';
import { Contact } from '../../types/Contact';
import { FormField } from '../FormField';

import './CreateEditContact.scss';

type Props = {
  contact?: Contact
};

const formInputs: string[] = [
  'Name',
  'Last Name',
  'Address',
  'City',
  'Country',
  'Email',
  'Number',
];

export const CreateEditContact: FC<Props> = ({ contact }) => {
  const navigator = useNavigate();

  return (
    <div
      className={classNames(
        'create-edit-page container',
        'is-max-desktop',
        'is-flex is-justify-content-start is-flex-direction-column'
      )}
    >
      <h2 className='title is-3'>Register new contact</h2>

      <div className="form is-flex is-flex-direction-column">
        {formInputs.map(input => {

          return (
            <FormField 
              key={input}
              name={input}
            />
          );
        })}

      
        <button
          className='button is-info mt-3'
          style={{ width: 'min-content'}}
          onClick={(event) => {
            event.preventDefault();

            // contactApi.addContact();
            
            navigator('/');
          }}
        > Save </button>
      </div>
    </div>
  );
};