import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { AdEventType, TestIds, AppOpenAd } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-1411733442258523/5148418343';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

export default () => {
    const [loaded, setLoaded] = useState(false);

    const handlePress = () => {
        if (loaded) {
            appOpenAd.show();
        }
    };

    useEffect(() => {
        handlePress();
    }, [loaded]);

    useEffect(() => {
        const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeOpened = appOpenAd.addAdEventListener(AdEventType.OPENED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(true);
            }
        });

        const unsubscribeClosed = appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(false);
            }
        });

        appOpenAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeOpened();
            unsubscribeClosed();
        };
    }, []);

    return null;
};
