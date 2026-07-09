import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  text: String;
  onClick: () => void;
};
const MyButton = ({ text, onClick }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onClick}>
      <Text style={{ color: "white" }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "blue",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 10,
  },
});

export default MyButton;
