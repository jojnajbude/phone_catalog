import React from 'react';
import './App.css';

import 'bulma/css/bulma.min.css';

import { Catalog } from './components/Catalog';

import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Catalog />
    </>
  );
}

export default App;
