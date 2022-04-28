package com.swrd1337.sokudo.api.dto;


import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RepositoryDTO {

  private long id;

  private String name;

  private String htmlUrl;

  private String visibility;

  private String description;

  private boolean fork;

  private String language;

  private String defaultBranch;

  private RepositoryOwnerDTO owner;

}
