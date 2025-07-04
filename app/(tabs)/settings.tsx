import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVideosForCategory } from '../../services/fetchData';
import useAdsIntertistial from '../../utils/Anuncios/useAdsIntertistial';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../../types/RootStackParamList';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import { ParentalContext } from '../../context/ParentalControlContext';
import GAMBannerInlineAdaptive from '../../utils/Anuncios/GAMBannerInlineAdaptive';
import BannerInlineAdaptive from '../../utils/Anuncios/BannerInlineAdaptive';

export default () => {
  //ANUNCIO
  useAdsIntertistial('ca-app-pub-1411733442258523/1844435218');

  const Ctx = useContext(MainContext);
  const navigation = useNavigation<RootStackParamList>();
  const ParentalControl = useContext(ParentalContext);
  const [textCurrent, setTextCurrent] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && ParentalControl?.passParental !== undefined) {
      setTextCurrent(ParentalControl.passParental);
      setInitialized(true);
    }
  }, [ParentalControl?.passParental, initialized]);

  const handleUpdateParental = async () => {
    try {
      ParentalControl?.setPassParental(textCurrent);
      await AsyncStorage.setItem("parentalPass", textCurrent)
      alert('SENHA ALTERADA COM SUCESSO!!');
      navigation.navigate('index');
    } catch (error) {
      alert('ERRO AO SALVAR SENHA!');
    }
  };

  const handleUpdateCategory = async () => {
    try {
      if (Ctx?.data) {
        await AsyncStorage.removeItem('my-key');
        await AsyncStorage.removeItem('my-category');

        alert('CATEGORIAS ATUALIZADAS COM SUCESSO!!');
        getVideosForCategory(Ctx.data).then((videos) => {
          Ctx.setVideos(videos);
          navigation.navigate('index');
        });
      }
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
      alert('ERRO AO SALVAR CATEGORIA!');
    }
  };

  const setCategory = () => {
    if (Ctx?.data && Ctx.data.length < 5) {
      while (true) {
        const randomNumber = Math.floor(Math.random() * 100 + Ctx.data.length);
        const result = Ctx.data.some(x => x.id == randomNumber ? true : false);
        if (!result) {
          const newCategory = { id: randomNumber, name: "", search: "" };
          Ctx.setData([...Ctx.data, newCategory]);
          break
        }
      }
    } else {
      alert('Máximo de 5 categorias atingido!');
    }
  };

  const handleChangeText = (id: number, newText: string) => {
    if (Ctx?.data) {
      const updatedData = Ctx.data.map(item =>
        item.id === id ? { ...item, name: newText, search: newText } : item
      );
      Ctx.setData(updatedData);
    }
  };
  const handleInputDel = (id: number) => {
    if (Ctx?.data && Ctx.data.length > 0) {
      const newData = Ctx?.data.filter(x => x.id !== id)
      Ctx?.setData(newData);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }}>
      <AnimatedAndHappy />

      {/* ANUNCIO AQUI*/}
      <BannerInlineAdaptive bannerId='ca-app-pub-1411733442258523/7704693606' />


      <View style={styles.container}>
        <Text style={styles.title}>Categorias</Text>
        <Text style={styles.simpleText}>
          Alteração de categorias da tela inicial.
        </Text>
        <View style={styles.cardSession}>
          {Ctx?.data.map((item) => (
            <View key={item.id} style={styles.InputItems}>
              <TextInput
                value={item.name}
                style={styles.input}
                onChangeText={(newText) => handleChangeText(item.id, newText)}
              />
              <Pressable
                onPress={() => handleInputDel(item.id)}
                style={styles.btnInput}>
                <FontAwesome size={25} name="trash" color={"#FFFFFF"} />
              </Pressable>
            </View>
          ))}
          <Text style={{ fontWeight: 'bold', textAlign: 'right', marginRight: 50 }}>Máximo de categorias: {Ctx?.data.length} / 5</Text>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 20 }}>
            <Pressable style={[styles.btnSave, { backgroundColor: '#1290e4', width: 100, padding: 0 }]} onPress={setCategory}>
              <Text style={[styles.TxtBtnSave, { fontSize: 40 }]}>+</Text>
            </Pressable>
            <Pressable style={[styles.btnSave, {}]} onPress={handleUpdateCategory}>
              <Text style={[styles.TxtBtnSave, {}]}>SALVAR</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>CONTROLE DOS PAIS</Text>
        <Text style={styles.simpleText}>
          Bloqueio de toque.
        </Text>
        <View style={styles.cardSession}>
          <View style={[styles.InputItems, { flexDirection: "column" }]}>
            <Text style={[styles.simpleText, { textAlign: "left" }]}>Senha:</Text>
            <TextInput
              keyboardType='number-pad'
              style={[styles.input, {}]}
              value={textCurrent}
              placeholder='Digite aqui a senha...'
              onChangeText={(newText) => setTextCurrent(newText)}
            />
          </View>
          <Pressable style={styles.btnSave} onPress={handleUpdateParental}>
            <Text style={[styles.TxtBtnSave, {}]}>SALVAR</Text>
          </Pressable>
        </View>

      </View>
      <View style={styles.boxBanner}>
        <GAMBannerInlineAdaptive bannerId={'ca-app-pub-1411733442258523/9903405555'} />
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
  formContainer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: "flex-start"
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
  btnInput: {
    width: 35,
    height: 35,
    backgroundColor: "red",
    marginLeft: 10,
    marginVertical: 'auto',
    borderRadius: 7,
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'center',
    boxShadow: "inset 0 0 5 1 #00000090, 2 2 5 0 #00000070",
  },
  btnSave: {
    width: 200,
    height: 50,
    marginTop: 30,
    marginHorizontal: "auto",
    padding: 10,
    backgroundColor: "#2ae412",
    borderRadius: 5,
    alignItems: 'center',
    boxShadow: " 1 3 7 0 #00000090",
  },
  TxtBtnSave: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 'auto',
    textAlign: 'center',
    verticalAlign: "middle"
  },
  boxBanner: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "transparent",
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
});
