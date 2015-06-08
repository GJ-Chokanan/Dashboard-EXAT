<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=
				" Select Customer_Type_Name "+
						" ,sum(N_CUST_NAME) "+
						" From "+
						" ( "+
						" SELECT "+
						" DCT.CUSTOMER_TYPE_CODE, "+
						" DCT.CUSTOMER_TYPE_NAME, "+
						" COALESCE(COUNT(FCH.CUST_NAME),0) AS N_CUST_NAME "+
						" FROM  "+
						" FACT_CUST_HISTORY FCH, "+
						" DIM_DATE DD, "+
						" DIM_CUSTOMER DC, "+
						" DIM_CUSTOMER_TYPE DCT "+
						" WHERE "+
						" FCH.TRANS_DATE_KEY = DD.DATE_KEY "+
						" AND FCH.CUST_NO = DC.CUST_ID "+
						" AND DC.CUST_TYPE = DCT.CUSTOMER_TYPE_CODE "+
						" ANd DCT.CUSTOMER_TYPE_CODE NOT IN ('0','D','F') "+
						" And (Dd.Buddhist_Fiscal_Year Between '2552' And '"+paramYear+"') "+
						" GROUP BY DCT.CUSTOMER_TYPE_CODE, "+
						" DCT.CUSTOMER_TYPE_NAME, "+
						" Fch.Cust_Name "+
						" )E "+
						" Group By Customer_Type_Name ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>