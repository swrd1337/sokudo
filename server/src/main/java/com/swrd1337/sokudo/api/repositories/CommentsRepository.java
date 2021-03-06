package com.swrd1337.sokudo.api.repositories;

import com.swrd1337.sokudo.api.entities.Comment;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends MongoRepository<Comment, Long> {

  void deleteAllByTaskId(Long taskId);

  int countByTaskId(Long taskId);

}
