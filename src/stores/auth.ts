import { makeAutoObservable } from "mobx";
import { auth, firebase } from "../services/firebase";
import appStore from "./app";

class AuthStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  user: User | null = null;
  logged = false;

  setUser(user: User | null) {
    this.user = user;
  }
  setLogged(bool: boolean) {
    this.logged = bool;
  }

  async signOut() {
    await auth.signOut();
    this.setUser(null);
    this.setLogged(false);
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(
      (result) => {
        if (result.user) {
          this.setUser(result.user);
        }

        this.setLogged(true);
      },
      () => {
        this.setUser(null);
        this.setLogged(false);
      }
    );
  }

  listenAuthState() {
    return auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setUser(null);
        this.setLogged(false);
      } else {
        this.setUser(user);
        this.setLogged(true);
      }

      appStore.setLoading(false);
    });
  }
}

const authStore = new AuthStore();
export default authStore;
