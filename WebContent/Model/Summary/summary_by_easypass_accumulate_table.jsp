<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	th.co.exat.service.connectionJNDI jndi = new th.co.exat.service.connectionJNDI();

		String paramYear = request.getParameter("paramYear");
		//String paramYear = ""+paramYear+"";
		String query=
				  " SELECT * FROM "+
						   " (SELECT '1.บัตรจัดจำหน่ายสะสม' AS Key_join , 1 AS ob_num FROM dual UNION "+
						   " SELECT '2.%เพิมลดจากปีที่แล้ว' AS Key_join , 2 AS ob_num FROM dual UNION "+
						   " SELECT 'นิติบุคคล' AS Key_join , 3 AS ob_num FROM dual UNION "+
						   " SELECT 'บุคคลธธรรมดา' AS Key_join , 4 AS ob_num FROM dual UNION "+
						   " SELECT 'Aบัตรนำมาใช้งาน' AS Key_join , 5 AS ob_num FROM dual UNION "+
						   " SELECT 'บัตรพร้อมใช้งาน' AS Key_join , 6 AS ob_num FROM dual UNION "+
						   " SELECT 'บัตรเงินติดลบ' AS Key_join , 7 AS ob_num FROM dual UNION "+
						   " SELECT 'บัตรเงินเป็นศูนย์' AS Key_join , 8 AS ob_num FROM dual ORDER BY 2)Q  "+
						   " LEFT JOIN  "+
						   " (  "+
						   "  Select Ty,Sales_Amount, 1 as num from (Select '1.บัตรจัดจำหน่ายสะสม' as ty,Sum(Sales_Qty) As Sales_Amount    "+
						   " From Fact_Sales Fs Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"'   "+
						   "  union Select ty , Round(((Sales_Amount - Last_Sales_Amount)/Last_Sales_Amount)*100,2) As Sales_Amount   "+
						   "  From ( Select '2.%เพิมลดจากปีที่แล้ว' as ty ,Sum(Sales_Qty) As Sales_Amount ,(select Sum(SALES_QTY)   "+
						   "  From Fact_Sales Fs Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key   "+
						   "  Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"'-1) as last_Sales_Amount   "+
						   "  From Fact_Sales Fs Left Join Dim_Date Ddm On Ddm.Date_Key = Fs.Date_Key   "+
						   "  Where Ddm.Buddhist_Fiscal_Year <= '"+paramYear+"' Group By 1,2 ) )E    "+
						   "  UNION   "+
						   "  Select Customer_Type_NAME    "+
						   "  ,Sum(No_Of_Tagholder) As Amt , 2 as num   "+
						   "  FROM FACT_EASY_PASS_MEMBER EM   "+
						   "  LEFT JOIN DIM_CUSTOMER_TYPE CT ON CT.CUSTOMER_TYPE_KEY = EM.CUSTOMER_TYPE_KEY   "+
						   "  Left Join Dim_Date Dd On Dd.Date_Key = Em.Date_Key   "+
						   "  Left Join Dim_Tag_Status Dts On Dts.Tag_Status_Key = Em.Tag_Status_Key   "+
						   "  Where Ct.Customer_Type_Code In('C', 'P')   "+
						   "  and Buddhist_Date = (Select max(dd.Buddhist_Date)   "+
						   "  FROM FACT_EASY_PASS_MEMBER V,DIM_DATE DD   "+
						   "  Where V.Date_Key = Dd.Date_Key   "+
						   "  AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"'))   "+
						   "  Group By Customer_Type_NAME "+
						   "  UNION          "+
						   "  Select Dim_Tag_Status.Tag_Status_Name, Sum(Fact_Easy_Pass_Member.No_Of_Tagholder) As M0 , 3 as num   "+
						   "  From EXAT_DWH.DIM_DATE DIM_DATE, EXAT_DWH.FACT_EASY_PASS_MEMBER FACT_EASY_PASS_MEMBER  "+
						   "  , EXAT_DWH.DIM_TAG_STATUS DIM_TAG_STATUS Where FACT_EASY_PASS_MEMBER.DATE_KEY = DIM_DATE.DATE_KEY   "+
						   "  And FACT_EASY_PASS_MEMBER.TAG_STATUS_KEY = DIM_TAG_STATUS.TAG_STATUS_KEY  "+
						   "  and Buddhist_Date = (Select max(dd.Buddhist_Date) FROM FACT_EASY_PASS_MEMBER V,DIM_DATE DD  "+
						   "  Where V.Date_Key = Dd.Date_Key AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"'))  "+
						   "  and TAG_STATUS_CODE in ('2') Group By Dim_Tag_Status.Tag_Status_Name,Tag_Status_Code  "+
						   "  UNION  "+
						   "  SELECT 'Aบัตรนำมาใช้งาน' AS CARD_TYPE,SUM(AMOUNT) AS Sum_Amount_Active , 3 as num FROM EASY_PASS_MEMBER_ACTIVE_V  "+
						   "  WHERE BUDDHIST_DATE = (SELECT MAX(V.BUDDHIST_DATE) FROM EASY_PASS_MEMBER_ACTIVE_V V,DIM_DATE DD "+
						   "  WHERE V.BUDDHIST_DATE = DD.BUDDHIST_DATE AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"')  "+
						   "  )and  TYPE = 'Active'  "+
						   "  UNION  "+
						   "  Select BALANCE_TYPE_NAME ,Sum(No_Of_Tag) As M0, 4 as num From Dim_Date, Fact_Non_Usage_Tag , Dim_Balance_Type  "+
						   "  Where Fact_Non_Usage_Tag.Date_Key = Dim_Date.Date_Key  And Fact_Non_Usage_Tag.Balance_Type_Key = Dim_Balance_Type.Balance_Type_Key   "+
						   "  And Dim_Balance_Type.Balance_Type_Key In ('1','2') and Buddhist_Date = (Select max(dd.Buddhist_Date) "+
						   "  FROM FACT_EASY_PASS_MEMBER V,DIM_DATE DD Where V.Date_Key = Dd.Date_Key "+
						   "  AND (DD.BUDDHIST_FISCAL_YEAR = '"+paramYear+"')) Group By Dim_Balance_Type.Balance_Type_Key ,Balance_Type_Name order by 3     "+
						   " )QQ "+
						   " ON Q.Key_join = QQ.Ty "+
						   " ORDER BY Q.ob_num ";

 
		
		String columns="2,4";
		
		
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
    
%>