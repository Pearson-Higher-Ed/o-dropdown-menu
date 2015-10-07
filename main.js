import DropdownMenu from './src/js/DropdownMenu';

export default DropdownMenu;

const constructAll = () => {
	DropdownMenu.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
