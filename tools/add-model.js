import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import mkdirp from 'mkdirp'
import { dtmiToPath, checkIds, checkDependencies } from '../repo-convention.js'

const createInterfaceFromFile = async file => {
  const jsonDtdl = JSON.parse(readFileSync(file, 'utf-8'))
  await createInterfaceFromJson(jsonDtdl)
}

const createInterfaceFromJson = async jsonDtdl => {
  const dtmi = jsonDtdl['@id']
  const fileName = join(process.cwd(), dtmiToPath(dtmi))
  if (existsSync(fileName)) {
    console.log(`WARNING: ID ${dtmi} already exists at ${fileName} . Skipping `)
  } else {
    await mkdirp(dirname(fileName))
    writeFileSync(fileName, JSON.stringify(jsonDtdl, null, 2))
    console.log(`Model ${dtmi} added successfully to ${fileName}`)
  }
}

/**
 * @description Adds a model to the repo. Validates ids, dependencies and set the right folder/file name
 * @param {string} file
 */
const addModel = async file => {
  const rootJson = JSON.parse(readFileSync(file, 'utf-8'))
  if (Array.isArray(rootJson)) {
    for await (const d of rootJson) {
      checkIds(d)
      await createInterfaceFromJson(d)
    }
    return rootJson[0]['@id']
  } else {
    checkIds(rootJson)
    await createInterfaceFromFile(file)
    return rootJson['@id']
  }
}

const main = async () => {
  const file = process.argv[2]
  console.log(`processing: ${file}`)
  const id = await addModel(file)
  console.log('added', id)
  if (id && !checkDependencies(id)) {
    unlinkSync(join(process.cwd(), dtmiToPath(id)))
    console.log('ERROR: Dont forget to include all the dependencies before submitting.')
    process.exit(1)
  }
  console.log(`SUCCESS: File ${file} added to ${dtmiToPath(id)}`)
}

main()
