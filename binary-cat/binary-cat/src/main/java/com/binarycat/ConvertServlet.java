package com.binarycat;

import java.io.IOException;

import com.binarycat.utils.Converter;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "ConvertServlet", urlPatterns = {"/convert", "/"})
public class ConvertServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        if (requestURI.equals("/") || requestURI.equals("/BinaryCat")) {
            request.getRequestDispatcher("/index.html").forward(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String input = request.getParameter("input");
        String type = request.getParameter("type");
        
        JsonObject result;
        
        try {
            if ("binaryToText".equals(type)) {
                String text = Converter.convertBinaryToText(input);
                result = new JsonObject();
                result.addProperty("text", text);
            } else {
                result = Converter.convertNumber(input, type);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            result = new JsonObject();
            result.addProperty("error", e.getMessage());
        }
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        new Gson().toJson(result, response.getWriter());
    }
}

