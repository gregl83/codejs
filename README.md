[![Build Status](https://travis-ci.org/gregl83/codejs.svg?branch=master)](https://travis-ci.org/gregl83/codejs)
[![Coverage Status](https://coveralls.io/repos/gregl83/codejs/badge.svg)](https://coveralls.io/r/gregl83/codejs?branch=master)
# codejs

JavaScript Code class for NodeJS and Browsers

Codejs provides a robust class factory for compound codes with character separator(s) or delimiter(s).

Create new code objects or re-build existing ones from data in a supported formats (`array`, `string`, or `object`).

Features include code segment type checking, default segment values, and regex code validation.

## Requirements

### NodeJS

- NodeJS v0.12.x or higher
- NPM

See `./package.json`

### Browser

- Any modern browser with JavaScript enabled

## Installation

Source available on [GitHub](https://github.com/gregl83/codejs) or install module via NPM:

    $ npm install codejs
    
See project root for browser compatible script.

## Usage

After requiring Codejs create a Code class using supported options. Create instances from resulting Code class.

```js
var Codejs = require('codejs');

// Code class options (see `Options`)
var options = {
  "separator": "-",
  "parts": [
    {
      "name": "alpha",
      "type": "string",
      "default": "a",
      "separator": "-"
    },
    {
      "name": "beta",
      "type": "string",
      "default": "b"
    }
  ],
  "regex": "^([a-z]+)\-([a-z]+)$"
};

// create Code class
var Code = new Codejs(options);

// create code class instance
var code = new Code("a-b");

// cast code instance in various formats
var codeArray = code.toArray();
var codeString = code.toString();
var codeObject = code.toObject(); 
```

The above first creates a new Code class and then creates a instance of that class.

That's it!

## Options

The following are the supported options for creating a Code class.

- `separator` character that separates or delimits compound code segments
- `parts` array of objects used to define each segment in a compound code
  - `parts.name` name used to distinguish code segment
  - `parts.type` segment value type `string` or `number`
  - `parts.default` default segment value (optional)
  - `parts.separator` character that separates or delimits the following segment (optional: defaults to main separator)
- `regex` regular expression to test code instance against (optional)

## License

MIT