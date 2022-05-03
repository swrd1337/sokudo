package com.swrd1337.sokudo.api.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.swrd1337.sokudo.api.services.TokenUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class TokenOAuthFilter extends OncePerRequestFilter {

  private static final String TOKEN_PREFIX = "token ";

  @Autowired
  private TokenUserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith(TOKEN_PREFIX)) {
      String token = authHeader.substring(TOKEN_PREFIX.length());
      TokenUserDetails userDetails = userDetailsService.loadByTokenValue(token);
      if (userDetails != null) {
        ApiAuthenticationToken authentication = new ApiAuthenticationToken(userDetails);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      } else {
        SecurityContextHolder.clearContext();
      }
    } else {
      SecurityContextHolder.clearContext();
    }
    filterChain.doFilter(request, response);
  }
  
}
