<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String query="select * from dual"; 
		String columns="1";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>