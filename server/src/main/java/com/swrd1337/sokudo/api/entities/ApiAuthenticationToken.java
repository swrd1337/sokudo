package com.swrd1337.sokudo.api.entities;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class ApiAuthenticationToken implements Authentication {

  private TokenUserDetails userDetails;

  private boolean authenticated;

  public ApiAuthenticationToken(TokenUserDetails userDetails) {
    this.userDetails = userDetails;
    this.authenticated = true;
  }

  @Override
  public String getName() {
    return userDetails.getUsername();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return userDetails.getAuthorities();
  }

  @Override
  public Object getCredentials() {
    return null;
  }

  @Override
  public Object getDetails() {
    return userDetails;
  }

  @Override
  public Object getPrincipal() {
    return userDetails;
  }

  @Override
  public boolean isAuthenticated() {
    return authenticated;
  }

  @Override
  public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException { 
    this.authenticated = isAuthenticated;
  }
  
}
