import { Button, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function BigButton({ text, onClick }: any) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#B64245",
        width: 280,
        height: 126,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 12,
      }}
      onPress={onClick}
    >
      <Text
        style={{
          flex: 1,
          color: "white",
          fontSize: 24,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: "white",
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="arrowright" size={20} />
      </View>
    </TouchableOpacity>
  );
}
