<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Sum(SALES_QTY_This) As This_Sa "+
				" , Round(Sum(SALES_QTY_This) / sum(d)) as avg_Sa "+
				" From "+
				" ( "+
				" Select Sum(SALES_QTY) As SALES_QTY_This "+
				" ,0 as SALES_QTY_Last "+
				" ,(Select count(Calendar_Date) as countdatebyyear "+
				" From Dim_Date "+
				" Where Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" ) as d "+
				" From Fact_Sales Fs "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Ddm.Buddhist_Fiscal_Year "+
				" union "+
				" Select 0 As SALES_QTY_This "+
				" ,Sum(SALES_QTY) As SALES_QTY_Last "+
				" , 0 as d "+
				" From Fact_Sales Fs "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' -1 "+
				" Group By Ddm.Buddhist_Fiscal_Year "+
				" )e ";

		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>