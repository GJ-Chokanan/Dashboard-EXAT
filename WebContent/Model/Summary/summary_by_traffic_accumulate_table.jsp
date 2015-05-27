<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Round(Sum(No_Of_Traffic_This_Year)) as No_Of_Traffic_This_Year "+
				" ,round(Sum(No_Of_Traffic_This_Year)/countdatebyyear) As AVG_No_Of_Traffic_This_Year "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				" Left Join ( "+
				" Select Buddhist_Fiscal_Year "+
				" ,count(Calendar_Date) as countdatebyyear "+
				" From Dim_Date "+
				" where Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Buddhist_Fiscal_Year "+
				" )Ddd on Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Ddm.Buddhist_Fiscal_Year,countdatebyyear ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>