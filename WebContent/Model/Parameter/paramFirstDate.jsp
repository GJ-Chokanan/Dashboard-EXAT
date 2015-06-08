<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
		//String paramYear = "2555";
		//String paramMonth = "1";
		
		String query="SELECT DISTINCT SUBSTR(TO_CHAR(BUDDHIST_DATE), 9),case when SUBSTR(TO_CHAR(BUDDHIST_DATE), 9)between 1 and 9 then (SUBSTR(TO_CHAR(BUDDHIST_DATE), 10)) ELSE SUBSTR(TO_CHAR(BUDDHIST_DATE), 9) end AS CAL_DATE FROM DIM_DATE WHERE BUDDHIST_FISCAL_YEAR = '"+paramYear+"' AND FISCAL_MONTH_NO = '"+1+"' ORDER BY 1"; 
		String columns="2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>