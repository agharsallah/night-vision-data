import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RootCrowdsourcing from './components/crowdsourcing/RootCrowdsourcing' ;
import counterpart  from 'counterpart';
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));
counterpart.registerTranslations('ar',require('./../locales/ar'));
export default class App extends Component {
  
  render() {
    return (
      <Switch>

      <Route exact path="/" component={RootCrowdsourcing} />

      </Switch>
    );
  }
}
