import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import { LIGHT_THEME, WHITE } from '@/constants/colors';
import HvToggleSelect from '@/components/ui/hvInputForm/hvToggleSelect';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';


const MainMeasurements = () => {
    // radio buttons
    const [hand, setHand] = useState('Hægri');
    const [position, setPosition] = useState('Sitjandi');
    // num inputs
    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [pulse, setPulse] = useState('');

    return (
        <HvScrollView>
            <View style={STYLES.defaultView}>
                <HvInputForm onPress={() => console.log("banana")}>
                    <HvInputFormContainer>
                        <HvToggleSelect
                        itemState={hand}
                        setItemState={setHand}
                        leftIcon={require('@/assets/svgs/handLeft.svg')}
                        rightIcon={require('@/assets/svgs/handRight.svg')}
                        description='Mæli hönd'
                        leftText='Vinstri'
                        rightText='Hægri'
                        />
                    </HvInputFormContainer>

                    <HvInputFormContainer>
                        <HvToggleSelect
                        itemState={position}
                        setItemState={setPosition}
                        leftIcon={require('@/assets/svgs/sitting.svg')}
                        rightIcon={require('@/assets/svgs/laying.svg')}
                        description='Líkamsstaða'
                        leftText='Sitjandi'
                        rightText='Liggjandi'
                        />
                    </HvInputFormContainer>
                    
                    <HvInputFormContainer>
                        <HvInputField
                            itemState={sys}
                            setItemState={setSys}
                            header='Efri mörk'
                            description='SYS'
                            metric='mmHg'
                        />
                        <HvInputField
                            itemState={dia}
                            setItemState={setDia}
                            header='Neðri mörk'
                            description='DIA'
                            metric='mmHg'
                        />
                        <HvInputField
                            itemState={pulse}
                            setItemState={setPulse}
                            description='Púls'
                            metric='bpm'
                        />
                    </HvInputFormContainer>
                </HvInputForm>
            </View>
        </HvScrollView>
    );
}

const Styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 20,
        gap: 20,
        borderRadius: 10,
        backgroundColor: WHITE,
        maxWidth: 500,
    },
    itemsContainer: {
        padding: 20,
        gap: 30,
        borderRadius: 10,
        backgroundColor: LIGHT_THEME,
    },
});


export default MainMeasurements;


{/* <Card>
    <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
    >
        <Card.Content>
            <HvText>Þyngd</HvText>
            <HvText>Hæð</HvText>
        </Card.Content>
    </TouchableRipple>
</Card> */}