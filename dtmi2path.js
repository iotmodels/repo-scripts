export /**
 * @description Converts DTMI to dtmi/com/example/device-1.json path
 * @param {string} dtmi
 * @returns {string)}
 */
const dtmi2path = dtmi => {
  if (RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(dtmi)) {
    const idAndVersion = dtmi.toLowerCase().split(';')
    const ids = idAndVersion[0].split(':')
    const fileName = `${ids.pop()}-${idAndVersion[1]}.json`
    const modelFolder = ids.join('/')
    return `${modelFolder}/${fileName}`
  } else return 'NOT-VALID-DTMI'
}
