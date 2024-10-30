import { useNavigation } from '@react-navigation/native';
import { auth, signInWithEmailAndPassword } from '../Firebase';
import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

    const navigation = useNavigation();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace('HomeScreen');
            }
        })  
    },[])

    const [request, response,promptAsync] = Google.useAuthRequest({
        clientId : "513136252558-oe5rta54qfdiacs249h8k42j1c51iekk.apps.googleusercontent.com"
      });

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;

                // const token = await user.getIdToken();
                // await AsyncStorage.setItem('userToken', token);

                console.log("User email: " +user.email);
            })
            .catch (error => {
                console.log("Error: " + error.message);
                Alert.alert("Signup Error", error.message);
            })
    }

    const handleGoogleSignup = async () => {
        const result = await promptAsync();
        if (result?.type === 'success') {
            const { id_token } = result.params;
            const credential = auth.GoogleAuthProvider.credential(id_token);
            auth.signInWithCredential(credential)
                .then(user => {
                console.log("User signed in with Google: ", user);
                navigation.replace('HomeScreen');
                })
                .catch(error => {
                console.log("Google Sign-In Error: ", error.message);
                Alert.alert("Google Sign-In Error", error.message);
                }
            );
        }
    }

    return (
        <ScrollView>
        <ImageBackground style={styles.container} source={require("../assets/Loginbg.png")} >

            <View style={styles.background}></View>
            <View style={Platform.OS === 'ios'? styles.iosFormCover : styles.formCover}>

                <Text style={Platform.OS === 'ios'? styles.formHeadingios : styles.formHeading}>Welcome Back!</Text>

                <Text style={styles.inputHeadings}>Email</Text>
                <TextInput placeholder='yourname@example.com' autoCapitalize='none' keyboardType='email-address' style={styles.input} onChangeText={text => setEmail(text)}/>
                
                <Text style={styles.inputHeadings}>Password</Text>
                <TextInput placeholder='..........' autoCapitalize='none' secureTextEntry={true} style={styles.input} onChangeText={text => setPassword(text)}/>

                <TouchableOpacity onPress={handleLogin} style={Platform.OS === 'ios'? styles.iosButton : styles.button} >
                    <Text style={Platform.OS === 'ios'? styles.iosButtonText : styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.separatorText}>OR LOGIN USING</Text>

                <Pressable onPress={handleGoogleSignup}>
                    <Image source={require("../assets/Google-logo.jpeg")} style={styles.googleIcon} />
                </Pressable>

            </View>
            <TouchableOpacity onPress={() => navigation.replace('Signup')}>
                <Text style={styles.footerText}>New Here? Signup.</Text>
            </TouchableOpacity>

        </ImageBackground>
        </ScrollView>
    );
}

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-end',
  },
  background: {
    flex: 0.5,
  },
  formCover: {
    height: height * 0.5,
    width: width,
    backgroundColor: '#fff',
    padding: 15,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 40,
    verticalAlign: 'bottom'
  },
  iosFormCover: {
    flex: 0.52,
    width: width,
    backgroundColor: 'white',
    padding: 15,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 40,
    verticalAlign: 'bottom'
  },
  formHeading: {
    height: '10%',
    width: width * 0.9,
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'monospace',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  formHeadingios: {
    height: '15%',
    width: width * 0.9,
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Courier',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputHeadings: {
    height: height * 0.04,
    width: width * 0.9,
    alignSelf: 'center',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'left',
    marginTop: 2,
    fontWeight: '500',
    // backgroundColor: 'silver',
  },
  input: {
    marginBottom: 5,
    borderBottomColor: 'width',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: width * 0.9,
    height: height* 0.04,
    alignSelf: 'center',
    fontSize: 17,
    // backgroundColor: 'pink',
  },
  button: {
    width: width * 0.85,
    height: '12%',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 50,
    margin: 10,
    opacity: 1,
    // backgroundColor: 'black',
  },
  iosButton: {
      width: width * 0.85,
      height: '13%',
      alignSelf: 'center',
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 50,
      margin: 10,
      opacity: 1,
      // backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 30,
    textAlignVertical: 'center',
    fontFamily: 'monospace',
    textAlign: 'center',
    color: 'black',
  },
  iosButtonText: {
    fontSize: 30,
    textAlignVertical: 'center',
    margin: 5,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Courier',
  },
  separatorText: {
    color: 'grey',
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'monospace',
    margin: 2,
  },
  googleIcon: {
    alignSelf: 'center',
    margin: 2,
    width: '11%',
    height: 40,
  },
  footerText: {
    verticalAlign: 'bottom',
    width: '90%',
    margin: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
  },
});