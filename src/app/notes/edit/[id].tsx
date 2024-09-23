import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const NoteDetails = () => {
  // Leer el parámetro dinámico de la ruta
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detalles de la nota con ID: {id}</Text>
    </View>
  );
};

export default NoteDetails;
