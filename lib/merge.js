const fs = require('fs-extra')
const path = require('path')

const include = /<!-- include:(.*)? -->/

/**
 * Merge a given file with all it's references (defined via <!-- include:(.*) --> in the file)
 * @param {string} file The index file
 */
module.exports = function(file) {
  const folder = path.dirname(file)

  return new Promise((resolve, reject) => {
    const index = path.resolve(file)

    fs.readFile(index, (err, data) => {
      if (err) reject(err)

      let source = data.toString()
      let match

      do {
        match = include.exec(source)

        if (match) {
          let filename = match[1]
          let value = `\nCouldn't find ${filename}\n\n`

          try {
            value = fs
              .readFileSync(path.resolve(folder, `${match[1]}.md`))
              .toString()
          } catch (e) {}

          source = source.replace(match[0], value)
        }
      } while (match)

      resolve(source)
    })
  })
}
