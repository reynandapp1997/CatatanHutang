import { AsyncStorage } from 'react-native';

import {
  NAMA,
  MAKANAN,
  MINUMAN,
  TOTAL_HARGA,
  CLEAR_FORM,
  TAMBAH_ANAK,
  TAMBAH_MAKANAN,
  TAMBAH_MINUMAN,
  GET_HUTANG
} from '../../constants/strings';

export const onChangeForm = (text, field) => dispatch => {
  switch (field) {
    case NAMA:
      dispatch({
        type: NAMA,
        payload: text
      });
      break;
    case MAKANAN:
      dispatch({
        type: MAKANAN,
        payload: text
      });
      break;
    case MINUMAN:
      dispatch({
        type: MINUMAN,
        payload: text
      });
      break;
    case TOTAL_HARGA:
      dispatch({
        type: TOTAL_HARGA,
        payload: text
      });
      break;
    case TAMBAH_ANAK:
      dispatch({
        type: TAMBAH_ANAK,
        payload: text
      });
      break;
    case TAMBAH_MAKANAN:
      dispatch({
        type: TAMBAH_MAKANAN,
        payload: text
      });
      break;
    case TAMBAH_MINUMAN:
      dispatch({
        type: TAMBAH_MINUMAN,
        payload: text
      });
      break;
    default:
      break;
  }
};

export const clearForm = () => ({
  type: CLEAR_FORM
});

export const getHutang = () => dispatch => {
  AsyncStorage.getItem('dataHutang')
  .then(result => {
    dispatch({
      type: GET_HUTANG,
      payload: JSON.parse(result)
    });
  })
  .catch(err => {
    console.log(err);
  });
};
