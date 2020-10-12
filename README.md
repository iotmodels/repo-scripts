# DMR Repo Scripts

This scripts use the ES6 module syntax, in `package.json` set `type:"module"`/

To use with `Node.js 12.x` add the `--experimental-modules` flag. (Tested with `0.14x`)

```bash
npm i @ridomin/repo-scripts
```

```ts
// main.ts
import * as rc from '@ridomin/repo-scripts'
console.log(rc.isDtmi('aaa'))
console.log(rc.dtmiToPath('dtmi:com:ee:aa;1'))
```

Build with

```bash
tsc -t es6 --outDir ./out --moduleResolution node  .\main.ts
```

Run with

```bash
node ./out/main.js
```
