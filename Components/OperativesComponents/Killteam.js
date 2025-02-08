import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import globalStyles from "../../Styles/globalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faCamera, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import OperativeCard from "./Operatives";
import { useDispatch } from "react-redux";
import { addOperative, updateKillTeam, deleteKillTeam } from "../../Reducers/Operatives";
import * as ImagePicker from "expo-image-picker";

export default function KillTeamCard({ killTeam, operatives }) {
  const [collapsed, setCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editKillTeamModalVisible, setEditKillTeamModalVisible] = useState(false);
  const [newOperativeName, setNewOperativeName] = useState("");
  const [newOperativeHealth, setNewOperativeHealth] = useState("");
  const [operativePhoto, setOperativePhoto] = useState(null);
  const [editedKillTeamName, setEditedKillTeamName] = useState(killTeam.name);

  const dispatch = useDispatch();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Camera access is required to update the photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setOperativePhoto(result.assets[0].uri);
    }
  };

  const handleAddOperative = () => {
    if (!newOperativeName.trim() || !newOperativeHealth.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(
      addOperative({
        name: newOperativeName.trim(),
        maxHealth: parseInt(newOperativeHealth, 10),
        killTeamId: killTeam.id,
        photo: operativePhoto,
      })
    );

    setNewOperativeName("");
    setNewOperativeHealth("");
    setOperativePhoto(null);
    setModalVisible(false);
  };

  const handleSaveKillTeam = () => {
    if (!editedKillTeamName.trim()) {
      alert("Kill Team name cannot be empty.");
      return;
    }

    dispatch(updateKillTeam({ id: killTeam.id, name: editedKillTeamName.trim() }));
    setEditKillTeamModalVisible(false);
  };

  const handleDeleteKillTeam = () => {
    Alert.alert(
      "Delete Kill Team",
      `Are you sure you want to delete ${killTeam.name} and all its operatives?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(deleteKillTeam({ id: killTeam.id }));
            setEditKillTeamModalVisible(false);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setEditKillTeamModalVisible(true)}
          style={styles.editButton}
        >
          <FontAwesomeIcon icon={faEdit} size={16} color="#c54c21" />
        </TouchableOpacity>
        <Text style={styles.title}>{killTeam.name}</Text>
        <TouchableOpacity onPress={toggleCollapse}>
          <FontAwesomeIcon
            icon={collapsed ? faChevronDown : faChevronUp}
            size={20}
            color="#c54c21"
          />
        </TouchableOpacity>
      </View>

      {!collapsed && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {operatives.map((operative) => (
            <OperativeCard key={operative.id} operativeId={operative.id} />
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Add Operative</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Operative</Text>

            <View style={styles.photoContainer}>
              <Image
                source={
                  operativePhoto
                    ? { uri: operativePhoto }
                    : require("../../assets/default-photo.png")
                }
                style={styles.photo}
              />
              <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
                <FontAwesomeIcon icon={faCamera} size={20} color="white" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={newOperativeName}
              onChangeText={setNewOperativeName}
              placeholder="Enter operative name"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              value={newOperativeHealth}
              onChangeText={setNewOperativeHealth}
              keyboardType="numeric"
              placeholder="Enter max health"
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
                onPress={handleAddOperative}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editKillTeamModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditKillTeamModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Kill Team</Text>
            <TextInput
              style={styles.input}
              value={editedKillTeamName}
              onChangeText={setEditedKillTeamName}
              placeholder="Enter Kill Team name"
              placeholderTextColor="#ccc"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeleteKillTeam}
              >
                <FontAwesomeIcon icon={faTrash} size={16} color="white" />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditKillTeamModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveKillTeam}
              >
                <Text style={styles.buttonText}>Save</Text>
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
    backgroundColor: "#444",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
  },
  editButton: {
    marginRight: 10,
  },
  title: {
    ...globalStyles.smallText,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: "#c54c21",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flexGrow: 1,
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
    ...globalStyles.smallText,
    fontSize: 18,
    marginBottom: 15,
  },
  photoContainer: {
    position: "relative",
    marginBottom: 15,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#c54c21",
    borderRadius: 15,
    padding: 5,
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
  deleteButton: {
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "center",
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
    fontSize: 14,
  },
});
