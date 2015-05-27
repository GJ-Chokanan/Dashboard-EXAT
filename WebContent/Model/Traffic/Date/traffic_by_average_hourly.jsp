<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

				
String exatparamStartDate = request.getParameter("exatparamStartDate");
String exatparamEndDate = request.getParameter("exatparamEndDate");	

		//String paramYear = "2559";
		String query=" Select Time_Range_Desc,'ปริมาณจราจรเฉลี่ยรายชั่วโมง' as type  ,round(No_Of_Traffic/d) as avg_No_Of_Traffic From  ( Select TIME_RANGE_DESC ,Sum(No_Of_Traffic) As No_Of_Traffic  "+
				" ,Dtr.Time_Range_Key ,( Select count(Calendar_Date) as countdatebyyear	From Dim_Date "+
				"	Where BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"'   )d "+
				" From Fact_DAILY_Traffic Fdt Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key  Left Join DIM_TIME_RANGE Dtr On Dtr.TIME_RANGE_KEY = Fdt.TIME_RANGE_KEY  "+ 
				" Where Ddm.BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"'  "+
				" Group By Dtr.Time_Range_Key,Time_Range_Desc )E order by Time_Range_Key ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>