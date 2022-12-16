import { makeAutoObservable } from "mobx";
import { setTranslationCache,
  getOptions,
  getTranslationCache,
  setOptions
} from '../utils';

class Store {

  options = {};
  translationCache = [];

  constructor(){
    makeAutoObservable(this);

    getOptions().then(options => this.options = options);

    getTranslationCache().then(cache => this.translationCache = cache);
  }

  setOptions = (cb) => {
    this.options = cb(this.options);
    setOptions(() => ({...this.options}));
  };
  
  clearTranslationCache = () => {
    this.translationCache = [];
    setTranslationCache([]);
  }

};

export default new Store();