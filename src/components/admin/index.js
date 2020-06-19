import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import Home from './home';
import Insert from './insertVilla';
import Setting from './setting';


export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Home" component={Home} title="Home" initial={true} />
          <Scene key="Setting" component={Setting} title="Setting" />
          <Scene key="Insert" component={Insert} title="Insert" />
        </Scene>
      </Router>
    );
  }
}
