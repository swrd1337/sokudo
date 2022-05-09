package com.swrd1337.sokudo.external.api;

import lombok.Getter;

@Getter
public final class DependabotQuery {

  private static final String DEPENDABOT_QUERY = """
        {
          repository(name: "$repo", owner: "$user") {
            vulnerabilityAlerts(first: $count) {
              nodes {
                createdAt
                securityVulnerability {
                  package {
                    name
                  }
                  advisory {
                    summary
                    cvss {
                      score
                    }
                    description
                  }
                }
                number
              }
              totalCount
            }
          }
        }
      """;

  private String query;

  public DependabotQuery(String repo, String owner, Integer count) {
    this.query = DEPENDABOT_QUERY
        .replace("$repo", repo)
        .replace("$user", owner)
        .replace("$count", count.toString());
  }

}
