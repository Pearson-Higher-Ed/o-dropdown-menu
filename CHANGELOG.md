<a name="0.9.0"></a>
# [0.9.0](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/compare/v0.8.0...v0.9.0) (2015-09-08)


### Bug Fixes

* keyboard navigation with arrow keys when menu items in the middle of the list are hidden ([b18561f](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/b18561f))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/compare/v0.7.1...v0.8.0) (2015-09-03)


### Features

* add support for headings ([990db15](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/990db15))



<a name="0.7.1"></a>
## 0.7.1 (2015-09-02)


### chore

* chore: fix inline demos ([f02671f](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/f02671f))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/compare/v0.6.0...v0.7.0) (2015-08-31)


### Bug Fixes

* keyboard navigation does not work when there are hidden menu items ([9069d4e](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/9069d4e))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/compare/v0.5.0...v0.6.0) (2015-08-26)


### Features

* add expand and collapse events ([5c9c73a](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/5c9c73a))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/compare/v0.4.0...v0.5.0) (2015-08-14)


### Features

* set outline-offset for menu items to contain focus outline within the menu items element ([6b11a49](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/6b11a49))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/compare/v0.3.0...v0.4.0) (2015-08-13)


### Bug Fixes

* variable name ([ac1ac63](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/ac1ac63))

### Features

* remove data-o-component ([88b1179](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/88b1179))


### Breaking Changes

* data-o-component="o-dropdown-menu" is no longer supported. Use the
module name class selector to select dropdown menu elements:
```js
document.querySelectorAll('.o-dropdown-menu');
```


<a name"0.3.0"></a>
## 0.3.0 (2015-06-29)


#### Bug Fixes

* remove hover and focus effects for inverse menu items ([4f74a1ac](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/4f74a1ac))
* do not prevent the default action when the menu item is a link and href is not `#` ([fd789b83](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/fd789b83))


#### Features

* add support for button menu item ([b5834a2f](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/b5834a2f))


<a name"0.2.0"></a>
## 0.2.0 (2015-06-09)


#### Features

* rename module to o-dropdown-menu ([9b11e973](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/9b11e973))
* **dropdown-menu:** add menu item divider ([a8fe4471](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/a8fe4471))


#### Breaking Changes

* the `he-` prefix was removed; the module name is now
`o-dropdown-menu`. The `he-` prefix should be removed from all CSS
selectors and `data-` attribute values.

 ([9b11e973](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/9b11e973))


<a name"0.1.1"></a>
### 0.1.1 (2015-06-03)


#### Bug Fixes

* select element when element argument is not an instance of HTMLElement ([eef6bc43](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/eef6bc43))


<a name"0.1.0"></a>
## 0.1.0 (2015-05-26)


#### Features

* **dropdown-menu:** update inverse styles to match current Console design ([2e412909](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/2e412909))


<a name"0.0.1"></a>
### 0.0.1 (2015-05-22)


#### Features

* **dropdown-menu:**
  * add inverse styles ([cd1f7c8a](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/cd1f7c8a))
  * basic features ([5e164e14](https://github.com/Pearson-Higher-Ed/o-dropdown-menu/commit/5e164e14))

