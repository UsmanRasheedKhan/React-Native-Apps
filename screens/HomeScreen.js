import React from 'react';
import { View, Platform, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { auth } from '../Firebase';
import { useNavigation } from '@react-navigation/native';
import Card from '../componenets/Card';
import Header from '../componenets/header';

export default function HomeScreen() {

    const navigation = useNavigation();

    const email = auth.currentUser?.email;

    const name = "Welcome, " + (email.split('@')[0]).charAt(0).toUpperCase() + (email.split('@')[0]).slice(1);

    return (
    <View style={styles.container}>
      <Header
        heading = {name}
        subHeading = "Current Campaigns"
      />

        <View style={Platform.OS === 'android' ? styles.body : styles.ios.body} >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card 
                  heading="Contact Information Form" 
                  subheading="Form Subtitle" 
                  description="Fill this form to contact us!" 
                  time="5" 
                  points="40" 
            />
            <Card 
              heading={"HealthCare Form"}
              description={"Tell us about our services"}
              time={7}
              points={50} 
            />
              <Card 
                  heading="Contact Information Form" 
                  subheading="Form Subtitle" 
                  description="Fill this form to contact us!" 
                  time="5" 
                  points="40" 
            />
            <Card 
              heading={"HealthCare Form"}
              description={"Tell us about our services"}
              time={7}
              points={50} 
            />
              <Card 
                  heading="Contact Information Form" 
                  subheading="Form Subtitle" 
                  description="Fill this form to contact us!" 
                  time="5" 
                  points="40" 
            />
            <Card 
              heading={"HealthCare Form"}
              description={"Tell us about our services"}
              time={7}
              points={50} 
            />
          </ScrollView>
        </View>
    </View>
  );
}

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  body: {
    width: width * 0.85,
    alignSelf: 'center',
    height: height * 0.8,
  },
  ios: {
    body: {
      width: width * 0.85,
    alignSelf: 'center',
    height: height * 0.75,
    }
  }
});
