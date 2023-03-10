import React from "react";
import { View, Text, StyleSheet, Touchable } from "react-native";
import nfcManager from "react-native-nfc-manager";

function App(props) {

 const testDatabase = () => {

        axios.get('https://enigmatic-retreat-69968.herokuapp.com/').then((err,data)=>{
            setTestData(data.data);
        })

    }


    return (
        <View style={styles.wrapper}> 
            <Text>Hello Face2Face</Text>

            <Button
              onPress={
                  testDatabase
              }>
              </Button>

              <Text>{
                
                }</Text>
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