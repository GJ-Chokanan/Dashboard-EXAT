<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

				
		String exatparamStartDate = request.getParameter("exatparamStartDate");
		String exatparamEndDate = request.getParameter("exatparamEndDate");		
		//String paramYear = "2559";
		
		String query=" Select No_Of_Traffic ,round(No_Of_Traffic/(Select count(Calendar_Date) as countdatebyyear	From Dim_Date "+
		"	where BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"' "+
		" ),2) as per From ( Select Sum(No_Of_Traffic) As No_Of_Traffic From Fact_DAILY_Traffic Fdt Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key "+
		" Where Ddm.BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"' )e ";
		
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>