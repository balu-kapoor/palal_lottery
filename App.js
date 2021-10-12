import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const [isLoadong, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://palamlottery.com" }}
        onLoadStart={(syntheticEvent) => {
          setLoading(true);
        }}
        onLoadEnd={(syntheticEvent) => {
          setLoading(false);
        }}
      />
      {isLoadong && (
        <ActivityIndicator
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            opacity: 0.5,
          }}
          color="#dd1717"
          size="large"
        />
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
