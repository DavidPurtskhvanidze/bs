import {Ymec} from './core/ymec.js';

const ecomm = new Ymec();

ecomm.initialize()
  .then(() => {})
  .catch(console.error);
