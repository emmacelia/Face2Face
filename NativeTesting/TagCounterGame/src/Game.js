import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NfcManager, {NfcEvents} from "react-native-nfc-manager";

function Game(props) {
    const [start, setStart] = React.useState(null);
    const [duration, setDuration] = React.useState(0);

    // depends on the start state to run the hook
    // unregisterTagEvent stops the tags being read once the game is over
    React.useEffect(() => {
        let count = 5;
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
            count--;
            NfcManager.setAlertMessageIOS(`${count}...`);
            if(count <= 0) {
                NfcManager.unregisterTagEvent().catch(() => 0);
                console.warn(new Date().getTime() - start.getTime());
            }
            console.warn('tag found', tag);
        });

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        }
    }, [start]);

    async function scanTag() {
        await NfcManager.registerTagEvent();
        setStart(new Date());
        setDuration(0);
    } 

    return (
        <View style={styles.wrapper}>
            <Text>NFC Game</Text>
            {duration > 0 && <Text>{duration} ms</Text>}
            <TouchableOpacity style={styles.btn} onPress={scanTag}>
                <Text>START</Text>
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Game;