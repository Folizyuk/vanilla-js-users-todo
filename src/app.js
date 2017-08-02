import Store from './store';
import View from './view';
import Controller from './controller';

const store = new Store();
const view = new View();

const ctrl = new Controller(store, view);

