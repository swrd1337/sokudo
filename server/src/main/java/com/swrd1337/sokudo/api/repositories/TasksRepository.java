package com.swrd1337.sokudo.api.repositories;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Task;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TasksRepository extends MongoRepository<Task, Long> {

    List<Task> findAllByRepositoryDataId(Long repositoryDataId);

}
