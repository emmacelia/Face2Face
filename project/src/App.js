import React,{useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
AsyncStorage,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from 'react-native-hce';
import * as RNFS from 'react-native-fs';
import AppText from './components/AppText';
import ButtonText from './components/ButtonText';

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
  //Variable to get data using use state
   const [Username, setUsername] = React.useState('Test');
   const [User, setUser]=useState({Username:'Ema', score: 400})
   //click method for button to update
    const UpdateUsernameClick=() =>{
      setUsername("Conor");
    }

const [content, setContent] = useState(null);
const writeFile = () => {
   var path = RNFS.DocumentDirectoryPath + '/test.txt';
   RNFS.writeFile(path, Username, 'utf8')
    .then(() => console.log('FILE WRITTEN!'))
    .catch((err) => console.log(err.message));
}
const readFile = () => {
   RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
    console.log('GOT RESULT', result);
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
   if (statResult[0].isFile()) {
    return RNFS.readFile(statResult[1], 'utf8');
 }
 return 'no file';
 })
 .then((contents) => {
  setContent(contents);
  console.log(contents);
 })
  .catch((err) => {
   console.log(err.message, err.code);
  });
}
const deleteFile = () => {
    var path = RNFS.DocumentDirectoryPath + '/test.txt';
    return RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
        setContent(null);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
 
      <TextInput
      placeholder='Enter text here'
      onChangeText={(val)=> setUsername(val)}>
      

      </TextInput>



        <Text>This is {Username} </Text>
         <Text>Your username is {User.Username} and score is {User.score} </Text>

    <TouchableOpacity onPress={writeFile} style={styles.buttonStyle}>
      <ButtonText name="WRITE" />
    </TouchableOpacity>
    <TouchableOpacity onPress={readFile} style={styles.buttonStyle}>
     <ButtonText name="READ" />
   </TouchableOpacity>
  <TouchableOpacity onPress={deleteFile} style={styles.buttonStyle}>
   <ButtonText name="DELETE" />
  </TouchableOpacity>
  <AppText>{content}</AppText>


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