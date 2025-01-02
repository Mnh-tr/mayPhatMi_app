import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { RootState, AppDispatch } from "../../store";
import LogoImg from "../components/LogoImg";
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from "../../types";
import { fetchImages, fetchNoodleCount } from "../../slices/imageSlice"; // Import fetchNoodleCount


export default function Home() {
  const navigation = useNavigation<NavigationProps>(); // Định nghĩa kiểu cho navigation
  const dispatch = useDispatch<AppDispatch>();

  // Lấy dữ liệu từ Redux store
  const { images, noodleCount } = useSelector((state: RootState) => state.images);

  // Lọc URL của ảnh có tên bg_icon.png, logo.jpg và img_video.jpg
  const bgImage = images.find((image) => image.name === "bg_icon.png")?.url;
  const trallerImage = images.find((image) => image.name === "img_video.jpg")?.url;
  const scanImage = images.find((image) => image.name === "Scan.jpg")?.url;
  const bgImgBottom = images.find((image) => image.name === "bg.png")?.url;
  const frameImg = images.find((image) => image.name === "Frame.png")?.url;
  const frame16Img = images.find((image) => image.name === "Frame16.png")?.url;

  useEffect(() => {
    // Gọi Redux Thunk để tải ảnh và noodleCount
    dispatch(fetchImages("app_phatmi"));
    dispatch(fetchNoodleCount());
  }, [dispatch]);

  // Hàm xử lý nhấn vào frame16Img
  const handleFrame16Press = () => {
    if (noodleCount === 0) {
      navigation.navigate("CameraView"); // Điều hướng tới màn hình OutOfNoodles
    } else {
      navigation.navigate("CameraView"); // Điều hướng tới màn hình Information
    }
  };

  // Hàm xử lý nhấn vào frameImg
  const handleFramePress = () => {
    navigation.navigate("Error"); // Điều hướng tới màn hình Error
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["#F8A828", "#F8D838"]}
        style={styles.gradientBackground}
      />
      {/* Fullscreen Background Image */}
      <Image source={{ uri: bgImage }} style={styles.fullScreenImage} />
      <LogoImg welcomeText="WELCOME" />
      {/* Traller Image */}
      <Image
        source={{ uri: trallerImage }}
        style={styles.trallerImage}
        resizeMode="contain"
      />
      <View style={styles.scan}>
        <Image
          source={{ uri: scanImage }}
          style={styles.scanImage}
          resizeMode="contain"
        />
        <Text style={styles.textScan}>Follow the arrow to scan card</Text>
      </View>
      {/* View chứa bgImgBottom và hai ảnh */}
      <View style={styles.bottomImageWrapper}>
        <Image source={{ uri: bgImgBottom }} style={styles.bgImgBottom} />
      </View>
      <View style={styles.bottomFrame}>
        <TouchableOpacity onPress={handleFrame16Press}>
          <Image source={{ uri: frame16Img }} style={styles.frame16Img} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFramePress}>
          <Image
            source={{ uri: frameImg }}
            style={styles.frameImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  fullScreenImage: {
    position: "absolute",
    top: -180,
    left: 0,
    right: 150,
    bottom: 0,
    width: "130%",
    height: "170%",
    resizeMode: "cover",
    zIndex: 2,
    opacity: 0.5,
  },
  trallerImage: {
    marginTop: -60,
    width: "90%",
    height: undefined,
    aspectRatio: 1,
    zIndex: 3,
  },
  scanImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  scan: {
    marginTop: -30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  textScan: {
    fontSize: 20,
    color: "#AE0808",
    textAlign: "center",
    fontWeight: "bold",
  },
  bottomImageWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  bgImgBottom: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    top: 90,
    left: "50%",
    zIndex: 1,
    transform: [{ translateX: "-50%" }],
  },
  bottomFrame: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 3,
  },
  frame16Img: {
    width: 140,
    height: 120,
    marginRight: "auto",
    marginLeft: 140,
  },
  frameImg: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
  },
});
