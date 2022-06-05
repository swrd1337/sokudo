package com.swrd1337.sokudo.api.dto.commit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class CommitDTO {
  
  private CommitterDTO committer;

}
