// import { useEffect, useCallback } from 'react';
// import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// interface ButtonAnimationProps {
// 	state: boolean;
// 	index: number;
// 	bottom: number;
// 	radius: number;
// 	roundness: number;
// 	buttonsLength: number;
// }

// const useButtonAnimation = ({
// 	state,
// 	index,
// 	bottom,
// 	radius,
// 	roundness,
// 	buttonsLength,
// }: ButtonAnimationProps): {
// 	bottom: number;
// 	left: number;
// 	position: 'absolute';
// } => {
// 	const radianConverter = useCallback(
// 		(index: number): number => {
// 			return (
// 				((index + 0.5) / buttonsLength) * (Math.PI * (roundness * 2)) +
// 				Math.PI * ((1 - roundness * 2) / 2)
// 			);
// 		},
// 		[buttonsLength, roundness],
// 	);

// 	const buttonAnimatedStyles = useCallback(
// 		(index: number): { bottom: number; left: number } => {
// 			return {
// 				bottom:
// 					Math.sin(radianConverter(index)) * Math.sqrt(buttonsLength) * radius + bottom,
// 				left: Math.cos(radianConverter(index)) * Math.sqrt(buttonsLength) * radius,
// 			};
// 		},
// 		[bottom, radius, buttonsLength, radianConverter],
// 	);

// 	const position = useSharedValue({ bottom: 0, left: 0 });

// 	useEffect(() => {
// 		position.value = withTiming(state ? buttonAnimatedStyles(index) : { bottom: 0, left: 0 });
// 	}, [state, index, position, buttonAnimatedStyles]);

// 	const buttonStyle = useAnimatedStyle(() => {
// 		return {
// 			bottom: position.value.bottom,
// 			left: position.value.left,
// 			position: 'absolute',
// 		};
// 	});

// 	return buttonStyle;
// };

// export default useButtonAnimation;
