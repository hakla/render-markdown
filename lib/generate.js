const chalk = require('chalk')
const merge = require('./merge')
const resolve = require('path').resolve
const pdf = require('./pdf')
const styles = require('./styles')

const cwd = process.cwd()

module.exports = {
  generate: async (options, cb) => {
    try {
      console.info(chalk.green('Merging markdown files...'))

      // Merge markdown files
      const markdown = await merge(options.filePath)

      console.info(chalk.green('Rendering markdown to html...'))

      // Render html
      await styles(
        markdown,
        resolve(cwd, options.path),
        options.file,
        options.layout
      )

      if (options.pdf) {
        console.info(chalk.green('Rendering pdf...'))

        // Create pdf
        await pdf(
          resolve(cwd, options.path, `${options.file}.md`),
          resolve(cwd, options.path, `${options.file}.pdf`)
        )
      }

      console.info(chalk.green('Done!'))

      if (typeof cb === 'function') {
        cb()
      }
    } catch (err) {
      console.error(chalk.red(err))

      if (typeof cb === 'function') {
        cb(err)
      }
    }
  },
  regenerate: options => (event, cb) => {
    return file => {
      console.info(chalk.blue(`${event} ${file}`))

      module.exports.generate(options, cb)
    }
  },
}
