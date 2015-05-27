$(document).ready(function(){
	var addClassAsOfTabs = function(childNo){
		$("div#navbar-ex-collapse li li:eq("+childNo+") a").tab("show");
		//alert(childNo);
	};
	
	var option = new Array();
	
// -------------tabs-3-3.html-------------
	$("a[href='#tabs-6-3']").click(function(){
		
		$(".paramDate .input-group").show();
		$(".paramYear").hide();
		$(".paramMonth").hide();
		$(".paramNull").show();
		$(".paramDate").show();
		$(".paramNull2").hide();
		
//		$('div#navbar-ex-collapse a[href="#tabs-6-3"]').tab("show");
		//addClassAsOfTabs(4);  // tab3-3 จราจรรายวัน
//		addClassAsOfTabs(7);  // tab3-3 จราจรรายวัน
		
		$.ajax({
			url : "exat-traffic-date.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-6-3").html(data);
				
				//---------------------------------- Top Table ----------------------------------------
				$.ajax({
					
					url: "../Model/Traffic/Date/traffic_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{
						 "exatparamStartDate":$("#exatparamStartDate").val()
						 
						 
						 ,"exatparamEndDate":$("#exatparamEndDate").val()
						 
						 
						},						
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
		                        //var t_up_or_down_last_year = formatNumber (indexEntry[1]);
		                        var t_average_of_day = formatNumber (indexEntry[1]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_traffic_accumulate+" เที่ยว</td>";
		                            //htmlTable2+="<td class='td'>"+t_up_or_down_last_year+"</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" เที่ยว</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_traffic_date_by_traffic_accumulate_table").html(htmlTable2);
							 
						}else{
							//alert("else");
							$("#Chart_exat_traffic_date_by_traffic_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_traffic_date_by_traffic_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td ><center>0 เที่ยว</center></td><td ><center>0 เที่ยว</center></td></tr></tbody><thead><tr><th>ปริมาณจราจรสะสม</th><th>ปริมาณจราจรเฉลี่ยต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
			
						}
					});
				//---------------------------------- Top Table ----------------------------------------
				
				//---------------------------------- LineChart 1------------------------------------
				$.ajax({
					url: "../Model/Traffic/Date/traffic_by_highway_accumulate.jsp",
					type: "get",
					dataType: "json",
					data:{
						 "exatparamStartDate":$("#exatparamStartDate").val()
						 
						 
						 ,"exatparamEndDate":$("#exatparamEndDate").val()
						 
						 
						},
					success:function(data){
						//alert(data);
						if(data != ""){
							$("#Chart_exat_traffic_date_by_highway_accumulate").css({"margin-top":"40px"});
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
			                     lineChart("Chart_exat_traffic_date_by_highway_accumulate",data,option);
						}else{
							$("#Chart_exat_traffic_date_by_highway_accumulate").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_date_by_highway_accumulate").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				//---------------------------------- LineChart 1------------------------------------
				
				//---------------------------------- BarChart 2-------------------------------------
				$.ajax({
					url: "../Model/Traffic/Date/traffic_by_highway_avgrage.jsp",
					type: "get",
					dataType: "json",
					data:{
						 "exatparamStartDate":$("#exatparamStartDate").val()
						 
						 
						 ,"exatparamEndDate":$("#exatparamEndDate").val()
						 
						 
												
					},
					success:function(data){
						if(data != ""){
							$("#Chart_exat_traffic_date_by_highway_average").css({"margin-top":"40px"});
							option=[];   
							option['stackSeries']=true;
							option['themeCustom']=["#24C0F1","#F8A326","#F34541","#49BF67","#9564E2","#FEE074","#999999"];
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
							option['labelY']= 'หน่วย : ล้านเที่ยว';
							option['angle']='-45';
							option['barWidth']='45';
		                     barChart("Chart_exat_traffic_date_by_highway_average",data,option);
						}else{
							$("#Chart_exat_traffic_date_by_highway_average").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_date_by_highway_average").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				//---------------------------------- BarChart 2-------------------------------------
				
				//---------------------------------- BarChart 3-------------------------------------
				$.ajax({
					url: "../Model/Traffic/Date/traffic_by_average_hourly.jsp",
					type: "get",
					dataType: "json",
					data:{
						 "exatparamStartDate":$("#exatparamStartDate").val()
						 ,"exatparamEndDate":$("#exatparamEndDate").val()
					},
					success:function(data){
						if(data != ""){
						//	$("#Chart_exat_traffic_date_by_average_hourly").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];   
							option['stackSeries']=true;
							option['themeCustom']=["#F8A326","#F34541","#49BF67","#9564E2","#FEE074","#999999"];
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
							option['labelY']= 'หน่วย : ล้านเที่ยว';
							option['angle']='-45';
							option['barWidth']='25';
							
		                     barChart("Chart_exat_traffic_date_by_average_hourly",data,option);
						}else{
							$("#Chart_exat_traffic_date_by_average_hourly").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_traffic_date_by_average_hourly").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				//---------------------------------- BarChart 3-------------------------------------
			
				
				
				
				}
			});
	
	});
});