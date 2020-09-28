import fs from 'fs'
import { dtmi2path, getDependencies, checkIds, checkDtmiPathFromFile } from './repo-convention.js'

const readFile = file => {
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

test('invalid dtmi', () => {
  expect(dtmi2path('notadtmi')).toBe('NOT-VALID-DTMI')
  expect(dtmi2path('dtmi:notadtmi')).toBe('NOT-VALID-DTMI')
  expect(dtmi2path('dtmi:com:example:thermostat:1')).toBe('NOT-VALID-DTMI')
  expect(dtmi2path('dtmi:com:example-bad:thermostat:1')).toBe('NOT-VALID-DTMI')
})

test('dtmi to path', () => {
  expect(dtmi2path('dtmi:com:example:Thermostat;1')).toBe('dtmi/com/example/thermostat-1.json')
  expect(dtmi2path('dtmi:com:Example:thermostat;1')).toBe('dtmi/com/example/thermostat-1.json')
})

test('get dependencies', () => {
  expect(getDependencies(readFile('dtmi/test/onedep-1.json'))).toEqual(['dtmi:test:base;1', 'dtmi:test:onedep:comp1;1'])
  expect(getDependencies(readFile('dtmi/test/uniqueids-1.json'))).toEqual([])
})

test('check ids', () => {
  expect(checkIds(readFile('dtmi/test/uniqueids-1.json'))).toBe(false)
  expect(checkIds(readFile('dtmi/test/onedep-1.json'))).toBe(true)
})

test('checkDtmiPathFromFile', () => {
  expect(checkDtmiPathFromFile('dtmi/test/uniqueids-1.json')).toBe(true)
  expect(checkDtmiPathFromFile('dtmi/test/badpath.json')).toBe(false)
})
