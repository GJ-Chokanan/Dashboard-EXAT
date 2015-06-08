<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select No_Of_Traffic_This_Year "+
						" ,Case When No_Of_Traffic_Last_Year = 0 Then 0 Else Round(((No_Of_Traffic_This_Year - No_Of_Traffic_Last_Year)/No_Of_Traffic_Last_Year)*100,2) End As This_Last "+
						" ,Round(No_Of_Traffic_This_Year/days) as AVGTY "+
						" From( "+
						" Select Sum(No_Of_Traffic_This_Year) As No_Of_Traffic_This_Year "+
						" ,Sum(No_Of_Traffic_Last_Year) As No_Of_Traffic_Last_Year "+
						" ,(Select Count(Distinct fdt.Date_Key) "+
						" From Fact_Daily_Traffic fdt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = fdt.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fdt.Usage_Plaza_Key != '1' "+
						" ) as days "+
						" From Fact_Monthly_Traffic Fmt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fmt.Usage_Plaza_Key != '1' "+
						" Group By 1,2 "+
						" )tab ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>

