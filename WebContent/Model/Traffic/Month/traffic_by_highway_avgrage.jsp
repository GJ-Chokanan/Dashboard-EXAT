<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		 /* paramYear = "2559";
		 paramMonth = "1"; */
		String query=" Select Replace(Buddhist_Short_Date,Substr(Buddhist_Short_Date,-3,3),'') "+
				" ,Highway_Name "+
				" ,Round(No_Of_Traffic_This_Year)  "+
				" From "+
				" ( "+
				" Select Ddm.BUDDHIST_SHORT_DATE "+
				" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก'else Substr(Highway_Name,12) 	End As Highway_Name "+
				" ,Sum(No_Of_Traffic_This_Year)/countdatebyyear as No_Of_Traffic_This_Year "+
				" ,Highway_Code "+
				" ,Ddm.Fiscal_Month_No "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				" Left Join ( "+
				           " Select Buddhist_Fiscal_Year "+
				          " ,FISCAL_MONTH_NO "+
				          " ,count(Calendar_Date) as countdatebyyear "+
				          " From Dim_Date "+
				          " Where Buddhist_Fiscal_Year = '"+paramYear+"' AND (FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') "+
				          " Group By Buddhist_Fiscal_Year,FISCAL_MONTH_NO "+
				          " )Ddd On Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				              " and Ddd.FISCAL_MONTH_NO = Ddm.FISCAL_MONTH_NO "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') "+
				" Group By Ddm.Fiscal_Month_No,Ddm.BUDDHIST_SHORT_DATE,Highway_Name,Highway_Code,countdatebyyear "+
				" union "+
				" Select Ddm.Buddhist_Short_Date "+
				" ,'รวมทุกสายทาง' as Highway_Name "+
				" ,Sum(No_Of_Traffic_This_Year)/Countdatebyyear As No_Of_Traffic_This_Year "+
				" ,'99' as Highway_Code "+
				" ,Ddm.Fiscal_Month_No "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				" Left Join ( "+
				          "  Select Buddhist_Fiscal_Year "+
				          " ,FISCAL_MONTH_NO "+
				          " ,count(Calendar_Date) as countdatebyyear "+
				          " From Dim_Date "+
				          " Where Buddhist_Fiscal_Year = '"+paramYear+"' AND (FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') "+
				          " Group By Buddhist_Fiscal_Year,FISCAL_MONTH_NO "+
				          " )Ddd On Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				             "  and Ddd.FISCAL_MONTH_NO = Ddm.FISCAL_MONTH_NO "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' AND (Ddm.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') "+
				" Group By Ddm.Fiscal_Month_No,Ddm.Buddhist_Short_Date,Countdatebyyear "+
				" )E WHERE Highway_Name IS NOT NULL "+
				" order by Highway_Code,Fiscal_Month_No ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>