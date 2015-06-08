<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2559";
		String query=" Select Replace(Buddhist_Short_Date,Substr(Buddhist_Short_Date,-3,3),'') "+
				" , Dim_Tag_Status.Tag_Status_Name "+
				" , Sum(Fact_Easy_Pass_Member.No_Of_Tagholder) As M0 "+ 
				" From EXAT_DWH.DIM_DATE DIM_DATE "+
				" , EXAT_DWH.FACT_EASY_PASS_MEMBER FACT_EASY_PASS_MEMBER "+
				" , EXAT_DWH.DIM_TAG_STATUS DIM_TAG_STATUS "+
				" Where FACT_EASY_PASS_MEMBER.DATE_KEY = DIM_DATE.DATE_KEY  "+
				" And Fact_Easy_Pass_Member.Tag_Status_Key = Dim_Tag_Status.Tag_Status_Key "+
				" and Buddhist_Date in ( "+
				" SELECT MAX(V.BUDDHIST_DATE) "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
				" Where V.Buddhist_Date = Dd.Buddhist_Date "+
				" And (Dd.Buddhist_Fiscal_Year = '"+paramYear+"') "+
				" group by FISCAL_MONTH_NO "+
				" ) "+
				" Group By BUDDHIST_SHORT_DATE "+
				" ,Fiscal_Month_No "+
				" ,Dim_Tag_Status.Tag_Status_Name "+
				" ,Tag_Status_Code "+
				" order by TAG_STATUS_CODE,Fiscal_Month_No ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>