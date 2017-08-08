require('babel-register')();

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

function noop() {
  return null;
}


global.document = jsdom('');

require.extensions['.css'] = noop;

global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
