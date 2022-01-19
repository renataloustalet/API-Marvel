import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CharacterDetail from './components/Details/CharacterDetail';
import FavoriteCharacters from './components/FavoriteCharacters/FavoriteCharacters';
import './app.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/marvel">
        <Route exact path="/" component={Home} />
        <Route exact path="/character/:id" component={CharacterDetail} />
        <Route exact path="/favoriteCharacters" component={FavoriteCharacters} />
      </BrowserRouter>
    </div>
  );
}

export default App;
