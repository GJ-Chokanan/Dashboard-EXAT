<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

String exatparamStartDate = request.getParameter("exatparamStartDate");
String exatparamEndDate = request.getParameter("exatparamEndDate");	
        
		//String paramYear = "2559";
		String query=" Select D||'-'||m , Highway_Name ,No_Of_Traffic "+
						" From ( "+
						" Select Substr(Ddm.Calendar_Date,1,2) As D "+
						" , Substr(BUDDHIST_DATE,6,2) as m "+
						" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก' else Substr(Highway_Name,12) End As Highway_Name  "+
						" , Sum(NO_OF_TRAFFIC) as NO_OF_TRAFFIC ,Highway_Code "+
						" From Fact_DAILY_Traffic Fdt Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key  "+
						" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fdt.Usage_Plaza_Key "+
						" Where BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"' "+
						" And Highway_Code != '00' "+
						" Group By Substr(Ddm.Calendar_Date,1,2),Substr(BUDDHIST_DATE,6,2),Highway_Name,Highway_Code  "+
						" Union "+
						" Select Substr(Ddm.Calendar_Date,1,2) As D "+
						" ,Substr(Buddhist_Date,6,2) As M "+
						" , 'รวมทุกสายทาง' as Highway_Name "+
						" , Sum(No_Of_Traffic) As No_Of_Traffic "+
						" , '99' as Highway_Code From Fact_DAILY_Traffic Fdt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key "+
						" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fdt.Usage_Plaza_Key "+
						" Where Ddm.BUDDHIST_DATE between '"+exatparamStartDate+"' and '"+exatparamEndDate+"' "+
						" And Highway_Code != '00' "+
						" Group By Substr(Ddm.Calendar_Date,1,2) ,Substr(BUDDHIST_DATE,6,2) "+
						" )E "+
						" order by Highway_Code,m,d ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>