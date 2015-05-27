<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2559";
		String query=" Select Plaza_Name "+
				" ,'ด่านที่มีปริมาณจราจรสูงสุด 5 อันดับ' as  ty "+
				" ,Avg_No_Of_Traffic_This_Year "+
				" From "+
				" ( "+
				" Select Plaza_Name "+
				" ,round(Sum(No_Of_Traffic_This_Year)/Countdatebyyear) As Avg_No_Of_Traffic_This_Year  "+
				" From Fact_Monthly_Traffic Fmt "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Fmt.Month_Key "+
				" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fmt.Usage_Plaza_Key "+
				" Left Join ( "+
				" Select Buddhist_Fiscal_Year "+
				" ,count(Calendar_Date) as countdatebyyear "+
				" From Dim_Date "+
				" where Buddhist_Fiscal_Year = '"+paramYear+"'   "+
				" AND (FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"')  "+
				" Group By Buddhist_Fiscal_Year "+
				" )Ddd on Ddd.Buddhist_Fiscal_Year = Ddm.Buddhist_Fiscal_Year "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"'   "+
				" AND (FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') "+
				" Group By Plaza_Code,Plaza_Name,Countdatebyyear "+
				" Order By Avg_No_Of_Traffic_This_Year Desc "+
				" )E "+
				" WHERE ROWNUM <=5 ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>