'use strict';

/**
 * Dispatch an event.
 * @param  {Element} element Element from which the event is dispatched.
 * @param  {String} name Event name.
 * @param  {Object} [data] Optional custom data to be included in event.detail.
 */
function dispatchEvent(element, name, data) {
	if (document.createEvent && element.dispatchEvent) {
		var event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		element.dispatchEvent(event);
	}
}

/**
 * Returns the index of the first visible element from the provided list of elements.
 * @param  {NodeList|Array<HTMLElement>} elements List of elements.
 * @return {Number} Index (integer) of the first visible element in the list or -1 if no items are visible.
 */
function indexOfFirstVisibleElement(elements) {
	for (var i = 0, l = elements.length; i < l; i++) {
		var element = elements[i];

		if (element.offsetParent !== null &&
			(element.clientWidth + element.clientHeight) > 0) {

			return i;
		}
	}

	return -1;
}

exports.dispatchEvent = dispatchEvent;
exports.indexOfFirstVisibleElement = indexOfFirstVisibleElement;
