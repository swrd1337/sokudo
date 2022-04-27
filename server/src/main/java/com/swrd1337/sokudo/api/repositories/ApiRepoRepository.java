package com.swrd1337.sokudo.api.repositories;

import com.swrd1337.sokudo.api.entities.RepositoryData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApiRepoRepository extends MongoRepository<RepositoryData, Long> {
  
  RepositoryData findByOwnerNameAndRepoName(String ownerName, String repoName);

  RepositoryData findByOwnerName(String ownerName);

}
