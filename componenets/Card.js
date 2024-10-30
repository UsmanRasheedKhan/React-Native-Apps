import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";

const Card = ({heading, description, time, points}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => {}}>
                <Text style={styles.cardText}>{heading}</Text>
                <View style={styles.cardBody}>
                <Text style={styles.formDescription}>{description}</Text>
                </View>
                <View style={styles.formDetails}>
                <View style={styles.formTime}>
                <Text style={styles.formTimeText}>Estimated Time: {time} Min</Text>
                </View>
                <View style={styles.formPoints}>
                <Text style={styles.formPointsText}>{points} Pts</Text>
                </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "grey",
        marginVertical: 8,
    },
    card: {
        alignSelf: 'center',
        width: width * 0.85,
        height: height * 0.15,
        backgroundColor: "fff",
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 2,
        margin: 5,
        // backgroundColor: 'pink'
    },
    cardText: {
        fontSize: 25,
        fontWeight: 'bold',
        width: '90%',
        alignSelf: 'center',
        height: '22%',
        // backgroundColor: 'grey',
        textAlignVertical: 'center',
    },
    cardBody: {
        width: '90%',
        alignSelf: 'center',
        // backgroundColor:'grey',
    },
    formDescription: {
        fontSize: 18,
        marginTop: 5,
        color: 'grey',
    },
    formDetails: {
        alignSelf: 'center',
        margin: 2,
        // backgroundColor: 'black',
        width: '90%',
        height: '60%',
        flexDirection: 'row',
    },
    formTime: {
        width: '50%',
        height: '35%',
        marginBottom: 5,
        marginTop: 30,
        // backgroundColor: 'pink',
    },
    formTimeText: {
        fontSize: 15,
        color: 'grey',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'bottom',
    },
    formPoints: {
        width: '50%',
        height: '70%',
        // backgroundColor: 'k',
    },
    formPointsText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'green',
        height: '100%',
        textAlign: 'right',
        textAlignVertical: 'bottom',
        marginTop: 10,
    },
})

export default Card;