package com.swrd1337.sokudo.api.configuration;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {    

    @Autowired
    private TokenOAuthFilter tokenFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http
        .csrf().disable()
        .cors()
        .configurationSource(corsConfigurationSource())
        .and()
        .authorizeRequests()
        .antMatchers("/proxy/oauth/**").permitAll()
        .anyRequest().authenticated()
        .and()
        .logout().logoutUrl("/proxy/oauth/logout")
        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
        .clearAuthentication(true)
        .deleteCookies("JSESSIONID")
        .invalidateHttpSession(true);

      http.addFilterBefore(tokenFilter, BasicAuthenticationFilter.class);
    }    
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration configuration = new CorsConfiguration();
      configuration.setAllowedOrigins(Arrays.asList("*"));
      configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
      configuration.setAllowedHeaders(Collections.singletonList("*"));
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", configuration);
      return source;
    }
}
