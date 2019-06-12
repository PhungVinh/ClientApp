const packageJson = require('../../package.json');

export const environment = {
  appName: 'CRM',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  serverApi: 'http://192.168.50.37:50000/api',
  serverResource: 'http://192.168.50.37:50000/Images',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
  }
};
