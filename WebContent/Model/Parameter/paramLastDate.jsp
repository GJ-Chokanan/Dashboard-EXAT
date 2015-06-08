<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

 		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
		String paramFirstDate = request.getParameter("paramFirstDate"); 
/*  		String paramYear = "2555";
		String paramMonth = "1";
		String paramFirstDate = "2"; */ 
		String query="SELECT DISTINCT TO_NUMBER(SUBSTR(TO_CHAR(BUDDHIST_DATE), 9)) as LastDate FROM DIM_DATE WHERE BUDDHIST_FISCAL_YEAR = '"+ paramYear +"' AND FISCAL_MONTH_NO = '"+ 1 +"' AND TO_NUMBER(SUBSTR(TO_CHAR(BUDDHIST_DATE), 9))>='"+ paramFirstDate +"' ORDER BY 1"; 
		String columns="1";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>