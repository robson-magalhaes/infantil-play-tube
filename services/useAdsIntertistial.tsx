import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-1411733442258523/9244511809';

//const adUnitId = 'ca-app-pub-1411733442258523/9244511809';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

export default () => {
    const [loaded, setLoaded] = useState(false);

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
