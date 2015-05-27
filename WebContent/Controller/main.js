function formatNumber (num) {
	if(num == null){num = 0;return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");}
	else{return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");}
	
    //return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
$(document).ready(function() {
	//$("#btnSubmit").button();
	//$("#navbar-ex-collapse").tabs();
	$('.subnav').affix({offset: {top: $('.navtop').height()}})

		$(".paramYear .input-group").show();
		$(".paramMonth .input-group").hide();
		$(".paramDate .input-group").hide();

		$(".paramYear").show();
		$(".paramMonth").show();
		$(".paramNull").hide();
		
		$(".paramDate").hide();
		$(".paramNull2").show();
		
		
		//Get User Pentaho
		function cerateParamUser(){
			$.ajax({
				url:"../Model/Parameter/paramUser.jsp",
				type:"get",
				dataType:"json",
				async:false,
				success:function(data){
					var htmlParamUser= data;
					
					//htmlParamYear = indexEntry[0];
					
					$("#UserID").html(htmlParamUser); //id for Index.html
										
				}
			});
		}
		cerateParamUser();		
		//Get User Pentaho
		
		
		
	// paramYear
	function cerateParamYear(){
		$.ajax({
			url:"../Model/Parameter/paramYear.jsp",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				var htmlParamYear="";
				//htmlParamYear
				htmlParamYear+="<select class=\"selectpicker form-control\" data-live-search=\"true\" id=\"paramYear\" style=\"font-family:TH SarabunIT๙;font-size: 24px;padding:0px 12px;\" >";
					//loop [json]data into <option>
				$.each(data,function(index,indexEntry){
//					alert(index+":"+indexEntry[0]);
					if(index==0){
						htmlParamYear+="<option selected=\"selected\">";
						htmlParamYear+=indexEntry[0];
						htmlParamYear+="</option>";
					}else{
						htmlParamYear+="<option>";
						htmlParamYear+=indexEntry;
						htmlParamYear+="</option>";	
					}					
				});
				htmlParamYear+="</select>";
				$("#paramYearList").html(htmlParamYear); //id for Index.html
				//$("#paramYear").kendoDropDownList(); // value 
				//cerateParamMonth($("#paramYear").val());
				
			}
		});
	}
	cerateParamYear();
	//paramYear
	

	
	// paramMonth
	function cerateParamMonth(paramYear){
		$.ajax({
			url:"../Model/Parameter/paramMonth.jsp",
			type:"get",
			dataType:"json",
			data:{"paramYear":$("#paramYear").val()},
			async:false,
			success:function(data){
				var htmlParamMonth="";
				//htmlParamYear
				htmlParamMonth+="<select class=\"selectpicker form-control\" data-live-search=\"true\" id=\"paramMonth\" style=\"font-family:TH SarabunIT๙;font-size: 22px;padding:0px 12px;\" >";
					//loop [json]data into <option>
				$.each(data,function(index,indexEntry){
//					alert(index+":"+indexEntry[0]);
					if(index==0){
						htmlParamMonth+="<option selected=\"selected\" value=\" "+indexEntry[0]+" \" >";
						htmlParamMonth+=indexEntry[1];
						htmlParamMonth+="</option>";
					}else{
						htmlParamMonth+="<option value=\" "+indexEntry[0]+" \">";
						htmlParamMonth+=indexEntry[1];
						htmlParamMonth+="</option>";	
					}					
				});
				htmlParamMonth+="</select>";
				$("#paramMonthList").html(htmlParamMonth); //id for Index.html
				
			}
		});
	}
	cerateParamMonth(paramYear);
	//paramMonth
	
	
	// Yesterday
	function Yesterday(){
		 var txtMonthName_Yesterday = ["มกราคม", "กุมภาพันธ์","มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม" ,"กันยายน","ตุลาคม", "พฤศจิกายน", "ธันวาคม" ];
	     parts = moment().subtract(1, 'days').format('DD/MM/YYYY').split('/');
	     var txtYesterday =  "ข้อมูล ณ. วันที่ "+parseInt(parts[0])+" "+txtMonthName_Yesterday[parseInt(parts[1])-1]+" "+(parseInt(parts[2])+543);
	     $("body").append("<input type=\"hidden\" id=\"exatparamYesterday\" 	name=\"exatparamYesterday\" 	 value='"+txtYesterday+"' >");
	     
	}
	// Yesterday
	Yesterday();

	
	
	
	//change paramYear
	$("#paramYear").change(function(){
		cerateParamMonth($(this).val());
				
		});
	//change paramYear
	
	
	var cb = function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
        //alert(start.format('MM/DD/YYYY'));alert(end.format('MM/DD/YYYY'));alert(label);
        $('#paramDate span').html(start.format('DD/MM/YYYY').substring(0, 6) + (parseInt(start.format('DD/MM/YYYY').substring(6, 10))+543)+ ' - ' + end.format('DD/MM/YYYY').substring(0, 6) + (parseInt(end.format('DD/MM/YYYY').substring(6, 10))+543));
        
        //alert("Callback has fired: [" + start.format('MM/DD/YYYY') + " to " + end.format('MM/DD/YYYY') + ", label = " + label + "]");
      };

      var optionSet1 = {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        minDate: '01/10/2009',
        maxDate: moment().endOf('month'),
        dateLimit: { days: 30 },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        //opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-sm btn-primary',
        cancelClass: 'btn-sm',
        format: 'DD/MM/YYYY',
        separator: ' to ',
        locale: {
            applyLabel: 'ยืนยัน',
            cancelLabel: 'ยกเลิก',
            fromLabel: 'จากวันที่',
            toLabel: 'ถึงวันที่',
            weekLabel: 'สด',
            customRangeLabel: 'Custom',
            daysOfWeek: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ','ส'],
            monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
            firstDay: 1
        }
      };

      $('#paramDate span').html(
    		  moment().startOf('month').format('DD/MM/YYYY').substring(0, 6)+(parseInt(moment().startOf('month').format('DD/MM/YYYY').substring(6, 10))+543)
    		  + ' - ' 
    		  + moment().endOf('month').format('DD/MM/YYYY').substring(0, 6)+(parseInt(moment().endOf('month').format('DD/MM/YYYY').substring(6, 10))+543)
    		  );
            
      $('#paramDate').daterangepicker(optionSet1, cb);

      $('#paramDate').on('show.daterangepicker', function() { console.log("show event fired"); });
      $('#paramDate').on('hide.daterangepicker', function() { console.log("hide event fired"); });
      $('#paramDate').on('apply.daterangepicker', function(ev, picker) { 
        console.log("apply event fired, start/end dates are " 
          + picker.startDate.format('MM/DD/YYYY') 
          + " to " 
          + picker.endDate.format('MM/DD/YYYY')
        ); 
      });
      $('#paramDate').on('cancel.daterangepicker', function(ev, picker) { console.log("cancel event fired"); });
	
	//param Date
	
	
	
	
	

	$("form#formAction").submit(function(){	
		
		
		$(".exatParam").remove();
		var months = [ "รวมทุกเดือน","ตุลาคม", "พฤศจิกายน", "ธันวาคม", "มกราคม", "กุมภาพันธ์",
		               "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม" ,"กันยายน" ];
		var fascal_months_no = [ 4,5, 6, 7, 8, 9, 10 ,11, 12 ,1 ,2 ,3 ];
		var txtmonthname="";
		var txtmonthno="";
		
				
		txtmonthno=$("#paramMonth").val();
		//alert(txtmonthno);
		if (txtmonthno >= 1 && txtmonthno <= 12) {txtmonthname= months[parseInt(txtmonthno)];} 
		else{txtmonthname= months[parseInt(0)];}
		
		
		var start_date_full = "";
		var start_fiscal_date ="";
		var start_fiscal_month ="";
		var start_fiscal_month_name ="";
		var start_fiscal_year ="";
		var end_date_full = "";
		var end_fiscal_date ="";
		var end_fiscal_month ="";
		var end_fiscal_month_name ="";
		var end_fiscal_year ="";
		
		start_date_full = $('#paramDate span').text().substring(0, 10);
		
		//alert(parseInt(start_date_full.substring(0, 2))+" "+months[fascal_months_no[parseInt(start_date_full.substring(3, 5))-1]]+" "+parseInt(start_date_full.substring(6, 10)));
		start_fiscal_date = parseInt(start_date_full.substring(0, 2));
		start_fiscal_month = fascal_months_no[parseInt(start_date_full.substring(3, 5))-1];
		start_fiscal_month_name = months[parseInt(start_fiscal_month)];
		if(start_fiscal_month >= 1 && start_fiscal_month <= 3){
			start_fiscal_year = parseInt(start_date_full.substring(6, 10))+1;
		}else{
			start_fiscal_year = parseInt(start_date_full.substring(6, 10));
		}
		
		end_date_full = $('#paramDate span').text().substring(13, 23);
		//alert(parseInt(end_date_full.substring(0, 2))+" "+months[fascal_months_no[parseInt(end_date_full.substring(3, 5))-1]]+" "+parseInt(end_date_full.substring(6, 10)));
		end_fiscal_date = parseInt(end_date_full.substring(0, 2));
		end_fiscal_month = fascal_months_no[parseInt(end_date_full.substring(3, 5))-1];
		end_fiscal_month_name = months[parseInt(end_fiscal_month)];
		if(end_fiscal_month >= 1 && end_fiscal_month <= 3){
			end_fiscal_year = parseInt(end_date_full.substring(6, 10))+1;
		}else{
			end_fiscal_year = parseInt(end_date_full.substring(6, 10));
		}
		
		//alert(start_fiscal_date+"/"+start_fiscal_month+"/"+start_fiscal_year);
		
		var parts = "";
		parts = start_date_full.split('/');
		var StartDate = parts[2]+"-"+parts[1]+"-"+parts[0];
		var txtStartDate = parseInt(start_date_full.substring(0, 2))+" "+months[fascal_months_no[parseInt(start_date_full.substring(3, 5))-1]]+" "+parseInt(start_date_full.substring(6, 10));
		parts = end_date_full.split('/');
		var EndDate = parts[2]+"-"+parts[1]+"-"+parts[0];
		var txtEndDate = parseInt(end_date_full.substring(0, 2))+" "+months[fascal_months_no[parseInt(end_date_full.substring(3, 5))-1]]+" "+parseInt(end_date_full.substring(6, 10));
		
		console.log(StartDate+"-"+EndDate);
		console.log("จากวันที่ : "+txtStartDate);
		console.log("ถึงวันที่ : "+txtEndDate);

	    
		
		$("body").append("<input type=\"hidden\" id=\"exatparamYearList\" 	name=\"exatparamYearList\" 		class=\"exatParam\" value="+$("#paramYear").val()+">");
		$("body").append("<input type=\"hidden\" id=\"exatparamMonthList\" 	name=\"exatparamMonthList\" 	class=\"exatParam\" value="+$("#paramMonth").val()+">");
		$("body").append("<input type=\"hidden\" id=\"exatparamMonthNameList\" 	name=\"exatparamMonthNameList\" 	class=\"exatParam\" value="+txtmonthname+">");
		
		$("body").append("<input type=\"hidden\" id=\"exatparamStartDate\" 	name=\"exatparamStartDate\" 	class=\"exatParam\" value="+StartDate+">");
		
		$("body").append("<input type=\"hidden\" id=\"exatparamEndDate\" 	name=\"exatparamEndDate\" 	class=\"exatParam\" value="+EndDate+">");
		
		$("body").append("<input type=\"hidden\" id=\"exatparamStartCalendar\" 	name=\"exatparamStartCalendarDate\" 	class=\"exatParam\" value='"+txtStartDate+"'>");
		$("body").append("<input type=\"hidden\" id=\"exatparamEndCalendar\" 	name=\"exatparamEndCalendarDate\" 	class=\"exatParam\" value='"+txtEndDate+"'>");
		
		
		
		//#navbar-ex-collapse
		$("div#navbar-ex-collapse ul").each(function(){
			
//			alert( "div#navbar-ex-collapse ul 1"+
//			" 0 :"+$("li",this).eq(0).hasClass("active")+
//			" 1 :"+$("li",this).eq(1).hasClass("active")+	
//			" 2 :"+$("li",this).eq(2).hasClass("active")+
//			" 3 :"+$("li",this).eq(3).hasClass("active")+
//			" 4 :"+$("li",this).eq(4).hasClass("active")+
//			" 5 :"+$("li",this).eq(5).hasClass("active")+
//			" 6 :"+$("li",this).eq(6).hasClass("active")+
//			" 7 :"+$("li",this).eq(7).hasClass("active")+	
//			" 8 :"+$("li",this).eq(8).hasClass("active")+
//			" 9 :"+$("li",this).eq(9).hasClass("active")+
//			" 10 :"+$("li",this).eq(10).hasClass("active")+
//			" 11 :"+$("li",this).eq(11).hasClass("active")+
//			" 12 :"+$("li",this).eq(12).hasClass("active")+
//			" 13 :"+$("li",this).eq(13).hasClass("active")+
//			" 14 :"+$("li",this).eq(14).hasClass("active")+
//			" 15 :"+$("li",this).eq(15).hasClass("active")+
//			" 16 :"+$("li",this).eq(16).hasClass("active")+
//			" 17 :"+$("li",this).eq(17).hasClass("active")+	
//			" 18 :"+$("li",this).eq(18).hasClass("active")+
//			" 19 :"+$("li",this).eq(19).hasClass("active")+
//			" 20 :"+$("li",this).eq(20).hasClass("active")+
//			" 21 :"+$("li",this).eq(21).hasClass("active")
//			);
			$("div#navbar-ex-collapse ul").each(function(){});
			
			
			if($("li",this).eq(0).hasClass("active")){
				$("[href='#tabs-1']").trigger("click");
			}else if($("li",this).eq(1).hasClass("active")){
				$("[href='#tabs-2']").trigger("click");
			}else if($("li",this).eq(8).hasClass("active")){
				$("[href='#tabs-3']").trigger("click");
			}else if($("li",this).eq(9).hasClass("active")){
				$("[href='#tabs-4']").trigger("click");
			}else if($("li",this).eq(10).hasClass("active")){
				$("[href='#tabs-5']").trigger("click");
			}else{
				false;
			}return false;
			
		});
		
		$("div#navbar-ex-collapse ul li ul").each(function(){
//			alert( "div#navbar-ex-collapse ul 2 "+
//					" 0 :"+$("li",this).eq(0).hasClass("active")+
//					" 1 :"+$("li",this).eq(1).hasClass("active")+	
//					" 2 :"+$("li",this).eq(2).hasClass("active")+
//					" 3 :"+$("li",this).eq(3).hasClass("active")+
//					" 4 :"+$("li",this).eq(4).hasClass("active")+
//					" 5 :"+$("li",this).eq(5).hasClass("active")+
//					" 6 :"+$("li",this).eq(6).hasClass("active")+
//					" 7 :"+$("li",this).eq(7).hasClass("active")+	
//					" 8 :"+$("li",this).eq(8).hasClass("active")+
//					" 9 :"+$("li",this).eq(9).hasClass("active")+
//					" 10 :"+$("li",this).eq(10).hasClass("active")+
//					" 11 :"+$("li",this).eq(11).hasClass("active")
//					);
			if($("li",this).eq(0).hasClass("active")){
				$("[href='#tabs-6-1']").trigger("click");
			}else if($("li",this).eq(2).hasClass("active")){
				$("[href='#tabs-6-2']").trigger("click");
			}else if($("li",this).eq(4).hasClass("active")){
				$("[href='#tabs-6-3']").trigger("click");
			}else{
				false;
			}return false;
		});
		
	return false;
	});
	
	setTimeout(function(){
		//alert("แม่งคลิกอีกละ");
		 $("#btnSubmit").trigger("click");
	},500);

	setTimeout(function(){
		//alert("แม่งคลิก tabs-1 อีกละ");
		$("a[href='#tabs-1']").trigger("click");
	},800);
	

	
});



