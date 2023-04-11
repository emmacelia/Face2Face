import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

const Timer = props => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (props.connection) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
    }
    return () => clearInterval(intervalId);
  }, [props.connection]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View>
      <Text>{formatTime(time)}</Text>
    </View>
  );
};

export default Timer;
