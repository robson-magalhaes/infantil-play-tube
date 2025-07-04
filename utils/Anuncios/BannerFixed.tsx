import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface Props {
  bannerId: string;
}

export default ({ bannerId }: Props) => {
  const adUnitId = __DEV__ ? TestIds.BANNER : bannerId;

  return (
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
  );
};
