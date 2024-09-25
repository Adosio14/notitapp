import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Page() {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex flex-1 bg-[#E5D9F2]"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <Content />
    </View>
  );
}

function Content() {
  const [loading, setLoading] = useState(false);
  const [userName, setName] = useState("");
  const access = async () => {
    setLoading(true);
    const response = await axios.post("http://147.182.237.140:3000/user", {
      name: userName,
    });
    if (response.status == 201 || response.status == 200) {
      console.log(response.data.id);
      await AsyncStorage.setItem("userId", response.data.id.toString());
      router.push("/home");
    }
  };

  return (
    <View className="flex-1 px-6 justify-center">
      <Text className="font-extrabold mb-2 text-indigo-bold text-3xl">
        Bienvenido a Notitapp
      </Text>
      <Text className="font-bold mb-6 text-indigo-bold text-xl">
        Identificate para comenzar a tomar nota✍🏼
      </Text>
      <Text className="font-semibold mb-1 text-indigo-bold text-lg">
        Ingresá tu nombre de usuario
      </Text>
      <TextInput
        className="bg-light-lavender p-4 w-full text-black rounded-lg"
        onChangeText={(text) => {
          setName(text);
        }}
        value={userName}
        placeholder="Alvaro7682"
        keyboardType="default"
        placeholderTextColor="#A9A9A9"
      />
      <Pressable
        className="bg-lavender p-4 items-center rounded-lg mt-8"
        onPress={async () => {
          await access();
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text className="font-bold text-[#FFFFFF] text-lg ">Acceder</Text>
        )}
      </Pressable>
    </View>
  );
}
