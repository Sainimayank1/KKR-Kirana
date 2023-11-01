import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import colors from "../../constants/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

const AddDeliveryAddressScreen = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar style="black" />

      {/* Upper conatiner */}
      <KeyboardAvoidingView
        style={{ height: hp(100) }}
        className="bg-white rounded-t-xl h-full flex-1 flex-col justify-between  "
      >
        <ScrollView>
          <View>
            {/* Lower upper */}
            <View className="px-4 mt-10 space-y-2">
              {/* Name TextInput Conatiner */}
              <View className="relative pb-4">
                <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                  <Text style={{ color: colors.blue }}>
                    Full Name (Required)
                  </Text>
                </View>
                <TextInput
                  style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                  // onChangeText={(text) => setValue({ ...value, email: text })}
                  // value={value.email}
                  className="flex py-2 px-3"
                ></TextInput>
              </View>

              {/* Phone TextInput Conatiner */}
              <View className="relative pb-4">
                <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                  <Text style={{ color: colors.blue }}>
                    Phone number (Required)
                  </Text>
                </View>
                <TextInput
                  style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                  // onChangeText={(text) => setValue({ ...value, email: text })}
                  // value={value.email}
                  className="flex py-2 px-3"
                ></TextInput>
              </View>

              {/* Pincode TextInput Container */}
              <View className="relative pb-4">
                <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                  <Text style={{ color: colors.blue }}>Pincode (Required)</Text>
                </View>
                <TextInput
                  style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                  // onChangeText={(text) => setValue({ ...value, email: text })}
                  // value={value.email}
                  className="flex py-2 px-3"
                ></TextInput>
              </View>

              {/* State & City */}
              <View className="flex-row items-center justify-around">
                <View className="relative pb-4" style={{width:wp(45)}}>
                  <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                    <Text style={{ color: colors.blue }}>
                      City (Required)
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      borderColor: colors.blue,
                      borderWidth: 2,
                      borderRadius: 5,
                    }}
                    // onChangeText={(text) => setValue({ ...value, email: text })}
                    // value={value.email}
                    className="flex py-2 px-3"
                  ></TextInput>
                </View>
                <View className="relative pb-4" style={{width:wp(45)}}>
                  <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                    <Text style={{ color: colors.blue }}>
                      State (Required)
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      borderColor: colors.blue,
                      borderWidth: 2,
                      borderRadius: 5,
                    }}
                    // onChangeText={(text) => setValue({ ...value, email: text })}
                    // value={value.email}
                    className="flex py-2 px-3"
                  ></TextInput>
                </View>
              </View>

              {/* House No */}
              <View className="relative pb-4">
                <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                  <Text style={{ color: colors.blue }}>House No.m Building Name (Required)</Text>
                </View>
                <TextInput
                  style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                  // onChangeText={(text) => setValue({ ...value, email: text })}
                  // value={value.email}
                  className="flex py-2 px-3"
                ></TextInput>
              </View>

              {/* Road Name */}
              <View className="relative pb-4">
                <View className="absolute bg-white left-3 -top-2 z-10 px-1">
                  <Text style={{ color: colors.blue }}>Road name, Area Colony (Required)</Text>
                </View>
                <TextInput
                  style={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                  // onChangeText={(text) => setValue({ ...value, email: text })}
                  // value={value.email}
                  className="flex py-2 px-3"
                ></TextInput>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Submit Btn conatiner */}
      <View className="border border-neutral-300 p-2 bottom-0 absolute w-full">
        <TouchableOpacity
          // onPress={handleSubmit}
          // disabled={(btnDisabled || isLoading)}
          className="flex items-center justify-center p-2"
          style={{ backgroundColor: colors.orange }}
        >
          {/* <Text className="text-lg text-white">{isLoading ? 
            "Loading..." : "Continue"}</Text> */}
          <Text className="text-lg text-white">Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDeliveryAddressScreen;
