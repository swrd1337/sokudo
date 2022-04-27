package com.swrd1337.sokudo.api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
@Document(collection = "user")
public class User {
  
  @Transient
  public static final String SEQUENCE_NAME = "user_sequence";

  @Id
  private Long id;

  private String username;

  private String avatarUrl;

  private String pageUrl;

  private String name;

  @Setter
  private String accessToken;

}
