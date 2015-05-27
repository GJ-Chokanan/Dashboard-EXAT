<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2558";
		String query=
				" Select Buddhist_Fiscal_Year "+
						"  ,Highway_Name "+
						"  ,Round(Sales_Amount) "+
						"  From "+
						"  ( "+
						"  SELECT Ddm.Buddhist_Fiscal_Year "+
						//" ,Case 	When Highway_Code = '00' Then 'อื่นๆ'When Highway_Code = '06' Then 'กาญจนาภิเษก'else Substr(Highway_Name,12) End As Highway_Name "+
						" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก'else Substr(Highway_Name,12) 	End As Highway_Name "+ //When Highway_Code = '00' Then 'อื่นๆ'
						"  ,Sum(SALES_QTY) As Sales_Amount "+
						"  ,Highway_Code "+
						"  From Fact_Sales Fs "+
						"  Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						"  Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fs.Plaza_Key "+
						"  Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						"  Group By Ddm.Buddhist_Fiscal_Year,Highway_Name,Highway_Code "+
						"  union   "+
						"  Select Ddm.Buddhist_Fiscal_Year "+
						"  ,'รวมทุกสายทาง' As Highway_Name "+
						"  ,Sum(SALES_QTY) As Sales_Amount "+
						"  ,'99' As Highway_Code "+
						"  From Fact_Sales Fs "+
						"  Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						"  Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						"  Group By Buddhist_Fiscal_Year "+
						"  )E "+
						"  Where Highway_Name != 'อื่นๆ' "+
						"  WHERE Highway_Name IS NOT NULL  order by Highway_Code,Buddhist_Fiscal_Year ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>