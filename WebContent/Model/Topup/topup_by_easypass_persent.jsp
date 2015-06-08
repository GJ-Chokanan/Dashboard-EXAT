<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");
		//String paramYear = "2559";
		String query=" Select Topup_Rate ,No_Of_Topup ,round((No_Of_Topup / d)*100 ,2) From  ( Select TOPUP_RATE ,Sum(No_Of_Topup) As No_Of_Topup "+
				" ,(Select Sum(No_Of_Topup) As No_Of_Topup FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key  "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"'))d  FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key Left Join Dim_TOPUP_RATE Dtur On Dtur.TOPUP_RATE_KEY = Ftp.TOPUP_RATE_KEY "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') Group By Topup_Rate )  order by Topup_Rate ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>