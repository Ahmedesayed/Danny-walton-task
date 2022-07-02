const project = require('../../package.json');

export const environment = {
  production: true,
  hmr: false,
  version: project.version,
  countrySettings: { country: 'UAE', countryCode: '+971', currency: 'AED' },
  apiUrl: 'https://ahoyapis.azure-api.net/vendor/',
};
