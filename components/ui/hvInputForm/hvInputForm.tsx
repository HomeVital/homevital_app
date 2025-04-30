import { View, StyleSheet, ViewProps } from 'react-native';
// constants
import { WHITE } from '@/constants/colors';
import HvButton from '../hvButton';
import { useTranslation } from 'react-i18next';

interface Props extends ViewProps {
	onPress: () => void;
	disabled?: boolean;
}

/**
 * Custom input form component with padding and background color
 * @param children - children components
 * @param onPress - function to execute on button press
 * @returns custom input form component
 */
const HvInputForm = ({ onPress, disabled = false, ...props }: Props): JSX.Element => {
	const { t } = useTranslation();
	return (
		<View style={[Styles.container, props.style]}>
			{props.children}
			<HvButton text={t('modals.buttons.save')} onPress={onPress} disabled={disabled} />
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
