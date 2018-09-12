const markdownPdf = require('markdown-pdf')

module.exports = function(input, output) {
  return new Promise((resolve, reject) => {
    markdownPdf()
      .from(input)
      .to(output, err => {
        if (err) reject(err)
        else resolve()
      })
  })
}
