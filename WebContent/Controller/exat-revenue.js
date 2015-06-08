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
	
// -------------tabs-7.html-------------
	$("a[href='#tabs-4']").click(function(){

		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		$(".paramDate").hide();
		$(".paramNull2").show();
		
		$('div#navbar-ex-collapse a[href="#tabs-4"]').tab("show");
//		addClassAsOfTabs(6);  // tab7 รายได้
	//	addClassAsOfTabs(9);  // tab7 รายได้
		addClassAsOfTabs(3);  // tab7 รายได้
		
		$.ajax({
			url : "exat-revenue.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-4").html(data);
				
				//---------------------------------- Top Table ----------------------------------------
				var revenue_accumulate_table = function(arparamYear){
				$.ajax({
					
					url: "../Model/Revenue/revenue_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						//alert(data);
						if(data != "" && data != ",,"){
							//alert("true");
							/*option=[];
							 option['fontSize']='18px';
							 option['title']=["รายได้สะสม","เพิ่ม/ลด จากปีที่แล้ว","ยอดเฉลี่ยรายได้ต่อวัน"];
							 option['contentType']=["Number","Number","Number"];
							 option['colsWidth']=["60","50","50"];
		                     //option['height']='150';
		                     option['text-align']='center';
							 table("Chart_exat_revenue_by_revenue_accumulate_table",data,option);*/
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr height='20px'>";
		                            htmlTable2+="<th >รายได้สะสม</th>";
		                            htmlTable2+="<th >เพิ่ม/ลด จากปีที่แล้ว</th>";
		                            htmlTable2+="<th >ยอดเฉลี่ยรายได้ต่อวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_revenue_accumulate = formatNumber (indexEntry[0]);
		                        var t_up_or_down_last_year = formatNumber (indexEntry[1]);
		                        var t_average_of_day = formatNumber (indexEntry[2]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_revenue_accumulate+" บาท</td>";
		                            htmlTable2+="<td class='td'>"+t_up_or_down_last_year+" %</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" บาท</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_revenue_by_revenue_accumulate_table").html(htmlTable2);
		                //$(".td").css({"heigth":"10px","text-align":"left"});
						}else{
							//alert("else");
							$("#Chart_exat_revenue_by_revenue_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_revenue_by_revenue_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td ><center>0 บาท</center></td><td ><center>0 %</center></td><td ><center>0 บาท</center></td></tr></tbody><thead><tr><th>รายได้สะสม</th><th>เพิ่ม/ลด จากปีที่แล้ว</th><th>ยอดเฉลี่ยรายได้ต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_year_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				};
				revenue_accumulate_table($("#exatparamYearList").val());
				//---------------------------------- Top Table ----------------------------------------
				

				//---------------------------------- LineChart 1------------------------------------
				
				$.ajax({
					url: "../Model/Revenue/revenue_by_highway_accumulate.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":$("#exatparamYearList").val()},
					success:function(data){
						if(data != ""){
							 //$("#Chart_exat_revenue_by_highway_accumulate").css({"margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","margin-top":"37px","text-align":"center"});
							option=[];
						    //option['themeCustom']=["#FF69B4","#FF6347","#FFD700","#32CD32","#00BFFF","#DAA520","#9932CC"];
							//option['themeCustom']=["#DC143C","#FF7F50","#FF1493","#FFD700","#FF8C00","#32CD32","#4169E1"];
							var c_highway_Chaloem = "";
							var c_highway_sirat = "";
							var c_highway_Chalong = "";
							var c_highway_Burapha = "";
							var c_highway_Kanchanaphisek  = "";
							var c_highway_sum  = "";
							var c_all ="";
							
		                    $.each(data,function(index,indexEntry){
		                        var highway_name = indexEntry[1];
		                        if(highway_name == "เฉลิมมหานคร"){c_highway_Chaloem = " #24C0F1,";}
		                        else if (highway_name == "ศรีรัช"){c_highway_sirat = " #F8A326,";}
		                        else if (highway_name == "ฉลองรัช"){c_highway_Chalong = " #F34541,";}
		                        else if (highway_name == "บูรพาวิถี"){c_highway_Burapha = " #49BF67,";}
		                        else if (highway_name == "กาญจนาภิเษก"){c_highway_Kanchanaphisek  = " #9564E2,";}	
		                        else if (highway_name == "รวมทุกสายทาง"){c_highway_sum  = " #A52A2A";}
		                    });
		                    c_all=c_highway_Chaloem+c_highway_sirat+c_highway_Chalong+c_highway_Burapha+c_highway_Kanchanaphisek+c_highway_sum;
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
						option['labelY']= 'หน่วย : ล้านบาท';
						option['angle']='-45';
		                     lineChart("Chart_exat_revenue_by_highway_accumulate",data,option);
						}else{
							$("#Chart_exat_revenue_by_highway_accumulate").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_revenue_by_highway_accumulate").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						
						//bind function click here start.
	                    var i=0;
	                    $('#Chart_exat_revenue_by_highway_accumulate').bind('jqplotDataClick',                
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                             if((i%2)!=0){
	                            	 option=[];
	                                 option['param']={"paramYear":$("#exatparamYearList").val()};
	                                 
	                           	 var cateparamYear = getCate("../Model/Revenue/revenue_by_highway_accumulate.jsp",pointIndex,option);
	                           	 
	                           	//$(".Year").html(cateparamYear).val();
	                           	//alert(cateparamYear);
	                           	
	                           	 $("#Chart_exat_revenue_by_highway_average").empty();
								 $("#Chart_exat_revenue_by_revenue_vs_sales").empty();
								 $("#Chart_exat_revenue_by_revenue_accumulate_table").empty();
								 
								 $('#Chart_exat_revenue_by_highway_average').unbind( 'jqplotDataClick');
								 
								 revenue_accumulate_table(cateparamYear);
	                           	revenue_by_highway_average(cateparamYear);
	                           	revenue_by_revenue_vs_sales(cateparamYear,'All');
	                           	
	                           	$('.YearSub').html(cateparamYear).val();
	                           	
	                             }
	                             i++;                                 
	                      	}
	                      );
	                   //bind function click here end.
						
						
						
						}
					});
				//---------------------------------- LineChart 1------------------------------------
				

				//---------------------------------- LineChart 2------------------------------------
				var revenue_by_highway_average = function(arparamYear){
				$.ajax({
					url: "../Model/Revenue/revenue_by_highway_average.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						if(data != ""){
							//$("#Chart_exat_revenue_by_highway_average").css({"width":"auto","height":"auto"});
							option=[];
							var c_highway_Chaloem = "";
							var c_highway_sirat = "";
							var c_highway_Chalong = "";
							var c_highway_Burapha = "";
							var c_highway_Kanchanaphisek  = "";
							var c_highway_sum  = "";
							var c_all ="";
							
		                    $.each(data,function(index,indexEntry){
		                        var highway_name = indexEntry[1];
		                        if(highway_name == "เฉลิมมหานคร"){c_highway_Chaloem = " #24C0F1,";}
		                        else if (highway_name == "ศรีรัช"){c_highway_sirat = " #F8A326,";}
		                        else if (highway_name == "ฉลองรัช"){c_highway_Chalong = " #F34541,";}
		                        else if (highway_name == "บูรพาวิถี"){c_highway_Burapha = " #49BF67,";}
		                        else if (highway_name == "กาญจนาภิเษก"){c_highway_Kanchanaphisek  = " #9564E2,";}	
		                        else if (highway_name == "รวมทุกสายทาง"){c_highway_sum  = " #A52A2A";}
		                    });
		                    c_all=c_highway_Chaloem+c_highway_sirat+c_highway_Chalong+c_highway_Burapha+c_highway_Kanchanaphisek+c_highway_sum;
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
						option['labelY']= 'หน่วย : บาท';
						option['angle']='-45';
		                     lineChart("Chart_exat_revenue_by_highway_average",data,option);
						}else{
							$("#Chart_exat_revenue_by_highway_average").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_revenue_by_highway_average").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						
						//bind function click here start.
	                    var i=0;
						console.log("Year : "+arparamYear);
					
	                    $('#Chart_exat_revenue_by_highway_average').bind('jqplotDataClick'    ,           
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                    	//alert(arparamYear+" ev : "+ev+" seriesIndex : "+seriesIndex+" pointIndex : "+pointIndex+" data : "+data);
	                    	
	                             if((i%2)!=0){
	                            	 var temp_arparamYear = $('.YearSub').text().substring(0, 4);
	                            	 //alert(arparamYear+" = "+temp_arparamYear);
	     	                    	 if(arparamYear == temp_arparamYear){	                    	
	     	                    		console.log("if "+arparamYear+" ev : "+ev+" seriesIndex : "+seriesIndex+" pointIndex : "+pointIndex+" data : "+data);
	     	                    		option=[];
		                                option['param']={"paramYear":arparamYear};
		                                var cateparamMonth = getCate("../Model/Revenue/revenue_by_highway_average.jsp",pointIndex,option);
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
	     	                    		
	     	                    		$("#Chart_exat_revenue_by_revenue_vs_sales").css({});
	     	                    		$("#Chart_exat_revenue_by_revenue_vs_sales").empty();
	     	                    		revenue_by_revenue_vs_sales(arparamYear,cateparamMonth);
	     	                    		$(".MonthSub").html(cateparamMonthName).val();
	     	                    		
	     	                    	 }	                            		                           	
	                             }
	                             i++;                                 
	                      	}
	                      );
//	                   //bind function click here end.
						
						}
					});
				};
				revenue_by_highway_average($("#exatparamYearList").val());
				//---------------------------------- LineChart 2------------------------------------
				

				//---------------------------------- LineChart 3------------------------------------
				var revenue_by_revenue_vs_sales = function(arparamYear,arparamMonth){
				$.ajax({
					url: "../Model/Revenue/revenue_by_revenue_vs_sales.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear,"paramMonth":arparamMonth},
					success:function(data){
						if(data != ""){
							//$("#Chart_exat_revenue_by_revenue_vs_sales").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-top":"37px","margin-right":"auto","text-align":"center"});
							$("#Chart_exat_revenue_by_revenue_vs_sales").css({"margin-top":"0px","padding-bottom":"0px"});
							option=[];
						    option['themeCustom']=["#1d2e5f","#FF4045","#BF3033","#FF7376"];
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
			           // option['maxY']=true;
						option['labelY']= 'หน่วย : บาท';
						option['angle']='-45';
		                     lineChart("Chart_exat_revenue_by_revenue_vs_sales",data,option);
						}else{
							$("#Chart_exat_revenue_by_revenue_vs_sales").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_revenue_by_revenue_vs_sales").text('ปีงบประมาณและเดือนที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
				};
				revenue_by_revenue_vs_sales($("#exatparamYearList").val(),'All');
				//---------------------------------- LineChart 3------------------------------------
				
				}
			});
	
	});
});
