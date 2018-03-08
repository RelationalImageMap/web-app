// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: any = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCQjwx9ZU8LEtUrrsoiJ69RTprvnlplBKk',
    authDomain: 'relational-image-map-dev.firebaseapp.com',
    databaseURL: 'https://relational-image-map-dev.firebaseio.com',
    projectId: 'relational-image-map-dev',
    storageBucket: 'relational-image-map-dev.appspot.com',
    messagingSenderId: '453965883992'
  },
  appEngine: {
    search: 'search.relational-image-map-dev.appspot.com'
  },
  googleMapsKey: 'AIzaSyBBDkyP3RXebHeSh5p9z7R1WUR-XtDFBUg'
};
