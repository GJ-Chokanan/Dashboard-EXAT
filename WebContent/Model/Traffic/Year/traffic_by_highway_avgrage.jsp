<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Replace(Buddhist_Short_Date,Substr(Buddhist_Short_Date,-3,3),'') "+
						" ,Highway_Name, avg_NO_OF_TRAFFIC "+
						" from( "+
						" Select Fiscal_Month_No, Buddhist_Short_Date, Highway_Code "+
						" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก' Else Substr(Highway_Name,12) End As Highway_Name "+
						" ,round(sum(NO_OF_TRAFFIC) / Count(Distinct Fdt.Date_Key)) as avg_NO_OF_TRAFFIC "+
						" From Fact_Daily_Traffic fdt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key "+
						" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fdt.Usage_Plaza_Key "+
						" Where (Highway_Code != '00') "+
						" and (Ddm.Buddhist_Fiscal_Year = '"+paramYear+"') "+
						" Group By Fiscal_Month_No, Buddhist_Short_Date, Highway_Code, Highway_Name "+
						" Union "+
						" Select Fiscal_Month_No, Buddhist_Short_Date, '99' As Highway_Code, 'รวมทุกสายทาง' As Highway_Name "+
						" ,sum(avg_NO_OF_TRAFFIC) as avg_NO_OF_TRAFFIC "+
						" From "+
						" ( "+
						" Select Fiscal_Month_No, Buddhist_Short_Date, Highway_Code, Highway_Name "+
						" ,round(sum(NO_OF_TRAFFIC) / Count(Distinct Fdt.Date_Key)) as avg_NO_OF_TRAFFIC "+
						" From Fact_Daily_Traffic fdt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key "+
						" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fdt.Usage_Plaza_Key "+
						" Where (Highway_Code != '00') "+
						" and (Ddm.Buddhist_Fiscal_Year = '"+paramYear+"') "+
						" Group By Fiscal_Month_No, Buddhist_Short_Date, Highway_Code, Highway_Name "+
						" )D "+
						" Group By Fiscal_Month_No, Buddhist_Short_Date "+
						" )E "+
						" order by Highway_Code, Fiscal_Month_No ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>