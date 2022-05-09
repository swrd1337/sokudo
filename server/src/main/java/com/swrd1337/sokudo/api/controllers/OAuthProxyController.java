package com.swrd1337.sokudo.api.controllers;

import java.util.HashMap;
import java.util.Map;

import com.swrd1337.sokudo.AppProperties;
import com.swrd1337.sokudo.api.dto.UserEntityDTO;
import com.swrd1337.sokudo.api.entities.User;
import com.swrd1337.sokudo.api.services.UserService;
import com.swrd1337.sokudo.external.api.GitHostProviderApi;
import com.swrd1337.sokudo.external.entities.AccessTokenResponse;
import com.swrd1337.sokudo.external.entities.GitProviderUser;
import com.swrd1337.sokudo.utilities.GsonWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/proxy/oauth")
public class OAuthProxyController {
  
  @Autowired
  private GitHostProviderApi gitApi;

  @Autowired
  private UserService userService;
  
  @Autowired
  private AppProperties properties;

  @CrossOrigin(origins = "*")
  @GetMapping("/{code}")
  public ResponseEntity<UserEntityDTO> getJwtToken(@PathVariable String code) {
    Map<String, String> data = getAccessTokenBodyData(code);
    ResponseEntity<String> response = gitApi.fetchAccessToken(data);
    AccessTokenResponse tokenResponse = GsonWrapper.getApiGson().fromJson(response.getBody(), AccessTokenResponse.class);

    UserEntityDTO userDto = null;
    String accessToken = tokenResponse.getAccessToken();
    if (accessToken != null && !accessToken.isBlank()) {
      response = gitApi.fetchUserData(accessToken);
      GitProviderUser gitUser = GsonWrapper.getApiGson().fromJson(response.getBody(), GitProviderUser.class);
      // TODO: Fetch repos and add this list to out user object.
      Long id = gitUser.getId();
      if (id != null) {
        User user;
        try {
          user = userService.getUser(id);
          user.setAccessToken(accessToken);
          userService.updateUser(user);
        } catch (NotFoundException e) {
          user = userService.addUser(gitUser, accessToken);
        }
        userDto = new UserEntityDTO(user);
      }
    }

    return new ResponseEntity<>(userDto, HttpStatus.OK);
  }

  private Map<String, String> getAccessTokenBodyData(String code) {
    Map<String, String> data = new HashMap<>();
    data.put("client_id", properties.getGitProviderClientId());
    data.put("client_secret", properties.getGitProviderClientSecret());
    data.put("code", code);
    return data;
  }  

}
