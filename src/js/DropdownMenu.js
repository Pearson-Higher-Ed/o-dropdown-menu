import DomDelegate from 'dom-delegate';
import constants from './constants';
import { dispatchEvent, indexOfElement,
		 indexOfFirstVisibleElement, indexOfNextVisibleElement } from './utils';

const ESC = constants.ESC;
const SPACE = constants.SPACE;
const UP_ARROW = constants.UP_ARROW;
const DOWN_ARROW = constants.DOWN_ARROW;

const matchKeys = new RegExp(UP_ARROW + '|' + DOWN_ARROW + '|' + ESC + '|' + SPACE);

/**
 * Represents a contextual menu for displaying list items.
 * @param {HTMLElement} element
 */
export default class DropdownMenu {

	constructor(element) {
		if (!element) throw new TypeError('missing required argument: element');
		if (element.hasAttribute('data-upgraded')) return;

		this.element = element;

		const toggleElement = this.toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');
		if (!toggleElement) throw new Error('unable to locate a child element with selector: [data-toggle="dropdown-menu"]');

		function handleClick(e) {
			if (e.target.tagName.toLowerCase() === 'a' &&
				e.target.getAttribute('data-toggle') !== 'dropdown-menu') {

				if (e.target.href === '#' ||
					e.target.parentElement.classList.contains('o-dropdown-menu__menu-item--disabled')) {

					e.preventDefault();
				}
			} else {
				e.preventDefault();
			}

			this.toggle();
		}

		function handleKeydown(e) {
			// Handle up arrow, down arrow, escape, and space keys for elements that
			// are not inputs and textareas
			if (!matchKeys.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

			e.preventDefault();
			e.stopPropagation();

			const element = getRootElement(e.target);
			const toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');

			const isExpanded = element.classList.contains('o-dropdown-menu--expanded');

			// Toggle the menu: if not expanded, keys other than esc will expand it;
			// if expanded, esc will collapse it.
			if ((!isExpanded && e.which !== ESC) || (isExpanded && e.which === ESC)) {
				if (e.which === ESC) dispatchEvent(toggleElement, 'focus');
				return dispatchEvent(toggleElement, 'click');
			}

			// Focus menu item
			const selector =
				'.o-dropdown-menu__menu-item:not(.o-dropdown-menu__menu-item--disabled) a, ' +
				'.o-dropdown-menu__menu-item:not(.o-dropdown-menu__menu-item--disabled) button';
			const itemEls = element.querySelectorAll(selector);

			if (!itemEls.length) return;

			let index = indexOfElement(itemEls, e.target);

			if (e.which === UP_ARROW && index > 0) index = indexOfNextVisibleElement(itemEls, --index, true);
			if (e.which === DOWN_ARROW && index < itemEls.length - 1) index = indexOfNextVisibleElement(itemEls, ++index);
			if (index <= 0) index = indexOfFirstVisibleElement(itemEls);

			itemEls[index].focus();
		}

		if (!DropdownMenu.bodyDelegate) {
			const bodyDelegate = new DomDelegate(document.body);

			bodyDelegate.on('click', function (e) {
				if (!e.defaultPrevented) collapseAll();
			});

			DropdownMenu.bodyDelegate = bodyDelegate;
		}

		const elementDelegate = new DomDelegate(element);

		elementDelegate.on('keydown', '[data-toggle="dropdown-menu"]', handleKeydown.bind(this));
		elementDelegate.on('keydown', '[role="menu"]', handleKeydown.bind(this));
		elementDelegate.on('click', handleClick.bind(this));

		function destroy() {
			elementDelegate.destroy();
		}

		this.destroy = destroy;

		this.element.setAttribute('data-upgraded', 'o-dropdown-menu');
	}

	/**
	 * Expands or collapses the menu items.
	 * @returns {undefined} undefined
	 */
	toggle() {
		const element = this.element;
		const toggleElement = this.toggleElement;

		const isDisabled =
			toggleElement.classList.contains('o-dropdown-menu__toggle--disabled') ||
			toggleElement.disabled;

		const isExpanded = element.classList.contains('o-dropdown-menu--expanded');

		collapseAll();

		if (isDisabled) return;

		if (!isExpanded) {
			element.classList.add('o-dropdown-menu--expanded');
			toggleElement.setAttribute('aria-expanded', 'true');
			dispatchEvent(element, 'oDropdownMenu.expand');
		}
	}

}

/**
 * Initializes all dropdown-menu elements on the page or within
 * the element passed in.
 * @param {HTMLElement|string} element DOM element or selector.
 * @returns {DropdownMenu[]} List of DropdownMenu instances that
 * have been initialized.
 */
DropdownMenu.init = function (element) {
	const dropdownMenuEls = selectAll(element);
	const dropdownMenus = [];

	for (let i = 0, l = dropdownMenuEls.length; i < l; i++) {
		dropdownMenus.push(new DropdownMenu(dropdownMenuEls[i]));
	}

	return dropdownMenus;
};

/**
 * Destroys all dropdown-menu instances on the page.
 * @returns {undefined} undefined
 */
DropdownMenu.destroy = () => {
	DropdownMenu.bodyDelegate && DropdownMenu.bodyDelegate.destroy();
};

function getRootElement(element) {
	while (element !== null) {
		if (element.classList.contains('o-dropdown-menu')) return element;
		element = element.parentElement;
	}
}

function selectAll(element) {
	if (!element) {
		element = document.body;
	} else if (!(element instanceof HTMLElement)) {
		element = document.querySelectorAll(element);
	}

	return element.querySelectorAll('.o-dropdown-menu');
}

function collapseAll() {
	const dropdownMenuEls = selectAll();

	for (let i = 0, l = dropdownMenuEls.length; i < l; i++) {
		const element = dropdownMenuEls[i];
		const toggleElement = element.querySelector('[data-toggle="dropdown-menu"]');

		if (!element.classList.contains('o-dropdown-menu--expanded')) continue;

		element.classList.remove('o-dropdown-menu--expanded');
		toggleElement.removeAttribute('aria-expanded');
		dispatchEvent(element, 'oDropdownMenu.collapse');
	}
}
