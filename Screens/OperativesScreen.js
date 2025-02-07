import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";

export default function OperativesScreen(){

    return(
        <Text style={styles.container}>Here lie the Operative list</Text>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#343a40',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });