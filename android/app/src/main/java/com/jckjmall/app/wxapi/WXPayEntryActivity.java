package com.jckjmall.app.wxapi;

import android.app.Activity;
import android.os.Bundle;

import com.rnlib.wechat.RNWechatModule;

public class WXPayEntryActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      RNWechatModule.handleIntent(this.getIntent());
      finish();
  }

}
