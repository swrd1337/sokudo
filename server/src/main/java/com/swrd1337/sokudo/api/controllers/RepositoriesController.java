package com.swrd1337.sokudo.api.controllers;

import com.swrd1337.sokudo.api.configuration.ApiAuthenticationToken;
import com.swrd1337.sokudo.api.dto.RepositoriesDTO;
import com.swrd1337.sokudo.api.dto.RepositoryDTO;
import com.swrd1337.sokudo.api.entities.RepositoryData;
import com.swrd1337.sokudo.api.services.ApiRepoService;
import com.swrd1337.sokudo.api.services.AuthTokenService;
import com.swrd1337.sokudo.external.api.GitHostProviderApi;
import com.swrd1337.sokudo.utilities.GsonWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

  @GetMapping
  public ResponseEntity<RepositoriesDTO> getAllRepositories(ApiAuthenticationToken principal) {
    String accessToken = authTokenService.getAccessTokenFromAuthToken(principal);
    // Get all repos from GitHub API
    String response = gitApi.fetchAllRepositories(accessToken).getBody();
    RepositoryDTO[] repositories = GsonWrapper.getApiGson().fromJson(response, RepositoryDTO[].class);
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
      RepositoryDTO repository = GsonWrapper.getApiGson().fromJson(response, RepositoryDTO.class);
      repositoryData = apiRepoService.saveRepositoryData(repository);
    }
    return  new ResponseEntity<>(apiRepoService.getRepositoryData(owner, repo), HttpStatus.OK);
  }

}
