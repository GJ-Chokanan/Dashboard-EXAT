<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select BALANCE_TYPE_NAME "+
				" ,Sum(No_Of_Tag) As M0 "+
				" From Dim_Date, Fact_Non_Usage_Tag , Dim_Balance_Type "+
				" Where Fact_Non_Usage_Tag.Date_Key = Dim_Date.Date_Key  "+
				" And Fact_Non_Usage_Tag.Balance_Type_Key = Dim_Balance_Type.Balance_Type_Key  "+
				" And Dim_Balance_Type.Balance_Type_Key In ('1','3') "+
				" and Buddhist_Date = (Select max(dd.Buddhist_Date) "+
				" FROM FACT_EASY_PASS_MEMBER V,DIM_DATE DD "+
				" Where V.Date_Key = Dd.Date_Key "+
				" AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"')) "+
				" Group By Dim_Balance_Type.Balance_Type_Key "+
				" ,Balance_Type_Name order by Dim_Balance_Type.BALANCE_TYPE_KEY DESC";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>