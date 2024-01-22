import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Thay đổi 'FontAwesome' bằng tên bộ icon mà bạn muốn sử dụng

const Menu = () => {
  const handleMenuPress = (menuItem) => {
    // Xử lý khi một mục menu được nhấn
    console.log(`Menu item "${menuItem}" pressed`);
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuPress("Item 1")}
      >
        <Text style={styles.menuItemText}>Tất cả </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuPress("Item 2")}
      >
        <Text style={styles.menuItemText}>Giày dép</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuPress("Item 3")}
      >
        <Text style={styles.menuItemText}>Quần Áo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuPress("Item 4")}
      >
        <Text style={styles.menuItemText}>Trang Sức</Text>
      </TouchableOpacity>

      {/* Thêm icon sau item 4 */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuPress("Icon Item")}
      >
        <Icon name="bars" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row", // Dạng ngang
    justifyContent: "space-around", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    height: 50, // Độ cao của menu
    backgroundColor: "#eee", // Màu nền của menu
  },
  menuItem: {
    flex: 1, // Mỗi mục menu chiếm đều không gian
    alignItems: "center", // Căn giữa theo chiều ngang
    justifyContent: "center", // Căn giữa theo chiều dọc
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Menu;
