import { Image, StyleSheet } from "react-native";

export const BottomImage = ({ isBloodVisible }: any) => {
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

const style = StyleSheet.create({
  BottomImage: {
    position: "absolute",
    bottom: 0,
    left: "auto",
    objectFit: "fill",
  },
  BottomBloodImage: {
    position: "absolute",
    bottom: 80,
    left: "auto",
    zIndex: -1,
  },
});
