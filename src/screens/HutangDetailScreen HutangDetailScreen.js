import React, {
  Component
} from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';

import { styles } from '../constants/styles';
import CardComponent from '../components/CardComponent';
import { getHutang } from '../redux/actions';

class HutangDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHutang: {
        hutang: []
      }
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.props.getHutang();
  }

  hapusData = () => {
    let hutang = this.props.hutang;
    const data = Object.values(this.props.hutang).filter(value => value.nama === this.props.navigation.state.params.nama);
    hutang = hutang.filter((el) => !data.includes(el));
    const dataHutang = this.state.dataHutang;
    dataHutang.hutang = hutang;
    this.setState({ dataHutang });
    AsyncStorage.setItem('dataHutang', JSON.stringify(this.state.dataHutang))
    .then(() => {
      this.showAlert('Berhasil menghapus data hutang');
      this.props.navigation.pop();
    })
    .catch(() => {
      this.showAlert('Gagal menghapus data hutang');
    });
  }

  showAlert(msg) {
    Alert.alert(
      '',
      msg,
      [{
        text: 'Ok',
        onPress: () => null
      }], {
        cancelable: false
      });
  }

  renderItem(item) {
    const date = new Date(item.item.createdAt);
    return (
      <CardComponent onPress={() => this.props.navigation.navigate('HutangDetail')}>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Makanan yang di pesan : </Text>{'\n'}{item.item.makanan}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Minuman yang di pesan : </Text>{'\n'}{item.item.minuman}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Total : </Text>{'\n'}{`Rp. ${(item.item.total_harga).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Text>
        <Text style={{ marginLeft: 8 }}><Text style={styles.label}>Tanggal Pembelian : </Text>{'\n'}{moment(date).local().locale('id').format('dddd, DD-MM-YYYY')}</Text>
      </CardComponent>
    );
  }

  render() {
    const data = Object.values(this.props.hutang).filter(value => value.nama === this.props.navigation.state.params.nama);
    const subTotal = Object.values(data).map(harga => (
      harga.total_harga
    ));
    return (
      <View style={{ flex: 1, padding: 8 }} >
        <FlatList
          data={data}
          keyExtractor={(item) => item.createdAt}
          renderItem={this.renderItem.bind(this)}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', }}>
              <Text>Tidak ada hutang</Text>
            </View>
          )}
          ListHeaderComponent={(<Text style={{ color: 'black', fontSize: 24, marginLeft: 8 }}>{this.props.navigation.state.params.nama}</Text>)}
          ListFooterComponent={(<Text style={{ color: 'black', fontSize: 18, marginLeft: 8 }}>{`Subtotal = Rp. ${subTotal.reduce((total, num) => total + num)}`}</Text>)}
        />
        <Button title='Hapus Data' onPress={() => this.hapusData()} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  hutang: state.hutang.hutang.hutang
});

export default connect(mapStateToProps, {
  getHutang
})(HutangDetailScreen);
