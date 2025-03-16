import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { GetRafraenSkilriki, GetUserId } from '@/queries/queries';

const AuthContext = createContext<{
	signIn: (SSN: string) => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	isLoading: false,
});

// This hook can be used to access the user info.
export const useSession = (): {
	signIn: (SSN: string) => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
} => {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useSession must be wrapped in a <SessionProvider />');
		}
	}
	return value;
};

export const SessionProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [[isLoading, session], setSession] = useStorageState('session');

	// const queryClient = useQueryClient();
	const HandleSignIn = async (SSN: string) => {
		try {
			const userSSN = await GetRafraenSkilriki(SSN);

			const userId = await GetUserId(String(userSSN));

			setSession(userId);
		} catch (error) {
			console.error('Sign-in error:', error);
		}
	};

	// const signInMutation = useMutation<string, Error, string>(
	// 	async (SSN: string) => {
	// 		const userSSN = await GetRafraenSkilriki(SSN);
	// 		const userId = await GetUserId(userSSN);
	// 		return userId;
	// 	},
	// 	{
	// 		onSuccess: (userId: string) => {
	// 			setSession(userId);
	// 			queryClient.setQueryData(['session'], userId);
	// 		},
	// 		onError: (error: Error) => {
	// 			console.error('Sign-in error:', error);
	// 		},
	// 	},
	// );

	return (
		<AuthContext.Provider
			value={{
				signIn: (SSN: string) => {
					HandleSignIn(SSN);
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
