/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    //setupFiles: ["/home/kethlyn/Documents/vscode/villainbnb/tests/base.test.ts"],
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    globals: {
      "ts-jest": {
        useESM: true,
      },
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
  };