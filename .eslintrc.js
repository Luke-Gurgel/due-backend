module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		plugins: ['typescript'],
	},
	env: {
		es6: true,
		node: true,
		'jest/globals': true,
	},
	plugins: ['@typescript-eslint', 'jest'],
	extends: [
		'prettier',
		'prettier/@typescript-eslint',
		'plugin:jest/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	rules: {
		'space-before-function-paren': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'no-unexpected-multiline': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/camelcase': 'off',
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['src', './src/'],
					['__tests__', './__tests__/'],
				],
				extensions: ['.js', '.ts', '.json'],
			},
		},
	},
}
