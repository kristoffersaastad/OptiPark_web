import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from './components/Main/Header';
import Home from './components/Main/Home'
import Profile from './components/Main/Profile';
import MapComponent from './components/Main/MapComponent';
import Contact from './components/Main/Contact';
import Footer from './components/Main/Footer';
import Statistics from './components/Main/Statistics';
import Admin from './components/Main/Admin';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Header/>
        <Route exact path="/" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/statistics" component={Statistics}/>
        <Route path="/map" component={MapComponent}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/admin" component={Admin}/>
        <Footer/>
      </React.Fragment>  
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}


export default Root