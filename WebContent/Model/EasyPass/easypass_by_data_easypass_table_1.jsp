<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = "2559";
		String query=" Select Dim_Tag_Status.Tag_Status_Name "+
				" , Sum(Fact_Easy_Pass_Member.No_Of_Tagholder) As M0  "+
				" From EXAT_DWH.DIM_DATE DIM_DATE "+
				" , EXAT_DWH.FACT_EASY_PASS_MEMBER FACT_EASY_PASS_MEMBER "+
				" , EXAT_DWH.DIM_TAG_STATUS DIM_TAG_STATUS "+
				" Where FACT_EASY_PASS_MEMBER.DATE_KEY = DIM_DATE.DATE_KEY  "+
				" And FACT_EASY_PASS_MEMBER.TAG_STATUS_KEY = DIM_TAG_STATUS.TAG_STATUS_KEY "+
				" and Buddhist_Date = (Select max(dd.Buddhist_Date) "+
				" FROM FACT_EASY_PASS_MEMBER V,DIM_DATE DD "+
				" Where V.Date_Key = Dd.Date_Key "+
				" AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"')) "+
				" and TAG_STATUS_CODE in ('2','6') "+
				" Group By Dim_Tag_Status.Tag_Status_Name "+
				" ,Tag_Status_Code "+
				" --order by TAG_STATUS_CODE ";
		String columns="1,2";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>