module.exports = {
  extends: ["next/core-web-vitals"],
  overrides: [
    {
      files: ["src/app/(site)/**/*.tsx"],
      rules: {
        "no-restricted-syntax": [
          "error",
          {
            selector: "Literal[value=/^https?:/i]",
            message: "Nao use URLs hardcoded; use cdn(path) ou APIs.",
          },
        ],
      },
    },
  ],
  ignorePatterns: ["**/api/**", "**/*.config.*"],
};
