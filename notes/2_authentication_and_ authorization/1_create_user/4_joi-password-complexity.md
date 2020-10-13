## joi-password-complexity

- it is use to make user set complex password
- [npm link](https://www.npmjs.com/package/joi-password-complexity)
- [github link](https://github.com/kamronbatman/joi-password-complexity)

- steps to use

  - joi-password-complexity
  - ```js
    const passwordComplexity = require("joi-password-complexity");
    const complexityOptions = {
      min: 10,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2,
    };

    passwordComplexity(complexityOptions).validate("aPassword123!");
    ```
