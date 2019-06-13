package com.jckjmall.app.widget;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.Button;
import android.widget.TextView;

import com.jckjmall.app.R;


/**
 * 统一的弹窗
 */
public class PermissonSetDialog extends Dialog {


    public PermissonSetDialog(Context context) {
        super(context);
    }

    public PermissonSetDialog(Context context, int theme) {
        super(context, theme);
    }

    public static class Builder {
        private Context context; //上下文对象
        private String title; //对话框标题
        private String message; //对话框内容
        private String confirm_btnText; //按钮名称“确定”
        private String cancel_btnText; //按钮名称“取消”
        private View contentView; //对话框中间加载的其他布局界面
        /*按钮监听事件*/
        private OnClickListener confirm_btnClickListener;
        private OnClickListener cancel_btnClickListener;

        public Builder(Context context) {
            this.context = context;
        }


        /**
         * 设置弹窗 消息
         *
         * @param message
         * @return
         */
        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        /**
         * Set the Dialog message from resource
         *
         * @param message
         * @return
         */
        public Builder setMessage(int message) {
            this.message = (String) context.getText(message);
            return this;
        }

        /**
         * Set the Dialog title from resource
         *
         * @param title
         * @return
         */
        public Builder setTitle(int title) {
            this.title = (String) context.getText(title);
            return this;
        }

        /**
         * Set the Dialog title from String
         *
         * @param title
         * @return
         */
        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        /**
         * 设置对话框界面
         *
         * @param v View
         * @return
         */
        public Builder setContentView(View v) {
            this.contentView = v;
            return this;
        }

        /**
         * Set the positive button resource and it's listener
         *
         * @param confirm_btnText
         * @return
         */
        public Builder setPositiveButton(int confirm_btnText,
                                         OnClickListener listener) {
            this.confirm_btnText = (String) context.getText(confirm_btnText);
            this.confirm_btnClickListener = listener;
            return this;
        }

        /**
         * Set the positive button and it's listener
         *
         * @param confirm_btnText
         * @return
         */
        public Builder setPositiveButton(String confirm_btnText,
                                         OnClickListener listener) {
            this.confirm_btnText = confirm_btnText;
            this.confirm_btnClickListener = listener;
            return this;
        }

        /**
         * Set the negative button resource and it's listener
         *
         * @param cancel_btnText
         * @return
         */
        public Builder setNegativeButton(int cancel_btnText,
                                         OnClickListener listener) {
            this.cancel_btnText = (String) context.getText(cancel_btnText);
            this.cancel_btnClickListener = listener;
            return this;
        }

        /**
         * Set the negative button and it's listener
         *
         * @param cancel_btnText
         * @return
         */
        public Builder setNegativeButton(String cancel_btnText,
                                         OnClickListener listener) {
            this.cancel_btnText = cancel_btnText;
            this.cancel_btnClickListener = listener;
            return this;
        }

        public PermissonSetDialog create() {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            // 创建CustomDialog对象,设置了背景
            final PermissonSetDialog dialog = new PermissonSetDialog(context, R.style.mystyle);
            dialog.setCancelable(false);
            // 创建默认统一的弹窗布局
            View layout = inflater.inflate(R.layout.permission_set_dialog, null);
            //设置弹窗布局及其布局参数
            dialog.addContentView(layout, new LayoutParams(
                    LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT));
            // 设置标题
            TextView titleText = (TextView) layout.findViewById(R.id.title);
            //确定与取消之间的分割线
            if (!TextUtils.isEmpty(title)) {
                titleText.setVisibility(View.VISIBLE);
                titleText.setText(title);
                //设置标题粗体
                titleText.getPaint().setFakeBoldText(true);
            } else {
                titleText.setVisibility(View.GONE);
            }

            // 设置确定按钮
            Button mConfirmBtn = (Button) layout.findViewById(R.id.confirm_btn);
            if (!TextUtils.isEmpty(confirm_btnText)) {
                mConfirmBtn.setText(confirm_btnText);
                if (confirm_btnClickListener != null) {
                    mConfirmBtn.setOnClickListener(new View.OnClickListener() {
                        public void onClick(View v) {
                            confirm_btnClickListener.onClick(dialog, DialogInterface.BUTTON_POSITIVE);
                        }
                    });
                }
            } else {
                // 隐藏确定按钮
                mConfirmBtn.setVisibility(View.GONE);
            }
            // 设置取消按钮
            Button mCancelBtn = (Button) layout.findViewById(R.id.cancel_btn);
            if (!TextUtils.isEmpty(cancel_btnText)) {
                mCancelBtn.setText(cancel_btnText);
                if (cancel_btnClickListener != null) {
                    mCancelBtn.setOnClickListener(new View.OnClickListener() {
                        public void onClick(View v) {
                            cancel_btnClickListener.onClick(dialog,
                                    DialogInterface.BUTTON_NEGATIVE);
                        }
                    });
                }
            } else {
                // 隐藏取消按钮
                mCancelBtn.setVisibility(View.GONE);
            }
            // 设置消息内容
            TextView mTvMessage = (TextView) layout.findViewById(R.id.message);
            if (!TextUtils.isEmpty(message)) {
                mTvMessage.setText(message);
            } else if (contentView != null) {
                //设置自定义的内容布局
//                RelativeLayout mContentView = (RelativeLayout) layout.findViewById(R.id.rl_content);
//                mContentView.removeAllViews();
//                mContentView.addView(
//                        contentView, new LayoutParams(
//                                LayoutParams.MATCH_PARENT,
//                                LayoutParams.WRAP_CONTENT));
            }
            dialog.setContentView(layout);
            return dialog;
        }


        public PermissonSetDialog create(Context mcontext) {
            this.context = mcontext;
            return create();
        }
    }
}
