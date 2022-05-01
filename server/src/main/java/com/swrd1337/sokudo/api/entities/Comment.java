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
@Document(collection = "comments")
public class Comment {
  
  @Transient
  public static final String SEQUENCE_NAME = "comment_sequence";

  @Id
  private long id;

  private long userId;

  private long taskId;

  private String content;

  private String username;

  private String avatarUrl;

}
