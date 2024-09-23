import { Image, StyleSheet } from "react-native";

export const BottomImage = ({ isBloodVisible, opacity }: any) => {
  const style = StyleSheet.create({
    BottomImage: {
      position: "absolute",
      bottom: 0,
      left: "auto",
      objectFit: "fill",
      opacity: opacity ? 0.5 : 1,
    },
    BottomBloodImage: {
      position: "absolute",
      bottom: 80,
      left: "auto",
      zIndex: -1,
    },
  });
  return (
    <>
      <Image
        source={require("@/assets/images/vector.png")}
        style={style.BottomImage}
      />
      {isBloodVisible && (
        <Image
          source={require("@/assets/images/blood.png")}
          style={style.BottomBloodImage}
        />
      )}
    </>
  );
};
