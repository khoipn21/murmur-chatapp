import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			"linebreak-style": 0,
			"no-undef": "off",
			"no-empty": "off",
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": ["off"],
			"react/jsx-filename-extension": [
				"warn",
				{
					extensions: [".tsx"],
				},
			],
			"import/extensions": [
				"error",
				"ignorePackages",
				{
					ts: "never",
					tsx: "never",
				},
			],
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowExpressions: true,
				},
			],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error", // or error
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"react/jsx-no-useless-fragment": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react/require-default-props": "off",
			"react/prop-types": "off",
			"import/prefer-default-export": "off",
			"max-len": [
				"error",
				{
					code: 120,
				},
			],
			"react/function-component-definition": [
				2,
				{
					namedComponents: "arrow-function",
					unnamedComponents: "arrow-function",
				},
			],
		},
	},
);
