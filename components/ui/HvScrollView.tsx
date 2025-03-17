import { ScrollView, ScrollViewProps } from 'react-native';
// constants
import { TAB_HEIGHT } from '@/constants/sizes';
import React from 'react';
import { RefreshControl } from 'react-native';
import { DARK_GREEN } from '@/constants/colors';

interface Props extends ScrollViewProps {
	onRefresh?: () => void;
}

/**
 * Custom ScrollView component
 * @param props - additional ScrollView properties
 * @returns custom ScrollView component
 */
const HvScrollView = ({ onRefresh = undefined, ...props }: Props): JSX.Element => {
	const [refreshing] = React.useState(false);

	// const onRefresh = React.useCallback(() => {
	// 	setRefreshing(true);
	//
	// 	// Add your refresh logic here
	// 	setTimeout(() => setRefreshing(false), 2000);
	// }, []);

	return (
		<ScrollView
			fadingEdgeLength={TAB_HEIGHT + 42}
			style={[{ marginBottom: TAB_HEIGHT }, props.style]}
			refreshControl={
				onRefresh ? (
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						progressViewOffset={0}
						colors={[DARK_GREEN]}
						tintColor={DARK_GREEN}
						title='Refreshing...'
						titleColor={DARK_GREEN}
					/>
				) : undefined
			}
		>
			{props.children}
		</ScrollView>
	);
};

export default HvScrollView;
