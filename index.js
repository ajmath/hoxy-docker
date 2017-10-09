const hoxy = require('hoxy');
const fs = require('fs');

let certAuthority;
if (process.env.CA_KEY) {
  certAuthority = {
    key: fs.readFileSync(process.env.CA_KEY),
    cert: fs.readFileSync(process.env.CA_CERT),
  };
}

const proxy = hoxy.createServer({
  certAuthority,
}).listen(8080);
proxy.log('error warn', process.stderr);
proxy.log('info', process.stdout);

let confPath = process.env.CONF || '/conf.js';
if (!fs.existsSync(confPath)) {
  console.warn(`No conf file found at ${confPath}. Did you mount the config file? See README.md for details`);
  console.warn(`Using the default logging conf`);
  confPath = '/app/default-conf.js';
}

let conf;
try {
  conf = require(confPath);
} catch (err) {
  console.error(`Error loading config from ${confPath}`, err);
  process.exit(1);
}

if (typeof conf !== 'function') {
  console.error('Config file did not export a function.  See README.md for details', conf);
  process.exit(1);
}

conf(proxy, hoxy);
