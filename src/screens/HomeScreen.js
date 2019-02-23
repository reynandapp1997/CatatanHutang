import React, {
  Component
} from 'react';
import {
  View
} from 'react-native';
import ActionButton from 'react-native-action-button';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMi from 'react-native-vector-icons/MaterialIcons';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, padding: 8 }} >
        <ActionButton buttonColor='red'>
        <ActionButton.Item size={48} buttonColor='#9b59b6' title='Tambah Hutang' onPress={() => this.props.navigation.navigate('CreateList')}>
              <IconMi color='white' size={20} name="info" />
            </ActionButton.Item>
            <ActionButton.Item size={48} buttonColor='#3498db' title='Tambah Data' onPress={() => this.props.navigation.navigate('CreateData')}>
              <IconFa color='white' size={16} name="calendar" />
            </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

export default HomeScreen;
