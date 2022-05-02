import Comment from './Comment';
import TaskTypes from './TaskTypes';

interface Task {
  id: number;
  title: string;
  description?: string;
  repositoryDataId: number;
  columnName: string;
  author: string;
  type?: TaskTypes;
  storyPoints?: number;
  comments?: Comment[];
}

export default Task;
