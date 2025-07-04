
import { BannerAdSize, GAMBannerAd, TestIds } from 'react-native-google-mobile-ads';

type Props = {
    bannerId: string
}
export default ({ bannerId }: Props) => {
    const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : bannerId;
    
    return <GAMBannerAd
        unitId={adUnitId}
        sizes={[BannerAdSize.INLINE_ADAPTIVE_BANNER]}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true
        }}
    />
}