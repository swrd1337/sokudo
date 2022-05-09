import DependabotNode from './DependabotNode';

interface DependabotResult {
  data: {
    repository: {
      vulnerabilityAlerts: {
        nodes: Array<DependabotNode>
        totalCount: number;
      };
    };
  };
}

export default DependabotResult;
