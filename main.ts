import { isDtmi, dtmiToPath } from './repo-convention.js'
const dtmi = 'dtmi:com:example:Thermostat;1'
console.log(isDtmi(dtmi))
console.log(dtmiToPath(dtmi))
