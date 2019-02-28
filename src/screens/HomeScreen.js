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
    const nama = item.item.nama;
    return (
      <CardComponent onPress={() => this.props.navigation.navigate('HutangDetail', { nama })}>
        <Text style={styles.nama}>{item.item.nama}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Makanan yang di pesan : </Text>{'\n'}{item.item.makanan}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Minuman yang di pesan : </Text>{'\n'}{item.item.minuman}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Total : </Text>{'\n'}{`Rp. ${item.item.total_harga}`}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Tanggal Pembelian : </Text>{'\n'}{moment(date).local().locale('id').format('dddd, DD-MM-YYYY')}</Text>
      </CardComponent>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 8 }} >
        <FlatList
          data={this.props.hutang}
          keyExtractor={(item) => item.createdAt}
          renderItem={this.renderItem.bind(this)}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', }}>
              <Text>Tidak ada hutang</Text>
            </View>
          )}
        />
        <ActionButton buttonColor='red'>
          <ActionButton.Item size={48} buttonColor='#9b59b6' title='Tambah Hutang' onPress={() => this.props.navigation.navigate('CreateList')}>
            <IconFa color='white' size={16} name="money" />
          </ActionButton.Item>
          <ActionButton.Item size={48} buttonColor='#3498db' title='Tambah Data' onPress={() => this.props.navigation.navigate('CreateData')}>
            <IconFa color='white' size={16} name="database" />
          </ActionButton.Item>
          <ActionButton.Item size={48} buttonColor='#3498db' title='Muat Ulang Data Hutang' onPress={() => this.getData()}>
            <IconFa color='white' size={16} name="refresh" />
          </ActionButton.Item>
        </ActionButton>
        <View style={{ height: 16 }} />
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
