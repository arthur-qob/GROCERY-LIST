import React, { useState, useEffect } from 'react';
import '../Styles/App.css';
import NavBar from '../Components/NavBar';
import ThemeToggle from '../Components/ThemeToggle';
import GroceryList from '../Components/GroceryList';
import ScrollBtn from '../Components/ScrollBtn';
import Footer from '../Components/Footer';
import useLocalStorage from 'use-local-storage';

const App = () => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', preference);

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    const footer = document.querySelector('footer');
    const scrollBtn = document.getElementById('progress');

    if (appContainer && footer) {
      appContainer.style.marginBottom = `${footer.clientHeight / 2}px`;
    }
  }, []);

  return (
    <div className = "App" data-theme = {theme ? 'dark' : 'light'}>
      <NavBar />
      
      <ThemeToggle
        isChecked = {theme}
        handleChange = {() => setTheme(!theme)}
      />
      
      <div className = 'app-container'>
        <GroceryList />
      </div>

      <ScrollBtn />
      
      <Footer />
    </div>
  );
}

export default App;