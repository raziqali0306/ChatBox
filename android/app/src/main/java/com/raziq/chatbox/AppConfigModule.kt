package com.raziq.chatbox

import com.chatbox.BuildConfig
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AppConfigModule.MODULE_NAME, needsEagerInit = true)
class AppConfigModule(val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return MODULE_NAME
  }


  @ReactMethod
  fun config(promise: Promise) {
    val map = Arguments.createMap()
    map.putString("serverUrl", BuildConfig.SERVER_URL)
    promise.resolve(map)
  }


  companion object {
    const val MODULE_NAME = "AppConfigModule"
  }
}
