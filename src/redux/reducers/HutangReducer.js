import { GET_HUTANG } from '../../constants/strings';

export default (state = {
  hutang: {}
}, action) => {
  switch (action.type) {
    case GET_HUTANG:
      if (action.payload) {
        return {
          ...state,
          hutang: action.payload
        };
      }
      return {
        ...state,
        hutang: {
          hutang: []
        }
      };
    default:
      return state;
  }
};
