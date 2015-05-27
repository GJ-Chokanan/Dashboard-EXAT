<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		String paramMonth = request.getParameter("paramMonth");

		//String paramYear = "2559";
		String query=" Select Sum(M02) As a "+
				" ,Round(Sum(M04)/Sum(M02),2) As b "+
				" ,sum(M05) as c "+
				" From "+
				" ( "+
				" Select "+
				" Sum(Fact_Easy_Pass_Member.No_Of_Tagholder) As M02 "+
				" , 0 As M04 "+
				" , 0 as M05 "+
				" From EXAT_DWH.DIM_DATE DIM_DATE "+
				" , EXAT_DWH.FACT_EASY_PASS_MEMBER FACT_EASY_PASS_MEMBER  "+
				" , EXAT_DWH.DIM_TAG_STATUS DIM_TAG_STATUS "+
				" Where FACT_EASY_PASS_MEMBER.DATE_KEY = DIM_DATE.DATE_KEY  "+
				" And Fact_Easy_Pass_Member.Tag_Status_Key = Dim_Tag_Status.Tag_Status_Key  "+
				" and Buddhist_Date = ( "+
				" SELECT MAX(V.BUDDHIST_DATE) "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
				" Where V.Buddhist_Date = Dd.Buddhist_Date "+
				" AND (DD.BUDDHIST_FISCAL_YEAR = '2558') "+
				"			) "+
				" And Tag_Status_Code In ('2') "+
				" union "+
				" Select  "+
				" 0 As M02 "+
				" , Sum(Fact_Easy_Pass_Member.No_Of_Tagholder) As M04 "+
				" , 0 as M05 "+
				" From EXAT_DWH.DIM_DATE DIM_DATE "+
				" , EXAT_DWH.FACT_EASY_PASS_MEMBER FACT_EASY_PASS_MEMBER "+
				" , EXAT_DWH.DIM_TAG_STATUS DIM_TAG_STATUS "+
				" Where FACT_EASY_PASS_MEMBER.DATE_KEY = DIM_DATE.DATE_KEY   "+
				" And Fact_Easy_Pass_Member.Tag_Status_Key = Dim_Tag_Status.Tag_Status_Key "+
				" and Buddhist_Date = ( "+
				" SELECT MAX(V.BUDDHIST_DATE) "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
				" Where V.Buddhist_Date = Dd.Buddhist_Date "+
				" AND (DD.BUDDHIST_FISCAL_YEAR = '2558') "+
				"	) "+
				" And Tag_Status_Code In ('4') "+
				" Union "+
				" Select "+
				" 0 As M02 "+
				"  , 0 As M04 "+
				" , Sum(Fact_Easy_Pass_Member.No_Of_Tagholder) as M05 "+
				" From EXAT_DWH.DIM_DATE DIM_DATE "+
				" , EXAT_DWH.FACT_EASY_PASS_MEMBER FACT_EASY_PASS_MEMBER   "+
				" , EXAT_DWH.DIM_TAG_STATUS DIM_TAG_STATUS "+
				" Where FACT_EASY_PASS_MEMBER.DATE_KEY = DIM_DATE.DATE_KEY  "+
				" And Fact_Easy_Pass_Member.Tag_Status_Key = Dim_Tag_Status.Tag_Status_Key "+
				" and Buddhist_Date = ( "+
				" SELECT MAX(V.BUDDHIST_DATE) "+
				" FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
				" Where V.Buddhist_Date = Dd.Buddhist_Date "+
				" And (Dd.Buddhist_Fiscal_Year = '2558') "+
				" ) "+
				" And Tag_Status_Code In ('5') "+
				" )E ";
		String columns="1,2,3";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>