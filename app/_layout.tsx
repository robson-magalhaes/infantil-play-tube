import { Stack } from 'expo-router';
import { useEffect } from 'react';

import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { ContextProvider } from '../context/MainContext';
import { StatusBar } from 'expo-status-bar';
import { ParentalProvider } from '../context/ParentalControlContext';

export default function Layout() {

  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
        testDeviceIdentifiers: ['EMULATOR'],
      }).then(() => {
      });

    mobileAds()
      .initialize()
      .then((adapterStatuses: any) => {
      });
  }, []);

  return (
    <ContextProvider>
      <ParentalProvider>
        <StatusBar hidden={true} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ParentalProvider>
    </ContextProvider>
  );
}
