import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  AppState,
} from 'react-native';
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from 'react-native-hce';
import * as RNFS from 'react-native-fs';
import AppText from './components/AppText';
import ButtonText from './components/ButtonText';
import Timer from './components/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(props) {
  let session;
  const [connection, setConnection] = useState(false);
  const [score, setScore] = useState();
 

  //End the session if the app is in the background
  useEffect(() => {
    getData();
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      console.log('App is in the background');
      stopSession();
    }
  };

//Async Storage code 

const setData= async ()=>{
  try {
    await AsyncStorage.setItem('score',JSON.stringify(score));
    console.log("Saved" + score);
  } catch (error) {
    console.log(error);
  }
}

const getData = () =>{
  try {
     AsyncStorage.getItem('score',score)
    .then(value =>{

      if(value != null){
        let UserScore = JSON.parse(value);
        setScore(UserScore);
        console.log("User Score" +UserScore);
      }
    })
    console.log("Saved");
  } catch (error) {
    console.log("no data");
  }
}

  // HCE hosts
  const startSession = async () => {
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: 'Connected',
      writable: false,
    });

    session = await HCESession.getInstance();
    console.log('SESSION' + JSON.stringify(session));
    session.setApplication(tag);
    await session.setEnabled(true);
    setConnection(true);
  };

  const stopSession = async () => {

    setData();
    session = await HCESession.getInstance();
    await session.setEnabled(false).catch(error => error);
    setConnection(false);
    console.log('SESSION' + JSON.stringify(session));
  };

  // Gets called when the session is closed, saves the value of the timer
  const getScoreValue = yourvalue => {
    console.log(yourvalue);
    setScore(score + yourvalue);
   // console.log("Get score: "+score);
  };

  // Reading
  const listen = async () => {
    const removeListener = session.on(HCESession.Events.HCE_STATE_READ, () => {
      ToastAndroid.show('The tag has been read! Thank You.', ToastAndroid.LONG);
    });

    // to remove the listener:
    removeListener();
  };

  // Rendering for NFC compatible devices
  return (

    
    <SafeAreaView style={styles.wrapper}>
       <AppText> your score is: {score}</AppText>
      <Text>Hello Face2Face</Text>
      {/* <TouchableOpacity style={[styles.btn, styles.btnScan]} onPress={listen}>
        <Text style={{color: 'white'}}>Join Session</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.btn, styles.btnWrite]}
        onPress={startSession}>
        <Text style={{color: 'white'}}>Start Session</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnWrite]}
        onPress={stopSession}>
        <Text style={{color: 'white'}}>Close Session</Text>
      </TouchableOpacity>
      <Text>
        <Timer connection={connection} getScoreValue={getScoreValue} />
      </Text>

 <TouchableOpacity
        style={[styles.btn, styles.btnWrite]}
        onPress={setData}>
        <Text style={{color: 'white'}}>Save Final Score</Text>
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
