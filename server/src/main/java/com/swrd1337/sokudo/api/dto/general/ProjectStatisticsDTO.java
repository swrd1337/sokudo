package com.swrd1337.sokudo.api.dto.general;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class ProjectStatisticsDTO {
  
  private List<BoardStatisticsDTO> boardStats = new ArrayList<>();

  private List<MdsStatisticsDTO> mdsStats = new ArrayList<>();

}
