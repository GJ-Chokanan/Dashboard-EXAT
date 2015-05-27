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
	
// -------------tabs-2.html-------------
	$("a[href='#tabs-2']").click(function(){

		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		$(".paramDate").hide();
		$(".paramNull2").show();
		//$('div#navbar-ex-collapse a[href="#tabs-2"]').tab("show");
		addClassAsOfTabs(1);  // tab2 ข้อมูลบัตร
		
		$.ajax({
			url : "exat-easypass-card.html",
			type:"get",
			async:false,
			datetype:"html",
			success:function(data){
				$("#tabs-2").html(data);
				//alert($("#exatparamYearList").val());
				//---------------------------------- Top Table ----------------------------------------
				var easypass_accumulate_table = function(arparamYear){
				$.ajax({
					
					url: "../Model/EasyPass/easypass_accumulate_table.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						//alert(data);
						if(data != "" && data != ",,"){
							//alert("true");
							
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr height='20px'>";
		                            htmlTable2+="<th >ยอดจำหน่ายบัตรสะสม</th>";
		                            htmlTable2+="<th >เพิ่ม/ลด จากปีที่แล้ว</th>";
		                            htmlTable2+="<th >จำหน่ายบัตรเฉลี่ยต่อวัน</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                        var t_easypass_accumulate = formatNumber (indexEntry[0]);
		                        var t_up_or_down_last_year = formatNumber (indexEntry[1]);
		                        var t_average_of_day = formatNumber (indexEntry[2]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_easypass_accumulate+" บัตร</td>";
		                            htmlTable2+="<td class='td'>"+t_up_or_down_last_year+" %</td>";
		                            htmlTable2+="<td class='td'>"+t_average_of_day+" บัตร</td>";
		                        htmlTable2+="</tr>";
		                    });
		                htmlTable2+="</tbody>";
		                htmlTable2+="</table>";
		                
		                $("#Chart_exat_easypass_by_easypass_accumulate_table").html(htmlTable2);
		                //$(".td").css({"heigth":"10px","text-align":"left"});
						}else{
							//alert("else");
							$("#Chart_exat_easypass_by_easypass_accumulate_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_easypass_by_easypass_accumulate_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"3\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th>ยอดจำหน่ายบัตรสะสม</th><th>เพิ่ม/ลด จากปีที่แล้ว</th><th>จำหน่ายบัตรเฉลี่ยต่อวัน</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_year_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
			};
			easypass_accumulate_table($("#exatparamYearList").val());
			
				//---------------------------------- Top Table ----------------------------------------
				
				//---------------------------------- Pie 1 -------------------------------------------
				var easypass_by_data_easypass = function(arparamYear){
				$.ajax({
					url: "../Model/EasyPass/easypass_by_data_easypass.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						
						if(data != ""){
							//alert("11"+data);
							$("#Chart_exat_easypass_by_data_easypass").css({"margin-top":"0px"});
							option=[];
							  option['themeCustom']=["#49BF67","#FFD700"]
							  option['showDataLabels']=true;
							  //option['dataLabelPositionFactor']='1.1';
							  option['tooltip']=true;
							  option['pointLabelsFont']='18px';
							  pieChart("Chart_exat_easypass_by_data_easypass",data,option);	
						}else{
							$("#Chart_exat_easypass_by_data_easypass").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"133px" });
							$("#Chart_exat_easypass_by_data_easypass").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
										
						}
					});
				};
				easypass_by_data_easypass($("#exatparamYearList").val());
				
				//---------------------------------- Pie 1 -------------------------------------------
				
				//---------------------------------- Table 1 ----------------------------------------
				var easypass_by_data_easypass_table = function(arparamYear){
				$.ajax({
					
					url: "../Model/EasyPass/easypass_by_data_easypass_table_1.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
					success:function(data){
						//alert(data);
						if(data != "" && data != ",,"){
							//alert("true");
							

							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";


		                        htmlTable2+="<tr>";
		                            htmlTable2+="<th >บัตรพร้อมใช้งาน</th>";
		                            htmlTable2+="<th >บัตรนำมาใช้งาน</th>";
		                            htmlTable2+="<th >บัตรไม่นำมาใช้งาน</th>";
		                        htmlTable2+="</tr>";


		                        var temp_t_of_varlue_1;
		                        var temp_t_of_varlue_2;
		                    $.each(data,function(index,indexEntry){
		                    	
		                        var t_of_varlue = formatNumber (indexEntry[1]);
		                        if(index == 0){temp_t_of_varlue_1 = t_of_varlue;
		                        }else if(index == 1){temp_t_of_varlue_2 = t_of_varlue;}
		                    });
		                    //alert(temp_t_of_varlue_1+" : "+temp_t_of_varlue_2);
		                    
		                    
		                    
		                    
		                  //------------------------- sub table 2-----------------------
                            $.ajax({
            					
            					url: "../Model/EasyPass/easypass_by_data_easypass_table_2.jsp",
            					type: "get",
            					dataType: "json",
            					data:{"paramYear":arparamYear},
            					success:function(data){
        							htmlTable2+="<tr>";
        							htmlTable2+="<td class='td'>"+temp_t_of_varlue_1+"</td>";
        							
        		                    $.each(data,function(index,indexEntry){
        		                    	var t_of_varlue_2 = formatNumber (indexEntry[1]);            		                    	           
        		                    	htmlTable2+="<td class='td'>"+t_of_varlue_2+"</td>";
        		                    });
        		                    htmlTable2+="</tr>";
        		            	    
        		            	    
    	    		                //htmlTable2+="</table>";
    	    		                //alert("sub 2 "+htmlTable2);
    	    		                //$("#Chart_exat_easypass_by_data_easypass_table").html(htmlTable2);
    	    		                
    	    		                
    	    		              //------------------------- sub table 3-----------------------
    	                            $.ajax({
    	            					
    	            					url: "../Model/EasyPass/easypass_by_data_easypass_table_3.jsp",
    	            					type: "get",
    	            					dataType: "json",
    	            					data:{"paramYear":arparamYear},
    	            					success:function(data){
    	            						htmlTable2+="<tr>";
    			                            htmlTable2+="<th >บัตรไม่พร้อมใช้</th>";
    			                            htmlTable2+="<th >บัตรมีเงินคงเหลือ</th>";
    			                            htmlTable2+="<th >บัตรเงินติดลบ</th>";
    			                            htmlTable2+="</tr>";
    			                            
    			                            htmlTable2+="<tr>";
    	        							htmlTable2+="<td class='td'>"+temp_t_of_varlue_2+"</td>";

    	        							$.each(data,function(index,indexEntry){
    	        		                    	var t_of_varlue_3 = formatNumber (indexEntry[1]);            		                    	           
    	        		                    	htmlTable2+="<td class='td'>"+t_of_varlue_3+"</td>";
    	        		                    });
    	        		                    htmlTable2+="</tr>";
    	        		                    
    	        		                    htmlTable2+="</table>";
    	        	    		            //alert("sub 3 "+htmlTable2);
    	        	    		            $("#Chart_exat_easypass_by_data_easypass_table").html(htmlTable2);
    	            						}
    	            					});
    	                            
    	                          //------------------------- sub table 3-----------------------   	    		                
            						}
            					
            					});
                          //------------------------- sub table 2-----------------------
		                    
		                
						}else{
							//alert("else");
							$("#Chart_exat_easypass_by_data_easypass_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_easypass_by_data_easypass_table").html("<table class=\"table table-bordered\"><tbody><tr><th>บัตรพร้อมใช้งาน</th><th>บัตรนำมาใช้งาน</th><th>บัตรไม่นำมาใช้งาน</th></tr><tr><td colspan=\"3\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr><tr><th>บัตรไม่พร้อมใช้</th><th>บัตรมีเงินคงเหลือ</th><th>บัตรเงินติดลบ</th></tr><tr><td colspan=\"3\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody></table>");
							//$("#Chart_exat_traffic_year_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
				};
				easypass_by_data_easypass_table($("#exatparamYearList").val());
				
				//---------------------------------- Table 1----------------------------------------

				//---------------------------------- Pie 2 -------------------------------------------
				var easypass_by_member_type = function(arparamYear){
				$.ajax({
					url: "../Model/EasyPass/easypass_by_member_type.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear },
					success:function(data){
						
						if(data != ""){
							//alert("11"+data);
							//$("#Chart_exat_traffic_month_by_using_rate_easypass").css({"font-family":"TH SarabunIT๙","margin-top":"0px","font-weight":"normal","width":"auto","height":"350px","margin-left":"auto","margin-right":"auto","text-align":"left"});
							option=[];
							  option['themeCustom']=["#24C0F1","#9564E2"];
							  option['showDataLabels']=true;
							  //option['dataLabelPositionFactor']='1.1';
							  option['tooltip']=true;
							  option['pointLabelsFont']='18px';
							  pieChart("Chart_exat_easypass_by_member_type",data,option);	
						}else{
							$("#Chart_exat_easypass_by_member_type").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_easypass_by_member_type").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
										
						}
					});
				};
				easypass_by_member_type($("#exatparamYearList").val());
			
				//---------------------------------- Pie 2 -------------------------------------------
				
				
				//---------------------------------- Table 2 ----------------------------------------
					var easypass_by_member_type_table = function(arparamYear){
					$.ajax({
					
					url: "../Model/EasyPass/easypass_by_member_type_table_header.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear },
					success:function(data){
						//alert(data);
						if(data != "" && data != ",,"){
							//alert("true 1");
							var htmlTable2 = "";
							htmlTable2+="<table class='table table-bordered'>";
		                    htmlTable2+="<thead>";
		                        htmlTable2+="<tr >";
		                            htmlTable2+="<th >บัตรที่ถือครอง</th>";
		                            htmlTable2+="<th >นิติบุคคล</th>";
		                            htmlTable2+="<th >บุคคลธรรมดา</th>";
		                        htmlTable2+="</tr>";
		                    htmlTable2+="</thead>";
		                    htmlTable2+="<tbody>";
		                    $.each(data,function(index,indexEntry){
		                    	if(index == 1){
		                    		$("#Chart_exat_easypass_by_member_type_table").css({"margin-bottom":"48px" });
		                    		$("#Chart_exat_easypass_by_data_easypass_table").css({"margin-bottom":"45px" });}
		                    	else if(index == 2){
		                    		$("#Chart_exat_easypass_by_member_type_table").css({"margin-bottom":"0px" });
		                    		$("#Chart_exat_easypass_by_data_easypass_table").css({"margin-bottom":"54px" });}
		                        var t_easypass = formatNumber (indexEntry[0]);
		                        //alert(indexEntry[1]);
		                        var t_juristic_person = formatNumber (indexEntry[1]);
		                        var t_ordinary_person = formatNumber (indexEntry[2]);
		                    		                    
		                        htmlTable2+="<tr>";
		                            htmlTable2+="<td class='td'>"+t_easypass+"</td>";
		                            htmlTable2+="<td class='td'>"+t_juristic_person+" %"+"</td>";
		                            htmlTable2+="<td class='td'>"+t_ordinary_person+" %"+"</td>";
		                        htmlTable2+="</tr>";
		                    });
		                    //------------------sub table--------------
		                    $.ajax({
		    					
		    					url: "../Model/EasyPass/easypass_by_member_type_table_footer.jsp",
		    					type: "get",
		    					dataType: "json",
		    					data:{"paramYear":arparamYear },
		    					success:function(data){
		    						//alert(data);
		    						if(data != "" && data != ","){
		    							//alert("true");
		    							//alert(data);
		    		                    $.each(data,function(index,indexEntry){
		    		                        var t_easypass_sub = "ยอดบัตรที่ถือครองสูงสุด (บัตร)";
		    		                        var t_juristic_person_sub = formatNumber (indexEntry[0]);
		    		                        var t_ordinary_person_sub = formatNumber (indexEntry[1]);
		    		                    		                    
		    		                        htmlTable2+="<tr>";
		    		                            htmlTable2+="<td class='td'>"+t_easypass_sub+"</td>";
		    		                            htmlTable2+="<td class='td'>"+t_juristic_person_sub+"</td>";
		    		                            htmlTable2+="<td class='td'>"+t_ordinary_person_sub+"</td>";
		    		                        htmlTable2+="</tr>";
		    		                    });
		    		                    //alert(htmlTable2);
		    		                
		    		                    htmlTable2+="</tbody>";
		    			                htmlTable2+="</table>";
		    			                
		    			                $("#Chart_exat_easypass_by_member_type_table").html(htmlTable2);
		    							 
		    						}else{
		    							//alert("flessss");
		    							//alert(data);
		    							var t_easypass_sub = "ยอดบัตรที่ถือครองสูงสุด(บัตร)";
	    		                    		                    
	    		                        htmlTable2+="<tr>";
	    		                            htmlTable2+="<td class='td'>"+t_easypass_sub+"</td>";
	    		                            htmlTable2+="<td class='td' colspan='2'></td>";
	    		                           
	    		                        htmlTable2+="</tr>";
	    		                        htmlTable2+="</tbody>";
		    			                htmlTable2+="</table>";
		    			                
		    			                $("#Chart_exat_easypass_by_member_type_table").html(htmlTable2);
		    							
		    						}
		    						 
		    						}
		    					});
		                    //------------------sub table--------------
		                    //alert(htmlTable2);
		                
							 
						}else{
							//alert("else 1");
							$("#Chart_exat_easypass_by_member_type_table").css({"font-family":"TH SarabunIT๙","text-align":"center","font-weight":"bold","width":"auto","height":"auto"});
							$("#Chart_exat_easypass_by_member_type_table").html("<table class=\"table table-bordered\"><tbody><tr><td colspan=\"3\"><center>ปีงบประมาณที่เลือก \"ยังไม่มีข้อมูล\"</center></td></tr></tbody><thead><tr><th>บัตรที่ถือครอง</th><th>นิติบุคคล</th><th>บุคคลธรรมดา</th> </tr></thead></table>");
							//$("#Chart_exat_traffic_month_by_traffic_accumulate_table").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						 
						}
					});
					};
					easypass_by_member_type_table($("#exatparamYearList").val());
				//---------------------------------- Table 2----------------------------------------
				
				//---------------------------------- LineChart 3------------------------------------
					
				$.ajax({
					url: "../Model/EasyPass/easypass_by_sales_easypass_accumulate_year.jsp",
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
						option['labelY']= 'หน่วย : บัตร';
						option['angle']='-45';
			                     lineChart("Chart_exat_easypass_by_sales_easypass_accumulate_year",data,option);
						}else{
							$("#Chart_exat_easypass_by_sales_easypass_accumulate_year").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_easypass_by_sales_easypass_accumulate_year").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						//bind function click here start.
	                    var i=0;
	                    $('#Chart_exat_easypass_by_sales_easypass_accumulate_year').bind('jqplotDataClick',                
	                    		 function (ev, seriesIndex, pointIndex, data) {    
	                             if((i%2)!=0){
	                            	 option=[];
	                                 option['param']={"paramYear":$("#exatparamYearList").val()};
	                                 
	                           	 var cateparamYear = getCate("../Model/EasyPass/easypass_by_sales_easypass_accumulate_year.jsp",pointIndex,option);
	                           	 
	                           	//$(".Year").html(cateparamYear).val();
	                           	//alert(cateparamYear);
	                           	
	                           	 $("#Chart_exat_easypass_by_sales_easypass_accumulate_month").empty();
	                           	$("#Chart_exat_easypass_by_member_type_table").empty();
	                           	$("#Chart_exat_easypass_by_member_type").empty();
	                           	$("#Chart_exat_easypass_by_data_easypass_table").empty();
	                           	$("#Chart_exat_easypass_by_data_easypass").empty();
	                           	$("#Chart_exat_easypass_by_easypass_accumulate_table").empty();
	                             
	                             easypass_by_sales_easypass_accumulate_month(cateparamYear);
	                             easypass_by_member_type_table(cateparamYear);
	                             easypass_by_member_type(cateparamYear);
	                             easypass_by_data_easypass_table(cateparamYear);
	                             easypass_by_data_easypass(cateparamYear);
	                             easypass_accumulate_table(cateparamYear);
                          	
	                           	 $('.YearSub').html(cateparamYear).val();
	                           	 
	                             }
	                             i++;                                 
	                      	}
	                      );
	                   //bind function click here end.
						
						
						}
					});
					
				//---------------------------------- LineChart 3------------------------------------
				
				//---------------------------------- LineChart 4------------------------------------
					var easypass_by_sales_easypass_accumulate_month = function(arparamYear){

				$.ajax({
					url: "../Model/EasyPass/easypass_by_sales_easypass_accumulate_month.jsp",
					type: "get",
					dataType: "json",
					data:{"paramYear":arparamYear},
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
						option['labelY']= 'หน่วย : บัตร';
						option['angle']='-45';
			                     lineChart("Chart_exat_easypass_by_sales_easypass_accumulate_month",data,option);
						}else{
							$("#Chart_exat_easypass_by_sales_easypass_accumulate_month").css({"font-family":"TH SarabunIT๙","font-size":"20px","text-align":"center","font-weight":"bold","width":"auto","height":"auto","margin-top":"140px","padding-bottom":"160px" });
							$("#Chart_exat_easypass_by_sales_easypass_accumulate_month").text('ปีงบประมาณที่เลือก "ยังไม่มีข้อมูล"');
						}
						
						}
					});
					};
					easypass_by_sales_easypass_accumulate_month($("#exatparamYearList").val());
				//---------------------------------- LineChart 4------------------------------------
				
			}
				
		
		
		
			});
	
	});
});