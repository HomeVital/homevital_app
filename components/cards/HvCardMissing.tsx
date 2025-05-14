import { GREEN } from '@/constants/colors';
import HvText from '../ui/hvText';
import HvCard from './hvCard';

interface Props {
	text: string;
}

/**
 * Card component for displaying missing information
 * @param text - text to display
 * @returns card component for displaying missing information
 */
const HvCardMissing = ({ text }: Props): JSX.Element => {
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
			<HvText>{text}</HvText>
		</HvCard>
	);
};

export default HvCardMissing;
