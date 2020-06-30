
//Register bable to transpile before our test run
require('babel-register')();

//diable features that mocha doesnt understand.
require.extensions['.css'] = function(){};
