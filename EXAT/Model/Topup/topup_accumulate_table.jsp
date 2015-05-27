<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Sum(Rethis) ,Sum(Tothis) "+
				" ,CASE WHEN Sum(Relast) = 0 OR Sum(Relast) IS NULL THEN Sum(Tolast) ELSE Round(((Sum(Rethis) - Sum(Relast))/Sum(Relast))*100,2) END AS bath "+
				" ,CASE WHEN Sum(Tolast) = 0 OR Sum(Relast) IS NULL THEN Sum(Tolast) ELSE Round(((Sum(Tothis) - Sum(Tolast))/Sum(Tolast))*100,2) END AS terms "+
				" ,Round(Sum(Rethis) / Sum(D))  ,Round(Sum(Tothis) / sum(d)) "+
				" From ( Select Rethis  ,Tothis ,Relast ,Tolast ,(Select count(Calendar_Date) as countdatebyyear From Dim_Date "+
				" Where Buddhist_Fiscal_Year = '"+paramYear+"' )d From ( Select Sum(Revenue_Amount) As Rethis ,Sum(No_Of_Topup) As Tothis ,0 As Relast  "+
				" ,0 As Tolast FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' )k union Select 0 As ReThis ,0 As Tothis ,Sum(Revenue_Amount) As Relast ,Sum(No_Of_Topup) As Tolast "+
				" ,0 as d FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' - 1 )E ";
		String columns="1,2,3,4,5,6";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>