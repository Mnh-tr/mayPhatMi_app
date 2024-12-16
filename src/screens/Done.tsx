import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchImages } from "../../slices/imageSlice";
import { RootState, AppDispatch } from "../../store";
import LogoImg from "../components/LogoImg";
import GradientButton from "../components/GradientButton";
import { NavigationProps } from "../../types";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const Done = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProps>();
   // Hook để sử dụng navigation
  const { images } = useSelector((state: RootState) => state.images);

  const bgImage = images.find((image) => image.name === "bg_icon.png")?.url;
  const DoneImage = images.find((image) => image.name === "imgDone.png")?.url;
  const iconTym = images.find((image) => image.name === "iconTym.png")?.url;
  const bgImgBottom = images.find((image) => image.name === "bg.png")?.url;
  const btnBackBottom = images.find((image) => image.name === "btnBackBottom.png")?.url;
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
      <LogoImg welcomeText="Done" />
      <View style={styles.doneImageContainer}>
        <Image source={{ uri: DoneImage }} style={styles.doneImage} />
      </View>

      {/* Phần nội dung với Text và Image */}
      <View style={styles.enjoyContainer}>
        <Text style={styles.enjoyText}>Enjoy your noodles</Text>
        <Image source={{ uri: iconTym }} style={styles.enjoyIcon} />
      </View>

      <View style={styles.bottomImageWrapper}>
        <Image source={{ uri: bgImgBottom }} style={styles.bgImgBottom} />
      </View>

      <View style={styles.btnCommit}>
        <GradientButton
          text="Back to home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View style={styles.getThemContainer}>
  <Text style={styles.getThemText}>Get them below</Text>
  <Image source={{ uri: btnBackBottom }} style={styles.btnBackBottom} />
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
  doneImageContainer: {
    alignItems: "center",
    marginTop: 20,
    zIndex: 3,
  },
  doneImage: {
    resizeMode: "contain",
    width: 400,
    height: 300,
  },

  // Phần mới thêm
  enjoyContainer: {
    flexDirection: "row", // Hiển thị ngang
    alignItems: "center", // Canh giữa theo chiều dọc
    justifyContent: "center", // Canh giữa theo chiều ngang
    zIndex: 3,
  },
  enjoyText: {
    fontSize: 30,
    color: "#C71A1A",
    marginRight: 10, // Thêm khoảng cách giữa text và icon
    fontWeight: "bold",
  },
  enjoyIcon: {
    width: 24,
    height: 24, // Đặt kích thước icon phù hợp
    resizeMode: "contain",
  },
  bottomImageWrapper: {
    position: "absolute", // Cố định vị trí ở cuối màn hình
    bottom: 0, // Gắn với đáy màn hình
    left: 0,
    right: 0,
    width: "100%", // Chiều ngang phủ toàn bộ màn hình
    height: "40%", // Chiều cao View chứa ảnh
    justifyContent: "center", // Căn giữa nội dung trong View
    alignItems: "center", // Căn giữa nội dung theo chiều ngang

    overflow: "hidden", // Ẩn các phần ảnh vượt ra ngoài View
  },
  bgImgBottom: {
    position: "absolute", // Đặt ảnh cố định
    width: "100%", // Chiều ngang ảnh bằng chiều rộng màn hình
    height: "100%", // Chiều cao ảnh bằng chiều cao View chứa ảnh
    resizeMode: "cover", // Đảm bảo ảnh phủ kín View mà không bị cắt
    top: 70, // Đảm bảo ảnh bắt đầu từ vị trí trên cùng của View
    left: "50%", // Căn ngang vào giữa màn hình
    zIndex: 1, // Nằm dưới ảnh fullScreenImage
    transform: [{ translateX: "-50%" }], // Dịch ngược lại một nửa chiều rộng của ảnh để căn giữa
  },
  btnCommit: {
    marginTop: 70,
    zIndex: 3,
  },
  getThemContainer: {
    alignItems: "center", // Canh giữa nội dung trong View
    justifyContent: "center", // Căn giữa theo chiều dọc
    marginVertical: 20, // Thêm khoảng cách trên/dưới nếu cần
  },
  getThemText: {
    fontSize: 22, // Kích thước chữ
    color: "#F8C135", // Màu chữ
    fontWeight: "bold", // Tô đậm chữ
    textAlign: "center", // Căn giữa text
    marginTop: 20,
    marginBottom: 10, // Khoảng cách giữa text và ảnh
  },
  btnBackBottom: {
    width: 33, // Kích thước ảnh (có thể tùy chỉnh)
    height: 33,
    resizeMode: "contain", // Đảm bảo ảnh giữ tỷ lệ
  },
});

export default Done;
