<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2558";
		String query="  Select Replace(Buddhist_Short_Date,Substr(Buddhist_Short_Date,-3,3),'') "+
				"  ,Case  "+
				"  When Highway_Code = '06' Then 'กาญจนาภิเษก' "+
				"  else Substr(Highway_Name,12) 	End As Highway_Name "+
				"  ,sum(NO_OF_USAGE) "+
				"  from FACT_TAG_USAGE ftu "+
				"  Left Join Dim_Date Dd On Dd.Date_Key = Ftu.Date_Key "+
				"  LEFT JOIN DIM_USAGE_type dtu ON dtu.USAGE_TYPE_KEY = ftu.USAGE_TYPE_KEY "+
				"  Left Join Dim_Plaza Dpz On Dpz.Plaza_Key = Ftu.Plaza_Key "+
				"  Where Dd.Buddhist_Fiscal_Year = '"+paramYear+"' "+
				"  And Usage_Type_Code = '05' AND Highway_Name IS NOT NULL "+
				"  Group By BUDDHIST_SHORT_DATE "+
				"  ,Fiscal_Month_No "+
				"  ,HIGHWAY_CODE "+
				"  ,Highway_Name "+
				"  order by HIGHWAY_CODE,Fiscal_Month_No ";
				
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>