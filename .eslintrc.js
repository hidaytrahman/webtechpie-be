module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		// 'prettier/prettier': [
		//     'error',
		//     {
		//         endOfLine: 'auto',
		//     },
		//     { usePrettierrc: true },
		// ],

		// 'prettier/prettier': ['error', { printWidth: 120 }],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		indent: ['error', 'tab'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				printWidth: 80,
				trailingComma: 'es5',
				semi: true,
				doubleQuote: true,
				jsxSingleQuote: true,
				singleQuote: false,
				useTabs: true,
				tabWidth: 4,
			},
		],
	},
};
