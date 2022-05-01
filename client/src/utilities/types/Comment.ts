interface Comment {
  id: number;
  userId: number;
  taskId: number,
  content: string;
  avatarUrl: string;
  username: string;
}

export default Comment;
