import React, {
  Component
} from 'react';
import {
  View,
  FlatList,
  Text
} from 'react-native';
import ActionButton from 'react-native-action-button';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';

import { styles } from '../constants/styles';
import CardComponent from '../components/CardComponent';
import { getHutang } from '../redux/actions';

class HomeScreen extends Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.getHutang();
  }

  renderItem(item) {
    const date = new Date(item.item.createdAt);
    return (
      <CardComponent>
        <Text style={styles.label}>{item.item.nama}</Text>
        <Text style={{ marginLeft: 8 }}>{item.item.makanan}</Text>
        <Text style={{ marginLeft: 8 }}>{item.item.minuman}</Text>
        <Text style={{ marginLeft: 8 }}>{`Rp. ${item.item.total_harga}`}</Text>
        <Text style={{ marginLeft: 8 }}>{moment(date).local().locale('id').format('dddd, DD-MM-YYYY')}</Text>
      </CardComponent>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 8 }} >
        <FlatList
          data={this.props.hutang}
          keyExtractor={(item) => item.nama}
          renderItem={this.renderItem.bind(this)}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', }}>
              <Text>Tidak ada hutang</Text>
            </View>
          )}
        />
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

const mapStateToProps = state => ({
  hutang: state.hutang.hutang.hutang
});

export default connect(mapStateToProps, {
  getHutang
})(HomeScreen);
