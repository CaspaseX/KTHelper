import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addKillTeam } from "../Reducers/Operatives";
import KillTeamCard from "../Components/OperativesComponents/Killteam";

export default function OperativesScreen() {
  const killTeams = useSelector((state) => state.operatives.killTeams);
  const operatives = useSelector((state) => state.operatives.value);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [newKillTeamName, setNewKillTeamName] = useState("");

  const handleAddKillTeam = () => {
    if (newKillTeamName.trim()) {
      dispatch(addKillTeam({ name: newKillTeamName.trim() }));
      setNewKillTeamName("");
      setModalVisible(false);
    } else {
      alert("Kill Team name cannot be empty.");
    }
  };

  const renderFooter = () => (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.addButtonText}>Add Kill Team</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={killTeams}
        renderItem={({ item }) => (
          <KillTeamCard
            killTeam={item}
            operatives={operatives.filter((op) => op.killTeamId === item.id)}
            initiallyCollapsed={false} // La prop pour forcer l'ouverture initiale
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Kill Team</Text>
            <TextInput
              style={styles.input}
              value={newKillTeamName}
              onChangeText={setNewKillTeamName}
              placeholder="Enter Kill Team name"
              placeholderTextColor="#ccc"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddKillTeam}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343a40",
    paddingTop: "10%",
    padding: 10,
  },
  addButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#c54c21",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
