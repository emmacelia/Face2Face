import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';

function App(props) {
  // State gets updated when when we find out if the device supports NFC
  const [hasNfc, setHasNFC] = React.useState(null);

  // called when component mounts
  React.useEffect(() => {
    const checkIsSupported = async () => {
      // check if NFC is supported and update state
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        // Initialize NFC module
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  // Reading NFC tag
  // Listen for onDiscoverTag event
  // TODO: use setAlertMessages() to notify user
  React.useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('tag found');
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  const readTag = async () => {
    // begin detecting NFC tags
    await NfcManager.registerTagEvent();
  };

  const cancelReadTag = async () => {
    // stop scanning
    await NfcManager.unregisterTagEvent();
  };

  // error handling
  if (hasNfc === null) return null;

  // conditional rendering for NFC incompatible
  if (!hasNfc) {
    return (
      <View style={styles.sectionContainer}>
        <Text>NFC not supported</Text>
      </View>
    );
  }

  const writeNFC = async () => {
    let result = false;

    try {
      // use ndef NFC version for encoding data
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // data to encode in the NFC message
      const bytes = Ndef.encodeMessage([
        Ndef.uriRecord('https://www.atu.ie/'),
      ]);

      // write the message with error handling
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  };

  // Rendering for NFC compatible devices
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Hello Face2Face</Text>
      <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={readTag}>
        <Text style={{color: 'white'}}>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnCancel]}
        onPress={cancelReadTag}>
        <Text style={{color: 'white'}}>Cancel Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnWrite]}
        onPress={writeNFC}>
        <Text style={{color: 'white'}}>Write Tag</Text>
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
