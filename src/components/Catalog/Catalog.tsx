import { ContactsTable } from '../ContactsTable';
import './Catalog.scss';

export const Catalog = () => (
  <div className="catalog">
    <div className="catalog__container">
      <div className="catalog__header">
        <h2 className='title is-3'>Contacts</h2>
        <button className='button is-info'>Add Contact</button>
      </div>

      <ContactsTable />
    </div>
  </div>
);