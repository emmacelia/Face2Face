import { NfcAdapter } from 'expo-nfc';
import { useState, useEffect } from 'react';

const useNfc = () => {
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    enableNfc();
    return disableNfc;
  }, []);

  const enableNfc = async () => {
    try {
      await NfcAdapter.isAvailableAsync();
      await NfcAdapter.startDiscoveryAsync();
      setNfcEnabled(true);
    } catch (e) {
      console.log(e);
      setNfcEnabled(false);
    }
  };

  const disableNfc = async () => {
    await NfcAdapter.stopDiscoveryAsync();
  };

  useEffect(() => {
    const subscription = NfcAdapter.addListener((event) => {
      if (event.type === 'NfcTag') {
        setTag(event.tag);
      }
    });
    return () => subscription.remove();
  }, []);

  return { nfcEnabled, tag };
};

export default useNfc;
