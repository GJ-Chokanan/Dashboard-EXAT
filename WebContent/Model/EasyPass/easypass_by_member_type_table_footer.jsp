<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=
				" Select sum(Num_P_Type) ,sum(Num_C_Type) From ( Select Qq.N_Cust_Name As Num_P_Type , 0 as Num_C_Type FROM (Select Q.N_CUST_NAME , COUNT(Q.N_CUST_NAME) AS NUM_EASY FROM (SELECT  "+
						" DD.BUDDHIST_FISCAL_YEAR, DCT.CUSTOMER_TYPE_CODE, DCT.CUSTOMER_TYPE_NAME, FCH.CUST_NAME, COALESCE(COUNT(FCH.CUST_NAME),0) AS N_CUST_NAME, CASE WHEN COUNT(FCH.CUST_NAME) = 1 THEN '1 บัตร' "+
						" WHEN COUNT(FCH.CUST_NAME) BETWEEN 2 AND 5 THEN '2-5 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 6 AND 10 THEN '6-10 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 11 AND 15 THEN '11-15 บัตร' "+
						" WHEN COUNT(FCH.CUST_NAME) BETWEEN 16 AND 20 THEN '16-20 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 21 AND 50 THEN '21-50 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 51 AND 100 THEN '51-100 บัตร' "+
						" WHEN COUNT(FCH.CUST_NAME) > 100 THEN '>100 บัตร' END AS Num_C_Type FROM  FACT_CUST_HISTORY FCH, DIM_DATE DD, DIM_CUSTOMER DC, DIM_CUSTOMER_TYPE DCT WHERE FCH.TRANS_DATE_KEY = DD.DATE_KEY "+
						" AND FCH.CUST_NO = DC.CUST_ID And Dc.Cust_Type = Dct.Customer_Type_Code And Dct.Customer_Type_Code = 'P' And (Dd.Buddhist_Fiscal_Year between 2552 and "+paramYear+") GROUP BY "+
						" DD.BUDDHIST_FISCAL_YEAR, DCT.CUSTOMER_TYPE_CODE, DCT.CUSTOMER_TYPE_NAME, Fch.Cust_Name )Q Group By Q.N_Cust_Name Order By Q.N_Cust_Name Desc)Qq Where Rownum = 1 union "+
						" Select 0 as Num_P_Type,QQ.N_CUST_NAME AS Num_C_Type FROM (Select Q.N_CUST_NAME ,COUNT(Q.N_CUST_NAME) AS NUM_EASY FROM (SELECT  DD.BUDDHIST_FISCAL_YEAR, DCT.CUSTOMER_TYPE_CODE, DCT.CUSTOMER_TYPE_NAME, FCH.CUST_NAME, "+
						" COALESCE(COUNT(FCH.CUST_NAME),0) AS N_CUST_NAME, CASE WHEN COUNT(FCH.CUST_NAME) = 1 THEN '1 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 2 AND 5 THEN '2-5 บัตร' "+
						" WHEN COUNT(FCH.CUST_NAME) BETWEEN 6 AND 10 THEN '6-10 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 11 AND 15 THEN '11-15 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 16 AND 20 THEN '16-20 บัตร' "+
						" WHEN COUNT(FCH.CUST_NAME) BETWEEN 21 AND 50 THEN '21-50 บัตร' WHEN COUNT(FCH.CUST_NAME) BETWEEN 51 AND 100 THEN '51-100 บัตร' WHEN COUNT(FCH.CUST_NAME) > 100 THEN '>100 บัตร' "+
						" END AS Num_C_Type FROM  FACT_CUST_HISTORY FCH, DIM_DATE DD, DIM_CUSTOMER DC, DIM_CUSTOMER_TYPE DCT WHERE FCH.TRANS_DATE_KEY = DD.DATE_KEY AND FCH.CUST_NO = DC.CUST_ID "+
						" And Dc.Cust_Type = Dct.Customer_Type_Code ANd DCT.CUSTOMER_TYPE_CODE = 'C' "+
						" And (Dd.Buddhist_Fiscal_Year between 2552 and "+paramYear+") GROUP BY DD.BUDDHIST_FISCAL_YEAR, DCT.CUSTOMER_TYPE_CODE, DCT.CUSTOMER_TYPE_NAME, Fch.Cust_Name )Q Group By Q.N_Cust_Name "+
						" Order By Q.N_Cust_Name Desc)Qq Where Rownum = 1 )e ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>