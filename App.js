/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {
  Component
} from 'react';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  Provider
} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import reducers from './src/redux/reducers';
import HomeScreen from './src/screens/HomeScreen';
import CreateHutangScreen from './src/screens/CreateHutangScreen';
import CreateDataScreen from './src/screens/CreateDataScreen';
import HutangDetailScreen from './src/screens/HutangDetailScreen HutangDetailScreen';

const ListStack = createStackNavigator({
  List: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerTitle: 'Catatan Hutang'
    })
  },
  CreateList: {
    screen: CreateHutangScreen,
    navigationOptions: () => ({
      headerTitle: 'Tambah Hutang'
    })
  },
  CreateData: {
    screen: CreateDataScreen,
    navigationOptions: () => ({
      headerTitle: 'Tambah Data'
    })
  },
  HutangDetail: {
    screen: HutangDetailScreen,
    navigationOptions: () => ({
      headerTitle: 'Tambah Data'
    })
  }
});

const SwitchNavigator = createSwitchNavigator({
  Home: ListStack
});

const AppContainer = createAppContainer(SwitchNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
      </Provider>
    );
  }
}
