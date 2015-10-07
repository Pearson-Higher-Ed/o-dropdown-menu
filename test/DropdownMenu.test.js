/*global describe, it*/

import expect from 'expect.js';
import DropdownMenu from './../src/js/DropdownMenu';
import { dispatchEvent } from './../src/js/utils';
import { initKeyboardEvent } from './utils';
import { ESC, SPACE, UP_ARROW, DOWN_ARROW } from './../src/js/constants';

describe('DropdownMenu', () => {

	it('should initialize', () => {
		const element = createDropdownMenuEl();
		const dropdownMenu = new DropdownMenu(element);

		expect(dropdownMenu).to.not.be(undefined);
		expect(element.getAttribute('data-upgraded')).to.be('o-dropdown-menu');
	});

	it('should destroy', () => {
		const element = createDropdownMenuEl();
		const dropdownMenu = new DropdownMenu(element);

		dropdownMenu.destroy();
	});

	describe('toggle()', () => {

		it('should toggle the dropdown', () => {
			const element = createDropdownMenuEl();
			const dropdownMenu = new DropdownMenu(element);

			dropdownMenu.toggle();

			expect(isExpanded(element)).to.be(true);
			expect(isAriaExpanded(element)).to.be(true);
		});

		it('should not toggle the dropdown when trigger is a button and is disabled', () => {
			const element = createDropdownMenuEl();
			const toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');

			toggleElement.disabled = true;
			const dropdownMenu = new DropdownMenu(element);

			dropdownMenu.toggle();

			expect(isExpanded(element)).to.be(false);
		});

		it('should not toggle the dropdown when trigger is not a button and is disabled', () => {
			const element = createDropdownMenuEl(document.createElement('a'));
			const toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');

			toggleElement.classList.add('o-dropdown-menu__toggle--disabled');
			const dropdownMenu = new DropdownMenu(element);

			dropdownMenu.toggle();

			expect(isExpanded(element)).to.be(false);
		});

		it('should collapse other expanded menus', () => {
			const elements = [createDropdownMenuEl(), createDropdownMenuEl()];

			document.body.appendChild(elements[0]);
			document.body.appendChild(elements[1]);

			const menus = [new DropdownMenu(elements[0]), new DropdownMenu(elements[1])];

			menus[0].toggle();

			expect(isExpanded(elements[0])).to.be(true);

			menus[1].toggle();

			expect(isExpanded(elements[1])).to.be(true);
			expect(isExpanded(elements[0])).to.be(false);
		});

	});

	describe('click', () => {

		it('should collapse the menu when click event occurs outside of the dropdown element', () => {
			const element = createDropdownMenuEl();

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);

			menu.toggle();

			expect(isExpanded(element)).to.be(true);

			dispatchEvent(document.body, 'click');

			expect(isExpanded(element)).to.be(false);
		});

		it('should prevent default when menu item is a valid link and is disabled', function (done) {
			const element = createDropdownMenuEl();
			document.body.appendChild(element);

			const menuItem = document.createElement('li');
			const menuItemLink = document.createElement('a');
			menuItem.classList.add('o-dropdown-menu__menu-item');
			menuItem.classList.add('o-dropdown-menu__menu-item--disabled');
			menuItemLink.setAttribute('role', 'menuitem');
			menuItemLink.href = 'http://example.com';
			menuItem.appendChild(menuItemLink);
			element.querySelector('.o-dropdown-menu__menu-items').appendChild(menuItem);

			new DropdownMenu(element);

			element.addEventListener('click', function (e) {
				expect(e.defaultPrevented).to.be(true);
				e.preventDefault();
				done();
			});

			dispatchEvent(menuItemLink, 'click');
		});

		it('should not prevent default when menu item is a valid link', function (done) {
			const element = createDropdownMenuEl();
			document.body.appendChild(element);

			const menuItem = document.createElement('li');
			const menuItemLink = document.createElement('a');
			menuItem.classList.add('o-dropdown-menu__menu-item');
			menuItemLink.setAttribute('role', 'menuitem');
			menuItemLink.href = 'http://example.com';
			menuItem.appendChild(menuItemLink);
			element.querySelector('.o-dropdown-menu__menu-items').appendChild(menuItem);

			new DropdownMenu(element);

			element.addEventListener('click', function (e) {
				expect(e.defaultPrevented).to.be(false);
				e.preventDefault();
				done();
			});

			dispatchEvent(menuItemLink, 'click');
		});

	});

	describe('keyboard navigation', () => {

		function testKeyCode_expands(keyCode) {
			const element = createDropdownMenuEl();

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);
			menu.toggleElement.focus();

			pressKey(keyCode, 1);

			expect(isExpanded(element)).to.be(true);
		}

		it('should expand when the space key is pressed', () => {
			testKeyCode_expands(SPACE);
		});

		it('should expand when the down arrow key is pressed', () => {
			testKeyCode_expands(DOWN_ARROW);
		});

		it('should expand when the up arrow key is pressed', () => {
			testKeyCode_expands(UP_ARROW);
		});

		it('should collapse when the esc key is pressed', () => {
			const element = createDropdownMenuEl();

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);

			menu.toggle();
			menu.toggleElement.focus();
			expect(isExpanded(element)).to.be(true);

			pressEsc();

			expect(isExpanded(element)).to.be(false);
		});

		it('should focus the first menu item when the down arrow key is pressed', () => {
			const element = createDropdownMenuEl();
			const menuItemEl = addMenuItemEl(element, { linkTextContent: 'Item 1' });
			addMenuItemEl(element, { linkTextContent: 'Item 2' });

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);
			menu.toggle();
			menu.toggleElement.focus();

			pressDownArrow(1);

			expect(document.activeElement).to.equal(menuItemEl.querySelector('a'));
		});

		it('should not wrap past the last menu item when the down arrow key is pressed', () => {
			const element = createDropdownMenuEl();
			addMenuItemEl(element, { linkTextContent: 'Item 1' });
			const menuItem2El = addMenuItemEl(element, { linkTextContent: 'Item 2' });

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);
			menu.toggle();
			menu.toggleElement.focus();

			// Arrow down three times
			pressDownArrow(3);

			expect(document.activeElement).to.equal(menuItem2El.querySelector('a'));
		});

		it('should not wrap past the top menu item when the up arrow key is pressed', () => {
			const element = createDropdownMenuEl();
			const menuItemEl = addMenuItemEl(element, { linkTextContent: 'Item 1' });
			addMenuItemEl(element, { linkTextContent: 'Item 2' });

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);
			menu.toggle();
			menu.toggleElement.focus();

			// Arrow down into the menu items, then arrow up
			pressDownArrow(1);
			pressUpArrow(1);

			expect(document.activeElement).to.equal(menuItemEl.querySelector('a'));
		});

		it ('should focus the first visible menu item when there are hidden menu items at the beginning of the list and the down arrow key is pressed', () => {
			const element = createDropdownMenuEl();
			const menuItemEl = addMenuItemEl(element, { linkTextContent: 'Item 1' });
			const menuItem2El = addMenuItemEl(element, { linkTextContent: 'Item 2' });

			// Hide the first menu item
			menuItemEl.style.display = 'none';

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);

			menu.toggle();
			menu.toggleElement.focus();

			pressDownArrow(1);

			expect(document.activeElement).to.equal(menuItem2El.querySelector('a'));
		});

		it('should focus the next visible menu item when there are hidden menu items in the middle of the list and the down arrow key is pressed', () => {
			const element = createDropdownMenuEl();
			addMenuItemEl(element, { linkTextContent: 'Item 1' });
			const menuItem2El = addMenuItemEl(element, { linkTextContent: 'Item 2 (hidden)' });
			const menuItem3El = addMenuItemEl(element, { linkTextContent: 'Item 3' });

			// Hide the second menu item
			menuItem2El.style.display = 'none';

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);

			menu.toggle();
			menu.toggleElement.focus();

			pressDownArrow(2);

			expect(document.activeElement).to.equal(menuItem3El.querySelector('a'));
		});

		it('should focus the previous visible menu item when there are hidden menu items in the middle of the list and the up arrow key is pressed', () => {
			const element = createDropdownMenuEl();
			const menuItemEl = addMenuItemEl(element, { linkTextContent: 'Item 1' });
			const menuItem2El = addMenuItemEl(element, { linkTextContent: 'Item 2 (hidden)' });
			const menuItem3El = addMenuItemEl(element, { linkTextContent: 'Item 3' });

			// Hide the second menu item
			menuItem2El.style.display = 'none';

			document.body.appendChild(element);

			const menu = new DropdownMenu(element);

			menu.toggle();
			menuItem3El.querySelector('a').focus();

			pressUpArrow(1);

			expect(document.activeElement).to.equal(menuItemEl.querySelector('a'));
		});

	});

	describe('events', () => {

		it('should fire oDropdownMenu.expand when the menu is expanded', function (done) {
			const element = createDropdownMenuEl();
			element.addEventListener('oDropdownMenu.expand', done.bind(null, null));
			document.body.appendChild(element);
			const menu = new DropdownMenu(element);

			menu.toggle();
		});

		it('should fire oDropdownMenu.collapse when the menu is collapsed', function (done) {
			const element = createDropdownMenuEl();
			element.addEventListener('oDropdownMenu.collapse', done.bind(null, null));
			document.body.appendChild(element);
			const menu = new DropdownMenu(element);

			menu.toggle();
			menu.toggle();
		});

	});

});

function createDropdownMenuEl(triggerEl) {
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

function addMenuItemEl(dropdownMenuEl, options) {
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

function pressKey(keyCode, times) {
	if (!times || times <= 0) times = 1;

	for (let i = 0; i < times; i++) {
		const event = initKeyboardEvent('keydown', { keyCode: keyCode, bubbles: true, cancelable: true });
		document.activeElement.dispatchEvent(event);
	}
}

function pressEsc(times) {
	pressKey(ESC, times);
}

function pressDownArrow(times) {
	pressKey(DOWN_ARROW, times);
}

function pressUpArrow(times) {
	pressKey(UP_ARROW, times);
}

// Checks

function isExpanded(element) {
	return element.classList.contains('o-dropdown-menu--expanded');
}

function isAriaExpanded(element) {
	const toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');
	if (!toggleElement) return false;
	return !!toggleElement.getAttribute('aria-expanded');
}
