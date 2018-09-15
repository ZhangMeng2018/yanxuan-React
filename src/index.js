import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux'

import './assets/css/reset.css'
import './mock'

import store from './rudex/store'
import Main from './containers/Main/Main';


ReactDOM.render((<Provider store={store}>
                    <HashRouter>
                      <Switch>
                        <Route component = {Main}/>
                      </Switch>
                    </HashRouter>
                  </Provider>), document.getElementById('root'));
