import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Button, Dimensions, View, StyleSheet, Text, Platform, ScrollView, TextInput } from "react-native";
import Header from "../componenets/header";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase";
import { TouchableOpacity } from "react-native";

const ProfileScreen = () => {
    const [name,setName] = useState('Usman Rasheed');
    const [contact,setContact] = useState('');
    const [field,setField] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [updateProfile, setUpdateProfile] = useState(false);

    const navigation = useNavigation();

    const email = auth.currentUser?.email;

    const initial = (email.split('@')[0]).charAt(0).toUpperCase();

    const handleUpdateProfile = () => {
        setUpdateProfile(!updateProfile);
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
            // Sign-out successful
            console.log("User logged out successfully.");
            navigation.replace("Login"); // Redirect to Login screen
            })
            .catch((error) => {
            // Handle any errors
            console.log("Logout Error: ", error.message);
            Alert.alert("Logout Error", error.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>    
                <Text style={styles.header}>Profile</Text>
                <View style={styles.updateBtnContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
                        {updateProfile ?
                            <Text style={styles.updateButtonText}>Save Profile</Text>
                            : <Text style={styles.updateButtonText}>Update Profile</Text>
                        }
                        
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
            <View style={Platform.OS === 'android' ? styles.body : styles.ios.body}>
                <View style={Platform.OS === 'ios' ? styles.ios.profile : styles.android.profile}>
                    <Text style={styles.profileText}>{initial}</Text>
                </View>
                <View style={Platform.OS === 'android' ? styles.android.profileText : styles.ios.profileText}>
                    
                        <Text style={styles.headings}>Name</Text>
                        { updateProfile ?
                            <TextInput style={styles.input} onChangeText={text => setName(text)}>{name}</TextInput>
                        :
                            <Text style={styles.details}>{name}</Text>
                        }
                        <Text style={styles.headings}>Email</Text>
                        <Text style={styles.details}>{email}</Text>

                        <Text style={styles.headings}>CNIC</Text>
                        <Text style={styles.details}>XXXXX-XXXXXXX-X</Text>

                        <Text style={styles.headings}>Contact No.</Text>
                        { updateProfile ?
                            <TextInput placeholder="03xx-xxxxxxx" style={styles.input} onChangeText={text => setContact(text)}>{contact}</TextInput>
                        :
                            <Text style={styles.details}>{contact}</Text>
                        }

                        <Text style={styles.headings}>Field of Interest</Text>
                        { updateProfile ?
                            <TextInput placeholder="eg. Technology" style={styles.input} onChangeText={text => setField(text)}>{field}</TextInput>
                        :
                            <Text style={styles.details}>{field}</Text>
                        }

                        <Text style={styles.headings}>Address</Text>
                        { updateProfile ?
                            <TextInput placeholder="Block-5, Clifton" style={styles.input} onChangeText={text => setAddress(text)}>{address}</TextInput>
                        :
                            <Text style={styles.details}>{address}</Text>
                        }

                        <Text style={styles.headings}>City</Text>
                        { updateProfile ?
                            <TextInput placeholder="Karachi" style={styles.input} onChangeText={text => setCity(text)}>{city}</TextInput>
                        :
                            <Text style={styles.details}>{city}</Text>
                        }

                        <Text style={styles.headings}>State</Text>
                        { updateProfile ?
                            <TextInput placeholder="Sindh" style={styles.input} onChangeText={text => setState(text)}>{state}</TextInput>
                        :
                            <Text style={styles.details}>{state}</Text>
                        }
                </View>
                    <TouchableOpacity onPress={handleLogout} style={Platform.OS === 'ios' ? styles.ios.button : styles.android.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerContainer: {
        width: width * 0.95,
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
    },
    header: {
        fontSize: 40,
        fontFamily: 'monospace',
        fontWeight: '700',
        color: '#000',
        height: height * 0.1,
        flex: 0.7,
        textAlign: 'left',
        textAlignVertical: 'center',
        marginTop: 35,
        marginBottom: 5,
        padding: 10,
        // backgroundColor: 'pink'
    },
    updateBtnContainer: {
        flex: 0.3,
        // backgroundColor: 'grey',
        marginTop: 35,
        marginBottom: 5,
        padding: 10,
        flexGrow: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateButton: {
        width: '120%',
        height: height * 0.05,
        borderRadius: 10,
        borderWidth: 2,
    },
    updateButtonText: {
        fontSize: 20,
        fontWeight: '800',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        // backgroundColor: 'pink'
    },
    body: {
        width: width * 0.85,
        alignSelf: 'center',
        // height: height * 0.8,
        padding: 10,
        // justifyContent: 'flex-end',
        // backgroundColor: 'pink'
    },
    buttonText: {
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600'
    },
    
    profileText: {
        color: 'grey',
        fontSize: 100,
        fontWeight: '700',
        opacity: 0.8,
    }, 
    headings: {
        height: height * 0.04,
        width: width * 0.87,
        alignSelf: 'center',
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign: 'left',
        marginTop: 2,
        fontWeight: '500',
    },
    details: {
        textAlignVertical: 'center',
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        width: width * 0.9,
        height: height* 0.05,
        alignSelf: 'center',
        fontSize: 17,
        backgroundColor: 'grey',
        opacity: 0.7,
        padding: 10,
    },
    input: {
        color: '#000',
        textAlignVertical: 'center',
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        width: width * 0.9,
        height: height* 0.05,
        alignSelf: 'center',
        fontSize: 17,
        // backgroundColor: 'grey',
        opacity: 0.7,
        padding: 10,
    },
    android: {
        profile: {
            width: width * 0.33,
            height: height * 0.15,
            // borderWidth: 2,
            borderRadius: 100,
            backgroundColor: '#231C4D',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
        },
        button: {
            width: width * 0.8,
            backgroundColor: '#231C4D',
            height: height * 0.06,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 40,
            marginTop: 10,
        },
    },
    ios: {
        body: {
            width: width * 0.85,
            alignSelf: 'center',
            // height: height * 0.75,
            padding: 10,
            // justifyContent: 'flex-end',
            // backgroundColor: 'pink'
        },
        profile: {
            width: width * 0.27,
            height: height * 0.15,
            // borderWidth: 2,
            borderRadius: 100,
            backgroundColor: '#231C4D',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
        },
        button: {
            width: width * 0.8,
            backgroundColor: '#231C4D',
            height: height * 0.07,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 40,
        },
    }
})
export default ProfileScreen;