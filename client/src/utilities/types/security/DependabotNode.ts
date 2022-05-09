interface DependabotNode {
  createdAt: string;
  securityVulnerability: {
    package: {
      name: string;
    };
    advisory: {
      summary: string;
      cvss: {
        score: number;
      }
      description: string;
    }
  }
  number: number;
}

export default DependabotNode;
