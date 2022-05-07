package com.swrd1337.sokudo.external.api;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface GitHostProviderApi {
  
  ResponseEntity<String> fetchAccessToken(Map<String, String> body);

  ResponseEntity<String> fetchUserData(String accessToken);

  ResponseEntity<String> fetchRepositories(String accessToken, Integer page, Integer perPage);

  ResponseEntity<String> fetchRepositoryById(String owner, String repo, String accessToken);

  ResponseEntity<String> fetchDependabotAlerts(String owner, String repo, Integer count, String accessToken);

  ResponseEntity<String> fetchCodeScanningAlerts(String owner, String repo, String accessToken);

}
