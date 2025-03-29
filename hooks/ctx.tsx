import { useContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { GetRafraenSkilriki, GetUserId } from '@/queries/queries';
import { AuthenticationContext } from '@/contexts/authenticationContext';

/**
 * Hook to get session state
 * @returns session state
 * @throws error if used outside of SessionProvider
 */
export const useSession = (): {
	signIn: (SSN: string) => Promise<string>;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
} => {
	const value = useContext(AuthenticationContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useSession must be wrapped in a <SessionProvider />');
		}
	}
	return value;
};

/**
 * Provider to handle session state
 * @param children - children components
 * @returns session provider component
 */
export const SessionProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [[isLoading, session], setSession] = useStorageState('session');

	// const queryClient = useQueryClient();
	const HandleSignIn = async (SSN: string): Promise<string> => {
		const userSSN = await GetRafraenSkilriki(SSN);

		const userId = await GetUserId(String(userSSN));

		setSession(userId);
		return userId; // Return the user ID
	};

	return (
		<AuthenticationContext.Provider
			value={{
				signIn: HandleSignIn,
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
