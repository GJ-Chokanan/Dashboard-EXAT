$(document).ready(function(){
	var addClassAsOfTabs = function(childNo){
		//$("div#navbar-ex-collapse li li:eq("+childNo+") a").tab("show");
		//alert(childNo);
		$("div#navbar-ex-collapse ul").each(function(){
			$("li",this).removeClass("TabsActive");
			$("li",this).eq(childNo).addClass("TabsActive");
		});
	};
	
	var option = new Array();
	
// -------------tabs-3.html-------------
	$("a[href='#tabs-6-1']").click(function(){

		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		$(".paramDate").hide();
		$(".paramNull2").show();
		
		//$('div#navbar-ex-collapse a[href="#tabs-6-1"]').tab("show");
		//addClassAsOfTabs(0);  // tab3-1 จราจรรายปี
//		addClassAsOfTabs(3);  // tab3-1 จราจรรายปี	
//		addClassAsOfTabs(5);
		$.ajax({
			url : "exat-traffic-year.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-6-1").html(data);
				//---------------------------------- Top Table ----------------------------------------
				var traffic_accumulate_table = function(arparamYear){
				$.ajax({
					
					url: "../Model/Traffic/Year/traffic_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						//alert(data);
						if(data != ""){
							//alert("true");
							/*option=[];
							 option['fontSize']='12px';
							 option['title']=["ปริมาณจราจรสะสม","เพิ่ม/ลด จากปีที่แล้ว","ปริมาณจราจรเฉลี่ยรายวัน"];
							 option['contentType']=["Number","Number","Number"];
							 option['colsWidth']=["60","50","50"];
		                     //option['height']='150';
		                     option['text-align']='center';
							 table("Chart_exat_traffic_year_by_traffic_accumulate_table",data,option);*/
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th >ปริมาณจราจรสะสม</th>";
		                            htmlTable2+="<th >เพิ่ม/ลด จากปีที่แล้ว</th>";
		                            htmlTable2+="<th >ปริมาณจราจรเฉลี่ยรายวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_traffic_accumulate = formatNumber (indexEntry[0]);
		                        var t_up_or_down_last_year = formatNumber (indexEntry[1]);
		                        var t_average_of_day = formatNumber (indexEntry[2]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_traffic_accumulate+" เที่ยว</td>";
		                            htmlTable2+="<td class='td'>"+t_up_or_down_last_year+" %</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" เที่ยว</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_traffic_year_by_traffic_accumulate_table").html(htmlTable2);
					}else{
							//alert("else");
							$("#Chart_exat_traffic_year_by_traffic_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_traffic_year_by_traffic_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"3\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th>ปริมาณจราจรสะสม</th><th>เพิ่ม/ลด จากปีที่แล้ว</th><th>ปริมาณจราจรเฉลี่ยรายวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_year_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				};
				traffic_accumulate_table($("#exatparamYearList").val());
				//---------------------------------- Top Table ----------------------------------------
				
				//---------------------------------- LineChart 1------------------------------------
				$.ajax({
					url: "../Model/Traffic/Year/traffic_by_highway.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != ""){
							//$("#Chart_exat_traffic_year_by_highway").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
						    option['themeCustom']=["#24C0F1","#F8A326","#F34541","#49BF67","#9564E2","#FEE074","#999999"];
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
						option['labelY']= 'หน่วย : ล้านเที่ยว';
						option['angle']='-45';
			                     lineChart("Chart_exat_traffic_year_by_highway",data,option);
						}else{
							$("#Chart_exat_traffic_year_by_highway").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_year_by_highway").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
		                   //bind function click here start.
	                    var i=0;
	                    $('#Chart_exat_traffic_year_by_highway').bind('jqplotDataClick',                
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                             if((i%2)!=0){
	                            	 option=[];
	                                 option['param']={"paramYear":$("#exatparamYearList").val()};
	                                 
	                           	 var cateparamYear = getCate("../Model/Traffic/Year/traffic_by_highway.jsp",pointIndex,option);
	                           	 
	                           	//$(".Year").html(cateparamYear).val();
	                           	//alert(cateparamYear);
	                           	
	                           	 $("#Chart_exat_traffic_year_by_highway_and_easypass_max").empty();
								 $("#Chart_exat_traffic_year_by_highway_and_easypass_min").empty();
								 $("#Chart_exat_traffic_year_by_traffic_accumulate_table").empty();
								 traffic_accumulate_table(cateparamYear);
	                           	traffic_by_highway_and_easypass_max(cateparamYear);
								traffic_by_highway_and_easypass_min(cateparamYear);
	                           	
	                           	$('.YearSub').text(cateparamYear);
	                           	
	                             }
	                             i++;                                 
	                      	}
	                      );
	                   //bind function click here end.
						
						}
					});
				//---------------------------------- LineChart 1------------------------------------
				
				//---------------------------------- LineChart 2------------------------------------
				$.ajax({
					url: "../Model/Traffic/Year/traffic_by_highway_avgrage.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						if(data != ""){
						//	$("#Chart_exat_traffic_year_by_highway_avgrage").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
						    option['themeCustom']=["#24C0F1","#F8A326","#F34541","#49BF67","#9564E2","#FEE074","#999999"];
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
						option['labelY']= 'หน่วย : เที่ยว';
						option['angle']='-45';
		                     lineChart("Chart_exat_traffic_year_by_highway_avgrage",data,option);
						}else{
							$("#Chart_exat_traffic_year_by_highway_avgrage").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_year_by_highway_avgrage").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						//bind function click here start.
	                    var i=0;
	                    $('#Chart_exat_traffic_year_by_highway_avgrage').bind('jqplotDataClick',                
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                             if((i%2)!=0){
	                            	 option=[];
	                                 option['param']={"paramYear":$("#exatparamYearList").val()};
	                                 
	                           	 var cateparamYear = getCate("../Model/Traffic/Year/traffic_by_highway_avgrage.jsp",pointIndex,option);
	                           	 
	                           	//$(".Year").html(cateparamYear).val();
	                           	//alert(cateparamYear);
	                           	
	                           	 $("#Chart_exat_traffic_year_by_highway_and_easypass_max").empty();
								 $("#Chart_exat_traffic_year_by_highway_and_easypass_min").empty();
								 $("#Chart_exat_traffic_year_by_traffic_accumulate_table").empty();
								 traffic_accumulate_table(cateparamYear);	             				
	                           	traffic_by_highway_and_easypass_max(cateparamYear);
								traffic_by_highway_and_easypass_min(cateparamYear);
	                           	
	                           	$('.YearSub').text(cateparamYear);
	                           	
	                             }
	                             i++;                                 
	                      	}
	                      );
	                   //bind function click here end.
						
						
						
						
						}
					});
				//---------------------------------- LineChart 2------------------------------------
				
				//---------------------------------- BarChart 3-------------------------------------
				var traffic_by_highway_and_easypass_max = function(arparamYear){
				$.ajax({
					url: "../Model/Traffic/Year/traffic_by_highway_and_easypass_max.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						if(data != ""){
						//	$("#Chart_exat_traffic_year_by_highway_and_easypass_max").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];   
							option['stackSeries']=true;
							option['themeCustom']=["#49BF67"];
							option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
				            option['fontSize']='18px';
							option['textColor']= '#000000';
							//option['pointLabels']='true';
						    option['pointLabelsFont']='18px';
						    option['pointLabelsColor']="#000000";
						    option['placement']='outside';
						    option['location']='n';
							option['numberRows']='1';
				            option['tooltip']=true;
							option['labelY']= 'หน่วย : เที่ยว';
							option['angle']='-45';
							option['barWidth']='35';
		                     barChart("Chart_exat_traffic_year_by_highway_and_easypass_max",data,option);
						}else{
							$("#Chart_exat_traffic_year_by_highway_and_easypass_max").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_year_by_highway_and_easypass_max").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				};
				traffic_by_highway_and_easypass_max($("#exatparamYearList").val());
				//---------------------------------- BarChart 3-------------------------------------
			
				//---------------------------------- BarChart 4-------------------------------------
				var traffic_by_highway_and_easypass_min = function(arparamYear){
				$.ajax({
					url: "../Model/Traffic/Year/traffic_by_highway_and_easypass_min.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						if(data != ""){
						//	$("#Chart_exat_traffic_year_by_highway_and_easypass_min").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];   
							option['stackSeries']=true;
							option['themeCustom']=["#999999"];
							option['fontFamily']='TH SarabunIT๙,Tahoma,Geneva,sans-serif';
				            option['fontSize']='18px';
							option['textColor']= '#000000';
							//option['pointLabels']='true';
						    option['pointLabelsFont']='18px';
						    option['pointLabelsColor']="#000000";
						    option['placement']='outside';
						    option['location']='n';
							option['numberRows']='1';
				            option['tooltip']=true;
							option['labelY']= 'หน่วย : เที่ยว';
							option['angle']='-45';
							option['barWidth']='35';
		                     barChart("Chart_exat_traffic_year_by_highway_and_easypass_min",data,option);
						}else{
							$("#Chart_exat_traffic_year_by_highway_and_easypass_min").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_year_by_highway_and_easypass_min").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				};
				traffic_by_highway_and_easypass_min($("#exatparamYearList").val());
				//---------------------------------- BarChart 4-------------------------------------
			
			
			
			
			
			}
			});
	
	});
});