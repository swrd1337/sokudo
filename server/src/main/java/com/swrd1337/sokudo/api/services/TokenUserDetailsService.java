package com.swrd1337.sokudo.api.services;

import com.swrd1337.sokudo.api.entities.TokenUserDetails;
import com.swrd1337.sokudo.api.entities.User;
import com.swrd1337.sokudo.api.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TokenUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return null;
  }

  public TokenUserDetails loadByTokenValue(String token) {
    User user = repository.findByAccessToken(token);
    if (user != null) {
      return new TokenUserDetails(user.getId(), user.getUsername(), user.getAccessToken());
    } 
    return null;
  }
  
}
