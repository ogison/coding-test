import React from 'react';
import './App.css';
import FooterComponent from './components/footer-component';
import Main from './components/Main';
import HeaderComponent from './components/header-component';

function App() {
  return (
    <div>
      <HeaderComponent />
      <Main />
      <FooterComponent />
    </div>
  );
}

export default App;
