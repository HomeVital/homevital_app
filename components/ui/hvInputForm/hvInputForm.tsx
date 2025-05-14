import { View, StyleSheet, ViewProps } from 'react-native';
import { WHITE } from '@/constants/colors';
import HvButton from '../hvButton';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface Props extends ViewProps {
	onPress: () => void;
	disabled?: boolean;
	loading?: boolean;
}

/**
 * Custom input form component with padding and background color
 * @param children - children components
 * @param onPress - function to execute on button press
 * @returns custom input form component
 */
const HvInputForm = ({
	onPress,
	disabled = false,
	loading = false,
	...props
}: Props): JSX.Element => {
	const { t } = useTranslation();
	const [loadingState, setLoadingState] = useState(loading);
	return (
		<View style={[Styles.container, props.style]}>
			{props.children}
			<HvButton
				text={t('modals.buttons.save')}
				onPress={() => {
					setLoadingState(true);
					Promise.resolve(onPress()).finally(() => setLoadingState(false));
				}}
				disabled={disabled}
				loading={loadingState}
			/>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		marginTop: 10,
		padding: 20,
		gap: 20,
		borderRadius: 10,
		backgroundColor: WHITE,
		maxWidth: 800,
	},
});

export default HvInputForm;
