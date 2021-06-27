import { makeAutoObservable } from "mobx";
import { firebase, firestore } from "../services/firebase";
import appStore from "./app";
import tmi from "tmi.js";

class RoomStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  room: Room | null = null;
  questions: Question[] = [];

  setRoom(room: Room | null) {
    this.room = room;
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  async getNewCode(): Promise<string> {
    const code = `${Math.floor(Math.random() * 1000000)}`;

    const query = await firestore
      .collection("rooms")
      .where("code", "==", code)
      .get();

    if (!query.size) return code;

    return await this.getNewCode();
  }

  /**
   * Admin actions
   */
  async createRoom(name: string, userUid: string) {
    const code = await this.getNewCode();

    const room = await firestore.collection("rooms").add({
      name,
      code,
      adminUid: userUid,
    });

    return (await room.get()).data() as Room;
  }

  async closeRoom() {
    if (!this.room) return null;

    await firestore.doc(`rooms/${this.room.id}`).delete();
  }

  async updateQuestion(
    questionId: string,
    question: Partial<Omit<Question, "id" | "likes">>
  ) {
    if (!this.room) return null;

    await firestore
      .doc(`rooms/${this.room.id}/questions/${questionId}`)
      .update(question);
  }

  async deleteQuestion(questionId: string) {
    if (!this.room) return null;

    await firestore
      .doc(`rooms/${this.room.id}/questions/${questionId}`)
      .delete();
  }

  /**
   * User actions
   */
  async addQuestion(text: string, user: User) {
    if (!this.room) return;

    await firestore
      .collection(`rooms/${this.room.id}/questions`)
      .add({
        userId: user.uid,
        userName: user.displayName,
        userPicture: user.photoURL,
        text,
        likes: [],
      })
      .catch(() =>
        appStore.setNotification(
          "Você não tem permissão para executar esta ação!"
        )
      );
  }

  async toggleLikeOfQuestion(
    questionId: string,
    userId: string,
    like: boolean
  ) {
    if (!this.room) return;

    if (like) {
      await firestore
        .doc(`rooms/${this.room.id}/questions/${questionId}`)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(userId),
        });
    } else {
      await firestore
        .doc(`rooms/${this.room.id}/questions/${questionId}`)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(userId),
        });
    }
  }

  async checkRoom(roomCode: string) {
    const query = await firestore
      .collection("rooms")
      .where("code", "==", roomCode)
      .get();

    if (!query.size) throw new Error("Sala não encontrada!");

    const roomData = query.docs[0].data();

    return { ...roomData, id: query.docs[0].id } as Room;
  }

  listenRoom(roomId: string) {
    return firestore.doc(`rooms/${roomId}`).onSnapshot((snapshot) => {
      if (!snapshot.exists) {
        this.setRoom(null);
      } else {
        const room = { ...snapshot.data(), id: snapshot.id } as Room;

        this.setRoom(room);
      }
    });
  }

  listenQuestions(roomId: string) {
    return firestore
      .collection(`rooms/${roomId}/questions`)
      .onSnapshot((snapshot) => {
        const newQuestions = snapshot.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id } as Question;
          })
          .sort((a, b) => b.likes.length - a.likes.length);

        this.setQuestions(newQuestions);
      });
  }

  addTwitch(channel: string, roomId: string) {
    return firestore.doc(`rooms/${roomId}`).update({
      twitch: channel,
    });
  }

  listenTwitch(channel: string) {
    const twitchClient = new tmi.Client({
      channels: [channel],
    });

    twitchClient.connect();

    twitchClient.on("message", async (channel, tags, message) => {
      if (
        tags["reply-parent-msg-body"]?.includes("#letmeask") &&
        message.includes("#up")
      ) {
        const userId = tags["user-id"] || "";
        const questionsQuery = await firestore
          .collection(`rooms/${roomStore.room?.id}/questions`)
          .where("text", "==", tags["reply-parent-msg-body"])
          .get();
        const question = questionsQuery.docs[0];

        const isLike = !question.data().likes.includes(userId);

        if (isLike) roomStore.toggleLikeOfQuestion(question.id, userId, isLike);
      }

      if (message.includes("#letmeask"))
        roomStore.addQuestion(message, {
          displayName: tags["display-name"] || "",
          uid: tags["user-id"] || "",
          email: "",
          emailVerified: true,
          photoURL: "",
        });
    });

    return twitchClient;
  }
}

const roomStore = new RoomStore();
export default roomStore;
