import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  Text,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm biến state

  const handleCartPress = () => {
    navigation.navigate("ProductCart");
  };

  const handleSearch = () => {
    navigation.navigate("ProductList", { searchQuery });
  };

  const handlePersonPress = () => {
    setModalVisible(true);
  };

  const handleLoginPress = () => {
    console.log("Handle Login Press");
    navigation.navigate("Login");
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
    closeModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeModal();
  };

  const handleProfile = () => {
    // Xử lý hiển thị thông tin tài khoản
    closeModal();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <View style={styles.Conclider}>TIỆM NHÀ THỶ THỶ</View>
        {/* <TouchableOpacity onPress={handleMap}>
          <Icon name="map" size={20} color="black" style={styles.icon} />
        </TouchableOpacity> */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePersonPress}>
            <Icon name="user" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCartPress}>
            <Icon
              name="shopping-cart"
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isLoggedIn ? (
              <>
                <TouchableOpacity onPress={handleProfile}>
                  <Text style={styles.modalOption}>Thông tin tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.modalOption}>Đăng xuất</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={handleLoginPress}>
                  <Text style={styles.modalOption}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRegisterPress}>
                  <Text style={styles.modalOption}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
              </>
            )}
            <Pressable onPress={closeModal}>
              <Text style={styles.closeText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "honeydew",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: 'pink'
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 30,
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
  },
  modalOption: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeText: {
    color: "blue",
    marginTop: 10,
  },
  // Conclider:{
  //   backgroundColor: 'pink'
  // },
});

export default Header;