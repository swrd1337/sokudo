package com.swrd1337.sokudo.api.entities;


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
public class Repository {

  private long id;

  private String name;

  private String htmlUrl;

  private String visibility;

  private String description;

  private boolean fork;

  private String language;

  private String defaultBranch;

  private RepositoryOwner owner;

}
