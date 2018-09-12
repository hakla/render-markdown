const fs = require('fs-extra')
const render = require('markdown-styles/lib/render')
const path = require('path')

module.exports = function(markdown, outPath, file, layout) {
  return new Promise((resolve, reject) => {
    fs.mkdirpSync(outPath)
    let tmp = path.resolve(outPath, `${file}.md`)

    // write temporary file
    fs.writeFileSync(tmp, markdown)

    // Set console.log to a dummy function because render will log a lot we don't want to display
    const log = console.log
    console.log = () => {}

    const options = {
      headerLinks: true,
      input: tmp,
      isSingleFile: true,
      layout: path.resolve(
        __dirname,
        '../node_modules/markdown-styles/layouts/' + layout
      ),
      layouts: false,
      output: outPath,
      version: false,
    }

    render(options, err => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}
