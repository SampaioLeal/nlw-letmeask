interface Room {
  adminUid: string;
  code: string;
  id: string;
  name: string;
}

interface Question {
  id: string;
  userUid: string;
  userName: string;
  userPicture: string;
  text: string;
  solved: boolean;
  selected: boolean;
  likes: string[];
}
