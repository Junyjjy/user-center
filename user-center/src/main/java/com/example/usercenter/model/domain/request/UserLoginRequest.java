package com.example.usercenter.model.domain.request;

import lombok.Data;

/**
 * 用户登录请求体
 */
@Data
public class UserLoginRequest {

    private static final long serialVersionUID = -543286974259314538L;

    private String userAccount;
    private String userPassword;
}
