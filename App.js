import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import * as actions from './src/actions'
import Routes from './src/routes'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
    // actions.searchTracks('eminem').then(albums => this.setState({ albums }))
  }
  render() {
    return (
      <Fragment >
        <StatusBar barStyle="light-content"/>
        <Routes />
      </Fragment>
    );
  }

};
