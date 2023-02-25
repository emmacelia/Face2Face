import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NfcManager from "react-native-nfc-manager";
import Game from './Game'
import AndroidPrompt from "./AndroidPrompt";

function App(props) {
    const [hasNfc, setHasNfc] = React.useState(null);
    const promptRef = React.useRef();

    // use the isSupported API to check device nfc availability
    // if yes -> start() is called to initialise the nfc native module
    React.useEffect(() => {
        async function checkNfc() {
            const supported = await NfcManager.isSupported();
            if(supported) {
                await NfcManager.start();
            }
            setHasNfc(supported);
        }

        checkNfc();
    }, []);

    if(hasNfc == null) {
        return null;
    } else if(!hasNfc){
        return (
            <View style={styles.wrapper}>
                <Text>Your device doesn't support NFC</Text>
                <TouchableOpacity onPress={() =>{
                    promptRef.current.setVisable(true);
                }}>
                    <Text>test</Text>
                </TouchableOpacity>
                <AndroidPrompt reft={promptRef} />
            </View>
        );
    }

    return <Game />;
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;