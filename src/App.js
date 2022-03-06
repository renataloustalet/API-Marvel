import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import CharacterDetail from './components/CharacterDetail';
import FavoriteCharacters from './components/FavoriteCharacters';
import Nav from './components/Nav';
import './app.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/marvel">
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/character/:id" component={CharacterDetail} />
        <Route exact path="/favoriteCharacters" component={FavoriteCharacters} />
      </BrowserRouter>
    </div>
  );
}

export default App;
