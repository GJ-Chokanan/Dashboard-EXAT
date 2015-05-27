<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query="Select Buddhist_Fiscal_Year "+
				",Highway_Name "+
				",round(Avg_No_Of_Traffic_This_Year) as Avg_No_Of_Traffic_This_Year "+
				"From( "+
				"Select Ddm.Buddhist_Fiscal_Year "+
				/* ",Case 	When Highway_Code = '00' Then 'อื่นๆ' "+
				"When Highway_Code = '06' Then 'กาญจนาภิเษก' "+
				"else Substr(Highway_Name,12) 	End As Highway_Name "+ */
				" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก'else Substr(Highway_Name,12) 	End As Highway_Name "+ //When Highway_Code = '00' Then 'อื่นๆ'
				",Sum(No_Of_Traffic_This_Year)/countdatebyyear As AVG_No_Of_Traffic_This_Year "+
				",HIGHWAY_CODE "+
				"From Fact_Monthly_Traffic Fmt "+
				"Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				"Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				"Left Join ( "+
				"          Select Buddhist_Fiscal_Year "+
				"          ,count(Calendar_Date) as countdatebyyear "+
				"          From Dim_Date "+
				"          Group By Buddhist_Fiscal_Year "+
				"          )Ddd on Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				"Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
				"Group By Ddm.Buddhist_Fiscal_Year,Highway_Name,Highway_Code,countdatebyyear "+
				"union "+
				"Select Ddm.Buddhist_Fiscal_Year "+
				",'รวมทุกสายทาง' as Highway_Name "+
				",Sum(No_Of_Traffic_This_Year)/Countdatebyyear As Avg_No_Of_Traffic_This_Year "+
				",'99' as aHIGHWAY_CODE "+
				"From Fact_Monthly_Traffic Fmt "+
				"Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				"Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				"Left Join ( "+
				"          Select Buddhist_Fiscal_Year "+
				"          ,count(Calendar_Date) as countdatebyyear "+
				"          From Dim_Date "+
				"          Group By Buddhist_Fiscal_Year "+
				"          )Ddd on Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				"Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
				"Group By Ddm.Buddhist_Fiscal_Year,Countdatebyyear "+
				")E WHERE Highway_Name IS NOT NULL "+
				"order by HIGHWAY_CODE,Buddhist_Fiscal_Year ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>