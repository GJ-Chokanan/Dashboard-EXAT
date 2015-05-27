<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2559";
		String query=" Select Round(Sum(No_Of_Traffic_This_Year)) As No_Of_Traffic_This_Year  "+
				" ,Case When Sum(No_Of_Traffic_Last_Year) = 0 Then 0 Else Round(((Sum(No_Of_Traffic_This_Year)-Sum(No_Of_Traffic_Last_Year))/Sum(No_Of_Traffic_Last_Year)) * 100,2) End As This_Last "+
		
				" ,round(Sum(No_Of_Traffic_This_Year)/countdatebyyear) As AVG_No_Of_Traffic_This_Year  "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key Left Join "+
				" ( Select Buddhist_Fiscal_Year ,count(Calendar_Date) as countdatebyyear From Dim_Date "+
				" Where Buddhist_Fiscal_Year = '"+paramYear+"' And (Fiscal_Month_No In '"+paramMonth+"' Or 'All' In '"+paramMonth+"') Group By Buddhist_Fiscal_Year )Ddd On Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') Group By countdatebyyear ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>