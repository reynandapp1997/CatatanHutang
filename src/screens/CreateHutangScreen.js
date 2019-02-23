import React, {
  Component
} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Picker,
  AsyncStorage,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import {
  onChangeForm,
  clearForm,
  getHutang
} from '../redux/actions';
import {
  NAMA,
  MAKANAN,
  MINUMAN
} from '../constants/strings';
import { styles } from '../constants/styles';

class CreateHutangScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAnak: {
        anak: []
      },
      dataMakanan: {
        makanan: []
      },
      dataMinuman: {
        minuman: []
      },
      dataHutang: {
        hutang: []
      }
    };
  }

  async componentDidMount() {
    const dataAnak = await AsyncStorage.getItem('dataAnak');
    const dataMakanan = await AsyncStorage.getItem('dataMakanan');
    const dataMinuman = await AsyncStorage.getItem('dataMinuman');
    if (dataAnak) {
      this.setState({ dataAnak: JSON.parse(dataAnak) });
    }
    if (dataMakanan) {
      this.setState({ dataMakanan: JSON.parse(dataMakanan) });
    }
    if (dataMinuman) {
      this.setState({ dataMinuman: JSON.parse(dataMinuman) });
    }
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  onChangeForm = (text, field) => {
    this.props.onChangeForm(text, field);
  }

  resetForm() {
    this.props.clearForm();
  }

  async tambahHutang() {
    const data = await AsyncStorage.getItem('dataHutang');
    if (data) {
      this.setState({ dataHutang: JSON.parse(data) });
    }
    const hutang = {
      nama: this.props.form.nama,
      makanan: this.props.form.makanan,
      minuman: this.props.form.minuman,
      total_harga: this.props.form.total_harga,
      createdAt: new Date()
    };
    const dataHutang = this.state.dataHutang;
    dataHutang.hutang.push(hutang);
    this.setState({ dataHutang });
    AsyncStorage.setItem('dataHutang', JSON.stringify(this.state.dataHutang))
    .then(() => {
      this.showAlert('Berhasil menambah data hutang');
      this.resetForm();
      this.props.getHutang();
    })
    .catch(() => {
      this.showAlert('Gagal menambah data hutang');
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
  
  render() {
    return (
      <ScrollView style={{ padding: 8 }} >
        <Text style={{ fontSize: 24, color: 'black', marginBottom: 16 }}>Tambah Data Hutang</Text>
        <View>
          <Text style={styles.label}>Nama</Text>
          <Picker
            selectedValue={this.props.form.nama}
            onValueChange={(itemValue) => {
              this.onChangeForm(itemValue, NAMA);
            }}
          >
            <Picker.Item key='default' label='Pilih Anak' value='' />
            {this.state.dataAnak.anak.map((anak, index) => (
                <Picker.Item key={index} label={anak} value={anak} />
              ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.label}>Makanan</Text>
          <Picker
              selectedValue={this.props.form.makanan}
              onValueChange={(itemValue) => {
                this.onChangeForm(itemValue, MAKANAN);
              }}
          >
            <Picker.Item key='default' label='Pilih Makanan' value='' />
            {this.state.dataMakanan.makanan.map((makanan, index) => (
                <Picker.Item key={index} label={makanan} value={makanan} />
              ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.label}>Minuman</Text>
          <Picker
              selectedValue={this.props.form.minuman}
              onValueChange={(itemValue) => {
                this.onChangeForm(itemValue, MINUMAN);
              }}
          >
            <Picker.Item key='default' label='Pilih Minuman' value='' />
            {this.state.dataMinuman.minuman.map((minuman, index) => (
                <Picker.Item key={index} label={minuman} value={minuman} />
              ))}
          </Picker>
        </View>
        <View>
          <TextInput
            style={styles.form}
            editable={false}
            value={this.props.form.nama}
          />
          <TextInput
            style={styles.form}
            editable={false}
            value={this.props.form.makanan}
          />
          <TextInput
            style={styles.form}
            editable={false}
            value={this.props.form.minuman}
          />
          <TextInput
            style={styles.form}
            editable={false}
            value={`Rp. ${this.props.form.total_harga.toString()}`}
          />
        </View>
        <Button title='Tambah' onPress={() => { this.tambahHutang(); }} />
        <View style={{ height: 32 }} />
        <Button title='Reset' onPress={() => { this.resetForm(); }} />
        <View style={{ height: 32 }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, {
  onChangeForm,
  clearForm,
  getHutang
})(CreateHutangScreen);
