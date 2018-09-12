# README

Just a simple tool to render markdown files as html and pdf. Supports merging multiple markdown files.

## Usage

`render-markdown index.md`

This command will read the given input file and then process it:

1. If the file contains <!-- include:(.*) --> placeholders then these files will be included at this position
2. Output the merged markdown
3. Render the merged markdown as html
4. If the `--pdf` option is provided then a pdf will be rendered as well

## Options

```
Usage:
  render-markdown [OPTIONS] file

Options:
        --layout [STRING]     The markdown layout to use (Default is mixu-bootstrap-2col)
  -l,   --live BOOLEAN        If the application should run in livereload mode
  -of,  --outFile [STRING]    The name of the generated file (Default is index)
  -o,   --outPath [STRING]    The output path (Default is out)
  -p,   --pdf BOOLEAN         Render the pdf
  -h,   --help                Display help and usage details
```
