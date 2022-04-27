package com.swrd1337.sokudo.api.services;

import java.util.Objects;

import com.swrd1337.sokudo.api.entities.DatabaseSequence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorService {

  @Autowired
  private MongoOperations mongoOperations;

  public long generateSequence(String sequenceName) {
    DatabaseSequence counter = mongoOperations.findAndModify(
        Query.query(Criteria.where("_id").is(sequenceName)),
        new Update().inc("seq", 1),
        FindAndModifyOptions.options().returnNew(true).upsert(true),
        DatabaseSequence.class);

    return !Objects.isNull(counter) ? counter.getSeq() : 1;
  }
}
