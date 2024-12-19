import { Stack } from 'expo-router';

import { useEffect } from 'react';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { ContextProvider } from '../context/MainContext';
export default function Layout() {

  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
        testDeviceIdentifiers: ['EMULATOR'],
      }).then(() => {
        console.log('Ad request config successfully set!');
      });

    mobileAds()
      .initialize()
      .then((adapterStatuses: any) => {
        console.log(adapterStatuses);
      });
  }, []);
  return (
    <ContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ContextProvider>
  );
}
