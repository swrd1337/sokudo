package com.swrd1337.sokudo.external.api;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface GitHostProviderApi {
  
  ResponseEntity<String> fetchAccessToken(Map<String, String> body);

  ResponseEntity<String> fetchUserData(String accessToken);

  ResponseEntity<String> fetchAllRepositories(String accessToken);

  ResponseEntity<String> fetchRepositoryById(String owner, String repo, String accessToken);

}
