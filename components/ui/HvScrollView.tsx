import { ScrollView, ScrollViewProps, StyleProp } from 'react-native';
// constants
import { TAB_HEIGHT } from '@/constants/sizes';


interface Props extends ScrollViewProps {
    style?: StyleProp<any>;
}

const HvScrollView = ({ children, style, ...props }: Props) => {

    return (
        <ScrollView
            fadingEdgeLength={TAB_HEIGHT + 42}
            {...props}
            style={[{marginBottom: TAB_HEIGHT}, style]}
        >
            {children}
        </ScrollView>
    );
}

export default HvScrollView;