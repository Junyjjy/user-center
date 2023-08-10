package com.example.usercenter.service;

import com.example.usercenter.model.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Resource
    private UserService userService;

    @Test
    void testAddUser() {
        User user = new User();
        user.setUsername("juny");
        user.setUserAccount("123");
        user.setAvatarUrl("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F520858d1-8cf5-3092-9dd4-b3b7ac3bfd7f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692971141&t=d5c425d30544c9ca9f694e1a9b6fce88");
        user.setGender(0);
        user.setUserPassword("123");
        user.setPhone("456");
        user.setEmail("789");

        boolean result = userService.save(user);
        System.out.println(user.getId());
        Assertions.assertTrue(result);
    }

    @Test
    void testAddUser1() {
        User user = new User();
        user.setUsername("long");
        user.setUserAccount("long");
        user.setAvatarUrl("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F520858d1-8cf5-3092-9dd4-b3b7ac3bfd7f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692971141&t=d5c425d30544c9ca9f694e1a9b6fce88");
        user.setGender(0);
        user.setUserPassword("12345678");
        user.setPhone("456");
        user.setEmail("789");

        boolean result = userService.save(user);
        System.out.println(user.getId());
        Assertions.assertTrue(result);
    }
}