// ProductDetail.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDetail = ({ route }) => {
  const {product} = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>{`$${product.price}`}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: "100%",
    height: "50%",
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: "green",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
  },
});

export default ProductDetail;
