import Comment from './Comment';
import TaskTypes from './TaskTypes';

interface Task {
  id: number;
  title: string;
  description?: string;
  boardId: number;
  columnName: string;
  author: string;
  type?: TaskTypes;
  storyPoints?: number;
  comments?: Comment[];
}

export default Task;
