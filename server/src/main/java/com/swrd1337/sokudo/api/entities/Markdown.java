package com.swrd1337.sokudo.api.entities;

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
@Document(collection = "markdowns")
public class Markdown {
  
  @Transient
  public static final String SEQUENCE_NAME = "markdown_sequence";

  @Id
  private long id;

  private long repoId;

  private String title;

  private String content;

  private String author;

}
