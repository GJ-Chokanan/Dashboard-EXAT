<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String query="SELECT DISTINCT DD.BUDDHIST_FISCAL_YEAR FROM DIM_DATE DD WHERE DD.BUDDHIST_FISCAL_YEAR <= (CASE WHEN TO_NUMBER(TO_CHAR(SYSDATE, 'MM')) BETWEEN 10 and 12 THEN TO_CHAR(SYSDATE, 'YYYY')+544 ELSE TO_CHAR(SYSDATE, 'YYYY')+543 END) ORDER BY DD.BUDDHIST_FISCAL_YEAR DESC"; 
		String columns="1";
           
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>