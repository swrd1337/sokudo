/* eslint-disable import/prefer-default-export */
import TaskTypes from './types/TaskTypes';

const typeColorMap: {
  [key: string]: string,
} = {
  [TaskTypes.BUG]: 'red',
  [TaskTypes.TASK]: 'cyan',
  [TaskTypes.IMPROVEMENT]: 'green',
  [TaskTypes.FEATURE]: 'purple',
  [TaskTypes.OTHER]: 'teal',
};

export function getTypeColor(type: string): string {
  return typeColorMap[type];
}
