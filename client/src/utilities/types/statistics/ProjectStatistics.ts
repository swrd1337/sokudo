import BoardStatistics from './BoardStatistics';
import MdStatistics from './MdStatistics';

interface ProjectStatistics {
  boardStats: BoardStatistics[];
  mdsStats: MdStatistics[];
}

export default ProjectStatistics;
