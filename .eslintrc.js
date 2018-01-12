module.exports = {
  "extends": "standard",
  "rules": {
    "semi": [
      2, "always"
    ],
    "newline-per-chained-call": [
      "error", {
        ignoreChainWithDepth: 2
      }
    ],
    "space-before-function-paren": [
      "error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "never"
      }
    ]
  }
};
