import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { Card } from 'react-native-paper';

// get measuresments by patient id

const MainScreen = (): JSX.Element => {
	return (
		<SafeAreaView>
			<HvHeader name='jakub' />
			<View style={STYLES.defaultView}>
				<HvText weight='semibold' size='l'>
					Seinustu Mælingar
				</HvText>
				<Card>
					<Card.Content>
						<HvText>Mæling</HvText>
						<View>
							{/* (flex down) */}
							{/* image 
                Status, absolute within image object
              */}
							{/* date of measurement */}
						</View>

						<View>{/* heading with a chevron icon (flex to right) */}</View>
					</Card.Content>
				</Card>
			</View>
		</SafeAreaView>
	);
};

export default MainScreen;
