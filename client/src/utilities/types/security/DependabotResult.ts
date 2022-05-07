interface DependantotResult {
  data: {
    repository: {
      vulnerabilityAlerts: {
        nodes: Array<{
          createdAt: string,
          securityVulnerability: {
            package: {
              name: string,
            },
            advisory: {
              summary: string,
              cvss: {
                score: number,
              }
            }
          }
        }>
        totalCount: number,
      }
    }
  }
}

export default DependantotResult;
