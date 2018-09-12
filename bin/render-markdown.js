#!/usr/bin/env node

const chalk = require('chalk')
const cli = require('cli')
const fs = require('fs-extra')
const render = require('../index.js')
const path = require('path')
const rimraf = require('rimraf')

const cwd = process.cwd()

const file = cli.argv[0]
const options = cli.parse({
  file: ['f', 'The name of the generated file', 'string', 'index'],
  layout: [
    false,
    'The markdown layout to use',
    'string',
    'mixu-bootstrap-2col',
  ],
  live: [
    'l',
    'If the application should run in livereload mode',
    'boolean',
    false,
  ],
  path: ['p', 'The output path', 'string', 'out'],
  pdf: [false, 'Render the pdf', 'boolean', false],
})

// Check options
if (file == null) {
  cli.setUsage('render-markdown [OPTIONS] file')

  console.log(cli.getUsage())
} else {
  // Check if file exists
  const filePath = path.resolve(cwd, file)

  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`Cannot find file ${file} (${filePath})!`))
  } else {
    options.filePath = filePath

    // Cleanup
    rimraf.sync(path.resolve(cwd, options.path))

    render(options)
  }
}
