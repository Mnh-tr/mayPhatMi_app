import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera"; // Camera và CameraView

export default function CameraScreen({ navigation }: { navigation: any }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // Yêu cầu quyền truy cập camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Hàm xử lý khi quét mã QR thành công
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    // Hiển thị đường dẫn qua Alert
    Alert.alert("QR Code Scanned", `Data: ${data}`, [
      {
        text: "OK",
        onPress: () => {
          // Tách dữ liệu từ URL và chuyển sang màn hình Information
          const match = data.match(/https:\/\/qr\.me-qr\.com\/([a-zA-Z0-9]+)/);
          if (match && match[1]) {
            const extractedData = match[1]; // Giá trị "E6jWdPe8"
            navigation.navigate("Information", { userId: extractedData });
          } else {
            // Alert.alert("Invalid QR Code", "The scanned QR code is not valid.");
            navigation.navigate("Error");
            setScanned(false);
          }
        },
      },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Sử dụng CameraView */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Định nghĩa style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#F8A828",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
