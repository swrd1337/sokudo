package com.swrd1337.sokudo.api.repositories;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Task;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasksRepository extends MongoRepository<Task, Long> {

    List<Task> findAllByBoardId(Long boardId);

}
