export const noDepsJson = {
  '@context': 'dtmi:dtdl:context;2',
  '@id': 'dtmi:test:onedep;1',
  '@type': 'Interface',
  displayName: 'onedep',
  contents: []
}

export const oneDepJson = {
  '@context': 'dtmi:dtdl:context;2',
  '@id': 'dtmi:test:onedep;1',
  '@type': 'Interface',
  displayName: 'onedep',
  extends: 'dtmi:test:base;1',
  contents: []
}

export const globalId = {
  '@context': 'dtmi:dtdl:context;2',
  '@id': 'dtmi:test:twodeps;1',
  '@type': 'Interface',
  displayName: 'onedep',
  extends: ['dtmi:test:base;1'],
  contents: [
    {
      '@id': 'dtmi:global;1',
      '@type': 'Component',
      name: 'temperature',
      schema: 'dtmi:test:onedep:comp1;1'
    }
  ]
}

export const twoDepsJsonExtendsArray = {
  '@context': 'dtmi:dtdl:context;2',
  '@id': 'dtmi:test:twodeps;1',
  '@type': 'Interface',
  displayName: 'onedep',
  extends: ['dtmi:test:base;1'],
  contents: [
    {
      '@type': 'Component',
      name: 'temperature',
      schema: 'dtmi:test:onedep:comp1;1'
    }
  ]
}

export const twoDepsJson = {
  '@context': 'dtmi:dtdl:context;2',
  '@id': 'dtmi:test:twodeps;1',
  '@type': 'Interface',
  displayName: 'onedep',
  extends: 'dtmi:test:base;1',
  contents: [
    {
      '@type': 'Component',
      name: 'temperature',
      schema: 'dtmi:test:onedep:comp1;1'
    }
  ]
}
