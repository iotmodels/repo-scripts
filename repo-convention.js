import fs from 'fs'
import path from 'path'
import jsonata from 'jsonata'
import { dtmi2path } from './dtmi2path.js'
export { dtmi2path } from './dtmi2path.js'

export /**
 * @description Returns external IDs in extend and component schemas
 * @param {any}} rootJson
 * @returns {Array<string>}
 */
const getDependencies = dtdlJson => {
  const deps = []
  if (dtdlJson.extends) {
    if (Array.isArray(dtdlJson.extends)) {
      dtdlJson.extends.forEach(e => deps.push(e))
    } else {
      deps.push(dtdlJson.extends)
    }
  }
  if (dtdlJson.contents) {
    const comps = dtdlJson.contents.filter(c => c['@type'] === 'Component')
    comps.forEach(c => {
      if (typeof c.schema !== 'object') {
        if (deps.indexOf(c.schema) === -1) {
          deps.push(c.schema)
        }
      }
    })
  }
  return deps
}

export/**
 * @description Validates all internal IDs follow the namepspace set by the root id
 * @param {any} dtdlJson
 * @returns {boolean}
 */
const checkIds = dtdlJson => {
  const rootId = dtdlJson['@id']
  console.log(`checkIds: validating root ${rootId}`)
  const ids = jsonata('**."@id"').evaluate(dtdlJson)
  if (Array.isArray(ids)) {
    for (const id in ids) {
      console.log('found: ' + id)
      if (!id.split(';')[0].startsWith(rootId.split(';')[0])) {
        console.log(`ERROR: Document id ${id} does not satisfy the root id ${rootId}`)
        return false
      }
    }
    console.log(`checkIds: validated ${ids.length} ids`)
    return true
  } else {
    console.log('checkIds: ids not found')
    return true
  }
}

export /**
 * @description Checks if the folder/name convention matches the DTMI
 * @param {string} file
 * @returns {boolean}
 */
const checkDtmiPathFromFile = file => {
  const model = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const id = model['@id']
  if (id) {
    const expectedPath = path.normalize(dtmi2path(model['@id']))
    if (file !== expectedPath) {
      console.log(`ERROR: in current path ${file}, expecting ${expectedPath}.`)
      return false
    } else {
      console.log(`FilePath ${file} for ${id} seems OK.`)
      return true
    }
  } else {
    console.log('ERROR: @id not found.')
    return false
  }
}
