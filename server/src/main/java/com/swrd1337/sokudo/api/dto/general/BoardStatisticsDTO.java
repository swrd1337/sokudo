package com.swrd1337.sokudo.api.dto.general;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class BoardStatisticsDTO {
  
  private String boardName;

  private Integer tasksCount;

  private Integer commentsCount;

}
