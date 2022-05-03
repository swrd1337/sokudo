package com.swrd1337.sokudo.api.entities;


import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
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
@Document(collection = "boards")
public class Board {
  
  @Transient
  public static final String SEQUENCE_NAME = "board_sequence";

  @Id
  private long id;

  private String name;

  private Set<String> boardColumns;

  private String doneColumnName;

  private long repoDataId;

  public Board(String name, Set<String> boardColumns, String doneColumnName, long repoDataId) {
    this.name = name;
    this.boardColumns = boardColumns;
    this.doneColumnName = doneColumnName;
    this.repoDataId = repoDataId;
  }

}
