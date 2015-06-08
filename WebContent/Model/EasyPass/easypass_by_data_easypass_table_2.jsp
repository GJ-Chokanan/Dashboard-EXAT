<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Card_Type "+
				" ,Sum_Amount_Active "+
				" from "+
				" ( "+
				" SELECT 'บัตรนำมาใช้งาน' AS CARD_TYPE, "+
				" SUM(AMOUNT) AS Sum_Amount_Active "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V "+
				" WHERE BUDDHIST_DATE = ( "+
				" SELECT MAX(V.BUDDHIST_DATE) "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
				" WHERE V.BUDDHIST_DATE = DD.BUDDHIST_DATE "+
				" AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"') "+
				" ) "+
				" and  TYPE = 'Active' "+
				" union "+
				" SELECT 'บัตรไม่ได้นำมาใช้งาน' AS CARD_TYPE, "+
				" SUM(AMOUNT) AS Sum_Amount_Active "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V "+
				" WHERE BUDDHIST_DATE = ( "+
				" SELECT MAX(V.BUDDHIST_DATE) "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
				" WHERE V.BUDDHIST_DATE = DD.BUDDHIST_DATE "+
				" AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"') "+
				" ) "+
				" And  Type != 'Active' "+
				" )e ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>