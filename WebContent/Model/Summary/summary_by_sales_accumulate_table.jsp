<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Sales_Amount "+
						" ,round(Sales_Amount / dayy) as avg_Sales_Amount "+
						" From( "+
						" SELECT (SELECT Sum(Sales_Qty) "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fs.PLAZA_KEY != '1' "+
						" ) as Sales_Amount "+
						" ,(SELECT count(distinct Fs.Date_Key) "+
						" From Fact_Sales Fs "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" and Fs.PLAZA_KEY != '1' "+
						" ) Dayy "+
						" From dual "+
						" )e ";

		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>