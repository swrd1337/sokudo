package com.swrd1337.sokudo.api.controllers;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.swrd1337.sokudo.api.configuration.ApiAuthenticationToken;
import com.swrd1337.sokudo.api.dto.commit.CommitDTO;
import com.swrd1337.sokudo.api.dto.commit.CommitDataDTO;
import com.swrd1337.sokudo.api.dto.commit.CommitStatisticsDTO;
import com.swrd1337.sokudo.api.dto.commit.CommitsBy;
import com.swrd1337.sokudo.api.dto.general.BoardStatisticsDTO;
import com.swrd1337.sokudo.api.dto.general.MdsStatisticsDTO;
import com.swrd1337.sokudo.api.dto.general.ProjectStatisticsDTO;
import com.swrd1337.sokudo.api.entities.Board;
import com.swrd1337.sokudo.api.entities.Markdown;
import com.swrd1337.sokudo.api.entities.RepositoryData;
import com.swrd1337.sokudo.api.entities.Task;
import com.swrd1337.sokudo.api.services.ApiRepoService;
import com.swrd1337.sokudo.api.services.AuthTokenService;
import com.swrd1337.sokudo.api.services.BoardsService;
import com.swrd1337.sokudo.api.services.CommentsService;
import com.swrd1337.sokudo.api.services.MarkdownsService;
import com.swrd1337.sokudo.api.services.TasksService;
import com.swrd1337.sokudo.external.api.GitHostProviderApi;
import com.swrd1337.sokudo.utilities.GsonWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

  @Autowired
  private AuthTokenService authTokenService;

  @Autowired
  private GitHostProviderApi gitApi;

  @Autowired
  private ApiRepoService repoService;

  @Autowired
  private BoardsService boardsService;

  @Autowired
  private TasksService tasksService;

  @Autowired
  private CommentsService commentsService;

  @Autowired
  private MarkdownsService markdownsService;

  @GetMapping("/{owner}/{repo}/commits")
  public ResponseEntity<CommitStatisticsDTO> getGithubActivity(
    @PathVariable String owner,
    @PathVariable String repo,
    ApiAuthenticationToken principal
  ) {
    String accessToken = authTokenService.getAccessTokenFromAuthToken(principal);
    ResponseEntity<String> commitsJson = gitApi.fetchCommits(owner, repo, accessToken);
    CommitDataDTO[] commits = GsonWrapper.getApiGson().fromJson(commitsJson.getBody(), CommitDataDTO[].class);
    
    Map<String, CommitsBy> commitsByUser = new HashMap<>();
    Map<String, CommitsBy> commitsByDate = new HashMap<>();

    for (CommitDataDTO commitData : commits) {
      CommitDTO commit = commitData.getCommit();
      addUserCommitsStats(commitsByUser, commit);
      addDateCommitsStats(commitsByDate, commit);
    }
    
    CommitStatisticsDTO stats = new CommitStatisticsDTO();
    stats.setByUser(commitsByUser.values().stream().collect(Collectors.toList()));
    stats.setByDate(commitsByDate.values().stream().collect(Collectors.toList()));
    return new ResponseEntity<>(stats, HttpStatus.OK);
  }

  @GetMapping("/{owner}/{repo}/general")
  public ResponseEntity<ProjectStatisticsDTO> getBoardStatistics(
      @PathVariable String owner,
      @PathVariable String repo) {
    Long repoId = repoService.getRepositoryData(owner, repo).getId();
    List<Board> boards = boardsService.getAllByRepoId(repoId);

    List<BoardStatisticsDTO> boardStats = new ArrayList<>();
    boards.forEach((Board board) -> {
      List<Task> allTasks = tasksService.getAllTasks(board.getId());
      int commentsCount = 0;
      for (Task task : allTasks) {
        commentsCount += commentsService.getCount(task.getId());
      }
      boardStats.add(new BoardStatisticsDTO(board.getName(), allTasks.size(), commentsCount));
    });

    List<Markdown> markdowns = markdownsService.getMarkdowns(repoId);
    Map<String, Integer> mdsMap = new HashMap<>();
    markdowns.forEach((Markdown md) -> {
      String author = md.getAuthor();
      Integer count = mdsMap.get(author);
      mdsMap.put(author, count == null ? 1 : count + 1);
    });

    List<MdsStatisticsDTO> mdsStats = mdsMap.entrySet().stream()
        .map(e -> new MdsStatisticsDTO(e.getKey(), e.getValue())).collect(Collectors.toList());

    return new ResponseEntity<>(new ProjectStatisticsDTO(boardStats, mdsStats), HttpStatus.OK);
  }

  private void addDateCommitsStats(Map<String, CommitsBy> commitsByDate, CommitDTO commit) {
    String formattedDate = Instant.parse(commit.getCommitter().getDate())
        .atOffset(ZoneOffset.UTC)
        .format(DateTimeFormatter.ofPattern("uuuu-MM-dd"));

    CommitsBy commitsBy = commitsByDate.get(formattedDate);
    commitsByDate.put(formattedDate,
        commitsBy == null ? new CommitsBy(formattedDate) : new CommitsBy(formattedDate, commitsBy.getCount() + 1));
  }

  private void addUserCommitsStats(Map<String, CommitsBy> commitsByUser, CommitDTO commit) {
    String name = commit.getCommitter().getName();
    CommitsBy commitsBy = commitsByUser.get(name);
    commitsByUser.put(name, commitsBy == null ? new CommitsBy(name) : new CommitsBy(name, commitsBy.getCount() + 1));
  }

}
