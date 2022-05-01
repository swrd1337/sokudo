package com.swrd1337.sokudo.utilities;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

final public class GsonWrapper {
  
  private static Gson gson;

  private static Gson apiGson;

  private GsonWrapper() {
    // Private constructor to prevent instantiation
  }

  public static Gson getGson() {
    if (gson == null) {
      gson = new Gson();
    }
    return gson;
  }

  public static Gson getApiGson() {
    if (apiGson == null) {
      apiGson = new GsonBuilder()
      .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
      .create();
    }
    return apiGson;
  }

}
