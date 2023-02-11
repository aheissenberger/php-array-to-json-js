# PHP Array to JSON/JS

## Features

Convert a PHP Array to JSON (requires node and a php runtime)

## Installation

**npm**

```sh
npm install php-array-to-json-js
```

**Yarn**

```sh
yarn install php-array-to-json-js
```

## Requirements

**PHP Array** to JSON  needs to provide an executable **php interpreter** in the path.
Does only work in a nodejs environment as `spawn` is used to pipe the php array through php `json_encode`

## Usage

**ES Modules / ES6**

```Javascript
import {phpArray2json} from 'php-array-to-json-js'

const phpArray = '["key"=>[1,"string",,true]]'
const json = phpArray2json(json)
console.log(json) // {"key":[1,"string",,true]}

```

**UMD**

```Javascript
const {phpArray2json} = require('php-array-to-json-js')
```

### Roadmap

- [ ] 

### Contribution

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
1. Create your Feature Branch (git checkout -b feature/AmazingFeature)
1. Commit your Changes (git commit -m 'Add some AmazingFeature')
1. Push to the Branch (git push origin feature/AmazingFeature)
1. Open a Pull Request

### Built With

**no dependencies**

- [vitejs](https://vitejs.dev)
- [vitest](https://vitest.dev)

### License

Distributed under the "bsd-2-clause" License. See [LICENSE.txt](LICENSE.txt) for more information.
