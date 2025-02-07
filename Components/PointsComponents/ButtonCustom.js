import { StyleSheet, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { increaseCounter, decreaseCounter } from "../../Reducers/User";

export default function ButtonCustom(props) {
  const dispatch = useDispatch();

  const isSmallDarkButton =
    props.reducerName === "killedEnemyOperatives" ||
    props.reducerName === "startingEnemyOperatives";

  return props.add ? (
    <TouchableOpacity
      style={[styles.button, isSmallDarkButton && styles.smallDarkButton]}
      onPress={() => dispatch(increaseCounter(props.reducerName))}
    >
      <FontAwesomeIcon
        icon={faPlus}
        color={isSmallDarkButton ? "#aaa" : "white"}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.button, isSmallDarkButton && styles.smallDarkButton]}
      onPress={() => dispatch(decreaseCounter(props.reducerName))}
    >
      <FontAwesomeIcon
        icon={faMinus}
        color={isSmallDarkButton ? "#aaa" : "white"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#c54c21",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  smallDarkButton: {
    width: 28,
    height: 28,
    backgroundColor: "#333",
  },
});
