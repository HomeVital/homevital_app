import { createContext } from 'react';

export const AuthenticationContext = createContext<{
	signIn: (SSN: string) => Promise<string>;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: async () => '',
	signOut: () => null,
	session: null,
	isLoading: false,
});
