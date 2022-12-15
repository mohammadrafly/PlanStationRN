import  React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    View,
    Text, 
    TouchableOpacity, 
    Dimensions
} from 'react-native';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function Main() {
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);

    const toggle = () => {
        setIsActive(!isActive);
      }
    
    const reset = () => {
        setRemainingSecs(0);
        setIsActive(false);
      }
    
    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setRemainingSecs(remainingSecs => remainingSecs + 1);
          }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, remainingSecs]);
    
        return (
        <View style={styles.container}>  
            <View style={styles.containerCard}>
                <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
                <TouchableOpacity onPress={toggle} style={styles.button}>
                    <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
                    <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
          borderWidth: 10,
          borderColor: '#B9AAFF',
          width: screen.width / 2,
          height: screen.width / 2,
          borderRadius: screen.width / 2,
          alignItems: 'center',
          justifyContent: 'center'
      },
      buttonText: {
          fontSize: 45,
          color: '#B9AAFF'
      },
      timerText: {
          color: '#00394C',
          fontSize: 90,
          marginBottom: 20
      },
      buttonReset: {
          marginTop: 20,
          borderColor: "#FF851B"
      },
      buttonTextReset: {
        color: "#FF851B"
      }
});