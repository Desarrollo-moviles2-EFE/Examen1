import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    memberContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    photo: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
    },
    memberName: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    memberInfo: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
      color: '#555',
    },
  });

export default styles;
