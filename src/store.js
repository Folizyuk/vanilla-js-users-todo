import User from './user';

export default class Store {

	constructor() {
		this.userList = [
			{ id: 1, name: 'Marilyn Monroe'},
			{ id: 2, name: 'Abraham Lincoln'},
			{ id: 3, name: 'John F. Kennedy'},
			{ id: 4, name: 'Nelson Mandela'},
			{ id: 5, name: 'Winston Churchill'},
			{ id: 6, name: 'Elvis Presley'}
		];
	}

	setUsersList (list) {
		this.userList = list;
	}

	getUsersList () {
		return this.userList;
	}

	getUsersCount () {
		return this.userList.length;
	}

	insert (userName) {
		const users = this.getUsersList();
		users.push(new User(userName));
	}

	edit (id, userName) {
		const users = this.getUsersList();
		const len = users.length;
		for (var i=0;i<len;i++) {
			if(users[i].id === id) {
				users[i].name = userName;
			}
		}
	}

	remove (id) {
		this.userList = this.userList.filter(user => {
			return user.id !== id;
		});
	}
}
