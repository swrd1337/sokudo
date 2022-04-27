package com.swrd1337.sokudo.api.repositories;

import com.swrd1337.sokudo.api.entities.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {

  User findByAccessToken(String accessToken);

}
