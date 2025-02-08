import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMinus, faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateOperative, updateHealth, deleteOperative } from "../../Reducers/Operatives";
import * as ImagePicker from "expo-image-picker";

import globalStyles from "../../Styles/globalStyles";

export default function OperativeCard({ operativeId }) {
  const dispatch = useDispatch();

  const operative = useSelector((state) =>
    state.operatives.value.find((op) => op.id === operativeId)
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(operative.name);
  const [editedMaxHealth, setEditedMaxHealth] = useState(operative.maxHealth);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Camera access is required to update the photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      dispatch(
        updateOperative({ id: operativeId, photo: result.assets[0].uri })
      );
    }
  };

  const handleSave = () => {
    dispatch(
      updateOperative({
        id: operativeId,
        name: editedName,
        maxHealth: parseInt(editedMaxHealth, 10),
      })
    );
    setModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Operative",
      `Are you sure you want to delete ${operative.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(deleteOperative({ id: operativeId }));
            setModalVisible(false);
          },
        },
      ]
    );
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <View style={styles.inlineContainer}>
          <View style={styles.badge}>
            <Image
              source={
                operative.photo
                  ? { uri: operative.photo }
                  : require("../../assets/default-photo.png")
              }
              style={styles.photo}
            />
          </View>

          <Text
            style={[globalStyles.smallText, styles.name]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {operative.name}
          </Text>

          <View style={styles.healthContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                dispatch(
                  updateHealth({
                    id: operativeId,
                    delta: -1,
                    maxHealth: operative.maxHealth,
                  })
                )
              }
            >
              <FontAwesomeIcon icon={faMinus} size={12} color="white" />
            </TouchableOpacity>
            <Text style={[globalStyles.text, styles.health]}>
              {operative.health} / {operative.maxHealth}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                dispatch(
                  updateHealth({
                    id: operativeId,
                    delta: 1,
                    maxHealth: operative.maxHealth,
                  })
                )
              }
            >
              <FontAwesomeIcon icon={faPlus} size={12} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[globalStyles.smallText, styles.modalTitle]}>
              Edit Operative
            </Text>
            <View style={styles.modalImageContainer}>
              <Image
                source={
                  operative.photo
                    ? { uri: operative.photo }
                    : require("../../assets/default-photo.png")
                }
                style={styles.photoLarge}
              />
              <TouchableOpacity
                onPress={handleImagePick}
                style={styles.cameraButton}
              >
                <FontAwesomeIcon icon={faCamera} size={16} color="white" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Enter name"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              value={editedMaxHealth.toString()}
              onChangeText={setEditedMaxHealth}
              keyboardType="numeric"
              placeholder="Enter max health"
              placeholderTextColor="#ccc"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <FontAwesomeIcon icon={faTrash} size={16} color="white" />
                <Text style={[globalStyles.smallText, styles.deleteText]}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[globalStyles.smallText, styles.buttonText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={[globalStyles.smallText, styles.buttonText]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  name: {
    flex: 1,
    textAlign: "center",
  },
  healthContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  health: {
    marginHorizontal: 10,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#c54c21",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 15,
  },
  modalImageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  photoLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cameraButton: {
    backgroundColor: "#c54c21",
    borderRadius: 8,
    padding: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
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
  deleteText: {
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#c54c21",
  },
  buttonText: {
    color: "white",
  },
});
