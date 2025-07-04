import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

export default () => {
  useKeepAwake();

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#4fc4d6',
        tabBarInactiveTintColor: '#706363',
        tabBarStyle: {
          height: 35
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
            title: 'Assitindo',
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
    </View>
  );
}
