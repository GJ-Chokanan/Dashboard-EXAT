<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Buddhist_Fiscal_Year,Topup_Channel_Name,round(No_Of_Topup/1) "+
				" From( Select Ddm.Buddhist_Fiscal_Year , Topup_Channel_Name , Sum(No_Of_Topup) as No_Of_Topup , case when Topup_Channel_Name = 'Bank, Non-Bank' then '2' else '1' end as num_fac  "+
				" FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key Left Join Dim_Topup_Channel Dtc On Dtc.Topup_Channel_Key = Ftp.Topup_Channel_Key  "+
				" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' Group By Ddm.Buddhist_Fiscal_Year,Topup_Channel_Name union Select Ddm.Buddhist_Fiscal_Year  "+
				" , 'รวมทุกรายช่องทางบริการ' as Topup_Channel_Name , Sum(No_Of_Topup) As No_Of_Topup , '3' as num_fac FROM FACT_TOPUP ftp Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
				" Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' Group By Ddm.Buddhist_Fiscal_Year )E order by num_fac,Topup_Channel_Name,Buddhist_Fiscal_Year ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>