import { Text, StyleSheet } from "react-native";

import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import globalStyles from "../../Styles/globalStyles";

export default function VictoryPoints() {
  const [VP, setVP] = useState(0);

  const tacOpsVP = useSelector((state) => state.user.value.points.tacOps);
  const critOpsVP = useSelector((state) => state.user.value.points.critOps);
  const killOpsVP = useSelector((state) => state.user.value.points.killOpsVP);

  const primaryOp = useSelector((state) => state.user.value.points.primaryOp);

  useEffect(() => {
    switch (primaryOp) {
      case "TacOp":
        setVP(tacOpsVP + critOpsVP + killOpsVP + Math.ceil(tacOpsVP / 2));
        break;
      case "CritOp":
        setVP(tacOpsVP + critOpsVP + killOpsVP + Math.ceil(critOpsVP / 2));
        break;
      case "KillOp":
        setVP(tacOpsVP + critOpsVP + killOpsVP + Math.ceil(killOpsVP / 2));
        break;
      default:
        setVP(tacOpsVP + critOpsVP + killOpsVP);
    }
  }, [tacOpsVP, critOpsVP, killOpsVP, primaryOp]);

  return <Text style={[globalStyles.text, styles.textVictory]}>Total Victory Points : {VP}</Text>;
}

const styles = StyleSheet.create({
  textVictory: {
    
  },})