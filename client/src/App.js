import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from "./components/Main";
import {Provider} from 'react-redux';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Main}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
