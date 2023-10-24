# js-runtime-checker

![project logo](./logo/logo.png)

This is an npm library that can retrieve the currently running JavaScript Runtime environment.

## Usage

Install:

```
npm install js-runtime-checker
```

Example:

```javascript
import { getEnv } from 'js-runtime-checker';
console.log(getEnv()); // "deno" | "bun" | "nodejs" | "browser" | "unknown"
```

## License

MIT