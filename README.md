# hoxy-docker

A lightweight container for [greim/hoxy](https://github.com/greim/hoxy)

## Usage

#### Basic example
Start up the proxy
`docker run -it -p 8080 ajmath/hoxy`

Try it out (in a separate shell)
`curl --proxy localhost:8080 example.com`

This loads up the [default config](./default-conf.js) which logs basic
information about requests and responses

#### Customizing the Proxy

To change the behavior of the proxy, you can mount a javascript file
to `/conf.js` inside the container similar to the one below:
```javascript
module.exports = (proxy) => {
  let opts = {
    phase: 'request',
    method: 'GET',
    hostname: 'example.com'
  };
  proxy.intercept(opts, (req, resp, cycle) => {
    console.log(`request made to: ${req.hostname}${req.url}`);
  });
}
```

And then to run the above config, you can use the following shell command
```shell
# assumes config is saved in a local file named conf.js
docker run -p 8080:8080 -v $(pwd)/conf.js:/conf.js -it ajmath/hoxy
```

See the [hoxy docs](http://greim.github.io/hoxy/) for the full feature set
