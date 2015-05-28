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
	
// -------------tabs-4.html-------------
	$("a[href='#tabs-3']").click(function(){

		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		$(".paramDate").hide();
		$(".paramNull2").show();
		
		//$('div#navbar-ex-collapse a[href="#tabs-3"]').tab("show");
//		addClassAsOfTabs(5);  // tab4 เติมเงิน
	//	addClassAsOfTabs(8);  // tab4 เติมเงิน
//		addClassAsOfTabs(2);
		
		$.ajax({
			url : "exat-topup.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-3").html(data);
				
				//---------------------------------- Top Table ----------------------------------------
				var topup_accumulate_table = function(arparamYear){
				$.ajax({
					
					url: "../Model/Topup/topup_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						//alert(data);
						if(data != ""){
							//alert("true");
							/*option=[];
							 option['fontSize']='12px';
							 option['title']=["ปริมาณจราจรสะสม (เที่ยว)","เพิ่ม/ลดเทียบปีก่อนหน้า","ยอดเติมเงินเฉลี่ยต่อวัน"];
							 option['contentType']=["Number","Number","Number"];
							 option['colsWidth']=["60","50","50"];
		                     //option['height']='150';
		                     option['text-align']='center';
							 table("Chart_exat_traffic_year_by_traffic_accumulate_table",data,option);*/
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th colspan='2'>ยอดเติมเงินสะสม</th>";
		                            htmlTable2+="<th colspan='2'>เพิ่ม/ลด จากปีที่แล้ว</th>";
		                            htmlTable2+="<th colspan='2'>ยอดเติมเงินเฉลี่ยต่อวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_topup_accumulate_bath = formatNumber (indexEntry[0]);
		                        var t_topup_accumulate_terms = formatNumber (indexEntry[1]);
		                        var t_up_or_down_last_year_bath = formatNumber (indexEntry[2]);
		                        var t_up_or_down_last_year_terms = formatNumber (indexEntry[3]);
		                        var t_average_of_day_bath = formatNumber (indexEntry[4]);
		                        var t_average_of_day_terms = formatNumber (formatNumber (indexEntry[5]));
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_topup_accumulate_bath+" บาท"+"</td>";
		                            htmlTable2+="<td class='td'>"+t_topup_accumulate_terms+" ครั้ง"+"</td>";
		                            htmlTable2+="<td class='td'>"+t_up_or_down_last_year_bath+" %"+"</td>";
		                            htmlTable2+="<td class='td'>"+t_up_or_down_last_year_terms+" %"+"</td>"
		                            htmlTable2+="<td class='td'>"+t_average_of_day_bath+" บาท"+"</td>"
		                            htmlTable2+="<td class='td'>"+t_average_of_day_terms+" ครั้ง"+"</td>"
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_topup_by_topup_accumulate_table").html(htmlTable2);
					}else{
							//alert("else");
							$("#Chart_exat_topup_by_topup_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_topup_by_topup_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"6\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th colspan=\"2\">ยอดเติมเงินสะสม</th><th colspan=\"2\">เพิ่ม/ลด จากปีที่แล้ว</th><th colspan=\"2\">ยอดเติมเงินเฉลี่ยต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_year_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
			};
			topup_accumulate_table($("#exatparamYearList").val());
				//---------------------------------- Top Table ----------------------------------------
				
				//---------------------------------- LineChart 1------------------------------------
				
				$.ajax({
					url: "../Model/Topup/topup_by_channel_year.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						//alert(data);
						if(data != ""){
							$("#Chart_exat_topup_by_channel_year").css({"margin-top":"40px"});
							//$("#Chart_exat_traffic_year_by_highway").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							var c_pass = "";
							var c_building = "";
							var c_bank = "";
							var c_sum = "";
							var c_all ="";
							
		                    $.each(data,function(index,indexEntry){
		                        var highway_name = indexEntry[1];
		                        if(highway_name == "ช่องเก็บค่าผ่านทาง"){c_pass = " #DC143C,";}
		                        else if (highway_name == "อาคารด่าน, OneStop, ศูนย์ควบคุม"){c_building = " #FF7F50,";}
		                        else if (highway_name == "Bank, Non-Bank"){c_bank = " #32CD32,";}
		                        else if (highway_name == "รวมทุกรายช่องทางบริการ"){c_sum = " #4169E1";}	                        
		                    });
		                    c_all=c_pass+c_building+c_bank+c_sum;
		                    //alert(c_all.split(","));
		                    
							option['themeCustom']=c_all.split(",");
							//option['themeCustom']=["#DC143C","#FF7F50","#32CD32","#4169E1","#FF1493","#FFD700"];
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
			            //option['maxY']=true;
						option['labelY']= 'หน่วย : ครั้ง';
						option['angle']='-45';
			                     lineChart("Chart_exat_topup_by_channel_year",data,option);
						}else{
							$("#Chart_exat_topup_by_channel_year").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_topup_by_channel_year").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						
						$(".MonthSub").html("รวมทุกเดือน").val();
						//bind function click here start.
	                    var i=0;
	                    $('#Chart_exat_topup_by_channel_year').bind('jqplotDataClick',                
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                             if((i%2)!=0){
	                            	 option=[];
	                                 option['param']={"paramYear":$("#exatparamYearList").val()};
	                                 
	                           	 var cateparamYear = getCate("../Model/Topup/topup_by_channel_year.jsp",pointIndex,option);
	                           	 
	                           	//$(".Year").html(cateparamYear).val();
	                           	//alert(cateparamYear);
	                           	
	                           	 $("#Chart_exat_topup_by_channel_month").empty();
								 $("#Chart_exat_topup_by_point_type").empty();
	                           	 $("#Chart_exat_topup_by_easypass_persent").empty();
	                             $("#Chart_exat_topup_by_information_point_type").empty();
	                             $("#Chart_exat_topup_by_topup_accumulate_table").empty();
	                             
	                             $('#Chart_exat_topup_by_channel_month').unbind( 'jqplotDataClick');
	                             
	                             topup_accumulate_table(cateparamYear);
	                             topup_by_channel_month(cateparamYear);
	                             topup_by_point_type(cateparamYear,'All');
	                             topup_by_easypass_persent(cateparamYear,'All');
	                             topup_by_information_point_type(cateparamYear,'All');
                          	
	                           	 $('.YearSub').html(cateparamYear).val();
	                           	 $(".MonthSub").html("รวมทุกเดือน").val();
	                           	 
	                             }
	                             i++;                                 
	                      	}
	                      );
	                   //bind function click here end.
						
						
						}
					});
				//---------------------------------- LineChart 1------------------------------------
				
				//---------------------------------- LineChart 2------------------------------------
				var topup_by_channel_month = function(arparamYear){
				$.ajax({
					url: "../Model/Topup/topup_by_channel_month.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						if(data != ""){
							$("#Chart_exat_topup_by_channel_month").css({"margin-top":"40px","padding-bottom":"0px"});
							option=[];
							var c_pass = "";
							var c_building = "";
							var c_bank = "";
							var c_sum = "";
							var c_all ="";
							
		                    $.each(data,function(index,indexEntry){
		                        var highway_name = indexEntry[1];
		                        if(highway_name == "ช่องเก็บค่าผ่านทาง"){c_pass = " #DC143C,";}
		                        else if (highway_name == "อาคารด่าน, OneStop, ศูนย์ควบคุม"){c_building = " #FF7F50,";}
		                        else if (highway_name == "Bank, Non-Bank"){c_bank = " #32CD32,";}
		                        else if (highway_name == "รวมทุกรายช่องทางบริการ"){c_sum = " #4169E1";}	                        
		                    });
		                    c_all=c_pass+c_building+c_bank+c_sum;
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
			            option['numberRows']='2';
			            option['clickable']=true;
			            option['tooltip']=true;
			            //option['maxY']=true;
						option['labelY']= 'หน่วย : ครั้ง';
						option['angle']='-45';
		                     lineChart("Chart_exat_topup_by_channel_month",data,option);
						}else{
							$("#Chart_exat_topup_by_channel_month").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_topup_by_channel_month").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						
						//bind function click here start.
	                    var i=0;
	                    console.log("i : "+i)
						console.log("Year : "+arparamYear);
						
	                    
	                    $('#Chart_exat_topup_by_channel_month').bind('jqplotDataClick'    ,           
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                    	//alert(arparamYear+" ev : "+ev+" seriesIndex : "+seriesIndex+" pointIndex : "+pointIndex+" data : "+data);
	                    	console.log("i = "+i);
	                             if((i%2)!=0){
	                            	    //alert(arparamYear);
	                            	 	                    	
	     	                    		console.log("arparamYear "+arparamYear+" ev : "+ev+" seriesIndex : "+seriesIndex+" pointIndex : "+pointIndex+" data : "+data);
	     	                    		option=[];
		                                option['param']={"paramYear":arparamYear};
		                                var cateparamMonth = getCate("../Model/Topup/topup_by_channel_month.jsp",pointIndex,option);
	     	                    		//alert(arparamYear+ " " +cateparamMonth);
	     	                    		var cateparamMonthName="";
	     	                    		if (cateparamMonth == "ต.ค.") {cateparamMonthName="ตุลาคม"; cateparamMonth= 1;} 
		     	                   	    else if (cateparamMonth == "พ.ย.") {cateparamMonthName="พฤศจิกายน";cateparamMonth= 2;} 
		     	                   	    else if (cateparamMonth == "ธ.ค.") {cateparamMonthName="ธันวาคม";cateparamMonth= 3;} 
		     	                   	    else if (cateparamMonth == "ม.ค.") {cateparamMonthName="มกราคม";cateparamMonth= 4;} 
		     	                   	    else if (cateparamMonth == "ก.พ.") {cateparamMonthName="กุมภาพันธ์";cateparamMonth= 5;} 
		     	                   	    else if (cateparamMonth == "มี.ค.") {cateparamMonthName="มีนาคม";cateparamMonth= 6;} 
		     	                   	    else if (cateparamMonth == "เม.ย." || cateparamMonth == "เม.ษ." ) {cateparamMonthName="เมษายน";cateparamMonth= 7;}
		     	                   	    else if (cateparamMonth == "พ.ค.") {cateparamMonthName="พฤษภาคม";cateparamMonth= 8;}
		     	                   	    else if (cateparamMonth == "มิ.ย.") {cateparamMonthName="มิถุนายน";cateparamMonth= 9;}
		     	                   	    else if (cateparamMonth == "ก.ค.") {cateparamMonthName="กรกฎาคม";cateparamMonth= 10;} 
		     	                   	    else if (cateparamMonth == "ส.ค.") {cateparamMonthName="สิงหาคม";cateparamMonth= 11;} 
		     	                   	    else if (cateparamMonth == "ก.ย.") {cateparamMonthName="กันยายน";cateparamMonth= 12;}
	     	                    		console.log(arparamYear+ " " +cateparamMonth+ " "+cateparamMonthName);
	     	                    		
	     	                    		$("#Chart_exat_topup_by_point_type").empty();
	   	                           	 	$("#Chart_exat_topup_by_easypass_persent").empty();
	   	                           	 	$("#Chart_exat_topup_by_information_point_type").empty();
	   	                           	 	
	   	                           	 	topup_by_point_type(arparamYear,cateparamMonth);
	   	                           	 	topup_by_easypass_persent(arparamYear,cateparamMonth);
	   	                           	 	topup_by_information_point_type(arparamYear,cateparamMonth);

	   	                           
	     	                    		$(".MonthSub").html(cateparamMonthName).val();
	     	                    		
	     	                    	       	 
	                           	
	                             }
	                             i++;                             
	                      	}
	                      ); 
//	                   //bind function click here end.
						
						
						}
					});
				};
				topup_by_channel_month($("#exatparamYearList").val());
				//---------------------------------- LineChart 2------------------------------------
				

				//---------------------------------- Pie 3 -------------------------------------------
				var topup_by_point_type = function(arparamYear,arparamMonth){
				$.ajax({
					url: "../Model/Topup/topup_by_point_type.jsp", //หน่วยงานภายใน ภายนอก
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear,"paramMonth":arparamMonth },
					success:function(data){
						if(data != ""){
							//$("#Chart_exat_traffic_month_by_using_rate_easypass").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							 option['themeCustom']=["#24C0F1","#9564E2"];
							  option['showDataLabels']=true;
							  //option['dataLabelPositionFactor']='1.1';
							  option['tooltip']=true;
							  pieChart("Chart_exat_topup_by_point_type",data,option);	
						}else{
							$("#Chart_exat_topup_by_point_type").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_topup_by_point_type").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
										
						}
					});
				};
				topup_by_point_type($("#exatparamYearList").val(),'All');
				//---------------------------------- Pie 3 -------------------------------------------
	
				
				

				//---------------------------------- Pie 4 -------------------------------------------
				var topup_by_easypass_persent = function(arparamYear,arparamMonth){
				$.ajax({
					url: "../Model/Topup/topup_by_easypass_persent.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear,"paramMonth":arparamMonth },
					success:function(data){
						if(data != ""){
							//$("#Chart_exat_traffic_month_by_using_rate_easypass").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							  option['themeCustom']=["#4bb2c5","#eaa228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f","#ff5800","#0085cc"];
							  option['showDataLabels']=true;
							  //option['dataLabelPositionFactor']='1.1';
							  option['tooltip']=true;
							  pieChart("Chart_exat_topup_by_easypass_persent",data,option);	
						}else{
							$("#Chart_exat_topup_by_point_type").css({"width":"auto","height":"326px"});
							$("#Chart_exat_topup_by_easypass_persent").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_topup_by_easypass_persent").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
										
						}
					});
				};
				topup_by_easypass_persent($("#exatparamYearList").val(),'All');
				//---------------------------------- Pie 4 -------------------------------------------
	
				
				
				
				
				
				
				
				//---------------------------------- barChart 5------------------------------------
				var topup_by_information_point_type = function(arparamYear,arparamMonth){
				$.ajax({
					url: "../Model/Topup/topup_by_information_point_type.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear,"paramMonth":arparamMonth},
					success:function(data){
						if(data != ""){
						//	$("#Chart_exat_traffic_year_by_highway_avgrage").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
								option=[];   
								option['stackSeries']=true;
								option['themeCustom']=["#F34541"];
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
				            	option['labelY']= 'หน่วย : ครั้ง';
				            	option['angle']='-45';
		                     barChart("Chart_exat_topup_by_information_point_type",data,option);
						}else{
							$("#Chart_exat_topup_by_information_point_type").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_topup_by_information_point_type").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				};
				topup_by_information_point_type($("#exatparamYearList").val(),'All');
				//---------------------------------- barChart 5------------------------------------
				
				}
			});
	
	});
});