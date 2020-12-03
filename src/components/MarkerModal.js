import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Linking
} from "react-native";

import { openNaverMapApp } from '../utils'
/**
 * TODO: 레이아웃, 디자인 수정
 */
const ModalView = (props) => {
  const { modalVisible, modalProps, setStart, setDestination, toggleModal } = props;
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
                      style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                      onPress={() => {
                        Linking.openURL("https://www.tashu.or.kr/m/rentAction.do?process=dailyStep4")
                      }}
                  >
                      <Text style={styles.textStyle}>일일권 구매</Text>    
                  </TouchableHighlight>
                  <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                      onPress={() => {
                        Linking.openURL("https://www.tashu.or.kr/m/rentAction.do?process=reuseStep2")
                      }}
                  >
                      <Text style={styles.textStyle}>일일 재대여</Text>    
                  </TouchableHighlight>
                  </View>
                  <View flexDirection="row">
                  <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                      onPress={() => {
                        setStart(modalProps)
                        toggleModal();
                      }}
                  >
                      <Text style={styles.textStyle}>출발</Text>    
                  </TouchableHighlight>
                  <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                      onPress={() => {
                        setDestination(modalProps)
                        toggleModal();
                      }}
                  >
                      <Text style={styles.textStyle}>도착</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                      onPress={()=>{
                          // TODO: web으로 열도록 수정
                          // openNaverMapApp("https://m.map.naver.com/directions/?ename=%EB%B3%B8%EA%B0%80&ex=127.016078&ey=37.514752&eex=127.0161857&eey=37.5148964&edid=19753712&incomeUrl=https%3A%2F%2Fm.map.naver.com%2Fsearch2%2Fsearch.nhn%3Fquery%3D%25EB%25B3%25B8%25EA%25B0%2580%26sm%3Dhty%26style%3Dv5#/drive/list/%25EC%25B6%25A9%25EB%2582%25A8%25EB%258C%2580%25ED%2595%2599%25EA%25B5%2590%25EB%258C%2580%25EB%258D%2595%25EC%25BA%25A0%25ED%258D%25BC%25EC%258A%25A4,127.3457442,36.3666380,127.3448560,36.3627770,false,11591645/%25EB%25A6%25AC%25EC%25BC%2580%25EB%25A6%25AC%25EC%25BC%2580,127.3465661,36.3586831,127.3465260,36.3585510,false,36924522/4");
                          Linking.openURL("https://m.map.naver.com/directions/?ename=%EB%B3%B8%EA%B0%80&ex=127.016078&ey=37.514752&eex=127.0161857&eey=37.5148964&edid=19753712&incomeUrl=https%3A%2F%2Fm.map.naver.com%2Fsearch2%2Fsearch.nhn%3Fquery%3D%25EB%25B3%25B8%25EA%25B0%2580%26sm%3Dhty%26style%3Dv5#/drive/list/%25EC%25B6%25A9%25EB%2582%25A8%25EB%258C%2580%25ED%2595%2599%25EA%25B5%2590%25EB%258C%2580%25EB%258D%2595%25EC%25BA%25A0%25ED%258D%25BC%25EC%258A%25A4,127.3457442,36.3666380,127.3448560,36.3627770,false,11591645/%25EB%25A6%25AC%25EC%25BC%2580%25EB%25A6%25AC%25EC%25BC%2580,127.3465661,36.3586831,127.3465260,36.3585510,false,36924522/4");
                      }}
                  >
                      <Text style={styles.textStyle}>길찾기</Text>
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
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