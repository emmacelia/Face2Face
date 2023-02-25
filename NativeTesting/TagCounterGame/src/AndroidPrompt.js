import React from "react";
import {View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

function AndroidPrompt(props, ref) {
    const [visable, setVisable] = React.useState(false);
    const [hintText, setHintText] = React.useState('');

    React.useEffect(() => {
        if(ref) {
            ref.current = {
                setVisable,
                setHintText,
            }
        }
    }, [ref]);

    return (
        <Modal visable={visable} transparent={true}>
            <View style={styles.content}>
                <View style={[styles.backdrop, StyleSheet.absoluteFill]}>

                    <View style={styles.prompt}>
                        <Text style={styles.hint}>{hintText || "Hello NFC"}</Text>
                    
                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={() => {
                                setVisable(false);
                                setHintText('');
                            }}>
                            <Text>CANCEL</Text>
                        </TouchableOpacity>
                    </View>               
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    prompt: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        width: Dimensions.get('window').width - 2 * 20,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hint: {
        fontSize: 24,
        marginBottom: 20,
    },
    btn: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
    },
});

export default React.forwardRef(AndroidPrompt);