import React from 'react';
import './App.css';
import FooterComponent from './components/footer-component';
import MainComponent from './components/main-component';
import HeaderComponent from './components/header-component';

function App() {
  return (
    <div>
      <HeaderComponent />
      <MainComponent />
      <hr className="border-t border-white" />
      <FooterComponent />
    </div>
  );
}

export default App;
