import { action, makeAutoObservable } from "mobx";
import { getOptions, setOptions } from '../utils';

class OptionsStore {

  options = {};

  constructor(){
    makeAutoObservable(this);

    getOptions().then(options => this.options = options);
  }

  setOptions = action((cb) => {
    this.options = cb(this.options);
    setOptions(() => ({...this.options}));
  });
  
};

export default new OptionsStore();