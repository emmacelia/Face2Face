import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from 'react-native-hce';

function App(props) {
  let session;

  // HCE host
  const startSession = async () => {
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: 'Hello world',
      writable: false,
    });

    session = await HCESession.getInstance();
    session.setApplication(tag);
    await session.setEnabled(true);
  };

  const stopSession = async () => {
    await session.setEnabled(false);
  }

  // Reading
  const listen = async () => {
    const removeListener = session.on(HCESession.Events.HCE_STATE_READ, () => {
      ToastAndroid.show("The tag has been read! Thank You.", ToastAndroid.LONG);
    });
  
    // to remove the listener:
    removeListener();
  }

  // Rendering for NFC compatible devices
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Hello Face2Face</Text>
      <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={listen}>
        <Text style={{color: 'white'}}>Join Session</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnWrite]}
        onPress={startSession}>
        <Text style={{color: 'white'}}>Host Session</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnWrite]}
        onPress={stopSession}>
        <Text style={{color: 'white'}}>Close Session</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;