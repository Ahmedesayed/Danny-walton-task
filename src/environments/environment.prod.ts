const project = require('../../package.json');

export const environment = {
  production: true,
  hmr: false,
  version: project.version,
  countrySettings: { country: 'UAE', countryCode: '+971', currency: 'AED' },
  apiUrl: 'http://localhost:3080/api/',
};
