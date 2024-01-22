import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import slider2 from "../../public/images/slider2.jpg";
import slider3 from "../../public/images/slider3.jpg";
import slider4 from "../../public/images/slider4.jpg";

const images = [slider2,slider3,slider4];

const StaticSlider = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  const switchImage = () => {
    Animated.timing(translateX, {
      toValue: -390, // Adjust the width of your slider
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Move the first image to the end of the array
      images.push(images.shift());
      translateX.setValue(0);
    });
  };

  useEffect(() => {
    const interval = setInterval(switchImage, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity activeOpacity={1}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.sliderImage}
              resizeMode="cover"
            />
          ))}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    backgroundColor: "oldlace",
    flexDirection: "row",
  },
  slider: {
    flexDirection: "row",
    width: 380 * images.length, // Adjust the width based on the number of images
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  sliderImage: {
    width: 380,
    height: "100%",
    borderRadius: 10,
  },
});

export default StaticSlider;
