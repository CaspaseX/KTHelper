import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import globalStyles from "../../Styles/globalStyles";
import killOpsTable from "../../assets/killOpsTable";
import Counter from "./Counter";

import { useSelector, useDispatch } from "react-redux";
import { updateKillOpsVP } from "../../Reducers/Points";

export default function KillOps() {
  const dispatch = useDispatch();

  const startingEnemyOperatives = useSelector(
    (state) => state.points.value.startingEnemyOperatives
  );
  const killedEnemyOperatives = useSelector(
    (state) => state.points.value.killedEnemyOperatives
  );
  const victoryPoints = useSelector(
    (state) => state.points.value.killOpsVP
  );
  const hasMoreKillOpsPoints = useSelector(
    (state) => state.points.value.hasMoreKillOpsPoints
  );

  function calculateKillOpsPoints(startingEnemies, killedEnemies, hasBonus) {
    if (startingEnemies <= 0 || !killOpsTable[startingEnemies]) {
      return 0;
    }

    const thresholds = killOpsTable[startingEnemies];
    let currentKillGrade = 0;

    for (let i = 0; i < thresholds.length; i++) {
      if (killedEnemies >= thresholds[i]) {
        currentKillGrade = i + 1;
      } else {
        break;
      }
    }

    return hasBonus ? currentKillGrade + 1 : currentKillGrade;
  }

  useEffect(() => {
    const newVictoryPoints = calculateKillOpsPoints(
      startingEnemyOperatives,
      killedEnemyOperatives,
      hasMoreKillOpsPoints
    );

    if (victoryPoints !== newVictoryPoints) {
      dispatch(updateKillOpsVP(newVictoryPoints));
    }
  }, [
    startingEnemyOperatives,
    killedEnemyOperatives,
    hasMoreKillOpsPoints,
    victoryPoints,
    dispatch,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.text}>Kill Ops</Text>
        <Text style={[globalStyles.smallText, styles.victoryPoints]}>
          Current Kill Grade : {victoryPoints}
        </Text>
      </View>

      <View style={styles.countersContainer}>
        <View style={styles.counterBlock}>
          <Counter
            name="Starting Enemy Operatives"
            reducerName="startingEnemyOperatives"
          />
        </View>

        <View style={styles.counterBlock}>
          <Counter
            name="Killed Enemy Operatives"
            reducerName="killedEnemyOperatives"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "1.8%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: '2%',
  },
  victoryPoints: {
    fontWeight: "600",
    color: "#c54c21",
    paddingRight: '3%',
  },
  countersContainer: {
    flexDirection: "column",
    gap: 5,
  },
  counterBlock: {
    alignItems: "flex-start",
  },
});
