package com.swrd1337.sokudo.api.repositories;

import com.swrd1337.sokudo.api.entities.Board;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardsRepository extends MongoRepository<Board, Long>{
  
}
