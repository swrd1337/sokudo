import Location from './Location';
import Rule from './Rule';

interface CodeScanningAlert {
  number: number;
  createdAt: string;
  state: string;
  rule: Rule;
  mostRecentInstance: {
    commitSha: string;
    location: Location
  };
}

export default CodeScanningAlert;
