import path from 'path'
import { checkDtmiPathFromFile } from '../../repo-convention'

for (let i = 1; i < process.argv.length; i++) {
  const file = path.normalize(process.argv[i])
  const fullFilePath = path.normalize((path.join(process.cwd(), process.argv[i])))
  if (fullFilePath.startsWith(path.join(process.cwd(), 'dtmi/'))) {
    console.log('\nchecking: ' + file)
    checkDtmiPathFromFile(file)
  } else {
    console.debug('Skipping file: ' + file)
  }
}
