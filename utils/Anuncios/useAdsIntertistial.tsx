import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const useAdsIntertistial = (adsId: string) => {
    const [loaded, setLoaded] = useState(false);
    const [interstitial] = useState(() =>
        InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : adsId, {
            requestNonPersonalizedAdsOnly: true
        })
    );
    const handlePress = () => {
        if (loaded) {
            interstitial.show();
        }
    };

    useEffect(() => {
        handlePress();
    }, [loaded]);

    useEffect(() => {
        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(true);
            }
        });

        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(false);
            }
        });

        interstitial.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeOpened();
            unsubscribeClosed();
        };
    }, []);

    return null;
};

export default useAdsIntertistial;