import { GREEN } from '@/constants/colors';
import HvText from '../ui/hvText';
import HvCard from './hvCard';
import { View } from 'react-native';
import HvLayeredIcon from '../ui/hvLayeredIcon';

interface Props {
	text: string;
}

/**
 * Card component for displaying missing information
 * @param text - text to display
 * @returns card component for displaying missing information
 */
const HvCardInstructions = ({ text }: Props): JSX.Element => {
	return (
		<HvCard
			padding={20}
			gap={20}
			row
			spacing={'center'}
			hideShadow
			fullBorder
			borderColor={GREEN}
		>
			<View style={{ justifyContent: 'center' }}>
				<HvLayeredIcon
					innerIcon='Instruction'
					outerIcon={require('@/assets/svgs/circle.svg')}
					size={34}
				/>
			</View>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<HvText weight='semibold'>{text}</HvText>
			</View>
		</HvCard>
	);
};

export default HvCardInstructions;
