$(document).ready(function(){
	var addClassAsOfTabs = function(childNo){
		//$("div#navbar-ex-collapse li:eq("+childNo+") a").tab("show");
		//$('div#navbar-ex-collapse a[href="#tabs-6"]').tab("show");
		//alert(childNo);
		$("div#navbar-ex-collapse ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	

	
	
	
	
	//$('#myTab a[href="#profile"]').tab('show');
	var option = new Array();
	
// -------------tabs-8.html-------------
	$("a[href='#tabs-5']").click(function(){
		
		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		$(".paramDate").hide();
		$(".paramNull2").show();
		$('div#navbar-ex-collapse a[href="#tabs-5"]').tab("show");
//		addClassAsOfTabs(7);  // tab8 คลังบัตร
//		addClassAsOfTabs(10);  // tab8 คลังบัตร
//		addClassAsOfTabs(6);  // tab8 คลังบัตร
		addClassAsOfTabs(4);  // tab8 คลังบัตร
		
		$.ajax({
			url : "exat-inventory.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-5").html(data);
				var YearSubPie = "";
				if(parseInt($("#exatparamYearList").val()) < parseInt(2558)){
					YearSubPie = 2558;$('.YearSubPie').html(2558).val();
					}
				else{
					YearSubPie =$("#exatparamYearList").val();$('.YearSubPie').html($("#exatparamYearList").val()).val();
					}
				//---------------------------------- Top Table ----------------------------------------
				$.ajax({
					
					url: "../Model/Inventory/inventory_by_status_easypass.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":YearSubPie },
					success:function(data){
						//alert(data);
						if(data != "" && data != ",,"){
							//alert("true");
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                        $.each(data,function(index,indexEntry){
			                        var t_header = formatNumber (indexEntry[0]);
			                        //var t_values = formatNumber (indexEntry[1]);
			                        
			                    		                    
			                        /*htmlTable2+="<tr>";*/
			                            htmlTable2+="<th>"+t_header+"</th>";
			                            /*htmlTable2+="<td valign='bottom' style='width:45%' class='td'>"+t_values+"</td>";
			                        htmlTable2+="</tr>";*/
			                    });
		                        
		                        
		                        
		                            /*htmlTable2+="<th >บัตรพร้อมใช้งาน</th>";
		                            htmlTable2+="<th >คืนบัตร/บัตรพร้อมใช้งาน</th>";
		                            htmlTable2+="<th >บัตรหาย</th>";*/
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    htmlTable2+="<tr>";
		                    $.each(data,function(index,indexEntry){
		                    	var t_values = formatNumber (indexEntry[1]);
		                    	htmlTable2+="<td class='td'>"+t_values+" บัตร</td>";
		                        /*var t_traffic_accumulate = formatNumber (indexEntry[0]);
		                        var t_up_or_down_last_year = formatNumber (indexEntry[1]);
		                        var t_average_of_day = formatNumber (indexEntry[2]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_traffic_accumulate+" บัตร</td>";
		                            htmlTable2+="<td class='td'>"+t_up_or_down_last_year+" บัตร</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" บัตร</td>";
		                        htmlTable2+="</tr>";*/
		                    });
		                    htmlTable2+="</tr>";
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_inventory_by_inventory_accumulate_table").html(htmlTable2);
							 
						}else{
							//alert("else");
							$("#Chart_exat_inventory_by_inventory_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_inventory_by_inventory_accumulate_table").html("<table class=\"table table-bordered\"><thead><tr><th>บัตรพร้อมจำหน่าย</th><th>บัตรพร้อมใช้งาน</th><th>บัตรหาย</th><th>คืนบัตร</th><th>บัตรไม่พร้อมใช้งาน</th></tr></thead><tbody><tr><td class=\"td\" colspan =\"5\">ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</td></tr></tbody></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				//---------------------------------- Top Table ----------------------------------------
				
				
				//---------------------------------- Pie 1 -------------------------------------------
				$.ajax({
					url: "../Model/Inventory/inventory_by_status_easypass.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":YearSubPie },
					success:function(data){
						
						if(data != ""){
							//alert("11"+data);
							//$("#Chart_exat_traffic_month_by_using_rate_easypass").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							option['themeCustom']=["#24C0F1","#49BF67","#9564E2","#F8A326","#F34541","#FEE074","#999999"];
							 option['showDataLabels']=true;
							  //option['dataLabelPositionFactor']='1.1';
							  option['tooltip']=true;
							  pieChart("Chart_exat_inventory_by_status_easypass",data,option);	
						}else{
							$("#Chart_exat_inventory_by_status_easypass").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_inventory_by_status_easypass").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
										
						}
					});
				//---------------------------------- Pie 1 -------------------------------------------
				
				//---------------------------------- Table 1-1 ----------------------------------------
//				$.ajax({
//					
//					url: "../Model/Inventory/inventory_by_status_easypass.jsp",
//					type: "get",
//					dataType: "json",
//					data:{"paramYear":$("#exatparamYearList").val() },
//					success:function(data){
//						//alert(data);
//						if(data != "" ){
//							//alert("true");
//							var htmlTable2 = "";
//							htmlTable2+="<p class='text-right' style='font-family:TH SarabunIT๙;font-size: 18px;color: #000000; '>หน่วย : จำนวนบัตร</p>";
//							htmlTable2+="<table class='table table-bordered fixtd'>";
//		                    //htmlTable2+="<thead>";
////		                        htmlTable2+="<tr >";
////		                            htmlTable2+="<th >บัตรพร้อมใช้งาน</th>";
////		                            htmlTable2+="<th >คืนบัตร/บัตรพร้อมใช้งาน</th>";
////		                            htmlTable2+="<th >บัตรหาย</th>";
////		                        htmlTable2+="</tr>";
//		                    //htmlTable2+="</thead>";
//		                    //htmlTable2+="<tbody>";
//		                    $.each(data,function(index,indexEntry){
//		                        var t_header = formatNumber (indexEntry[0]);
//		                        var t_values = formatNumber (indexEntry[1]);
//		                        
//		                    		                    
//		                        htmlTable2+="<tr>";
//		                            htmlTable2+="<th style='width:55%'>"+t_header+"</th>";
//		                            htmlTable2+="<td valign='bottom' style='width:45%' class='td'>"+t_values+"</td>";
//		                        htmlTable2+="</tr>";
//		                    });
//		                //htmlTable2+="</tbody>";
//		                htmlTable2+="</table>";
//		                
//		                
//		                $("#Chart_exat_inventory_by_status_easypass_table").html(htmlTable2);
//							 
//						}else{
//							//alert("else");
//							$("#Chart_exat_inventory_by_status_easypass_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
//							$("#Chart_exat_inventory_by_status_easypass_table").html("<table class=\"table table-bordered fixtd\"><tbody><tr><th style=\"width:55%\">บัตรพร้อมจำหน่าย</th><td rowspan=\"5\" class=\"td\" style=\"width:45%\">ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</td></tr><tr><th style=\"width:55%\">บัตรพร้อมใช้งาน</th></tr><tr><th style=\"width:55%\">บัตรหาย</th></tr><tr><th style=\"width:55%\">คืนบัตร</th></tr><tr><th style=\"width:55%\">บัตรไม่พร้อมใช้งาน</th></tr></tbody></table>");
//							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
//						}
//						 
//						}
//					});
				//---------------------------------- Table 1-1 ----------------------------------------
				
				
				
				//---------------------------------- BarChart 2-------------------------------------
				$.ajax({
					url: "../Model/Inventory/inventory_by_inventory_easypass.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":YearSubPie },
					success:function(data){
						if(data != ""){
							//$("#Chart_exat_traffic_month_by_highway_and_easypass_min").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];   
							option['stackSeries']=true;
							option['themeCustom']=["#24C0F1","#49BF67","#9564E2","#F8A326","#F34541","#FEE074","#999999"];
							option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
				            option['fontSize']='18px';
							option['textColor']= '#000000';
							//option['pointLabels']='true';
						    option['pointLabelsFont']='18px';
						    option['pointLabelsColor']="#000000";
						    option['placement']='outside';
						    option['location']='n';
							option['numberRows']='2';
				            option['tooltip']=true;
							option['labelY']= 'หน่วย : ล้านบัตร';
							option['angle']='-45';
							option['barWidth']='35';
		                     barChart("Chart_exat_inventory_by_inventory_easypass",data,option);
						}else{
							$("#Chart_exat_inventory_by_inventory_easypass").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"81px","padding-bottom":"160px" });
							$("#Chart_exat_inventory_by_inventory_easypass").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				//---------------------------------- BarChart 2-------------------------------------
				
				
				//---------------------------------- LineChart 3------------------------------------
				$.ajax({
					url: "../Model/Inventory/inventory_by_return_easypass.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val() },
					success:function(data){
						//alert(data);
						if(data != ""){
							$("#Chart_exat_traffic_month_by_highway").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							var c_highway_Chaloem = "";
							var c_highway_sirat = "";
							var c_highway_Chalong = "";
							var c_highway_Burapha = "";
							var c_highway_Kanchanaphisek  = "";
							var c_all ="";
							
		                    $.each(data,function(index,indexEntry){
		                        var highway_name = indexEntry[1];
		                        if(highway_name == "เฉลิมมหานคร"){c_highway_Chaloem = " #24C0F1,";}
		                        else if (highway_name == "ศรีรัช"){c_highway_sirat = " #F8A326,";}
		                        else if (highway_name == "ฉลองรัช"){c_highway_Chalong = " #F34541,";}
		                        else if (highway_name == "บูรพาวิถี"){c_highway_Burapha = " #49BF67,";}
		                        else if (highway_name == "กาญจนาภิเษก"){c_highway_Kanchanaphisek  = " #9564E2";}		                        
		                    });
		                    c_all=c_highway_Chaloem+c_highway_sirat+c_highway_Chalong+c_highway_Burapha+c_highway_Kanchanaphisek;
		                    //alert(c_all.split(","));
		                    
							option['themeCustom']=c_all.split(",");
						    option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
						    option['fontSize']='18px';
						option['textColor']= '#000000';
			            //option['pointLabels']=true;
			            option['pointLabelsFont']='18px';
			            option['pointLabelsColor']="#000000";
			            //option['pointLabelsDicimal']=true;
			            option['placement']='outside';
			            option['location']='n';
			            option['numberRows']='1';
			            option['clickable']=true;
			            option['tooltip']=true;
			            option['maxY']=true;
						option['labelY']= 'หน่วย : บัตร';
						option['angle']='-45';
					
			                     lineChart("Chart_exat_inventory_by_return_easypass",data,option);
						}else{
							$("#Chart_exat_inventory_by_return_easypass").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_inventory_by_return_easypass").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				//---------------------------------- LineChart 3------------------------------------
				
				
				
				
				
				
				}
			});
	
	});
});