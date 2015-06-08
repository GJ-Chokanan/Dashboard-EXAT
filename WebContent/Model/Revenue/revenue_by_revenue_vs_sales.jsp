<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2559";
		String query=" Select Day ,Typ ,TOPUP_REVENUE_AMOUNT From ( Select Extract(Day From Dd.Calendar_Date) As Day ,'ยอดการเติมเงิน' as typ , "+
				" SUM(FT.REVENUE_AMOUNT) AS TOPUP_REVENUE_AMOUNT FROM FACT_TOPUP FT LEFT JOIN DIM_DATE DD ON DD.DATE_KEY = FT.DATE_KEY "+
				" WHERE DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"' AND (DD.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') GROUP BY EXTRACT(DAY FROM DD.CALENDAR_DATE) union "+
				" select Extract(Day From Dd.Calendar_Date) As Day ,'ยอดรายได้ผ่านทาง' as typ ,SUM(FDT.REVENUE_AMOUNT) AS TOPUP_REVENUE_AMOUNT "+
				" FROM fact_daily_traffic FDT  Left Join Dim_Date Dd On Dd.Date_Key = Fdt.Date_Key "+
				" Where Dd.Buddhist_Fiscal_Year = '"+paramYear+"' AND (DD.FISCAL_MONTH_NO in '"+paramMonth+"' or 'All' in '"+paramMonth+"') Group By Extract(Day From Dd.Calendar_Date) )E order by Typ,Day ";

		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>