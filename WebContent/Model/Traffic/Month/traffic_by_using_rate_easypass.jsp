<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2559";
		String query=" Select Usage_Range_Desc ,No_Of_Traffic_This_Year ,round(((No_Of_Traffic_This_Year*100)/Total),2) as per From  ( Select Dur.USAGE_RANGE_DESC  "+
				" ,Sum(No_Of_Traffic_This_Year) As No_Of_Traffic_This_Year ,Dur.Usage_Range_Key  ,(Select Sum(No_Of_Traffic_This_Year)  From Fact_Monthly_Traffic Fmt  Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"')) As Total From Fact_Monthly_Traffic Fmt Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key Left Join DIM_USAGE_RANGE Dur On Dur.USAGE_RANGE_KEY = Fmt.USAGE_RANGE_KEY "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"'  AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') Group By Dur.Usage_Range_Desc, Dur.Usage_Range_Key )e order by USAGE_RANGE_KEY ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>