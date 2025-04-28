import { createContext } from 'react';

const ModalContext = createContext<{
	addBPVisible: boolean;
	setAddBPVisible: (visible: boolean) => void;
	addBSVisible: boolean;
	setAddBSVisible: (visible: boolean) => void;
	addBOVisible: boolean;
	setAddBOVisible: (visible: boolean) => void;
	addBWVisible: boolean;
	setAddBWVisible: (visible: boolean) => void;
	addBTVisible: boolean;
	setAddBTVisible: (visible: boolean) => void;
	validationVisible: boolean;
	setValidationVisible: (visible: boolean) => void;
	validationStatus: string;
	setValidationStatus: (status: string) => void;
}>({
	addBPVisible: false,
	setAddBPVisible: () => null,
	addBSVisible: false,
	setAddBSVisible: () => null,
	addBOVisible: false,
	setAddBOVisible: () => null,
	addBWVisible: false,
	setAddBWVisible: () => null,
	addBTVisible: false,
	setAddBTVisible: () => null,
	validationVisible: false,
	setValidationVisible: () => null,
	validationStatus: '',
	setValidationStatus: () => null,
});

export default ModalContext;
