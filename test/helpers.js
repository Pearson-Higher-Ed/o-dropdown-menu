import { ESC, SPACE, UP_ARROW, DOWN_ARROW } from './../src/js/constants';

export { dispatchEvent } from './../src/js/utils';

// Adapted from https://gist.github.com/termi/4654819
export function initKeyboardEvent(type, dict) {
	let _initKeyboardEvent_type = ((e) => {
		try {
			e.initKeyboardEvent(
				"keyup",                  // in DOMString typeArg
				false,                    // in boolean canBubbleArg
				false,                    // in boolean cancelableArg
				document.defaultView,     // in views::AbstractView viewArg
				"+",                      // [test]in DOMString keyIdentifierArg | webkit event.keyIdentifier | IE9 event.key
				3,                        // [test]in unsigned long keyLocationArg | webkit event.keyIdentifier | IE9 event.location
				true,                     // [test]in boolean ctrlKeyArg | webkit event.shiftKey | old webkit event.ctrlKey | IE9 event.modifiersList
				false,                    // [test]shift | alt
				true,                     // [test]shift | alt
				false,                    // meta
				false                     // altGraphKey
			);

			// Safari and IE9 throw Error here due keyCode, charCode and which is readonly
			// Uncomment this code block if you need legacy properties
			delete e.keyCode;
			_Object_defineProperty(e, {writable: true, configurable: true, value: 9});
			delete e.charCode;
			_Object_defineProperty(e, {writable: true, configurable: true, value: 9});
			delete e.which;
			_Object_defineProperty(e, {writable: true, configurable: true, value: 9});

			return ((e["keyIdentifier"] || e["key"]) === "+" && (e["keyLocation"] || e["location"]) === 3) && (
				e.ctrlKey ?
					e.altKey ? // webkit
						1
						:
						3
					:
					e.shiftKey ?
						2 // webkit
						:
						4 // IE9
				) || 9 // FireFox|w3c
				;
		}
		catch ( __e__ ) { _initKeyboardEvent_type = 0 }
	})(document.createEvent( "KeyboardEvent" ));

	const	_keyboardEvent_properties_dictionary = {
		"char": "",
		"key": "",
		"location": 0,
		"ctrlKey": false,
		"shiftKey": false,
		"altKey": false,
		"metaKey": false,
		"repeat": false,
		"locale": "",

		"detail": 0,
		"bubbles": false,
		"cancelable": false,

		//legacy properties
		"keyCode": 0,
		"charCode": 0,
		"which": 0
	};

	const own = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

	const _Object_defineProperty = Object.defineProperty || ((obj, prop, val) => {
		if( "value" in val ) {
			obj[prop] = val["value"];
		}
	});

	let e;

	if( _initKeyboardEvent_type ) {
		e = document.createEvent( "KeyboardEvent" );
	} else {
		e = document.createEvent( "Event" );
	}

	let _prop_name;
	const localDict = {};

	for(_prop_name in _keyboardEvent_properties_dictionary) {
		if(own(_keyboardEvent_properties_dictionary, _prop_name) ) {
			localDict[_prop_name] = (own(dict, _prop_name) && dict || _keyboardEvent_properties_dictionary)[_prop_name];
		}
	}

	const _ctrlKey = localDict["ctrlKey"];
	const _shiftKey = localDict["shiftKey"];
	const _altKey = localDict["altKey"];
	const _metaKey = localDict["metaKey"];
	const _altGraphKey = localDict["altGraphKey"];

	const _modifiersListArg = _initKeyboardEvent_type > 3 ? (
			(_ctrlKey ? "Control" : "") +
			(_shiftKey ? " Shift" : "") +
			(_altKey ? " Alt" : "") +
			(_metaKey ? " Meta" : "") +
			(_altGraphKey ? " AltGraph" : "")
		).trim() : null;

	const _key = localDict["key"] + "";
	const _char = localDict["char"] + "";
	const _location = localDict["location"];
	const _keyCode = localDict["keyCode"] || (localDict["keyCode"] = _key && _key.charCodeAt( 0 ) || 0);
	const _charCode = localDict["charCode"] || (localDict["charCode"] = _char && _char.charCodeAt( 0 ) || 0);

	const _bubbles = localDict["bubbles"];
	const _cancelable = localDict["cancelable"];

	const _repeat = localDict["repeat"];
	const _locale = localDict["locale"];
	const _view = document.defaultView;

	localDict["which"] || (localDict["which"] = localDict["keyCode"]);

	if ("initKeyEvent" in e) { // FF
		// https://developer.mozilla.org/en/DOM/event.initKeyEvent
		e.initKeyEvent( type, _bubbles, _cancelable, _view, _ctrlKey, _altKey, _shiftKey, _metaKey, _keyCode, _charCode );
	}
	else if (_initKeyboardEvent_type && "initKeyboardEvent" in e) {
		// https://developer.mozilla.org/en/DOM/KeyboardEvent#initKeyboardEvent()
		if (_initKeyboardEvent_type === 1) { // webkit
			// http://stackoverflow.com/a/8490774/1437207
			// https://bugs.webkit.org/show_bug.cgi?id=13368
			e.initKeyboardEvent( type, _bubbles, _cancelable, _view, _key, _location, _ctrlKey, _shiftKey, _altKey, _metaKey, _altGraphKey );
		}
		else if ( _initKeyboardEvent_type === 2 ) { // old webkit
			//http://code.google.com/p/chromium/issues/detail?id=52408
			e.initKeyboardEvent( type, _bubbles, _cancelable, _view, _ctrlKey, _altKey, _shiftKey, _metaKey, _keyCode, _charCode );
		}
		else if ( _initKeyboardEvent_type === 3 ) { // webkit
			e.initKeyboardEvent( type, _bubbles, _cancelable, _view, _key, _location, _ctrlKey, _altKey, _shiftKey, _metaKey, _altGraphKey );
		}
		else if ( _initKeyboardEvent_type === 4 ) { // IE9
			//http://msdn.microsoft.com/en-us/library/ie/ff975297(v=vs.85).aspx
			e.initKeyboardEvent( type, _bubbles, _cancelable, _view, _key, _location, _modifiersListArg, _repeat, _locale );
		}
		else { // FireFox|w3c
			//http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent-initKeyboardEvent
			//https://developer.mozilla.org/en/DOM/KeyboardEvent#initKeyboardEvent()
			e.initKeyboardEvent( type, _bubbles, _cancelable, _view, _char, _key, _location, _modifiersListArg, _repeat, _locale );
		}
	}
	else {
		e.initEvent(type, _bubbles, _cancelable);
	}

	for ( _prop_name in _keyboardEvent_properties_dictionary )if( own( _keyboardEvent_properties_dictionary, _prop_name ) ) {
		if ( e[_prop_name] !== localDict[_prop_name] ) {
			try {
				delete e[_prop_name];
				_Object_defineProperty( e, _prop_name, { writable: true, "value": localDict[_prop_name] } );
			}
			catch (ex) {
				//Some properties is read-only
			}

		}
	}

	return e;
}

// DOM helpers

export function createDropdownMenuEl(triggerEl) {
	const element = document.createElement('div');
	element.classList.add('o-dropdown-menu');

	triggerEl = triggerEl || document.createElement('button');
	triggerEl.setAttribute('data-toggle', 'dropdown-menu');
	element.appendChild(triggerEl);

	const menuItemsEl = document.createElement('ul');
	menuItemsEl.classList.add('o-dropdown-menu__menu-items');
	menuItemsEl.setAttribute('role', 'menu');
	element.appendChild(menuItemsEl);

	return element;
}

export function addMenuItemEl(dropdownMenuEl, options) {
	options = options || {};

	const menuItemsEl = dropdownMenuEl.querySelector('.o-dropdown-menu__menu-items');
	const menuItemEl = document.createElement('li');
	const menuItemLinkEl = document.createElement('a');

	menuItemEl.classList.add('o-dropdown-menu__menu-item');
	menuItemEl.setAttribute('role', 'presentation');
	menuItemLinkEl.setAttribute('role', 'menuitem');
	menuItemLinkEl.href = '#';
	menuItemLinkEl.textContent = options.linkTextContent;
	// Ensure that the link element has clientWidth and clientHeight > 0
	menuItemLinkEl.style.display = 'block';

	menuItemEl.appendChild(menuItemLinkEl);
	menuItemsEl.appendChild(menuItemEl);

	return menuItemEl;
}

// Keyboard actions

export function pressKey(keyCode, times) {
	if (!times || times <= 0) times = 1;

	for (let i = 0; i < times; i++) {
		const event = initKeyboardEvent('keydown', { keyCode: keyCode, bubbles: true, cancelable: true });
		document.activeElement.dispatchEvent(event);
	}
}

export function pressEsc(times) {
	pressKey(ESC, times);
}

export function pressSpace(times) {
	pressKey(SPACE, times);
}

export function pressDownArrow(times) {
	pressKey(DOWN_ARROW, times);
}

export function pressUpArrow(times) {
	pressKey(UP_ARROW, times);
}

// Checks

export function isExpanded(element) {
	return element.classList.contains('o-dropdown-menu--expanded');
}

export function isAriaExpanded(element) {
	const toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');
	if (!toggleElement) return false;
	return !!toggleElement.getAttribute('aria-expanded');
}
