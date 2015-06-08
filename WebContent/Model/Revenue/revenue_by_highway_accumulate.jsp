<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query= " Select Buddhist_Fiscal_Year "+
						" ,Highway_Name "+
						" ,round(Sales_Amount/1000000) as Sales_Amount "+
						" From( "+
						" Select Ddm.Buddhist_Fiscal_Year "+
						" ,Case When Highway_Code = '06' Then 'กาญจนาภิเษก' else Substr(Highway_Name,12) 	End As Highway_Name "+
						" ,Sum(Sales_Amount) as Sales_Amount "+
						" ,HIGHWAY_CODE "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fs.PLAZA_KEY "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fs.PLAZA_KEY != '1' "+
						" Group By Ddm.Buddhist_Fiscal_Year , Highway_Name,Highway_Code "+
						" union "+
						" Select Ddm.Buddhist_Fiscal_Year "+
						" ,'รวมทุกสายทาง' As Highway_Name "+
						" ,Sum(Sales_Amount) As Sales_Amount "+
						" ,'99' as HIGHWAY_CODE "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fs.PLAZA_KEY != '1' "+
						" Group By Ddm.Buddhist_Fiscal_Year "+
						" )E "+
						" order by HIGHWAY_CODE,Buddhist_Fiscal_Year ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>