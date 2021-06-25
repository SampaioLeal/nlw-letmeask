import { makeAutoObservable } from "mobx";

class AppStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  theme: Themes = localStorage.theme || "light";
  loading = false;
  notification = "";

  toggleTheme() {
    const newTheme = this.theme === "light" ? "dark" : "light";
    localStorage.theme = newTheme;
    this.theme = newTheme;
  }
  setNotification(text: string) {
    this.notification = text;
  }
  closeNotification() {
    this.notification = "";
  }
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
