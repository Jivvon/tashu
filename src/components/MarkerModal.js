import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

/**
 * TODO: 레이아웃, 디자인 수정
 */
const ModalView = (props) => {
  const { modalVisible, setModalVisible, modalProps, setStart, setDestination, toggleModal } = props;
  let content = '';
  if (modalProps) {
    content = `주소: ${modalProps.address}\n
    ${modalProps.name}\n
    ${modalProps.bikes.cntRentable} / ${modalProps.bikes.cntRackTotal}`
  }
  return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>console.log("closed")}
      >   
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{content}</Text>
                  <View flexDirection="row">
                  <TouchableHighlight
                      style={{ ...styles.openButton}}
                      onPress={() => {
                        setStart(modalProps)
                        toggleModal();
                      }}
                  >
                      <Text style={styles.textStyle}>출발</Text>    
                  </TouchableHighlight>
                  <TouchableHighlight
                      style={{ ...styles.openButton}}
                      onPress={() => {
                        setDestination(modalProps)
                        toggleModal();
                      }}
                  >
                      <Text style={styles.textStyle}>도착</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#888"}}
                        onPress={() => {
                          setModalVisible(false);
                        }}
                    >
                        <Text style={styles.textStyle}>닫기</Text>
                    </TouchableHighlight>
                </View>
              </View>
          </View>
      </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 8,
    margin: 2,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    position:"relative"
  }
});

export default ModalView;