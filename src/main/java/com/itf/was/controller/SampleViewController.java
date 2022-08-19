package com.itf.was.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SampleViewController {

    @RequestMapping( value = "/main" )
    public String main() {
        return "main";
    }

}
