<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query= " Select Round(Sum(Tothis)) "+
						" ,Round(Sum(Tothis)/Sum(Days)) "+
						" From( "+
						" Select Sum(Revenue_Amount) As Rethis,Sum(No_Of_Topup) As Tothis,0 As Relast,0 As Tolast "+
						" ,(Select Count(Distinct ftp.Date_Key) "+
						" From FACT_TOPUP ftp "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"') as days "+
						" FROM FACT_TOPUP ftp "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' "+
						" group by 1,2,3,4 "+
						" union "+
						" Select 0 As Rethis,0 As Tothis,Sum(Revenue_Amount) As Relast,Sum(No_Of_Topup) As Tolast "+
						" ,0  as days "+
						" FROM FACT_TOPUP ftp "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
						" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' - 1 "+
						" )E ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>