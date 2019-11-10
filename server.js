const StaticServer = require('static-server')

const server = new StaticServer({
  rootPath: './dist/',
  port: 4000
})

server.start(() => {
  console.log('Server started at port: ', server.port)
})