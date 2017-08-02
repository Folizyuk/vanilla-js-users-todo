const _itemId = (element) => {
	return parseInt(element.parentNode.parentNode.dataset.id);
};
const editUserBtnClass = 'edit-user-btn';
const deleteUserBtnClass = 'delete-user-btn';

let $delegate = function (target, selector, type, handler) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	target.addEventListener(type, dispatchEvent);
};

export default class View {

	constructor() {
		this.todoList = document.querySelector('.todo-list');
		this.addUserBtn = document.querySelector('.add-user');
		this.deleteAllBtn = document.querySelector('.delete-all');
	}

	deleteAll(actionFunc) {
		this.deleteAllBtn.addEventListener('click', actionFunc);
	};

	addItem(actionFunc) {
		this.addUserBtn.addEventListener('click', actionFunc);
	}

	editItem(handler) {
		$delegate(this.todoList, '.'+editUserBtnClass, 'click', ({target}) => {
			handler(_itemId(target)).then((newName) => {
				target.parentElement.previousElementSibling.innerText = newName;
			}).catch(e => {});
		});
	}

	deleteItem(handler) {
		$delegate(this.todoList, '.'+deleteUserBtnClass, 'click', ({target}) => {
			handler(_itemId(target)).then((id) => {
				const elem = document.querySelector(`[data-id="${id}"]`);
				if (elem) {
					this.todoList.removeChild(elem);
				}
			}).catch(e => {});
		});
	}

	showItems(items) {
		this.todoList.innerHTML = this.makeHtmlList(items);
	}

	makeHtmlList(items) {
		return items.reduce((a, item) => a + `
            <div class="row" data-id="${item.id}">
            	<div class="col-xs-5 col-sm-5 col-md-6 col-lg-6">
					${item.name}
				</div>
				<div class="col-xs-7 col-sm-5 col-md-6 col-lg-6">
					<button type="button" class="btn btn-default ${editUserBtnClass}">Edit</button>
					<button type="button" class="btn btn-danger ${deleteUserBtnClass}">Delete</button>
				</div>
            </div>`, '');
	}
}
