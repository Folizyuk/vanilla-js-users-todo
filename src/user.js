export default class User {
	constructor(name) {
		this.id = new Date().getTime();
		this.name = name;
	}
}
