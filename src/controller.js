import Store from './store';
import View from './view';
import { Promise } from 'es6-promise';

export default class Controller {

	constructor(store, view) {
		this.store = store;
		this.view = view;

		view.deleteItem(this.deleteItem.bind(this));
		view.addItem(this.addItem.bind(this));
		view.editItem(this.editItem.bind(this));
		view.deleteAll(this.deleteAll.bind(this));
		this.updateView();
	}

	deleteAll() {
		this.store.setUsersList([]);
		this.updateView();
	};

	addItem() {
		let title = 'Enter user name';
		this.showPrompt(title).then((userName) => {
			this.store.insert(userName);
			this.updateView();
		}).catch(e => {});
	}

	editItem(id) {
		return new Promise((resolve, reject) => {
			let title = 'Enter new user name';
			this.showPrompt(title).then((newName) => {
				const users = this.store.getUsersList();
				for(var i=0;i<users.length;i++) {
					if(users[i].id === id) {
						users[i].name = newName;
						return resolve(newName);
					}
				}
				return reject(false);
			}).catch(e => {
				return reject(false);
			});
		});
	}

	deleteItem(id) {
		return new Promise((resolve, reject) => {
			this.showConfirm().then(() => {
				this.store.remove(id);
				return resolve(id);
			}).catch(e => reject(false));
		});
	}

	showPrompt (title) {
		var newName = prompt(title);
		return new Promise((resolve, reject) => {
			if(typeof newName !== 'string') {
				return reject(newName);
			}

			newName = newName.trim();
			if(newName.length) {
				if(!newName.match(/^[a-zA-Z\s]+$/)) {
					alert('Please, use only letters');
					return reject(newName);
				}
				return resolve(newName);
			}
			if(!newName.length) {
				alert('Please, fill user name');
				return reject(newName);
			}
		});
	}

	showConfirm () {
		var action = confirm('Are you really want to delete it?');
		return new Promise((resolve, reject) => {
			if(action) {
				return resolve(action);
			}
			return reject(action);
		});
	}

	updateView () {
		this.view.showItems(this.store.getUsersList());
	}
}
