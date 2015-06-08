<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//paramYear = "2558";
		String query=" Select Sales_Amount "+
						" ,Round(((Sales_Amount - Last_Year) / Last_Year)*100 ,2 ) As Per "+
						" ,round(Sales_Amount / dayy) as avg_Sales_Amount "+
						" From( "+
						" SELECT (SELECT Sum(Sales_Qty) "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fs.PLAZA_KEY != '1' "+
						" ) as Sales_Amount "+
						" ,(SELECT Sum(Sales_Qty) As Sales_Amount "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"'- 1 "+
						" and Fs.PLAZA_KEY != '1' "+
						" ) As Last_Year "+
						" ,(SELECT count(distinct Fs.Date_Key) "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fs.PLAZA_KEY != '1' "+
						" ) Dayy "+
						" From dual "+
						" )e ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>