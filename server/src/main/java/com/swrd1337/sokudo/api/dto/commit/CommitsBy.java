package com.swrd1337.sokudo.api.dto.commit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class CommitsBy {

  private String name;

  private int count;

  public CommitsBy(String name) {
    this.name = name;
    this.count = 1;
  }

}
