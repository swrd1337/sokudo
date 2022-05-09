package com.swrd1337.sokudo.api.dto.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CodeScanningAlertDTO {

  private Integer number;

  private String createdAt;
  
  private String state;

  private RuleDTO rule;

  private InstanceDTO mostRecentInstance;

}