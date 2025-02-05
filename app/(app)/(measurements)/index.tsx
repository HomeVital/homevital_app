import { View, StyleSheet } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
// components
import HvText from '@/components/ui/hvText';
// constants
import { STYLES } from '@/constants/styles';


const MainMeasurements = () => {
    return (
        <View style={[STYLES.defaultView, Styles.container]}>
            <Card>
                <TouchableRipple
                    onPress={() => console.log('Pressed')}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Card.Content>
                        <HvText>Þyngd</HvText>
                        <HvText>Hæð</HvText>
                    </Card.Content>
                </TouchableRipple>
            </Card>
        </View>
    );
}

const Styles = StyleSheet.create({
    Surface: {
        borderRadius: 10,
    },
    container: {
        paddingTop: 20,
    }
});
  

export default MainMeasurements;