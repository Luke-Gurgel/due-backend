module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	globals: {
		'ts-jest': {
			babelConfig: true,
		},
	},
	testMatch: ['**/__tests__/**/*'],
	moduleFileExtensions: ['js', 'ts'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/__tests__/'],
}
