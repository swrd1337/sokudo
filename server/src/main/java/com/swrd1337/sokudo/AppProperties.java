package com.swrd1337.sokudo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Component
@Getter
public class AppProperties {
  
  @Value("${git.provider.client.id}")
  private String gitProviderClientId;
  
  @Value("${git.provider.client.secret}")
  private String gitProviderClientSecret;

  @Value("${git.provider.access.token.issuer.url}")
  private String tokenIssuerUrl;

  @Value("${git.provider.base.url}")
  private String gitProviderBaseUrl;
}
