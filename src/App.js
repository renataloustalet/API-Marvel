import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CharacterDetail from './components/Details/CharacterDetail';
import FavoriteCharacters from './components/FavoriteCharacters/FavoriteCharacters';
import './app.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/marvel" component={Home} />
        <Route exact path="/marvel/character/:id" component={CharacterDetail} />
        <Route exact path="/marvel/favoriteCharacters" component={FavoriteCharacters} />
      </BrowserRouter>
    </div>
  );
}

export default App;
