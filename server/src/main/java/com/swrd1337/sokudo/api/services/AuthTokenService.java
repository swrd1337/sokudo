package com.swrd1337.sokudo.api.services;

import com.swrd1337.sokudo.api.configuration.ApiAuthenticationToken;
import com.swrd1337.sokudo.api.configuration.TokenUserDetails;

import org.springframework.stereotype.Service;

@Service
public class AuthTokenService {
  
  public String getAccessTokenFromAuthToken(ApiAuthenticationToken authToken) {
    TokenUserDetails userDetails = (TokenUserDetails) authToken.getDetails();
    return userDetails.getAccessToken();
  }

}
