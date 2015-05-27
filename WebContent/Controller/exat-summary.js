$(document).ready(function(){
	var addClassAsOfTabs = function(childNo){
		//$("div#navbar-ex-collapse li:eq("+childNo+") a").tab("show");
		//alert(childNo);
		$("div#navbar-ex-collapse ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	var option = new Array();
	
// -------------tabs-1.html-------------
	$("a[href='#tabs-1']").click(function(){

		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		
		$(".paramDate").hide();
		$(".paramNull2").show();
		//$('div#navbar-ex-collapse a[href="#tabs-1"]').tab("show");
//		addClassAsOfTabs(0);  // tab1 สรุป
		
		
		$.ajax({
			url : "exat-summary.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-1").html(data);
				
				
				//---------------------------------- Pie 1 -------------------------------------------
				var YearSubPie = "";
				if(parseInt($("#exatparamYearList").val()) < parseInt(2558)){
					YearSubPie = 2558;$('.YearSubPie').html(2558).val();
					}
				else{
					YearSubPie =$("#exatparamYearList").val();$('.YearSubPie').html($("#exatparamYearList").val()).val();
					}
				$.ajax({
					url: "../Model/Summary/summary_by_data_easypass.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":YearSubPie },
					success:function(data){
						
						if(data != ""){
							//alert("11"+data);
							//$("#Chart_exat_traffic_month_by_using_rate_easypass").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							option['themeCustom']=["#49BF67","#F34541"]
							  option['showDataLabels']=true;
							  //option['dataLabelPositionFactor']='1.1'; $('.YearSubPie').html(cateparamYear).val();
							  option['tooltip']=true;
							  
							  pieChart("Chart_exat_summary_by_data_easypass",data,option);	
						}else{
							
							$("#Chart_exat_summary_by_data_easypass").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_summary_by_data_easypass").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
										
						}
					});
				//---------------------------------- Pie 1 -------------------------------------------
				
				
				
				//---------------------------------- Table 1-1 ----------------------------------------
				$.ajax({
					
					url: "../Model/Summary/summary_by_easypass_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":YearSubPie},
					success:function(data){
						//alert(data);
						if(data != "" && data != "1.บัตรจัดจำหน่ายสะสม,,Aบัตรนำมาใช้งาน,"){
							//alert("true");
							var htmlTable2 = "";
							//htmlTable2+="<p class=\"text-danger text-right\">หน่วย : ล้านใบ</p>";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th >บัตรจัดจำหน่ายสะสม</th>";
		                           // htmlTable2+="<th >เพิ่ม/ลดเทียบปีก่อนหน้า</th>";
		                            htmlTable2+="<th >%เพิ่มลดจากปีที่แล้ว</th>";
		                            htmlTable2+="<th >นิติบุคคล</th>";
		                            htmlTable2+="<th >บุคคลธรรมดา</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_value = formatNumber (indexEntry[1]);                      
//		                        
		                        //alert(index);
		                        if(index==0 ){
	                        		htmlTable2+="<tr>";
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";}
	                        	else if(index==1 ){
	                        		htmlTable2+="<td class='td'>"+t_value+" %</td>";
	                        		}
	                        	else if(index==2 ){	                        		
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";}
	                        	else if(index==3 ){	                        		
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";
	                        		htmlTable2+="</tr>";}
		                        else if(index==4 ){
	                        		htmlTable2+="<tr >";
		                            htmlTable2+="<th >บัตรพร้อมใช้งาน</th>";
		                            htmlTable2+="<th >บัตรนำมาใช้งาน</th>";
		                            htmlTable2+="<th >บัตรเงินติดลบ</th>";
		                            htmlTable2+="<th >บัตรเงินเป็นศูนย์</th>";
		                            htmlTable2+="</tr>";
	                        		htmlTable2+="<tr>";
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";}
	                        	else if(index==5 ){
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";
	                        	    }
	                        	else if(index==6 ){
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";}
	                        	else if(index==7 ){
	                        		htmlTable2+="<td class='td'>"+t_value+" บัตร</td>";
	                        		htmlTable2+="</tr>";}
		                        
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_summary_by_easypass_accumulate_table").html(htmlTable2);
							 
						}else{
							//alert("else");
							$("#Chart_exat_summary_by_easypass_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_summary_by_easypass_accumulate_table").html("<table class=\"table table-bordered\"><thead><tr><th>บัตรจัดจำหน่ายสะสม</th><th>%เพิมลดจากปีที่แล้ว</th><th>นิติบุคคล</th><th>บุคคลธรรมดา</th></tr></thead><tbody><tr><td class=\"td\" > 0 บัตร</td><td class=\"td\" > 0 %</td><td class=\"td\" > 0 บัตร</td><td class=\"td\" > 0 บัตร</td></tr><tr><th>บัตรพร้อมใช้งาน</th><th>บัตรนำมาใช้งาน</th><th>บัตรเงินติดลบ</th><th>บัตรเงินเป็นศูนย์</th></tr><tr><td class=\"td\" > 0 บัตร</td><td class=\"td\" > 0 บัตร</td><td class=\"td\" > 0 บัตร</td><td class=\"td\" > 0 บัตร</td></tr></tbody></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
			
						}
					});
				//---------------------------------- Table 1-1 ----------------------------------------
				
				
				//---------------------------------- Table 2-1 ----------------------------------------
				$.ajax({
					
					url: "../Model/Summary/summary_by_traffic_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != "" && data != ","){
							//alert("true");
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th >ปริมาณจราจรสะสม</th>";
		                           // htmlTable2+="<th >เพิ่ม/ลดเทียบปีก่อนหน้า</th>";
		                            htmlTable2+="<th >ปริมาณจราจรเฉลี่ยต่อวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_traffic_accumulate = formatNumber (indexEntry[0]);
		                        //var t_up_or_down_last_year = indexEntry[1];
		                        var t_average_of_day = formatNumber (indexEntry[1]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_traffic_accumulate+" เที่ยว</td>";
		                            //htmlTable2+="<td class='td'>"+t_up_or_down_last_year+"</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" เที่ยว</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_summary_by_traffic_accumulate_table").html(htmlTable2);
							 
						}else{
							//alert("else");
							$("#Chart_exat_summary_by_traffic_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_summary_by_traffic_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"2\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th>ปริมาณจราจรสะสม</th><th>ปริมาณจราจรเฉลี่ยต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
			
						}
					});
				//---------------------------------- Table 2-1 ----------------------------------------
				
				//---------------------------------- LineChart 2-2 ------------------------------------

				$.ajax({
					url: "../Model/Summary/summary_by_traffic_highway.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != ""){
							
							$("#Chart_exat_summary_by_traffic_highway").css({"margin-top":"40px","margin-bottom":"128px" });
							option=[];
							option['themeCustom']=["#24C0F1","#F8A326","#F34541","#49BF67","#9564E2","#A52A2A","#999999"];
						    option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
						    option['fontSize']='18px';
						    option['textColor']= '#000000';
						    //option['pointLabels']=true;
						    option['pointLabelsFont']='18px';
						    option['pointLabelsColor']="#000000";
						    //option['pointLabelsDicimal']=true;
						    option['placement']='outside';
						    option['location']='n';
						    option['numberRows']='2';
						    option['clickable']=true;
						    option['tooltip']=true;
						    option['maxY']=true;
						    option['labelY']= 'หน่วย : ล้านเที่ยว';
							option['angle']='-45';
			                     lineChart("Chart_exat_summary_by_traffic_highway",data,option);
			                     
						}else{
							$("#Chart_exat_summary_by_traffic_highway").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"100px","padding-bottom":"320px" });
							$("#Chart_exat_summary_by_traffic_highway").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				
				//---------------------------------- LineChart 2-2 ------------------------------------
				
				//---------------------------------- Table 3-1 ----------------------------------------
				$.ajax({
					
					url: "../Model/Summary/summary_by_sales_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != "" && data != ","){
							//alert("true");
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th >ยอดจำหน่ายสะสม</th>";
		                           // htmlTable2+="<th >เพิ่ม/ลดเทียบปีก่อนหน้า</th>";
		                            htmlTable2+="<th >ยอดจำหน่ายเฉลี่ยต่อวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_sales_accumulate = formatNumber (indexEntry[0]);
		                        //var t_up_or_down_last_year = indexEntry[1];
		                        var t_average_of_day = formatNumber (indexEntry[1]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_sales_accumulate+" บัตร</td>";
		                            //htmlTable2+="<td class='td'>"+t_up_or_down_last_year+"</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" บัตร</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_summary_by_sales_accumulate_table").html(htmlTable2);
							 
						}else{
							//alert("else");
							$("#Chart_exat_summary_by_sales_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_summary_by_sales_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"2\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th>ยอดจำหน่ายสะสม</th><th>ยอดจำหน่ายเฉลี่ยต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
			
						}
					});
				//---------------------------------- Table 3-1 ----------------------------------------
				
				//---------------------------------- LineChart 3-2 ------------------------------------

				$.ajax({
					url: "../Model/Summary/summary_by_sales.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != ""){
							$("#Chart_exat_summary_by_sales").css({"margin-top":"40px"});
							//$("#Chart_exat_traffic_year_by_highway").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							option['themeCustom']=["#24C0F1","#F8A326","#F34541","#49BF67","#9564E2","#A52A2A","#999999"];
						    option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
						    option['fontSize']='18px';
						option['textColor']= '#000000';
			            //option['pointLabels']=true;
			            option['pointLabelsFont']='18px';
			            option['pointLabelsColor']="#000000";
			            //option['pointLabelsDicimal']=true;
			            option['placement']='outside';
			            option['location']='n';
			            option['numberRows']='2';
			            option['clickable']=true;
			            option['tooltip']=true;
			            option['maxY']=true;
						option['labelY']= 'หน่วย : บัตร';
						option['angle']='-45';
			                     lineChart("Chart_exat_summary_by_sales",data,option);
						}else{
							$("#Chart_exat_summary_by_sales").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_summary_by_sales").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				
				//---------------------------------- LineChart 3-2 ------------------------------------
				
				//---------------------------------- Table 4-1 ----------------------------------------
				$.ajax({
					
					url: "../Model/Summary/summary_by_topup_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != "" && data != ","){
							//alert("true");
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th >ปริมาณการเติมเงิน</th>";
		                           // htmlTable2+="<th >เพิ่ม/ลดเทียบปีก่อนหน้า</th>";
		                            htmlTable2+="<th >ปริมาณการเติมเงินเฉลี่ยต่อวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_topup_accumulate = formatNumber (indexEntry[0]);
		                        //var t_up_or_down_last_year = indexEntry[1];
		                        var t_average_of_day = formatNumber (indexEntry[1]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_topup_accumulate+" ครั้ง</td>";
		                            //htmlTable2+="<td class='td'>"+t_up_or_down_last_year+"</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" ครั้ง</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_summary_by_topup_accumulate_table").html(htmlTable2);
							 
						}else{
							//alert("else");
							$("#Chart_exat_summary_by_topup_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_summary_by_topup_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"2\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th>ปริมาณการเติมเงิน</th><th>ปริมาณการเติมเงินเฉลี่ยต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
			
						}
					});
				//---------------------------------- Table 4-1 ----------------------------------------
				
				//---------------------------------- LineChart 4-2 ------------------------------------

				$.ajax({
					url: "../Model/Summary/summary_by_topup.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != ""){
							$("#Chart_exat_summary_by_topup").css({"margin-top":"40px"});
							//$("#Chart_exat_traffic_year_by_highway").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
						    option['themeCustom']=["#DC143C","#FF7F50","#32CD32","#4169E1","#FF1493","#FFD700"];
						    option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
						    option['fontSize']='18px';
						option['textColor']= '#000000';
			            //option['pointLabels']=true;
			            option['pointLabelsFont']='18px';
			            option['pointLabelsColor']="#000000";
			            //option['pointLabelsDicimal']=true;
			            option['placement']='outside';
			            option['location']='n';
			            option['numberRows']='2';
			            option['clickable']=true;
			            option['tooltip']=true;
			            option['maxY']=true;
						option['labelY']= 'หน่วย : ครั้ง';
						option['angle']='-45';
			                     lineChart("Chart_exat_summary_by_topup",data,option);
						}else{
							$("#Chart_exat_summary_by_topup").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_summary_by_topup").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				
				//---------------------------------- LineChart 4-2 ------------------------------------
				
				}
			});
	
	});
});