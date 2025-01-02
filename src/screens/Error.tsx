import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, Text,TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchImages } from "../../slices/imageSlice";
import { RootState, AppDispatch } from "../../store";
import LogoImg from "../components/LogoImg";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProps } from "../../types";
import GradientButton from "../components/GradientButton";

const Error = () => {
  const navigation = useNavigation<NavigationProps>(); // Định nghĩa kiểu cho navigation
  const dispatch = useDispatch<AppDispatch>();
  const { images } = useSelector((state: RootState) => state.images);

  const bgImage = images.find((image) => image.name === "bg_icon.png")?.url;
  const iconError = images.find((image) => image.name === "iconError.png")?.url;
  const bgImgBottom = images.find((image) => image.name === "bg.png")?.url;
  const scanImage = images.find((image) => image.name === "Scan.jpg")?.url;

  const frameImg = images.find((image) => image.name === "Frame.png")?.url;
  const frame16Img = images.find((image) => image.name === "Frame16.png")?.url;
  useEffect(() => {
    dispatch(fetchImages("app_phatmi"));
  }, [dispatch]);
  const handleFrame16Press = () => {
      navigation.navigate("Home"); // Điều hướng tới màn hình OutOfNoodles
  
    
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F8A828", "#F8D838"]}
        style={styles.gradientBackground}
      />
      <Image source={{ uri: bgImage }} style={styles.fullScreenImage} />
      <LogoImg welcomeText="Error" />

      <View style={styles.bottomImageWrapper}>
        <Image source={{ uri: bgImgBottom }} style={styles.bgImgBottom} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.errorText}>Can not recongnize your ID card.</Text>

        <View style={styles.scanAgainContainer}>
          <Text style={styles.scanAgainText}>Please scan again.</Text>
        </View>

        <Image source={{ uri: iconError }} style={styles.iconError} />
      </View>
      <View style={styles.scan}>
        <Image
          source={{ uri: scanImage }}
          style={styles.scanImage}
          resizeMode="contain" // Đảm bảo traller hiển thị đúng tỉ lệ
        />
        <Text style={styles.textScan}>Follow the arrow to scan card</Text>
      </View>
      <View style={styles.bottomFrame}>
                <TouchableOpacity onPress={handleFrame16Press}>
                          <Image source={{ uri: frame16Img }} style={styles.frame16Img} resizeMode="contain" />
                        </TouchableOpacity>
      
                <Image
                  source={{ uri: frameImg }}
                  style={styles.frameImg}
                  resizeMode="contain" // Đảm bảo traller hiển thị đúng tỉ lệ
                />
              </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
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
    right: 0,
    width: "130%",
    height: "170%",
    resizeMode: "cover",
    zIndex: 2,
    opacity: 0.5,
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
    top: 70,
    left: "50%",
    zIndex: 1,
    transform: [{ translateX: "-50%" }],
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
    zIndex: 3,
  },
  errorText: {
    fontSize: 20,
    color: "#980000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scanAgainContainer: {
    borderWidth: 2,
    borderColor: "#D86643",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#D86643",
    marginBottom: 20,
  },
  scanAgainText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  iconError: {
    width: 170,
    height: 170,
    resizeMode: "contain",
  },
  scanImage: {
    width: 50, // Điều chỉnh kích thước ảnh theo chiều ngang
    height: 50, // Đảm bảo ảnh có chiều cao cố định
    marginRight: 10, // Khoảng cách giữa ảnh và text
  },
  scan: {
    marginTop: 30,
    flexDirection: "row", // Hiển thị scan và textScan ngang nhau
    justifyContent: "center", // Căn giữa nội dung theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    zIndex: 3,
  },
  textScan: {
    fontSize: 20, // Kích thước chữ
    color: "#AE0808", // Màu chữ
    textAlign: "center", // Căn giữa chữ
    fontWeight: "bold", // Làm chữ đậm
  },
  bottomFrame: {
    position: "absolute",
    bottom: 50, // Điều chỉnh vị trí của các ảnh cuối
    width: "100%", // Chiều rộng của vùng chứa ảnh, có thể thay đổi tùy theo nhu cầu
    flexDirection: "row", // Các ảnh nằm ngang
    justifyContent: "space-between", // Đảm bảo có khoảng cách giữa các ảnh
    alignItems: "center", // Căn giữa theo chiều dọc
    zIndex: 3, // Đảm bảo các ảnh nằm trên ảnh nền bgImgBottom
  },

  frame16Img: {
    width: 140, // Giảm kích thước ảnh
    height: 120,
    marginRight: "auto", // Căn trái tự động, giữ cho nó ở giữa
    marginLeft: 140, // Căn phải tự động, giữ cho nó ở giữa
    
  },

  frameImg: {
    width: 50, // Giảm kích thước ảnh
    height: 50,
    marginLeft: 10, // Khoảng cách giữa ảnh frame16 và frameImg
    marginRight: "auto", // Căn trái tự động để giữ khoảng cách đều với cạnh phải màn hình
  },
});

export default Error;
