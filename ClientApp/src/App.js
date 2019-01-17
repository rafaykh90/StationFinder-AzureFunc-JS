import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Stations } from './components/Stations';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
		<Layout>
			<Route exact path='/' component={Home} />
			<Route path='/stations' component={Stations} />
		</Layout>
    );
  }
}
