import { useContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { GetToken } from '@/queries/get';
import { AuthenticationContext } from '@/contexts/authenticationContext';
import { getClaimBySubstring } from '@/utility/utility';

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
	token: string;
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

	/**
	 * Function to handle sign in process
	 * @param SSN - social security number
	 * @returns token
	 */
	const HandleSignIn = async (SSN: string): Promise<string> => {
		const token = await GetToken(SSN);
		const role = getClaimBySubstring(token, 'role');

		if (role === 'Patient') {
			setSession(token);
		} else {
			throw new Error('Wrong social security number');
		}
		return token;
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
				token: session ? session.toString() : '',
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
