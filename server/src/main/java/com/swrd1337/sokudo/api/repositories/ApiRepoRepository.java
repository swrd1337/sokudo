package com.swrd1337.sokudo.api.repositories;

import com.swrd1337.sokudo.api.entities.RepositoryData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiRepoRepository extends MongoRepository<RepositoryData, Long> {
  
  RepositoryData findByOwnerNameAndRepoName(String ownerName, String repoName);

  RepositoryData findByOwnerName(String ownerName);

}
