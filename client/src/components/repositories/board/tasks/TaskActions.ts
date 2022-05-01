import Task from '../../../../utilities/types/Task';

type TaskActions = {
  onDragEndHandler(_task: Task): void,
  onDragStart(_colIndex: number, _taskMode: boolean): void,
  setTasks(_tasks: Task[]): void,
}

export default TaskActions;
