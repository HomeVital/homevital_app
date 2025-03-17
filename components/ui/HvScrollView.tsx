import { ScrollView, ScrollViewProps } from 'react-native';
// constants
import { TAB_HEIGHT } from '@/constants/sizes';

/**
 * Custom ScrollView component
 * @param props - additional ScrollView properties
 * @returns custom ScrollView component
 */
const HvScrollView = (props: ScrollViewProps): JSX.Element => {
	return (
		<ScrollView
			fadingEdgeLength={TAB_HEIGHT + 42}
			style={[{ marginBottom: TAB_HEIGHT }, props.style]}
		>
			{props.children}
		</ScrollView>
	);
};

export default HvScrollView;
