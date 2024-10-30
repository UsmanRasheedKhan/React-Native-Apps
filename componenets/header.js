import React from "react";
import {View, Text, Dimensions, StyleSheet} from 'react-native';

export default function Header({heading, subHeading}) {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.subHeading}>{subHeading}</Text>  
            </View>
        </View>
    )
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        width: width * 0.95,
        height: height * 0.15,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: 'grey'
        // backgroundColor: 'grey',
      },
      heading: {
        textAlign: 'left',
        fontSize: 35,
        fontWeight: '700',
        fontFamily: 'monospace',
      },
      subHeading: {
          fontFamily: 'monospace',
          fontSize: 35,
          fontWeight: '700',
          width: width * 0.9,
          margin: 5,
          alignSelf: 'center',
      }
})

