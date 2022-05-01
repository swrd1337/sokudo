import TaskTypes from './TaskTypes';

interface Task {
  id: number;
  title: string;
  description?: string;
  repositoryDataId: number;
  columnName: string;
  type?: TaskTypes;
  storyPoints?: number;
}

export default Task;
