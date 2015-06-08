<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Round(Sum(No_Of_Traffic_This_Year)) As No_Of_Traffic_This_Year "+
						" ,Round(Sum(No_Of_Traffic_This_Year)/(Select Count(Distinct fdt.Date_Key) From Fact_Daily_Traffic fdt Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"')) As AVG_No_Of_Traffic_This_Year "+
						" From Fact_Monthly_Traffic Fmt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fmt.Usage_Plaza_Key != '1' "+
						" group by 1 ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>