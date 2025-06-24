import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import ModalComponent from '../../components/ModalComponent';
import { useKeepAwake } from 'expo-keep-awake';

export default () => {
  useKeepAwake();
  const [loadModal, setLoadModal] = useState<boolean>(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  
  const handleBlockView = () => {
    isButtonPressed ? setLoadModal(!loadModal) : setIsButtonPressed(!isButtonPressed);
  }

  return (
    <View style={{ flex: 1, backgroundColor:'transparent' }}>
      {loadModal && <ModalComponent load={loadModal} setLoad={setLoadModal} setBlockView={setIsButtonPressed} />}
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#4fc4d6',
        tabBarInactiveTintColor: '#706363',
        tabBarStyle: {
          height:35
        },
        }}>
          
        <Tabs.Screen
          name="somAnimais"
          options={{
            title: 'Animais',
            headerShown: false,
            tabBarIcon: ({ focused }) => <FontAwesome size={28} name="music" color={focused ? '#4fc4d6' : '#0652df'} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Lista de videos',
            headerShown: false,
            tabBarIcon: ({ focused }) => <FontAwesome size={28} name="play" color={focused ? '#4fc4d6' : '#0652df'} />,
          }}
        />
        <Tabs.Screen
          name="FullScreenVideoScreen"
          options={{ 
            title:'Assitindo',
            headerShown: false,
            headerTransparent: true,
            tabBarIcon: ({ focused }) => <FontAwesome size={28} name="play-circle" color={focused ? '#4fc4d6' : '#5e7cff'} />
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configurações',
            headerShown: false,
            tabBarIcon: ({ focused }) => <FontAwesome size={28} name="cog" color={focused ? '#4fc4d6' : '#ffb95e'} />,
          }}
        />
      </Tabs>

      {isButtonPressed ?
        <Pressable style={styles.btnBlock}
          onPress={handleBlockView}>
          <Text><FontAwesome size={28} name="lock" /></Text>
        </Pressable>
        :
        <Pressable style={styles.btnBlock}
          onPress={handleBlockView}>
          {<Text><FontAwesome size={28} name="unlock" /></Text>}
        </Pressable>
      }
      {isButtonPressed &&
        <View style={styles.viewBlock}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderBlockColor:'blue',
    borderWidth:2
  },
  btnBlock: {
    position: "absolute",
    bottom: 15,
    right: 17,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    boxShadow: "inset -1 -1 2 2 #00000080, 1 1 1 1 #00000080",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex:999
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  actionText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  }
});