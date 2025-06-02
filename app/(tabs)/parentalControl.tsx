import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import GAMBannerAdsComponent from '../../components/GAMBannerAdsComponent';
import { useContext, useEffect, useState } from 'react';
import useAdsIntertistial from '../../services/useAdsIntertistial';
import { ParentalContext } from '../../context/ParentalControlContext';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../../types/RootStackParamList';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  useAdsIntertistial();
  const ParentalControl = useContext(ParentalContext);
  const navigation = useNavigation<RootStackParamList>();
  const [textCurrent, setTextCurrent] = useState('');
const [initialized, setInitialized] = useState(false);

useEffect(() => {
  if (!initialized && ParentalControl?.passParental !== undefined) {
    setTextCurrent(ParentalControl.passParental);
    setInitialized(true);
  }
}, [ParentalControl?.passParental, initialized]);

  const handleUpdate = async () => {
    try {
      ParentalControl?.setPassParental(textCurrent);
      await AsyncStorage.setItem("parentalPass", textCurrent)
      alert('Senha alterada com sucesso!');
      navigation.navigate('index');
    } catch (error) {
      alert('Erro ao salvar senha');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedAndHappy />

      {/* ANUNCIO AQUI*/}
      <GAMBannerAdsComponent bannerId='ca-app-pub-1411733442258523/8794582523' />

      <View style={styles.container}>
        <Text style={styles.title}>CONTROLE DOS PAIS</Text>
        <Text style={styles.simpleText}>
          Bloqueio de toque.
        </Text>
        <View style={styles.cardSession}>
          <View style={[styles.InputItems, { flexDirection: 'row' }]}>
            <Text style={[styles.simpleText, { marginVertical: 'auto' }]}>Senha:</Text>
            <TextInput
              keyboardType='number-pad'
              style={[styles.input, { width: 300, marginLeft: 10 }]}
              value={textCurrent}
              placeholder='Digite aqui a senha...'
              onChangeText={(newText) => setTextCurrent(newText)}
            />
          </View>
        </View>

        <Pressable style={styles.btnSave} onPress={handleUpdate}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>SALVAR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    paddingVertical: 30,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'blue',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1
  },
  simpleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'blue',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1
  },
  cardSession: {
    padding: 25,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center",
    width: '60%',
    marginHorizontal: 'auto',
    boxShadow: "1 1 1 1 #00000050",
  },
  InputItems: {
    width: "100%",
    maxWidth: 400,
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 'auto',
    flexDirection: "row",
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 15,
    borderRadius: 7,
    borderColor: '#2196F3',
    borderWidth: 2,
    fontSize: 18,
    fontWeight: 'bold',
    boxShadow: "inset 0 0 2 1 pink, 2 2 1 1 yellow"
  },
  btnSave: {
    width: 200,
    margin: 'auto',
    marginTop: 30,
    padding: 12,
    backgroundColor: "#2ae412",
    borderRadius: 5,
    alignItems: 'center',
    boxShadow: " 1 3 7 0 #00000090",
  }
});
