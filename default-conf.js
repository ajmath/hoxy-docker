
function prettyUrl(req) {
  return `${req.protocol}//${req.hostname}${req.url}`;
}

module.exports = (proxy, hoxy) => {
  proxy.intercept('request', (req) => {
    console.log(` req -> ${req.method} ${prettyUrl(req)}`)
  });
  proxy.intercept('response', (req, resp) => {
    console.log(`resp <- ${resp.statusCode} ${req.method} ${prettyUrl(req)}`);
  });
}
