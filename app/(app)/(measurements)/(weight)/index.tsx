import { ActivityIndicator, StyleSheet, View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBodyWeight } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { PADDING, TAB_ICON_SIZE } from '@/constants/sizes';
import { useToggle } from '@/hooks/UseToggle';
import HvCardMeasurement from '@/components/cards/hvCardMeasurement';
import { IBodyWeight } from '@/interfaces/bodyWeightInterfaces';
import { DARK_GREEN } from '@/constants/colors';
import { useState } from 'react';
import HvGraph from '@/components/graphs/HvGraph';

const Weight = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	const { data, isError, isLoading } = useQuery({
		queryKey: ['bodyweight'],
		queryFn: async () => fetchBodyWeight(session?.toString() || ''),
	});

	if (isError) {
		return (
			<View style={STYLES.loadingView}>
				<HvText>Error loading</HvText>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={STYLES.loadingView}>
				<ActivityIndicator size='large' color='#3A7283' />
			</View>
		);
	}

	const ScrollView = () => {
		return (
			<View style={Styles.container}>
				{data
					?.slice()
					.reverse()
					.map((item) => <HvCardMeasurement key={item.id} item={item} />)}
			</View>
		);
	};

	const GraphView = () => {
		const [item, setItem] = useState(undefined as IBodyWeight | undefined);
		const dataTypes = {
			weight: { name: 'Kg', color: DARK_GREEN },
		};

		return (
			<View style={Styles.container}>
				<HvGraph data={data as IBodyWeight[]} dataTypes={dataTypes} setItem={setItem} />
				{item !== undefined && <HvCardMeasurement item={item} />}
			</View>
		);
	};

	return (
		<View style={STYLES.defaultNoPadView}>
			<HvToggler
				toggler={toggled}
				setToggledTrue={setToggledTrue}
				setToggledFalse={setToggledFalse}
				textLeft='Graf'
				textRight='Mælingar'
				margin={20}
			/>
			<HvScrollView>{toggled ? <GraphView /> : <ScrollView />}</HvScrollView>
			{/* <HvScrollView>
				<View style={Styles.container}>
					{data
						?.slice()
						.reverse()
						.map((item) => (
							<TouchableOpacity key={item.id}>
								<HvCard style={{ paddingInline: 20, height: 90 }} row>
									<View style={Styles.left}>
										<Image
											source={require('@/assets/svgs/measurementLabel/good.svg')}
											contentFit='contain'
											style={Styles.indicator}
										/>
										<HvText weight='semibold'>{formatDate(item.date)}</HvText>
									</View>
									<HvText size='xxl' weight='semibold'>
										{item.weight} Kg
									</HvText>
								</HvCard>
							</TouchableOpacity>
						))}
				</View>
			</HvScrollView> */}
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: PADDING,
		marginBottom: TAB_ICON_SIZE + PADDING,
		gap: 12,
	},
	left: {
		height: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	indicator: {
		width: 26,
		height: 26,
	},
});

export default Weight;
