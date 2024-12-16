import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { fetchImages } from "../../slices/imageSlice";
import { RootState, AppDispatch } from "../../store";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import LogoImg from "../components/LogoImg";
import GradientButton from "../components/GradientButton";
import { NavigationProps } from "../../types";

const Information = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProps>();
 // Hook để sử dụng navigation
  const { images, loading, error } = useSelector(
    (state: RootState) => state.images
  );

  // Lọc URL của các ảnh
  const bgImage = images.find((image) => image.name === "bg_icon.png")?.url;
  const profileImage = images.find((image) => image.name === "avatar.png")?.url;
  const imgDish1 = images.find((image) => image.name === "dish1.png")?.url;
  const imgDish2 = images.find((image) => image.name === "dish2.png")?.url;
  const imgDish3 = images.find((image) => image.name === "dish3.png")?.url;
  const bgImgBottom = images.find((image) => image.name === "bg.png")?.url;

  useEffect(() => {
    dispatch(fetchImages("app_phatmi")); // Gọi Redux Thunk để tải ảnh
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F8A828", "#F8D838"]} // Màu gradient
        style={styles.gradientBackground}
      />
      <Image source={{ uri: bgImage }} style={styles.fullScreenImage} />
      <LogoImg welcomeText="Information" />

      {/* Outer Border Layer */}
      <View style={styles.outerCard}>
        {/* Inner Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>Alice Mie</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Birthday:</Text>
              <Text style={styles.value}>12/10/1999</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>Female</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>Design</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Dish Images */}
      <View style={styles.dishImagesContainer}>
        <Image source={{ uri: imgDish1 }} style={styles.dishImage} />
        <Image source={{ uri: imgDish2 }} style={styles.dishImage} />
        <Image source={{ uri: imgDish3 }} style={styles.dishImage} />
      </View>

      <View style={styles.bottomImageWrapper}>
        <Image source={{ uri: bgImgBottom }} style={styles.bgImgBottom} />
      </View>
      <View style={styles.textChoseDish}>
        <Text>
          <Text style={styles.textHighlight}>3</Text>
          <Text style={styles.textNormal}>
            {" "}
            cups of noodles left this month
          </Text>
        </Text>
      </View>

      <View style={styles.btnCommit}>
        <GradientButton
          text="Get your noodles"
          onPress={() => navigation.navigate("Done")} // Chuyển sang màn hình Done
        />
      </View>
    </View>
  );
};

export default Information;


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
  outerCard: {
    width: "92%",
    backgroundColor: "#ffffff", // Outer card background color
    borderRadius: 15,
    padding: 5, // Padding to create space for the inner card
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 3,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#F8D838",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#711F1F",
    borderWidth: 2,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
  },
  infoTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#880B0B",
    width: "40%",
  },
  value: {
    fontSize: 14,
    color: "#880B0B",
    width: "60%",
    textAlign: "center",
  },
  dishImagesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
    zIndex: 3,
  },
  dishImage: {
    width: 70,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
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
    top: 90, // Đảm bảo ảnh bắt đầu từ vị trí trên cùng của View
    left: "50%", // Căn ngang vào giữa màn hình
    zIndex: 1, // Nằm dưới ảnh fullScreenImage
    transform: [{ translateX: "-50%" }], // Dịch ngược lại một nửa chiều rộng của ảnh để căn giữa
  },

  textChoseDish: {
    alignItems: "center", // Canh giữa theo chiều ngang
    zIndex: 3,
  },
  textHighlight: {
    fontSize: 24, // Kích thước chữ lớn
    fontWeight: "bold", // Chữ đậm
    color: "#C50A0A", // Màu đỏ đậm
  },
  textNormal: {
    fontSize: 15, // Kích thước chữ nhỏ hơn
    fontWeight: "800", // Độ đậm nhẹ
    color: "#6F3D8A", // Màu tím nhẹ
  },
  btnCommit:{
    marginTop: 60,
    zIndex: 3,
  }
});
