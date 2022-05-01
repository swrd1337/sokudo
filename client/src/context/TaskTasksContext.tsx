import React from 'react';

interface TasksContextInterface {
  triggerUpdate(_value: boolean): void,
}

const contextDefaultValue: TasksContextInterface = {
  triggerUpdate: () => {},
};

const TasksContext = React.createContext<TasksContextInterface>(contextDefaultValue);

export default TasksContext;
