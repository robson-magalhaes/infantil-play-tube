import { View, Text, StyleSheet } from 'react-native';
import GAMBannerAdsComponent from '../../components/GAMBannerAdsComponent';
import useAdsIntertistial from '../../services/useAdsIntertistial';

export default () => {
  useAdsIntertistial();

  return (
    <View style={styles.container}>
      <Text>Pagina de Configurações</Text>
      <GAMBannerAdsComponent bannerId={'ca-app-pub-3940256099942544/9214589741'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
