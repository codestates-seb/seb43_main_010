package example.global.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MyFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain)
        throws IOException, ServletException{
        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;
        if(req.getMethod().equals("POST")){
            System.out.println("POST 요청됨");
            String headerAuth = req.getHeader("Authorization");
            System.out.println(headerAuth);
            System.out.println("필터 1");

            if(headerAuth.equals("right")){
                chain.doFilter(req,res);
            }else{
                PrintWriter out = res.getWriter();
                out.println("인증 안됌");
            }
        }

    }
}
