package com.swrd1337.sokudo.api.dto.commit;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class CommitStatisticsDTO {
  
  private List<CommitsBy> byDate = new ArrayList<>();

  private List<CommitsBy> byUser = new ArrayList<>();

}
