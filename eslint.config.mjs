import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                requestAnimationFrame: "readonly",
                localStorage: "readonly",
                IntersectionObserver: "readonly",
                fetch: "readonly",
                FormData: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": ["warn", { "allow": ["warn", "error"] }]
        }
    }
];
