import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <View style={styles.dateTimeContainer}>
      <Text style={styles.dateTimeText}>{formattedDateTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DateTimeDisplay;
