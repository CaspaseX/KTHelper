import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const globalStyles = StyleSheet.create({
  container: {
    paddingTop:'10%',
    flex: 1,
    backgroundColor: "#343a40",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: "Oswald",
    fontSize:RFPercentage(4)
  },
  smallText: {
    color: "white",
    fontFamily: "Oswald",
    fontSize:RFPercentage(2)
  },
});

export default globalStyles;