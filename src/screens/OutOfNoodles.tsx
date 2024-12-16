import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchImages } from "../../slices/imageSlice";
import { RootState, AppDispatch } from "../../store";
import LogoImg from "../components/LogoImg";

const OutOfNoodles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images } = useSelector((state: RootState) => state.images);

  const bgImage = images.find((image) => image.name === "bg_icon.png")?.url;
  const DishTrong = images.find((image) => image.name === "DishTrong.png")?.url;
  const bgImgBottom = images.find((image) => image.name === "bg.png")?.url;

  useEffect(() => {
    dispatch(fetchImages("app_phatmi"));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F8A828", "#F8D838"]}
        style={styles.gradientBackground}
      />
      <Image source={{ uri: bgImage }} style={styles.fullScreenImage} />
      <LogoImg welcomeText="out of noodles" />

      <View style={styles.textWrapper}>
  <Text style={styles.unavailableText}>
    There is <Text style={styles.highlightText}>0</Text> cup of noodles left in the machine. 
    Please fill in to continue.
  </Text>
</View>
<Image source={{ uri: DishTrong }} style={styles.centeredImage} />

      <View style={styles.bottomImageWrapper}>
        <Image source={{ uri: bgImgBottom }} style={styles.bgImgBottom} />
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
  textWrapper: {
    marginVertical: 20, // Khoảng cách trên và dưới
    alignItems: "center", // Căn giữa phần Text theo chiều ngang
    paddingHorizontal: 20, // Khoảng cách nội dung với viền
    zIndex: 3,
  },
  
  unavailableText: {
    color: "#7A7A7A", // Màu xám cho chữ
    fontWeight: "bold", // Chữ in đậm
    fontSize: 21, // Kích thước chữ
    textAlign: "center", // Căn giữa toàn bộ dòng chữ
  },
  
  highlightText: {
    color: "#FFFFFF", // Màu trắng cho số 0
  },
  
  centeredImage: {
    width: 250, // Chiều rộng ảnh
    height: 250, // Chiều cao ảnh
    resizeMode: "contain", // Đảm bảo ảnh hiển thị vừa vặn
    alignSelf: "center", // Đặt ảnh ở chính giữa màn hình
    marginTop: -20,
  },
  
});
export default OutOfNoodles;
