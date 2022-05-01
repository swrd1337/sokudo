package com.swrd1337.sokudo.api.services;

import java.util.Optional;

import com.swrd1337.sokudo.api.entities.User;
import com.swrd1337.sokudo.api.repositories.UserRepository;
import com.swrd1337.sokudo.external.entities.GitProviderUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  
  @Autowired
  private UserRepository repository;

  public User getUser(Long id) throws NotFoundException {
    Optional<User> optional = repository.findById(id);
    return optional.orElseThrow(() -> new NotFoundException());
  }

  public void updateUser(User user) {
    repository.save(user);
  }

  public User addUser(GitProviderUser gitUser, String accessToken) {
    Long id = gitUser.getId();
    String username = gitUser.getLogin();
    String avatarUrl = gitUser.getAvatarUrl();
    String pageUrl = gitUser.getHtmlUrl();
    String name = gitUser.getName();
    User newUser = new User(id, username, avatarUrl, pageUrl, name, accessToken);
    return repository.save(newUser);
  } 

}
