import componentHandler from 'o-component-handler';

export { default } from './src/js/DropdownMenu';

const O_DOM_CONTENT_LOADED = 'o.DOMContentLoaded';

function upgradeAll() {
	componentHandler.upgradeDom('DropdownMenu');
	document.removeEventListener(O_DOM_CONTENT_LOADED, upgradeAll);
}

document.addEventListener(O_DOM_CONTENT_LOADED, upgradeAll);
