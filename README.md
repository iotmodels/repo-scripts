# DMR Repo Scripts

This scripts use the ES6 module syntax, in `package.json` set `type:"module"`/

To use with `Node.js 12.x` add the `--experimental-modules` flag. (Tested with `0.14x`)

```bash
npm i @ridomin/repo-scripts
```

```js
import { dtmi2path } from '@ridomin/repo-scripts'
const dtmi = 'dtmi:com:example:Thermostat;1'
console.log(dtmi, '->', dtmi2path(dtmi))
```
