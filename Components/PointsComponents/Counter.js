import { View, Text, StyleSheet } from "react-native";

import globalStyles from "../../Styles/globalStyles";
import ButtonCustom from "./ButtonCustom";
import { useSelector } from "react-redux";

export default function Counter(props) {
  const counterValue = useSelector(
    (state) => state.user.value.points[props.reducerName]
  );

  const isSmallCounter =
    props.reducerName === "startingEnemyOperatives" ||
    props.reducerName === "killedEnemyOperatives";

  return (
    <View style={[styles.container, isSmallCounter && styles.smallContainer]}>
      <Text style={[globalStyles.text, isSmallCounter && globalStyles.smallText]}>
        {props.name}
      </Text>

      <View style={styles.buttonContainer}>
        <ButtonCustom reducerName={props.reducerName} add={false} />

        <View
          style={[
            styles.counterContainer,
            isSmallCounter && styles.smallCounterContainer,
          ]}
        >
          <Text
            style={[
              globalStyles.text,
              isSmallCounter && styles.smallCounterText,
            ]}
          >
            {counterValue}
          </Text>
        </View>

        <ButtonCustom reducerName={props.reducerName} add={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: "1.8%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "1.8%",
    justifyContent: "flex-end",
    minWidth: 100,
    alignSelf: "flex-end",
  },
  counterContainer: {
    minWidth: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  smallContainer: {
    paddingLeft: "1.8%",
  },
  smallCounterContainer: {
    minWidth: 35,
  },
  smallCounterText: {
    fontSize: 14,
  },
});
