import { useState } from 'react';

/**
 * Custom hook to toggle a boolean state
 * @param initialState initial state of the toggle
 * @returns toggled state and functions to set the state
 */
export const useToggle = (
	initialState = false,
): {
	toggled: boolean;
	setToggled: (value: boolean) => void;
	toggle: () => void;
	setToggledTrue: () => void;
	setToggledFalse: () => void;
} => {
	const [toggled, setToggled] = useState(initialState);

	const toggle = () => {
		setToggled((prev) => !prev);
	};

	const setToggledTrue = () => {
		setToggled(true);
	};

	const setToggledFalse = () => {
		setToggled(false);
	};

	return {
		toggled,
		setToggled,
		toggle,
		setToggledTrue,
		setToggledFalse,
	};
};
