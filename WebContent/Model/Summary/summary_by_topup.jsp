<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Replace(Buddhist_Short_Date,Substr(Buddhist_Short_Date,-3,3),'') "+
				" ,Topup_Channel_Name "+
				" ,No_Of_Topup "+
				" From "+
				" ( "+
				" Select Ddm.BUDDHIST_SHORT_DATE "+
				" , Topup_Channel_Name "+
				" , Sum(No_Of_Topup) as No_Of_Topup "+
				" , Fiscal_Month_No "+
				" , case when Topup_Channel_Name = 'Bank, Non-Bank' then '2' else '1' end as num_fac "+
				" FROM FACT_TOPUP ftp "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
				" Left Join Dim_Topup_Channel Dtc On Dtc.TOPUP_CHANNEL_KEY = Ftp.TOPUP_CHANNEL_KEY "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Ddm.Fiscal_Month_No,Ddm.BUDDHIST_SHORT_DATE,Topup_Channel_Name "+
				" union "+
				" Select Ddm.Buddhist_Short_Date "+
				" , 'รวมทุกรายช่องทางบริการ' as Topup_Channel_Name "+
				" , Sum(No_Of_Topup) as No_Of_Topup "+
				" , Fiscal_Month_No "+
				" , '3' as num_fac "+
				" FROM FACT_TOPUP ftp "+
				" Left Join Dim_Date Ddm On Ddm.Date_Key = Ftp.Date_Key "+
				" Where Ddm.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				" Group By Ddm.Fiscal_Month_No,Ddm.Buddhist_Short_Date "+
				" )E "+
				" order by num_fac,Topup_Channel_Name,Fiscal_Month_No ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>