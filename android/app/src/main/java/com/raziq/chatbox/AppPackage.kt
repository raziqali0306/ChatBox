package com.raziq.chatbox

import com.facebook.react.LazyReactPackage
import com.facebook.react.bridge.ModuleSpec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

class AppPackage : LazyReactPackage() {
  override fun getNativeModules(reactContext: ReactApplicationContext): List<ModuleSpec> {
    return listOf(
      ModuleSpec.nativeModuleSpec(AppConfigModule::class.java) {
        AppConfigModule(reactContext)
      }
    )
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return getReactModuleInfoProviderViaReflection(this)
  }
}
