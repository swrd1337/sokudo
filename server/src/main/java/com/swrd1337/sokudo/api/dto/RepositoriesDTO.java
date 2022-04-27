package com.swrd1337.sokudo.api.dto;

import com.swrd1337.sokudo.api.entities.Repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class RepositoriesDTO {
  
  private Repository[] repositories;

}
