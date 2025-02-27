// File: Information.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchImages, decrementNoodleCountBy } from "../../slices/imageSlice";
import { fetchUser } from "../../slices/userSlice";
import { RootState, AppDispatch } from "../../store";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import LogoImg from "../components/LogoImg";
import GradientButton from "../components/GradientButton";
import { NavigationProps } from "../../types";
import { RouteParams } from "../../types";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const Information = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const { userId } = route.params || {};
  const { images } = useSelector((state: RootState) => state.images);
  const { user } = useSelector((state: RootState) => state.user);

  const noodleCount = user?.noodleCount ?? 0;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProps>();
 // Kiểm tra noodleCount và chuyển hướng nếu bằng 0
useEffect(() => {
  if (noodleCount === 0) {
    navigation.navigate("OutOfNoodles");
  }
}, [noodleCount, navigation]);

  
  // State để theo dõi trạng thái tải dữ liệu
  const [isLoading, setIsLoading] = useState(true);

  // Lấy dữ liệu user từ Firestore nếu có userId
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
    dispatch(fetchImages("app_phatmi")).then(() => setIsLoading(false));
  }, [dispatch, userId]);

  
  const bgImage = images.find((image) => image.name === "bg_icon.png")?.url;
  const profileImage = images.find((image) => image.name === "avatar.png")?.url;
  const imgDish1 = images.find((image) => image.name === "dish1.png")?.url;
  const imgDish2 = images.find((image) => image.name === "dish2.png")?.url;
  const imgDish3 = images.find((image) => image.name === "dish3.png")?.url;
  const bgImgBottom = images.find((image) => image.name === "bg.png")?.url;
  const choseDish = images.find((image) => image.name === "choseDish.png")?.url;
  const hetDish = images.find((image) => image.name === "hetDish.png")?.url;

  const [selectedDishes, setSelectedDishes] = React.useState<boolean[]>([false, false, false]);

  const handleDishPress = (index: number) => {
    setSelectedDishes((prevState) => {
      const updatedState = [...prevState];
      if (index === 0 && (updatedState[1] || updatedState[2])) return prevState;
      if (index === 1 && updatedState[2]) return prevState;
      if (index === 0 || updatedState[index - 1]) {
        if (index === 2 && !updatedState[1]) return prevState;
        updatedState[index] = !updatedState[index];
      }
      return updatedState;
    });
  };

  const updateNoodleCount = async (newCount: number) => {
    if (!userId) return;
    try {
      const db = getFirestore();
      const userRef = doc(db, "User", userId);
      await updateDoc(userRef, { noodleCount: newCount });
    } catch (error) {
      Alert.alert("Error", "Failed to update noodle count.");
    }
  };

  const handleGetYourNoodles = () => {
    if (!user || user.noodleCount === undefined) {
      return;
    }
    const selectedCount = selectedDishes.filter((isSelected) => isSelected).length;
    if (selectedCount > 0 && user.noodleCount >= selectedCount) {
      const newCount = user.noodleCount - selectedCount;
      updateNoodleCount(newCount).then(() => {
        navigation.navigate("Done");
      });
    } else {
      navigation.navigate("Done");
    }
  };

  if (isLoading) {
    // Hiển thị loading spinner nếu dữ liệu đang được tải
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F8A828" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F8A828", "#F8D838"]} style={styles.gradientBackground} />
      <Image source={{ uri: bgImage }} style={styles.fullScreenImage} />
      <LogoImg welcomeText="Information" />

      {/* Nội dung chính */}
      <View style={styles.outerCard}>
        <View style={styles.infoCard}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: user?.avatar || profileImage }} style={styles.profileImage} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>{user?.name || "N/A"}</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Birthday:</Text>
              <Text style={styles.value}>{user?.birthday || "N/A"}</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{user?.gender || "N/A"}</Text>
            </View>
            <View style={styles.infoTextRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>{user?.department || "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.dishImagesContainer}>
        {[imgDish1, imgDish2, imgDish3].map((img, index) => (
          <TouchableOpacity key={index} onPress={() => handleDishPress(index)} style={styles.dishWrapper} disabled={noodleCount <= index}>
            <Image source={{ uri: noodleCount > index ? img : hetDish }} style={styles.dishImage} />
            {selectedDishes[index] && noodleCount > index && <Image source={{ uri: choseDish }} style={styles.choseDishImage} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomImageWrapper}>
        <Image source={{ uri: bgImgBottom }} style={styles.bgImgBottom} />
      </View>
      <View style={styles.textChoseDish}>
        <Text>
          <Text style={styles.textHighlight}>{noodleCount}</Text>
          <Text style={styles.textNormal}> cups of noodles left this month</Text>
        </Text>
      </View>

      <View style={styles.btnCommit}>
        <GradientButton text="Get your noodles" onPress={handleGetYourNoodles} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#F8A828",
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
    width: "44%",
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
    marginTop: 20,
    width: "100%",
    zIndex: 3,
  },
  dishImage: {
    width: 70,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    zIndex: 2,
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
  btnCommit: {
    marginTop: 60,
    zIndex: 3,
  },

  dishWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  choseDishImage: {
    position: "absolute",
    bottom: 15,
    width: 120,
    height: 120,
    resizeMode: "contain",
    zIndex: 1,
  },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, color: "red" },
});
