import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import colors from "../../constants/style";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { postRegister } from "../../api";

const RegisterScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    const resp = await postRegister(value);
    if (resp?.data?.msg == undefined) {
      Alert.alert("Message", resp);
    } else {
      Alert.alert("Message", resp?.data?.msg);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (
      value?.name?.length > 0 &&
      value?.password?.length >= 8 &&
      value?.email?.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      isChecked
    ) {
      setBtnDisabled(false);
    } else setBtnDisabled(true);
  }, [value, isChecked]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.blue }}>
      <StatusBar style="black" />
      {/* Upper conatiner*/}
      <View
        style={{ height: hp(5) }}
        className="p-7 flex items-center justify-center"
      >
        <Image
          source={require("../../assests/logo-no-background.png")}
          style={{ width: wp(30), height: wp(15), objectFit: "contain" }}
        ></Image>
      </View>

      {/* Down conatiner */}
      <KeyboardAvoidingView
        style={{ height: hp(100) }}
        className="bg-white rounded-t-xl flex-1 flex-col justify-between "
      >
        <View>
          {/* Lower upper */}
          <View className="px-4 mt-10 space-y-2">
            <Text className="text-black font-bold text-lg">
              Register for the best experience
            </Text>
            <Text className="text-gray-400 mb-6">
              Enter your Details to continue
            </Text>

            {/* Name TextInput Conatiner */}
            <View className="relative pb-4">
              <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                <Text style={{ color: colors.blue }}>Name</Text>
              </View>
              <TextInput
                style={{
                  borderColor: colors.blue,
                  borderWidth: 2,
                  borderRadius: 5,
                }}
                onChangeText={(text) => setValue({ ...value, name: text })}
                value={value.name}
                className="flex py-2 px-3"
              ></TextInput>
            </View>

            {/* Email TextInput Conatiner */}
            <View className="relative pb-4">
              <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                <Text style={{ color: colors.blue }}>Email ID</Text>
              </View>
              <TextInput
                style={{
                  borderColor: colors.blue,
                  borderWidth: 2,
                  borderRadius: 5,
                }}
                onChangeText={(text) => setValue({ ...value, email: text })}
                value={value.email}
                className="flex py-2 px-3"
              ></TextInput>
            </View>

            {/* Password TextInput Conatiner */}
            <View className="relative ">
              {/* FieldSet */}
              <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                <Text style={{ color: colors.blue }}>Password</Text>
              </View>

              {/* Password  container */}
              <View
                style={{
                  borderColor: colors.blue,
                  borderWidth: 2,
                  borderRadius: 5,
                }}
                className="flex flex-row justify-between items-center py-2 px-3"
              >
                <TextInput
                  className="flex-1 mr-2"
                  onChangeText={(text) =>
                    setValue({ ...value, password: text })
                  }
                  value={value.password}
                  secureTextEntry={!passwordVisible}
                ></TextInput>

                {/* Icons */}
                {passwordVisible ? (
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Feather name="eye" size={18} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Feather name="eye-off" size={18} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* SingUp */}

            <View className="flex items-end justify-center pb-4">
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{ color: colors.blue }}
                  className="font-bold text-md"
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>

            {/* CheckBox container */}
            <View className="flex flex-row space-x-2 items-center justify-center">
              <Checkbox
                color={colors.blue}
                className="rounded-sm"
                value={isChecked}
                onValueChange={() => setChecked(!isChecked)}
              />

              {/* CHeckBox content */}
              <Text className="text-gray-400 ">
                By continue, you agree to Flipkart's{" "}
                <Text style={{ color: colors.blue }}>Terms of Use</Text> and{" "}
                <Text style={{ color: colors.blue }}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Submit Btn conatiner */}
        <View className="border border-neutral-300 p-2">
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={(btnDisabled || isLoading)}
            className="flex items-center justify-center p-2"
            style={{ backgroundColor: btnDisabled ? "#9CA3AF" : colors.blue }}
          >
            <Text className="text-lg text-white">{isLoading ? "Loading..." : "Continue"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;