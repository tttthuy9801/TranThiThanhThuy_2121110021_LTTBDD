import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

// Import local images
const freeship = require("../../public/images/freeship.jpg");
const qr = require("../../public/images/qr.png");
const sale = require("../../public/images/sale.png");
const category = require("../../public/images/category.jpg");

const RoundedImagesHorizontal = () => {
  // List of local images
  const imageUrls = [freeship, qr, sale, category];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        {imageUrls.map((imageUrl, index) => (
          <Image key={index} source={imageUrl} style={styles.roundedImage} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    padding: 10,
    zIndex: 1, // Đặt giá trị cao hơn
  },
  roundedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
});


export default RoundedImagesHorizontal;
