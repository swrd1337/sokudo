package com.swrd1337.sokudo.api.dto.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InstanceDTO {
  
  private String commitSha;

  private LocationDTO location;

}