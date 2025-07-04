import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { ParentalContext } from '../context/ParentalControlContext';

type Props = {
  load: boolean;
  setLoad: (item: boolean) => void;
  setBlockView : (item: boolean) => void;
}
export default ({ load, setLoad, setBlockView }: Props) => {
  const ParentalControl = useContext(ParentalContext);
  const [pass, setPass] = useState<string>('')

  const handleAuth = () => {
    if (pass == ParentalControl?.passParental) {
      alert('SUCESSO!! Tela desbloqueada')
      setBlockView(false);
      setLoad(false);
    } else {
      alert('INVÁLIDO!! Tela bloqueada')
      setLoad(false);
    }
  }
  if (load) {
    return (
      <Animated.View
        entering={FadeIn}
        style={styles.container}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleAuth} />
        <Animated.View
          entering={SlideInDown}
          style={styles.bodyModal}
        >
          <Text style={styles.title}>CONTROLE DOS PAIS</Text>

          <TextInput
            keyboardType='number-pad'
            secureTextEntry
            style={styles.input}
            value={pass}
            placeholder='Digite a senha...'
            onChangeText={(newText) => setPass(newText)}
          />
          <Pressable
            style={styles.btnInput}
            onPress={handleAuth}>
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color:"#FFF"
            }}>ENVIAR</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  } else {
    return
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    backgroundColor: '#00000050',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9
  },
  bodyModal: {
    padding:30,
    margin:'auto',
    width: '60%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: "2 2 1 4 #ffff5e, 4 6 1 8 #f259bc, 6 8 1 12 #4fc4d6, 10 15 10 5 #000000",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight:'bold',
    color:'#4fc4d6',
    textShadowColor:'blue',
    textShadowOffset:{width:3, height:3},
    textShadowRadius:1
  },
  input: {
    width: "80%",
    height: 50,
    paddingLeft: 15,
    borderRadius: 7,
    borderColor: '#2196F3',
    borderWidth: 2,
    fontSize: 18,
    boxShadow: "inset 0 0 2 1 pink, 2 2 1 1 yellow",
  },
  btnInput: {
    textAlign: "center",
    backgroundColor: '#2196F3',
    width: "50%",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    boxShadow:"1 1 3 2 #00000080"
  }
})