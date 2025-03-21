import { GREEN } from '@/constants/colors';
import { Divider } from 'react-native-paper';

/**
 * Custom divider component
 * @returns custom divider component
 */
const HvDivider = (): JSX.Element => {
	return <Divider bold style={{ backgroundColor: GREEN }} />;
};

export default HvDivider;
