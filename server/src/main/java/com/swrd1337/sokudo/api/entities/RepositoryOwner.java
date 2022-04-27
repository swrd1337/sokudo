package com.swrd1337.sokudo.api.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class RepositoryOwner {
  
  private String login;

  private String avatarUrl;

  private String htmlUrl;

}
