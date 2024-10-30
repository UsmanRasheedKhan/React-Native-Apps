import { useState } from 'react';
import { Dimensions, ImageBackground, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, createUserWithEmailAndPassword } from '../Firebase';
import * as Google from 'expo-auth-session/providers/google';
import { sendEmailVerification } from 'firebase/auth';

export default function Signup() {
  const navigation = useNavigation();

  //const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [request, response,promptAsync] = Google.useAuthRequest({
    clientId : "513136252558-oe5rta54qfdiacs249h8k42j1c51iekk.apps.googleusercontent.com"
  });

  const handleSignup = async () => {
    try{
    if(email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0){
      if(password === confirmPassword) {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
          
            const user = userCredentials.user;

            await sendEmailVerification(user);

            if(user.emailVerified) {
              console.log("User email: " + user.email);
              navigation.replace('HomeScreen');
           } //else {
            //   Alert.alert("Signup Error", "Email not verified")
            // }
            
          } else {
            Alert.alert("Signup Error","Passwords do not match");
          }
      } else {
        Alert.alert("Missing Fields", "Fill all required fields")
      } 
    } catch(error) {
      console.log("Error: " + error.message);
      Alert.alert("Signup Error", error.message);
    } 
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
        });
    }
  }

  return (
    <ScrollView>
      <ImageBackground style={styles.container} source={require("../assets/Signupbg.png")} >

        {/* <View style={styles.background}></View> */}
        <View style={Platform.OS === 'ios'? styles.iosFormCover : styles.formCover}>

          <Text style={Platform.OS === 'ios'? styles.formHeadingios : styles.formHeading}>Join the Journey!</Text>

          {/* <Text style={styles.inputHeadings}>Name</Text>
          <TextInput placeholder='Name' style={styles.input} onChangeText={text => setName(text)}/> */}
          <View style={styles.inputHeadings}>
            <Text>Email</Text>
            <Text>*</Text>
          </View>
          <TextInput placeholder='yourname@example.com' autoCapitalize='none' keyboardType='email-address' style={styles.input} onChangeText={text => setEmail(text)}/>
          
          <Text style={styles.inputHeadings}>Password</Text>
          <TextInput placeholder='..........' secureTextEntry={true} style={styles.input} onChangeText={text => setPassword(text)}/>
          
          <Text style={styles.inputHeadings}>Confirm Password</Text>
          <TextInput placeholder='..........' secureTextEntry={true} style={styles.input} onChangeText={text => setConfirmPassword(text)}/>
          
          {/* <View>
            {password !== confirmPassword?<Text style={styles.error}>Passwords do not match</Text>:<Text></Text>}
          </View> */}

          <TouchableOpacity onPress={handleSignup} style={Platform.OS === 'ios'? styles.iosButton : styles.button} >
            <Text style={Platform.OS === 'ios'? styles.iosButtonText : styles.buttonText}>Signup</Text>
          </TouchableOpacity>

          <Text style={styles.separatorText}>OR SIGNUP USING</Text>

          <Pressable onPress={handleGoogleSignup}>
            <Image source={require("../assets/Google-logo.jpeg")} style={styles.googleIcon} />
          </Pressable>

        </View>

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.footerText}>Already Registered? Login.</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  // background: {
  //   flex: 0.43,
  // },
  formCover: {
    flex: 0.5,
    width: width,
    backgroundColor: 'white',
    padding: 15,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 40,
    verticalAlign: 'bottom'
  },
  iosFormCover: {
    flex: 0.6,
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
    height: '10%',
    width: width * 0.9,
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Courier',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  inputHeadings: {
    flexDirection: 'row',
    height: height * 0.04,
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 2,
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'left',
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
  error: {
    color: 'red',
    textAlign: 'left',
    fontSize: '15',
    width: width * 0.9,
  },
  button: {
    width: width * 0.85,
    height: '11%',
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
      height: '12%',
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
    height: '30%',
  },
  footerText: {
    verticalAlign: 'bottom',
    width: '90%',
    margin: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#6c6c6c',
  },
});
