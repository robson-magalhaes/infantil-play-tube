import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

type Props = {
    bannerId: string;
};

export default ({ bannerId }: Props) => {
    const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : bannerId;

    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                networkExtras: {
                    collapsible: 'bottom',
                },
            }}
        />
    );
};
