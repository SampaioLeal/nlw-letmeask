import { makeAutoObservable } from "mobx";

class AppStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loading = false;

  setLoading(bool: boolean) {
    if (bool) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    this.loading = bool;
  }
}

const appStore = new AppStore();
export default appStore;
