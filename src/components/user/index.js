import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Setting from './setting';
import Home from './home';
import Detail from './detail';
import Map_Search from './map_searching';
import History from './history';
import ProviderHome from './providerHome';

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="Home"
            component={Home}
            title="Home"
            initial={true}
          />
          <Scene key="Setting" component={Setting} title="تنظیمات" />
          <Scene key="SearchOnMap" component={Map_Search} title="جستجو" />
          <Scene key="Detail" component={Detail} title="مشخصات" />
          <Scene key="History" component={History} title="تاریخچه شما" />
          <Scene key="ProviderHome" component={ProviderHome} title="صفخه میزبان"/>
        </Scene>
      </Router>
    );
  }
}
