const chalk = require('chalk')
const chokidar = require('chokidar')
const express = require('express')
const fs = require('fs-extra')
const livereload = require('livereload')
const path = require('path')

const cwd = process.cwd()
const livereloadSnippet = `
<script>
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
</script>
`

module.exports = function(options) {
  const file = path.resolve(cwd)
  const regenerate = require('./generate').regenerate(options)

  chokidar
    .watch(file, {
      ignoreInitial: true,
      ignored: new RegExp(`${options.path}.*$`),
    })
    .on('add', regenerate('add'))
    .on('change', regenerate('change'))
    .on('unlink', regenerate('unlink'))

  const app = express()

  app.get('/', function(req, res) {
    const file = path.resolve(options.path, options.file + '.html')

    fs.readFile(file, function(err, buffer) {
      if (err) {
        res.status(404).send('404 Not found')
      } else {
        res.set('Content-Type', 'text/html')
        res.send(buffer + livereloadSnippet)
      }
    })
  })

  app.use(express.static(options.path))

  app.listen('5555', () => {
    console.info(
      chalk.green('Listening on: ') + chalk.yellow('http://localhost:5555')
    )
  })

  const lrserver = livereload.createServer()
  lrserver.watch(path.resolve(cwd, 'out'))
}
