<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		// paramYear = "2554";
		String query=" Select Sum(Sales_Amount_This)  As This_Sa, Case When Sum(Sales_Amount_Last) = 0 Then 0 Else Round(((Sum(Sales_Amount_This) - Sum(Sales_Amount_Last))/Sum(Sales_Amount_Last))*100,2)  End As Per, Round(Sum(Sales_Amount_This) / sum(d)) as avg_Sa" +
				" From (Select Sum(Sales_Amount) As Sales_Amount_This,0 as Sales_Amount_Last,(Select count(Calendar_Date) as countdatebyyear From Dim_Date " +
				" Where Buddhist_Fiscal_Year = '"+paramYear+"' ) as d From Fact_Sales Fs Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key " +
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' Group By Ddm.Buddhist_Fiscal_Year union Select 0 As Sales_Amount_This ,Sum(Sales_Amount) As Sales_Amount_Last, 0 as d From Fact_Sales Fs " +
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key " +
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' -1  Group By Ddm.Buddhist_Fiscal_Year)e" ;
 
		
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>