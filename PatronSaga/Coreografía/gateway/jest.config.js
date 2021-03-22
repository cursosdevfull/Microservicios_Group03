module.exports = {
	testEnvironment: `node`,
	bail: true,
	verbose: true,
	setupFilesAfterEnv: [`jest-extended`],
	reporters: [
		`default`,
		[
			`jest-html-reporters`,
			{
				publicPath: `reports`,
				filename: `test.v2.html`,
			},
		],
		[
			`./node_modules/jest-html-reporter`,
			{
				pageTitle: `Test API`,
				outputPath: `reports/test.v1.html`,
			},
		],
	],
	collectCoverage: true,
	collectCoverageFrom: [
		`src/**/*.ts`,
		`!**/node_modules/**`,
		`!src/**/*.entity.ts`,
	],
	coverageReporters: [`json`, `text`, `html`, 'lcov'],
	coverageDirectory: `reports/coverage`,
	testPathIgnorePatterns: [`/node_modules/`],
	testResultsProcessor: 'jest-sonar-reporter',
	testMatch: ['<rootDir>/test/**/*.spec.ts'],
	preset: `ts-jest`,
};
