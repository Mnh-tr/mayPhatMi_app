import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {/* Lớp màu trắng */}
      <View style={styles.whiteBackground} />
      {/* Lớp màu vàng */}
      <LinearGradient
        colors={['#FFA726', '#FB8C00']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Text */}
        <Text style={[styles.text, textStyle]}>{text.toUpperCase()}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'relative', // Để các thành phần con chồng lên nhau
      width: 260, // Giảm chiều rộng nút
      height: 50, // Giảm chiều cao nút
    },
    whiteBackground: {
      position: 'absolute', // Đặt lớp trắng làm nền
      top: 3, // Giảm khoảng cách lộ ra
      left: 3, // Giảm khoảng cách lộ ra
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      borderRadius: 30, // Tăng độ bo tròn cho mềm mại
      zIndex: 1, // Đặt lớp này ở phía dưới
    },
    gradient: {
      position: 'absolute', // Đặt lớp vàng đè lên lớp trắng
      top: 0,
      left: 0,
      right: 3, // Giảm khoảng cách lộ ra
      bottom: 3, // Giảm khoảng cách lộ ra
      borderRadius: 25, // Tăng độ bo tròn cho khớp
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2, // Đặt lớp vàng trên lớp trắng
    },
    text: {
      color: '#A31616',
      fontSize: 16, // Tăng nhẹ kích thước chữ
      fontWeight: 'bold',
      letterSpacing: 1,
      zIndex: 3, // Đặt text trên cùng
    },
  });
  

export default GradientButton;
