import {
  StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
  form: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 16
  },
  nama: {
    color: 'black',
    fontSize: 24
  },
  label: {
    color: 'black',
    fontSize: 16
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0.5,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8
  }
});
