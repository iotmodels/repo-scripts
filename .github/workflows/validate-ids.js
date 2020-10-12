import fs from 'fs'
import path from 'path'

const { checkIds } = require('../../repo-convention')

for (let i = 2; i < process.argv.length; i++) {
  const file = path.normalize((path.join(process.cwd(), process.argv[i])))
  if (file.startsWith(path.join(process.cwd(), 'dtmi/'))) {
    console.log('\nchecking: ' + file)
    if (!checkIds(JSON.parse(fs.readFileSync(file, 'utf-8')))) {
      console.error(`ERROR validating ids on file ${file}. Aborting.`)
      process.exit(1)
    }
  } else {
    console.debug('Skipping file: ' + file)
  }
}
