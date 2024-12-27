import { View, Text, StyleSheet, TextInput, Pressable, Button, FlatList } from 'react-native';
import GAMBannerAdsComponent from '../../components/GAMBannerAdsComponent';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVideosForCategory } from '../../services/fetchData';
import useAdsIntertistial from '../../services/useAdsIntertistial';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default () => {
  useAdsIntertistial();

  const Ctx = useContext(MainContext);

  const handleUpdate = async () => {
    try {
      if (Ctx?.data) {
        await AsyncStorage.removeItem('my-key');
        await AsyncStorage.removeItem('my-category');

        alert('Dados atualizados com sucesso!');
        getVideosForCategory(Ctx.data).then((videos) => {
          Ctx.setVideos(videos);
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
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.formContainer}>
        <Text>Adicione aqui a categoria que vai aparecer na tela inicial</Text>
        <FlatList
          data={Ctx?.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.InputItems}>
              <TextInput
                value={item.name}
                style={styles.input}
                onChangeText={(newText) => handleChangeText(item.id, newText)}
              />
              <Pressable
                onPress={() => handleInputDel(item.id)}
                style={styles.btnInput}>
                <View><FontAwesome size={25} name="trash" color={"#FFFFFF"} style={{ alignSelf: "center", verticalAlign: "middle" }} /></View>
              </Pressable>
            </View>
          )}
        />

        <Text>Máximo de categorias: {Ctx?.data.length} / 5</Text>
        <Pressable style={{ marginTop: 20 }}>
          <Button onPress={setCategory} title="Adicionar" />
        </Pressable>
      </View>

      <Pressable style={styles.btnSave} onPress={handleUpdate}>
        <Text style={styles.saveText}>SALVAR</Text>
      </Pressable>

      <GAMBannerAdsComponent bannerId={'ca-app-pub-3940256099942544/9214589741'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 50,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    width: "100%"
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderRadius: 7,
    borderColor: '#2196F3',
    borderWidth: 2,
    fontSize: 18,
    boxShadow: "inset 0 0 2 1 pink, 2 2 1 1 yellow",
  },
  InputItems: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
  },
  btnInput: {
    backgroundColor: "red",
    height: "auto",
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    boxShadow: "inset 0 0 5 1 #00000090, 2 2 5 0 #00000070",
  },
  btnSave: {
    marginBottom: 20,
    width: "90%",
    textAlign: "center",
    backgroundColor: "green",
    padding: 12,
    borderRadius: 5,
    // boxShadow: "3 3 5 1 #000000",
    boxShadow: "inset 0 0 5 0 #00000080, 1 3 7 0 #00000090",
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
