# import-sort-style-local

Style plugin for import-sort that takes into account local modules (~/).

## Installation

Install it using your favorite package manager. For example, with `npm`:

```bash
$ npm i -D import-sort-style-local
```

## Usage

Add it to `.importsortrc`:

```
{
  ".ts, .tsx": {
    "parser": "typescript",
    "style": "local"
  }
}
```
