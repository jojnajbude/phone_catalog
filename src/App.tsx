import React from 'react';
import './App.css';

import 'bulma/css/bulma.min.css';

import { Catalog } from './components/Catalog';

import { Header } from './components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateEditContact } from './components/CreateEditContact';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Catalog />}/>

        <Route
          path='create-edit-contact'
          element={<CreateEditContact />}
        />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
