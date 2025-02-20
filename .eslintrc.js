// https://docs.expo.dev/guides/using-eslint/

// ignorePatterns: ['/dist/*'],
module.exports = {
	root: true,
	extends: [
		'expo',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react'],
	env: {
		browser: true,
		node: true,
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'warn',
		'react/prop-types': 'off',
		'@typescript-eslint/no-explicit-any': 'error', // Disallow usage of any
		'@typescript-eslint/explicit-module-boundary-types': 'error', // Ensure types are explicitly declared
		// "@typescript-eslint/no-var-requires": "off",
		'@typescript-eslint/no-require-imports': 'off',
	},
};
