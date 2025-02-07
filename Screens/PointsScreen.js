import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Checkbox } from "react-native-paper";

import globalStyles from "../Styles/globalStyles";

import { useDispatch, useSelector } from "react-redux";
import { toggleKillOpsPoints } from "../Reducers/User";

import Counter from "../Components/PointsComponents/Counter";
import PrimaryOp from "../Components/PointsComponents/PrimaryOp";
import VictoryPoints from "../Components/PointsComponents/VictoryPoints";
import KillOps from "../Components/PointsComponents/KillOps";

export default function PointsScreen() {
  const dispatch = useDispatch();

  const hasMoreKillOpsPoints = useSelector(
    (state) => state.user.value.points.hasMoreKillOpsPoints
  );

  const handleCheckBoxToggle = () => {
    dispatch(toggleKillOpsPoints());
  };

  return (
    <View style={globalStyles.container}>
      <Counter name="Command Points" reducerName="command" />
      <Counter name="Faction Points" reducerName="faction" />

      <View style={styles.hr} />

      <Counter name="Tactical Ops" reducerName="tacOps" />
      <Counter name="Critical Ops" reducerName="critOps" />

      <KillOps />

      <PrimaryOp></PrimaryOp>
      <VictoryPoints />

      <View style={styles.checkboxWrapper}>
      <Text style={styles.checkboxLabel}>
          Check if you have a higher Kill Grade than your opponent
        </Text>
        <Checkbox
          status={hasMoreKillOpsPoints ? "checked" : "unchecked"}
          onPress={handleCheckBoxToggle}
          color="#c54c21"
          uncheckedColor="#ccc"
        />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  hr: {
    width: "90%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 30,
    alignSelf: "center",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "white",
    fontFamily: "Oswald",
    marginLeft: 5,
  },
});
