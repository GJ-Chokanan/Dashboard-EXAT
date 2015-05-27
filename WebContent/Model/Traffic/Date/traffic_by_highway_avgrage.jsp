<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

String exatparamStartDate = request.getParameter("exatparamStartDate");
String exatparamEndDate = request.getParameter("exatparamEndDate");	

		//String paramYear = "2559";
		String query=" Select Highway_Name ,'ปริมาณจราจรเฉลี่ยรายวัน' as type,round(No_Of_Traffic/d) as avg_No_Of_Traffic From ( Select Case 	When Highway_Code = '00' Then 'อื่นๆ' "+
				" When Highway_Code = '06' Then 'กาญจนาภิเษก'  else Substr(Highway_Name,12) 	End As Highway_Name  , Sum(NO_OF_TRAFFIC) as NO_OF_TRAFFIC "+
				" ,Highway_Code ,(  Select count(Calendar_Date) as countdatebyyear	From Dim_Date "+
				"	Where BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"'   )d "+
				"  From Fact_DAILY_Traffic Fdt Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fdt.Usage_Plaza_Key "+
				"  Where Ddm.BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"'  "+
				"  Group By Highway_Name,Highway_Code  )e order by Highway_Code ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>