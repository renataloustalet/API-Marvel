import { BrowserRouter } from 'react-router-dom';
import './app.scss';
import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CharacterDetail from './components/Details/CharacterDetail'
import Nav from './components/Nav/Nav';
import FavoriteCharacters from './components/FavoriteCharacters/FavoriteCharacters';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/character/:id" component={CharacterDetail} />
        <Route exact path="/favoriteCharacters" component={FavoriteCharacters} />
      </BrowserRouter>
    </div>
  );
}

export default App;
