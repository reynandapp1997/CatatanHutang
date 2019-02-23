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
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';

import reducers from './src/redux/reducers';
import HomeScreen from './src/screens/HomeScreen';
import CreateHutangScreen from './src/screens/CreateHutangScreen';
import CreateDataScreen from './src/screens/CreateDataScreen';

const ListStack = createStackNavigator({
  List: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  CreateList: {
    screen: CreateHutangScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  CreateData: {
    screen: CreateDataScreen,
    navigationOptions: () => ({
      header: null
    })
  }
});

const BottomTabNavigator = createMaterialTopTabNavigator({
  ListTab: {
    screen: ListStack,
    navigationOptions: () => ({
      tabBarLabel: 'List'
    })
  },
  IndividualTab: {
    screen: HomeScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Individual'
    })
  }
}, {
  initialRouteName: 'ListTab',
  tabBarOptions: {
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 16
    }
  }
});

const SwitchNavigator = createSwitchNavigator({
  Home: BottomTabNavigator
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
