package com.swrd1337.sokudo.external.api;

import java.util.Map;

import com.swrd1337.sokudo.AppProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class GitHubApi implements GitHostProviderApi {
  
  @Autowired
  private AppProperties properties;

  @Override
  public ResponseEntity<String> fetchUserData(String accessToken) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Accept", "application/json");
    headers.add("Authorization", "token " + accessToken);
    HttpEntity<Void> request = new HttpEntity<>(headers);
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.exchange(properties.getGitProviderBaseUrl() + "/user", HttpMethod.GET, request, String.class);
  }

  @Override
  public ResponseEntity<String> fetchAccessToken(Map<String, String> data) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Accept", "application/json");
    HttpEntity<Map<String, String>> request = new HttpEntity<>(data, headers);
    RestTemplate restTemplate = new RestTemplate();
    String tokenIssuerUrl = properties.getTokenIssuerUrl();
    return restTemplate.postForEntity(tokenIssuerUrl, request, String.class);
  }

  @Override
  public ResponseEntity<String> fetchAllRepositories(String accessToken) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Accept", "application/json");
    headers.add("Authorization", "token " + accessToken);
    HttpEntity<Void> request = new HttpEntity<>(headers);
    RestTemplate restTemplate = new RestTemplate();
    String url = properties.getGitProviderBaseUrl() + "/user/repos";
    return restTemplate.exchange(url, HttpMethod.GET, request, String.class);
  }

  @Override
  public ResponseEntity<String> fetchRepositoryById(String owner, String repo, String accessToken) {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Accept", "application/json");
    headers.add("Authorization", "token " + accessToken);
    HttpEntity<Void> request = new HttpEntity<>(headers);
    RestTemplate restTemplate = new RestTemplate();
    String url = properties.getGitProviderBaseUrl() + "/repos/" + owner + "/" + repo;
    return restTemplate.exchange(url , HttpMethod.GET, request, String.class);
  }

}
