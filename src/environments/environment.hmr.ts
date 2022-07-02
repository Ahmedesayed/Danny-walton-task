const project = require('../../package.json');

export const environment = {
  production: false,
  hmr: true,
  version: project.version,
  countrySettings: { country: 'UAE', countryCode: '+971', currency: 'AED' },
  apiUrl: 'https://ahoydev.azure-api.net/vendor/',
};
