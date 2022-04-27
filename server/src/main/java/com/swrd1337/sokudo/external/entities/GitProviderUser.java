package com.swrd1337.sokudo.external.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class GitProviderUser {

  private Long id;

  private String login;

  private String avatarUrl;

  private String htmlUrl;

  private String name;

}
