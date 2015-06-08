<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query= " Select Plaza_Name "+
						" ,'ด่านที่มีปริมาณจราจรเฉลี่ยรายวันสูงสุด 5 อันดับ' as  ty "+
						" ,avg_NO_OF_TRAFFIC "+
						" from "+
						" (Select Plaza_Code "+
						" ,Plaza_Name "+
						" ,sum(NO_OF_TRAFFIC) "+
						" ,Count(Distinct Fdt.Date_Key) "+
						" ,round( sum(NO_OF_TRAFFIC) / Count(Distinct Fdt.Date_Key) ) as avg_NO_OF_TRAFFIC "+
						" From Fact_Daily_Traffic fdt "+
						" Left Join Dim_Date Ddm On Ddm.Date_Key = Fdt.Date_Key "+
						" Left Join Dim_Plaza Dpza On Dpza.Plaza_Key = Fdt.Usage_Plaza_Key "+
						" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
						" Group By Plaza_Code "+
						" ,Plaza_Name "+
						" Order By Avg_No_Of_Traffic DESC "+
						" )E "+
						" where ROWNUM <=5 ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>