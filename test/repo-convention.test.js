import { isDtmi, dtmiToPath, getDependencies, checkIds, checkDtmiPathFromFile, resolveDtmi } from '../repo-convention.js'
import { noDepsJson, oneDepJson, twoDepsJson, globalId } from './test-models'

test('is valid dtmi', () => {
  expect(isDtmi('dtmi:with::twosemicolons;1')).toBe(false)
})

test('invalid dtmi', () => {
  expect(dtmiToPath('')).toBe(null)
  expect(dtmiToPath('notadtmi')).toBe(null)
  expect(dtmiToPath('dtmi:notadtmi')).toBe(null)
  expect(dtmiToPath('dtmi:com:example:thermostat:1')).toBe(null)
  expect(dtmiToPath('dtmi:com:example-bad:thermostat;1')).toBe(null)
})

test('dtmi to path', () => {
  expect(dtmiToPath('dtmi:com:example:Thermostat;1')).toBe('/dtmi/com/example/thermostat-1.json')
  expect(dtmiToPath('dtmi:com:Example:thermostat;1')).toBe('/dtmi/com/example/thermostat-1.json')
})

test('get dependencies', () => {
  expect(getDependencies(noDepsJson)).toEqual([])
  expect(getDependencies(oneDepJson)).toEqual(['dtmi:test:base;1'])
  expect(getDependencies(twoDepsJson)).toEqual(['dtmi:test:base;1', 'dtmi:test:onedep:comp1;1'])
})

test('check ids', () => {
  expect(checkIds(globalId)).toBe(false)
  expect(checkIds(oneDepJson)).toBe(true)
})

test('checkDtmiPathFromFile', () => {
  expect(checkDtmiPathFromFile('dtmi/azure/devicemanagement/deviceinformation-1.json')).toBe(true)
  expect(checkDtmiPathFromFile('test/badpath.json')).toBe(false)
})

test('resolveDtmi_noDeps', async () => {
  const models = await resolveDtmi('dtmi:azure:DeviceManagement:DeviceInformation;1')
  console.log(models.length)
  expect(models.length).toBe(1)
})

test('resolveDtmi_Deps', async () => {
  const models = await resolveDtmi('dtmi:com:example:TemperatureController;1')
  console.log(models.length)
  expect(models.length).toBe(3)
})

test('resolveDtmi_DepsExpanded', async () => {
  const models = await resolveDtmi('dtmi:Espressif:SensorController;2', null, true)
  console.log(models.length)
  expect(models.length).toBe(6)
})
