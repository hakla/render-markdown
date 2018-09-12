const generate = require('./lib/generate').generate
const livereload = require('./lib/livereload')

module.exports = function(options) {
  if (options.live) {
    generate(options, function(err) {
      if (err) {
        throw err
      } else {
        livereload(options)
      }
    })
  } else {
    generate(options)
  }
}
