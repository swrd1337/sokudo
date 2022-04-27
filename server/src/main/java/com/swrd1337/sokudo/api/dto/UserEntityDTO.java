package com.swrd1337.sokudo.api.dto;

import com.swrd1337.sokudo.api.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class UserEntityDTO {
  
  private String username;

  private String avatarUrl;

  private String pageUrl;

  private String name;

  private String accessToken;

  public UserEntityDTO(@NonNull User user) {
    this.username = user.getUsername();
    this.avatarUrl = user.getAvatarUrl();
    this.pageUrl = user.getPageUrl();
    this.name = user.getName();
    this.accessToken = user.getAccessToken();
  }

}
