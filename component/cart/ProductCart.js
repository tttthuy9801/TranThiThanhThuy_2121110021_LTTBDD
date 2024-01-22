import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ProductCart = ({ route }) => {
  const { addcart } = route.params || {};
  const [cartItems, setCartItems] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  useEffect(() => {
    loadCartItems();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCartItems();
    }, [])
  );

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }

      const storedProductQuantities = await AsyncStorage.getItem(
        "productQuantities"
      );
      if (storedProductQuantities) {
        setProductQuantities(JSON.parse(storedProductQuantities));
      }
    } catch (error) {
      console.error("Error loading cart items", error);
    }
  };

  const saveCartItems = async (items) => {
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart items", error);
    }
  };

  const saveProductQuantities = async (quantities) => {
    try {
      await AsyncStorage.setItem(
        "productQuantities",
        JSON.stringify(quantities)
      );
    } catch (error) {
      console.error("Error saving product quantities", error);
    }
  };

  const addToCart = () => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.id === addcart.id
    );

    if (existingCartItemIndex !== -1) {
      // Sản phẩm đã có trong giỏ hàng
      const updatedCart = [...cartItems];
      updatedCart[existingCartItemIndex].quantity += 1;

      setCartItems(updatedCart);
      saveCartItems(updatedCart);

      const updatedQuantities = { ...productQuantities };
      updatedQuantities[addcart.id] += 1;
      setProductQuantities(updatedQuantities);
      saveProductQuantities(updatedQuantities);
    } else {
      // Sản phẩm chưa có trong giỏ hàng
      const updatedCart = [...cartItems, { ...addcart, quantity: 1 }];
      setCartItems(updatedCart);
      saveCartItems(updatedCart);

      const updatedQuantities = { ...productQuantities };
      updatedQuantities[addcart.id] = 1;
      setProductQuantities(updatedQuantities);
      saveProductQuantities(updatedQuantities);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    saveCartItems(updatedCart);

    const updatedQuantities = { ...productQuantities };
    updatedQuantities[cartItems[index].id] = 0; // Reset quantity when removing
    setProductQuantities(updatedQuantities);
    saveProductQuantities(updatedQuantities);
  };
  const incrementQuantity = (productId) => {
    const updatedQuantities = { ...productQuantities };
    updatedQuantities[productId] = (updatedQuantities[productId] || 0) + 1;
    setProductQuantities(updatedQuantities);
    saveProductQuantities(updatedQuantities);
  };

  const decrementQuantity = (productId) => {
    const updatedQuantities = { ...productQuantities };
    if (updatedQuantities[productId] && updatedQuantities[productId] > 0) {
      updatedQuantities[productId] -= 1;
      setProductQuantities(updatedQuantities);
      saveProductQuantities(updatedQuantities);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ Hàng</Text>

      {cartItems.map((item, index) => (
        <View key={index} style={styles.cartItem}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productPrice}>{`$${item.price}`}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decrementQuantity(item.id)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {productQuantities[item.id] || 0}
              </Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => incrementQuantity(item.id)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromCart(index)}>
            <Text style={styles.removeButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart()}>
        <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Tổng cộng: $
          {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => console.log("Nút Thanh toán được nhấn")}>
          <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
  removeButton: {
    backgroundColor: "pink",
    padding: 8,
    borderRadius: 5,
    marginLeft: 16,
  },
  removeButtonText: {
    color: "white",
  },
  addToCartButton: {
    backgroundColor: "pink",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "pink",
    padding: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  quantityButton: {
    backgroundColor: "pink",
    padding: 5,
    borderRadius: 3,
  },
});

export default ProductCart;
