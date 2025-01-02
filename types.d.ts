import { StackNavigationProp } from "@react-navigation/stack";

// Định nghĩa các màn hình và tham số của từng màn hình
type RootStackParamList = {
  Home: undefined;
  Information: undefined; // Không có tham số
  Done: undefined; // Không có tham số
  OutOfNoodles: undefined;
  Error: undefined;
  CameraView: undefined;
};
export type RouteParams = {
  userId: string; // Kiểu dữ liệu của userId, thay đổi nếu cần
};
// Định nghĩa kiểu navigation prop
export type NavigationProps = StackNavigationProp<RootStackParamList>;
