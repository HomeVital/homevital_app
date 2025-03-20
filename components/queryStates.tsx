import { STYLES } from '@/constants/styles';
import { ActivityIndicator, View } from 'react-native';
import HvText from './ui/hvText';

export const LoadingView = (): JSX.Element => {
	return (
		<View style={STYLES.loadingView}>
			<ActivityIndicator size='large' color='#3A7283' />
		</View>
	);
};

export const ErrorView = (): JSX.Element => {
	return (
		<View style={STYLES.loadingView}>
			<HvText>Error loading</HvText>
		</View>
	);
};
