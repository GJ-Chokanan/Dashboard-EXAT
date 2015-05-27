<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Replace(Buddhist_Short_Date,Substr(Buddhist_Short_Date,-3,3),'') "+
				" ,Highway_Name "+
				" ,Round(No_Of_Traffic_This_Year/1000000,2) As No_Of_Traffic_This_Year "+
				" from( "+
				" Select Ddm.BUDDHIST_SHORT_DATE "+
				" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก'else Substr(Highway_Name,12) 	End As Highway_Name "+ //When Highway_Code = '00' Then 'อื่นๆ'
				" ,Sum(No_Of_Traffic_This_Year) as No_Of_Traffic_This_Year "+
				" ,HIGHWAY_CODE "+
				" ,Fiscal_Month_No "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Ddm.Fiscal_Month_No,Ddm.BUDDHIST_SHORT_DATE,Highway_Name,Highway_Code "+
				" union "+
				" Select Ddm.Buddhist_Short_Date "+
				" ,'รวมทุกสายทาง' as Highway_Name "+
				" ,Sum(No_Of_Traffic_This_Year) As No_Of_Traffic_This_Year "+
				" ,'99' As Highway_Code "+
				" ,Fiscal_Month_No "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Ddm.Fiscal_Month_No,Ddm.BUDDHIST_SHORT_DATE "+
				" )E WHERE Highway_Name IS NOT NULL"+
				" order by HIGHWAY_CODE,Fiscal_Month_No ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>