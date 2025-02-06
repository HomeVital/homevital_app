import { ScrollView, ScrollViewProps } from 'react-native';
// constants
import { TAB_HEIGHT } from '@/constants/sizes';


interface Props extends ScrollViewProps {
}

const HvScrollView = ({ ...props }: Props) => {

    return (
        <ScrollView
        fadingEdgeLength={TAB_HEIGHT + 42}
        style={[{marginBottom: TAB_HEIGHT}, props.style]}
        >
            {props.children}
        </ScrollView>
    );
}

export default HvScrollView;