import { View, Text, StyleSheet, TextInput, Pressable, Button, FlatList, Dimensions, ScrollView } from 'react-native';
import GAMBannerAdsComponent from '../../components/GAMBannerAdsComponent';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVideosForCategory } from '../../services/fetchData';
import useAdsIntertistial from '../../services/useAdsIntertistial';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../../types/RootStackParamList';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';

export default () => {
  useAdsIntertistial();
  const Ctx = useContext(MainContext);
  const navigation = useNavigation<RootStackParamList>();
  const handleUpdate = async () => {
    try {
      if (Ctx?.data) {
        await AsyncStorage.removeItem('my-key');
        await AsyncStorage.removeItem('my-category');

        alert('Dados atualizados com sucesso!');
        getVideosForCategory(Ctx.data).then((videos) => {
          Ctx.setVideos(videos);
          navigation.navigate('index');
        });
      }
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
      alert('Erro ao salvar dados!');
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
    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedAndHappy />
      
      {/* ANUNCIO AQUI*/}
      <GAMBannerAdsComponent bannerId='ca-app-pub-1411733442258523/8794582523' />

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
          <Pressable style={[styles.btnSave, { backgroundColor: '#1290e4' }]} onPress={setCategory}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>ADICIONAR</Text>
          </Pressable>
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
    margin: 'auto',
    marginTop: 30,
    padding: 12,
    backgroundColor: "#2ae412",
    borderRadius: 5,
    alignItems: 'center',
    boxShadow: " 1 3 7 0 #00000090",
  }
});
