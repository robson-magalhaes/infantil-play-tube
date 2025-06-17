
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

type Props = {
    bannerId: string
}
export default ({ bannerId }: Props) => {
    const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : bannerId;
    //const adUnitId = bannerId;
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                networkExtras: {
                    collapsible: 'bottom',
                },
                
            }}
        />
    )
}