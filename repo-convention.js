import fs from 'fs'
import path from 'path'
import jsonata from 'jsonata'

export const isDtmi = dtmi => RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(dtmi)

export const dtmiToPath = dtmi => isDtmi(dtmi) ? `/${dtmi.toLowerCase().replace(/:/g, '/').replace(';', '-')}.json` : null

export const getDependencies = rootJson => {
  let deps = []
  if (Array.isArray(rootJson)) {
    deps = rootJson.map(d => d['@id'])
    return deps
  }
  if (rootJson.extends) {
    if (Array.isArray(rootJson.extends)) {
      rootJson.extends.forEach(e => deps.push(e))
    } else {
      deps.push(rootJson.extends)
    }
  }
  if (rootJson.contents) {
    const comps = rootJson.contents.filter(c => c['@type'] === 'Component')
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

export const checkDependencies = dtmi => {
  let result = true
  const fileName = path.join(__dirname, dtmiToPath(dtmi))
  console.log(`Validating dependencies for ${dtmi} from ${fileName}`)
  const dtdlJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  const deps = getDependencies(dtdlJson)
  deps.forEach(d => {
    const fileName = path.join(__dirname, dtmiToPath(d))
    if (fs.existsSync(fileName)) {
      console.log(`Dependency ${d} found`)
      const model = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
      if (model['@id'] !== d) {
        console.error(`ERROR: LowerCase issue with dependent id ${d}. Was ${model['@id']}. Aborting`)
        result = result && true
      }
    } else {
      console.error(`ERROR: Dependency ${d} NOT found. Aborting`)
      result = false
    }
  })
  return result
}

export const checkIds = dtdlJson => {
  const rootId = dtdlJson['@id']
  console.log(`checkIds: validating root ${rootId}`)
  const ids = jsonata('**."@id"').evaluate(dtdlJson)
  if (Array.isArray(ids)) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
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

/**
 * @description Checks if the folder/name convention matches the DTMI
 * @param {string} file
 * @returns {boolean}
 */
export const checkDtmiPathFromFile = file => {
  const model = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const id = model['@id']
  if (id) {
    const expectedPath = path.normalize(dtmiToPath(model['@id']))
    if (path.normalize('/' + file) !== expectedPath) {
      console.log(`ERROR: in current path ${path.normalize(file)}, expecting ${expectedPath}.`)
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
// module.exports = { dtmiToPath, isDtmi, checkIds, getDependencies, checkDependencies, checkDtmiPathFromFile }
