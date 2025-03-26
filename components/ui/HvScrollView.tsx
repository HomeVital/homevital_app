import { ScrollView, ScrollViewProps } from 'react-native';
// constants
import { TAB_HEIGHT } from '@/constants/constants';
import React from 'react';
import { RefreshControl } from 'react-native';
import { DARK_GREEN } from '@/constants/colors';

interface Props extends ScrollViewProps {
	onRefresh?: () => void;
	isRefreshing?: boolean;
}

/**
 * Custom ScrollView component
 * @param props - additional ScrollView properties
 * @returns custom ScrollView component
 */
const HvScrollView = ({
	onRefresh = undefined,
	isRefreshing = false,
	...props
}: Props): JSX.Element => {
	return (
		<ScrollView
			fadingEdgeLength={TAB_HEIGHT + 42}
			style={[{ marginBottom: TAB_HEIGHT }, props.style]}
			refreshControl={
				onRefresh ? (
					<RefreshControl
						refreshing={isRefreshing}
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
