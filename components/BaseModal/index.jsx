import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const BaseModal = ({ isVisible, onClose, children }) => {
  return (
      <>
        <Modal
            animationType="slide"
            transparent
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalBackground} onPress={onClose} />
            <View style={styles.modalView}>
                {children}
            </View>
        </Modal>
      </>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        position: 'relative',
        zIndex: 60,
        width: '100%',
        height: '100%',
        // marginTop: 200,
        backgroundColor: "#292929",
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default BaseModal;