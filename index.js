<<<<<<< HEAD
const { Platform } = require('react-native');

// Intl polyfill
// Needed only on Android when using Hermes since it doesn't yet
// support Intl. Issue tracking support: https://github.com/facebook/hermes/issues/23.
// On iOS the minimum version is 10 which has Intl support (https://caniuse.com/#feat=mdn-javascript_builtins_intl).

// if (Platform.OS === 'android' && !global.Intl) {
//   global.Intl = require('intl/lib/core');
//   global.IntlPolyfill = global.Intl;
//   require('intl/locale-data/jsonp/en');
// }

=======
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
require('./src/index.ts');