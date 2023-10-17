import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../constants/style';
import Feather from "react-native-vector-icons/Feather"
import {useNavigation} from '@react-navigation/native';
import {postLogin} from '../api/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {s} from 'react-native-wind';

export default function LoginScreen() {
  const [isChecked, setChecked] = useState(false);
  const [value, setValue] = useState({email: '', password: ''});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    const resp = await postLogin(value);
    if (resp?.data?.msg == undefined) {
      Alert.alert('Message', resp);
    } else {
      Alert.alert("Message", resp?.data?.msg);
      await AsyncStorage.setItem('authToken', resp?.data?.token);
      navigation.replace('AllScreen');
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const resp = await AsyncStorage.getItem('authToken');
      if (resp) navigation.replace('AllScreen');
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (
      value.password.length >= 8 &&
      value.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) &&
      isChecked
    ) {
      setBtnDisabled(false);
    } else setBtnDisabled(true);
  }, [value, isChecked]);

  return (
    <SafeAreaView style={[s` flex-1  `, {backgroundColor: colors.blue}]}>
      <StatusBar style="black" />
      {/* Upper conatiner*/}
      <View style={[{height: hp(5)}, s` p-7 flex items-center justify-center`]}>
      <Image
          source={require("../assests/logo-no-background.png")}
          style={{ width: wp(35), height: wp(15), objectFit: "contain" }}
        ></Image>
      </View>

      {/* Down conatiner */}
      <KeyboardAvoidingView
        style={[
          {height: hp(100)},
          s` bg-white rounded-t-xl flex-1 flex-col justify-between  `,
        ]}>
        <View>
          {/* Lower upper */}
          <View style={s`px-4 mt-10 space-y-2`} className="">
            <Text style={s`text-black font-bold text-lg`}>
              Log in for the best experience
            </Text>
            <Text style={s`text-gray-400 mb-6`}>
              Enter your Email ID to continue
            </Text>

            {/* Email TextInput Conatiner */}
            <View style={s`relative pb-4`}>
              <View style={s`absolute bg-white left-3 -top-2 z-10 px-1`}>
                <Text style={{color: colors.blue}}>Email ID</Text>
              </View>
              <TextInput
                style={[
                  {
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  },
                  s` flex py-2 px-3`,
                ]}
                onChangeText={text => setValue({...value, email: text})}
                value={value.email}></TextInput>
            </View>

            {/* Password TextInput Conatiner */}
            <View style={s`relative`}>
              {/* FieldSet */}
              <View style={s`absolute bg-white left-3 -top-2 z-10 px-1`}>
                <Text style={{color: colors.blue}}>Password</Text>
              </View>

              {/* Password  container */}
              <View
                style={[
                  {
                    borderColor: colors.blue,
                    borderWidth: 2,
                    borderRadius: 5,
                  },
                  s`flex flex-row justify-between items-center pr-1`,
                ]}>
                <TextInput
                  style={s`flex-1 mr-2  py-2 px-3`}
                  onChangeText={text => setValue({...value, password: text})}
                  value={value.password}
                  secureTextEntry={!passwordVisible}></TextInput>

                {/* Icons */}
                {passwordVisible ? (
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather name="eye" size={22} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather name="eye-off" size={22} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* SingUp */}

            <View style={s`flex items-end justify-center pb-4`}>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[{color: colors.blue}, s` font-bold text-md`]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>

            {/* CheckBox container */}
            <View
              style={s`flex flex-row space-x-2 items-center justify-center`}>
              <CheckBox
                tintColors={{true: colors.blue}}
                onCheckColor={colors.blue}
                style={[s`rounded-sm`]}
                value={isChecked}
                onValueChange={() => setChecked(!isChecked)}
              />

              {/* CHeckBox content */}
              <Text style={s`text-gray-400`}>
                By continue, you agree to Flipkart's{' '}
                <Text style={{color: colors.blue}}>Terms of Use</Text> and{' '}
                <Text style={{color: colors.blue}}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Submit Btn conatiner */}
        <View style={s`border-1 border-neutral-300 p-2`}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={btnDisabled || isLoading}
            style={[
              s`flex items-center justify-center p-2 `,
              {backgroundColor: btnDisabled ? '#9CA3AF' : colors.blue},
            ]}>
            <Text style={s`text-lg text-white`}>
              {isLoading ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
