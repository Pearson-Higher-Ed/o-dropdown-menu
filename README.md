# o-dropdown-menu [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-dropdown-menu.svg)](https://travis-ci.org/Pearson-Higher-Ed/o-dropdown-menu) [![Coverage Status](https://coveralls.io/repos/Pearson-Higher-Ed/o-dropdown-menu/badge.svg?branch=master&service=github)](https://coveralls.io/github/Pearson-Higher-Ed/o-dropdown-menu?branch=master)

Contextual menu for displaying list items.

## Quick start

TODO

## API

### Events

| Event Name               | Description                                         |
|--------------------------|-----------------------------------------------------|
| oDropdownMenu.expand     | Fires when the menu items are expanded.             |
| oDropdownMenu.collapse   | Fires when the menu items are collapsed.            |

```js
document.querySelector('#dropdown-menu').addEventListener('oDropdownMenu.expand', function (e) {
	// Do something
});
```

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
