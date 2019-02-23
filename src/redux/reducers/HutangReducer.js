export default (state = {
  hutang: {}
}, action) => {
  switch (action.type) {
    case 'hutang':
      return {
        ...state,
        hutang: ''
      };
    default:
      return state;
  }
};
