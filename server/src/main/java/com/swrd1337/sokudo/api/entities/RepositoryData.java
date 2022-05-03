package com.swrd1337.sokudo.api.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "repository_data")
public class RepositoryData {

  public static final String DEFAULT_NAME = "Default";

  @Transient
  public static final String SEQUENCE_NAME = "repo_data_sequence";

  @Id
  private long id;

  private String name = DEFAULT_NAME;

  private String ownerName;

  private String repoName;

  private String defaultBranch;

  private String visibility;

  @DBRef
  private List<Board> boards;

  public RepositoryData(String ownerName, String name, String defaultBranch, String visibility) {
    this.ownerName = ownerName;
    this.repoName = name;
    this.defaultBranch = defaultBranch;
    this.visibility = visibility;
    this.boards = new ArrayList<>();
  }

}
