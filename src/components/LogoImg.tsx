import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ActivityIndicator, Image, Text } from "react-native";
import { fetchImages } from "../../slices/imageSlice";
import { RootState, AppDispatch } from "../../store";

interface ReusableHeaderProps {
    welcomeText: string; // Welcome text content
}

const LogoImg: React.FC<ReusableHeaderProps> = ({
    welcomeText,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { images, loading, error } = useSelector(
        (state: RootState) => state.images
    );

    // Lọc URL của ảnh có tên bg_icon.png, logo.jpg và img_video.jpg
    const logoImage = images.find((image) => image.name === "logo.jpg")?.url;

    useEffect(() => {
        dispatch(fetchImages("app_phatmi")); // Gọi Redux Thunk để tải ảnh
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: logoImage }}
                style={styles.logoImg}
                resizeMode="contain" // Đảm bảo logo hiển thị đúng tỉ lệ
            />
            {/* Chữ "WELCOME" */}
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>{welcomeText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Canh giữa theo phương dọc
        zIndex: 3,
    },
    logoImg: {
        width: "30%", // Tỉ lệ của logo so với màn hình
        height: undefined, // Để chiều cao tự động theo tỉ lệ của ảnh
        aspectRatio: 1, // Đảm bảo tỉ lệ 1:1 cho logo
        marginBottom: 15, // Khoảng cách giữa logo và chữ "WELCOME"
        marginTop: 20,
    },
    textContainer: {
        alignItems: 'center', // Canh giữa theo phương ngang
    },
    welcomeText: {
        fontFamily: "Impact", // Cần phải tải font Impact nếu bạn muốn sử dụng giống trong ảnh
        fontSize: 36, // Kích thước chữ lớn giống trong ảnh
        fontWeight: "bold", // Làm chữ đậm
        color: "#C71A1A", // Màu chữ
        textTransform: "uppercase", // Chữ in hoa
        letterSpacing: 4, // Khoảng cách giữa các chữ
        textShadowColor: "black", // Màu bóng đổ
        textShadowOffset: { width: 3, height: 3 }, // Vị trí bóng đổ
        textShadowRadius: 5, // Độ mờ bóng đổ
        textAlign: 'center', // Căn giữa nội dung chữ
    },
});

export default LogoImg;
