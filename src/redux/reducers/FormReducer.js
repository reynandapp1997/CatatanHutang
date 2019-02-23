/* eslint-disable radix */
import {
  NAMA,
  MAKANAN,
  MINUMAN,
  TOTAL_HARGA,
  CLEAR_FORM,
  TAMBAH_ANAK,
  TAMBAH_MAKANAN,
  TAMBAH_MINUMAN
} from '../../constants/strings';

export default (state = {
  nama: '',
  makanan: '',
  minuman: '',
  total_harga: 0,
  tambah_anak: '',
  tambah_makanan: '',
  tambah_minuman: ''
}, action) => {
  switch (action.type) {
    case NAMA:
      return {
        ...state,
        nama: action.payload
      };
    case MAKANAN:
      if (action.payload) {
        return {
          ...state,
          makanan: `${action.payload}, ${state.makanan}`,
          total_harga: state.total_harga + parseInt(action.payload.split(',')[1])
        };
      }
      return {
        ...state,
        makanan: action.payload
      };
    case MINUMAN:
      if (action.payload) {
        return {
          ...state,
          minuman: `${action.payload}, ${state.minuman}`,
          total_harga: state.total_harga + parseInt(action.payload.split(',')[1])
        };
      }
      return {
        ...state,
        minuman: action.payload
      };
    case TOTAL_HARGA:
      return {
        ...state,
        total_harga: action.payload
      };
    case TAMBAH_ANAK:
      return {
        ...state,
        tambah_anak: action.payload
      };
    case TAMBAH_MAKANAN:
      return {
        ...state,
        tambah_makanan: action.payload
    };
    case TAMBAH_MINUMAN:
      return {
        ...state,
        tambah_minuman: action.payload
      };
    case CLEAR_FORM:
      return {
        ...state,
        nama: '',
        makanan: '',
        minuman: '',
        total_harga: 0,
        tambah_anak: '',
        tambah_makanan: '',
        tambah_minuman: ''
      };
    default:
      return state;
  }
};
