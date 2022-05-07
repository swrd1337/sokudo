interface CodeScanningAlert {
  createdAt: string,
  state: string,
  rule: {
    severity: string,
    description: string,
    name: string,
    securitySeverityLevel: string,
  }
  mostRecentInstance: {
    commitSha: string,
    location: {
      path: string,
      startLine: number,
      endLine: number,
    }
  }
}

export default CodeScanningAlert;
