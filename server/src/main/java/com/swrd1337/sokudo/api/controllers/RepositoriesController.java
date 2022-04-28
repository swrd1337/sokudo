package com.swrd1337.sokudo.api.controllers;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.swrd1337.sokudo.api.dto.RepositoriesDTO;
import com.swrd1337.sokudo.api.entities.ApiAuthenticationToken;
import com.swrd1337.sokudo.api.entities.Repository;
import com.swrd1337.sokudo.api.entities.RepositoryData;
import com.swrd1337.sokudo.api.services.ApiRepoService;
import com.swrd1337.sokudo.api.services.AuthTokenService;
import com.swrd1337.sokudo.external.api.GitHostProviderApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/repositories")
public class RepositoriesController {

  @Autowired
  private AuthTokenService authTokenService;

  @Autowired
  private GitHostProviderApi gitApi;

  @Autowired
  private ApiRepoService apiRepoService;

  private Gson apiGson = new GsonBuilder()
      .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
      .create();

  @GetMapping
  public ResponseEntity<RepositoriesDTO> getAllRepositories(ApiAuthenticationToken principal) {
    String accessToken = authTokenService.getAccessTokenFromAuthToken(principal);
    // Get all repos from GitHub API
    String response = gitApi.fetchAllRepositories(accessToken).getBody();
    Repository[] repositories = apiGson.fromJson(response, Repository[].class);
    return new ResponseEntity<>(new RepositoriesDTO(repositories), HttpStatus.OK);
  }

  @GetMapping("/{owner}/{repo}/data")
  public ResponseEntity<RepositoryData> getRepositoryData(
    @PathVariable String owner,
    @PathVariable String repo,
    ApiAuthenticationToken principal
  ) {
    RepositoryData repositoryData = apiRepoService.getRepositoryData(owner, repo);
    if (repositoryData == null) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(repositoryData, HttpStatus.OK);
  }

  @PostMapping("/{owner}/{repo}/data")
  public ResponseEntity<RepositoryData> addRepositoryData(
    @PathVariable String owner,
    @PathVariable String repo,
    ApiAuthenticationToken principal
  ) {
    RepositoryData repositoryData = apiRepoService.getRepositoryData(owner, repo);
    if (repositoryData == null) {
      String accessToken = authTokenService.getAccessTokenFromAuthToken(principal);
      String response = gitApi.fetchRepositoryById(owner, repo, accessToken).getBody();
      Repository repository = apiGson.fromJson(response, Repository.class);
      repositoryData = apiRepoService.saveRepositoryData(repository);
    }
    return  new ResponseEntity<>(apiRepoService.getRepositoryData(owner, repo), HttpStatus.OK);
  }

  @PutMapping(value = "/{id}/data", consumes = "application/json")
  public ResponseEntity<RepositoryData> updateRepositoryData(
    @PathVariable Long id,
    @RequestBody String json,
    ApiAuthenticationToken principal
  ) {
    RepositoryData newData = new Gson().fromJson(json, RepositoryData.class);
    RepositoryData updatedRepositoryData = apiRepoService.updateRepositoryData(newData);
    return new ResponseEntity<>(updatedRepositoryData, HttpStatus.OK);
  }

}
