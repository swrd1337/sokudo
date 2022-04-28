package com.swrd1337.sokudo.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class RepositoriesDTO {
  
  private RepositoryDTO[] repositories;

}
