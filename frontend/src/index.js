import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader'
import { Route, Router, Redirect, Switch,BrowserRouter } from 'react-router-dom';
import App from './App';
import reducers from './reducers';
import history from './history';
const createStoreWithMiddleware = applyMiddleware()(createStore);
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

counterpart.registerTranslations('en',require('../locales/en'));
counterpart.registerTranslations('fr',require('../locales/fr'));
counterpart.registerTranslations('ar',require('../locales/ar'));
const render = Component => {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <AppContainer>
      <MuiThemeProvider>
      <Router history={history}>
        <App />
        </Router>
        </MuiThemeProvider>
      </AppContainer>
    </Provider>,
    document.getElementById('container')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}


