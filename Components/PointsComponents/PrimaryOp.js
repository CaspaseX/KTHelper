import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

import globalStyles from "../../Styles/globalStyles";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { updatePrimaryOp } from "../../Reducers/Points";

export default function PrimaryOp() {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const selectedOption = useSelector(
    (state) => state.points.value.primaryOp
  );

  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      dispatch(updatePrimaryOp(""));
    } else {
      dispatch(updatePrimaryOp(option));
    }
  };

  return (
    <View>
      <View style={styles.textWrapper}>
        <Text style={globalStyles.text}>Primary Operation</Text>
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.iconWrapper}
        >
          <FontAwesomeIcon
            icon={isVisible ? faEyeSlash : faEye}
            size={24}
            color="#c54c21"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View
          style={[styles.optionContainer, !isVisible && styles.hiddenContent]}
        >
          <View style={styles.option}>
            <Text style={globalStyles.smallText}>TacOp</Text>
            <Checkbox
              status={selectedOption === "TacOp" ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange("TacOp")}
              color="#c54c21"
              uncheckedColor="#ccc"
            />
          </View>
          <View style={styles.option}>
            <Text style={globalStyles.smallText}>CritOp</Text>
            <Checkbox
              status={selectedOption === "CritOp" ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange("CritOp")}
              color="#c54c21"
              uncheckedColor="#ccc"
            />
          </View>
          <View style={styles.option}>
            <Text style={globalStyles.smallText}>KillOp</Text>
            <Checkbox
              status={selectedOption === "KillOp" ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange("KillOp")}
              color="#c54c21"
              uncheckedColor="#ccc"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '2%',
  },
  iconWrapper: {
    position: "relative",
    top: 4,
    marginLeft: '5%',
  },
  card: {
    backgroundColor: "#333",
    width: "100%",
    height: 60,
    padding: '4%',
    borderRadius: 10,
    justifyContent: "center",
    marginBottom:'3%'
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  hiddenContent: {
    opacity: 0,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
  },
});
