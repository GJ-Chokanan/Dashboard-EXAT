<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
		//String paramYear = "2559";
		String query=" Select TOPUP_POINT_TYPE,Sum(No_Of_Topup) as No_Of_Topup FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Ftp.TOPUP_PLAZA_KEY "+
				" Where Ddm.Buddhist_Fiscal_Year = '2557' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') Group By TOPUP_POINT_TYPE ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>