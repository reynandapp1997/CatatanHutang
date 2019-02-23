import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  AsyncStorage,
  Alert,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import {
  onChangeForm,
  clearForm
} from '../redux/actions';
import {
  TAMBAH_ANAK,
  TAMBAH_MAKANAN,
  TAMBAH_MINUMAN
} from '../constants/strings';
import { styles } from '../constants/styles';

class CreateDataScreen extends Component {
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
      }
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  onChangeForm = (text, field) => {
    this.props.onChangeForm(text, field);
  }

  async getData() {
    const dataAnak = await AsyncStorage.getItem('dataAnak');
    const dataMakanan = await AsyncStorage.getItem('dataMakanan');
    const dataMinuman = await AsyncStorage.getItem('dataMinuman');
    if (dataAnak) {
      await this.setState({ dataAnak: JSON.parse(dataAnak) });
    }
    if (dataMakanan) {
      await this.setState({ dataMakanan: JSON.parse(dataMakanan) });
    }
    if (dataMinuman) {
      await this.setState({ dataMinuman: JSON.parse(dataMinuman) });
    }
  }

  tambahAnak = async () => {
    if (this.props.form.tambah_anak.length === 0) {
      return this.showAlert('Silahkan isi nama anak terlebih dahulu');
    }
    const dataAnak = this.state.dataAnak;
    dataAnak.anak.push(this.props.form.tambah_anak);
    this.setState({ dataAnak });
    const gg = this.state.dataAnak;
    AsyncStorage.setItem('dataAnak', JSON.stringify(gg))
      .then(() => {
        this.showAlert('Berhasil menambah data anak');
        this.getData();
      })
      .catch(() => {
        this.showAlert('Gagal menambah data anak');
      });
  }

  tambahMakanan = async () => {
    if (this.props.form.tambah_makanan.length === 0) {
      return this.showAlert('Silahkan isi nama makanan terlebih dahulu');
    }
    const dataMakanan = this.state.dataMakanan;
    dataMakanan.makanan.push(this.props.form.tambah_makanan);
    this.setState({ dataMakanan });
    const gg = this.state.dataMakanan;
    AsyncStorage.setItem('dataMakanan', JSON.stringify(gg))
      .then(() => {
        this.showAlert('Berhasil menambah data makanan');
        this.getData();
      })
      .catch(() => {
        this.showAlert('Gagal menambah data makanan');
      });
  }

  tambahMinuman = async () => {
    if (this.props.form.tambah_minuman.length === 0) {
      return this.showAlert('Silahkan isi nama minuman terlebih dahulu');
    }
    const dataMinuman = this.state.dataMinuman;
    dataMinuman.minuman.push(this.props.form.tambah_minuman);
    this.setState({ dataMinuman });
    const gg = this.state.dataMinuman;
    AsyncStorage.setItem('dataMinuman', JSON.stringify(gg))
      .then(() => {
        this.showAlert('Berhasil menambah data minuman');
        this.getData();
      })
      .catch(() => {
        this.showAlert('Gagal menambah data minuman');
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
    return (
      <Text style={{ color: 'black', fontSize: 16 }}>{item.item}</Text>
    );
  }

  render() {
    return (
      <ScrollView style={{ padding: 8 }} >
        <View>
          <FlatList
            data={this.state.dataAnak.anak}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item.index}
          />
          <Text style={{ fontSize: 24, color: 'black', marginBottom: 16 }}>Tambah Data Anak</Text>
          <Text style={styles.label}>Nama</Text>
          <TextInput
            value={this.props.form.tambah_anak}
            style={styles.form}
            onChangeText={(text) => this.onChangeForm(text, TAMBAH_ANAK)}
            autoCapitalize='words'
            onSubmitEditing={() => this.tambahAnak()}
          />
          <Button title='Tambah' onPress={() => { this.tambahAnak(); }} />
        </View>
        <View style={{ marginTop: 24 }}>
          <FlatList
            data={this.state.dataMakanan.makanan}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item.index}
          />
          <Text style={{ fontSize: 24, color: 'black', marginBottom: 16 }}>Tambah Data Makanan</Text>
          <Text style={styles.label}>Makanan</Text>
          <TextInput
            value={this.props.form.tambah_makanan}
            style={styles.form}
            onChangeText={(text) => this.onChangeForm(text, TAMBAH_MAKANAN)}
            autoCapitalize='words'
            onSubmitEditing={() => this.tambahMakanan()}
          />
          <Button title='Tambah' onPress={() => { this.tambahMakanan(); }} />
        </View>
        <View style={{ marginTop: 24 }}>
          <FlatList
            data={this.state.dataMinuman.minuman}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item.index}
          />
          <Text style={{ fontSize: 24, color: 'black', marginBottom: 16 }}>Tambah Data Minuman</Text>
          <Text style={styles.label}>Minuman</Text>
          <TextInput
            value={this.props.form.tambah_minuman}
            style={styles.form}
            onChangeText={(text) => this.onChangeForm(text, TAMBAH_MINUMAN)}
            autoCapitalize='words'
            onSubmitEditing={() => this.tambahMinuman()}
          />
          <Button title='Tambah' onPress={() => { this.tambahMinuman(); }} />
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, {
  onChangeForm,
  clearForm
})(CreateDataScreen);
