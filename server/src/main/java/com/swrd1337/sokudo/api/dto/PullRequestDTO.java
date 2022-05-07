package com.swrd1337.sokudo.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class PullRequestDTO {

  private String title;

  private String state;

  private String htmlUrl;

  private PullRequestUserDTO user;

  private String createdAt;

  private String mergeCommitSha;

}