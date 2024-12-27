import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import useOpenAds from '../../services/useOpenAds';

export default () => {
  useOpenAds();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#4fc4d6' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
