import React from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import nfcManager from "react-native-nfc-manager";

function App(props) {
    return (
        <View style={styles.wrapper}> 
            <Text>Hello Face2Face</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;