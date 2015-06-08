<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=
				" Select Distinct Buddhist_Fiscal_Year,TO_CHAR(Fiscal_Month_No) as month_no,Substr(Fiscal_Month_Name,6) as month_name ,Fiscal_Month_No as month_no_2 From Dim_Date "+
						" Where Buddhist_Fiscal_Year = '"+paramYear+"'  "+
						" UNION "+
						" Select Distinct Buddhist_Fiscal_Year,'All' as month_no,'---รวมทุกเดือน---' as month_name,0 as month_no_2 From Dim_Date "+ 
						" Where Buddhist_Fiscal_Year = '"+paramYear+"'  "+
						" order by month_no_2 ";
		String columns="2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>