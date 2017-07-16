$('button').click(function(e){
	e.preventDefault();
});

// Isotope

	var curPriceLow = 0;
	var curPriceHigh = 0;
	
	var curWeightLow = 0;
	var curWeightHigh = 0;
	
	var curHeightLow = 0;
	var curHeightHigh = 0;
	
	var curWidthLow = 0;
	var curWidthHigh = 0;
	
	var curDepthLow = 0;
	var curDepthHigh = 0;
	
	var roller_bag_names = ['travelpromaxlite4','travelprocrew10','samsonitelift','briggsrileybaselineupright','tumialpha4wheel','victorinoxwerks'];
	var trifold_bag_names = ['mercuryexecutive','ustravelertrifold','tumialpha2','asakstrifold','briggsrileybaselinetrifold'];
	var duffel_bag_names = ['codealphahybrid','ustravelerkoskin','weekendbagcompany','hookandalbert','ustraveler21','hentywingman'];
	
	var roller_bag_material = ['.polyester','.nylon','.nylon','.nylon','.nylon','.nylon'];
	var roller_bag_wheels = ['.two','.two','.two','.two','.four','.two'];
	
	var trifold_bag_material = ['.polyester','.nylon','.nylon','.nylon','.nylon'];
	var trifold_bag_wheels = ['.zero','.zero','.zero','.zero','.zero'];
	
	var duffel_bag_material =['.polyester','.leather','.canvas','.canvas','.polyester','.tarpaulin'];
	var duffel_bag_wheels=['.zero','.zero','.zero','.zero','.zero','.zero'];
	
	//Travelpro Maxlite 4,Travelpro Crew 10,Samsonite Lift,Briggs & Riley Baseline Upright,Tumi Alpha 4 Wheel,Victorinox Werks,
	//Mercury Executive,U.S. Traveler Tri-Fold,Tumi Alpha 2,A. Saks Tri-Fold,Briggs & Riley Baseline Tri-Fold,
	//Code Alpha Hybrid,U.S. Traveler Koskin,Weekend Bag Company,Hook and Albert,U.S. Traveler 21,Henty Wingman
	
	var msrplow = [166,246,380,499,695,359,43,37,495,95,349,64,35,119,395,38,199];

	var weightList = [8.1,10,8.5,9,11.75,8.9,5,4,3.75,5,6.6,4.4,4,3,5.6,5.8,4];
	
	var heightList = [21.5,22,21,21.9,22,21,22.2,22,23,22,22,24,21.5,24,22,22,22];
	
	var widthList = [15,15.5,17,13.9,14.5,16,15,13.5,16.5,14,14,15,13,14,13,11,8.7];
	
	var depthList = [9,9,9,9.25,9.1,10,6.75,3,6.5,8.5,8.5,5,9.8,12,10,9,9.8];
	
	var trifoldStart = 6;
	var duffelStart = 11;
	var bag = '';
	
	var alreadyFilteredBags = [];
		
		

$(window).load( function() {
    // init Isotope
    var $grid = $('.grid').isotope({
        isInitLayout: false,
        itemSelector: '.bag'
    });

    // store filter for each group
    var filters = {};
    var $this;
    var buttonGroup;
    var filterGroup;
    var filterValue;
	
	

    $('.filters').on('click', '.button', function () {
        $this = $(this);
        // get group key
        buttonGroup = $this.parents('.button-group');
        filterGroup = buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[filterGroup] = $this.attr('data-filter');
        // combine filters
        //filters['price'] = '';
        filterValue = concatValues(filters);
        // set filter for Isotope
		
        var myString1 = $("#price-low").html();
        myString1 = myString1.replace(/\D/g, '');
        var myString2 = $("#price-high").html();
        myString2 = myString2.replace(/\D/g, '');
		
		curPriceLow = myString1;
		curPriceHigh = myString2;
		
		var weightlow = $("#weight-low").html();
        weightlow = weightlow.replace("lbs",'').replace("''","");
        var weighthigh = $("#weight-high").html();
        weighthigh = weighthigh.replace("lbs",'').replace("''","");
	
		curWeightLow = weightlow;
		curWeightHigh = weighthigh;
	
	
		var heightlow = $("#height-low").html();
        heightlow = heightlow.replace("lbs",'').replace("''","");
        var heighthigh = $("#height-high").html();
        heighthigh = heighthigh.replace("lbs",'').replace("''","");
	
		curHeightLow = heightlow;
		curHeightHigh = heighthigh;
		
		var widthlow = $("#width-low").html();
        widthlow = widthlow.replace("lbs",'').replace("''","");
        var widthhigh = $("#width-high").html();
        widthhigh = widthhigh.replace("lbs",'').replace("''","");
	
		curWidthLow = widthlow;
		curWidthHigh = widthhigh;
		
		var depthlow = $("#depth-low").html();
        depthlow = depthlow.replace("lbs",'').replace("''","");;
        var depthhigh = $("#depth-high").html();
        depthhigh = depthhigh.replace("lbs",'').replace("''","");;
	
		curDepthLow = depthlow;
		curDepthHigh = depthhigh;
		
        checkPriceAndFilter(myString1, myString2, 0);
        //$grid.isotope({ filter: filterValue });

    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    // Slider
    var lang = GetLanguageCode();
    if (lang == "en"){
        $.fn.digits = function(){ 
            return this.each(function(){ 
                $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
            })
        }

		
		//price
        $(".pricetemp-slider").slider({
            range: true,
            step: 10,
            min: 35,
            max: 695,
            values: [35, 695],
            slide: function (event, ui) {
              $("#price-amount").val("<sup>$</sup>"+ui.values[ 0 ]+" - <sup>$</sup>"+ui.values[ 1 ]).digits();
              $('#price-low').html("<sup>$</sup>" + ui.values[0]).digits();
              $('#price-high').html("<sup>$</sup>" + ui.values[1]).digits();
			  curPriceLow= ui.values[0];
			  curPriceHigh = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#price-low').html("<sup>$</sup>" + 35).digits();
        $('#price-high').html("<sup>$</sup>" + 695).digits();
        $( "#price-amount" ).val( "<sup>$</sup>" + 35 + " - <sup>$</sup>" + 695 ).digits();
		
		//weight
		 $(".weight-slider").slider({
            range: true,
            step: 0.1,
            min: 3.0,
            max: 11.80,
            values: [3,11.80],
			pips: { // Show a scale with the slider
				mode: 'steps',
				density: 1
			},
            slide: function (event, ui) {
              $("#weight-amount").val(ui.values[ 0 ]+"<sup>lbs</sup>"+ui.values[ 1 ]+"<sup>lbs</sup>").digits();
              $('#weight-low').html(ui.values[0]+"<sup>lbs</sup>").digits();
              $('#weight-high').html(ui.values[1].toFixed(2)+"<sup>lbs</sup>").digits();
			  curWeightLow = ui.values[0];
			  curWeightHigh  = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#weight-low').html(3.0+"<sup>lbs</sup>" ).digits();
        $('#weight-high').html(11.80+"<sup>lbs</sup>").digits();
        $( "#weight-amount" ).val( 3.0 +"<sup>lbs</sup> -" + 11.80 +"<sup>lbs</sup>" ).digits();
		
		//height
		 $(".height-slider").slider({
            range: true,
            step: 0.1,
            min: 21,
            max: 24.01,
            values: [21,24],
			
            slide: function (event, ui) {
              $("#height-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#height-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#height-high').html(ui.values[1]+"<sup>''</sup>").digits();
			  curHeightLow = ui.values[0];
			  curHeightHigh = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#height-low').html(21+" <sup>''</sup>" ).digits();
        $('#height-high').html(24+" <sup>''</sup>").digits();
        $( "#height-amount" ).val( 21 +" <sup>''</sup> -" + 24 +" <sup>''</sup>" ).digits();
		
		//width
		 $(".width-slider").slider({
            range: true,
            step: 0.1,
            min: 8.7,
            max: 17,
            values: [8.7,17],
			
            slide: function (event, ui) {
              $("#width-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#width-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#width-high').html(ui.values[1]+"<sup>''</sup>").digits();
			  curWidthLow = ui.values[0];
			  curWidthHigh =ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#width-low').html(8.7+" <sup>''</sup>" ).digits();
        $('#width-high').html(17+" <sup>''</sup>").digits();
        $( "#width-amount" ).val( 8.7 +" <sup>''</sup> -" + 17 +" <sup>''</sup>" ).digits();
		
		
		//depth
		 $(".depth-slider").slider({
            range: true,
            step: 0.1,
            min: 3,
            max: 12.01,
            values: [3,12.01],
			
            slide: function (event, ui) {
              $("#depth-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#depth-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#depth-high').html(ui.values[1]+"<sup>''</sup>").digits();
			  curDepthLow = ui.values[0];
			  curDepthHigh = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#depth-low').html(3+" <sup>''</sup>" ).digits();
        $('#depth-high').html(12+" <sup>''</sup>").digits();
        $( "#depth-amount" ).val(3 +" <sup>''</sup> -" + 12 +" <sup>''</sup>" ).digits();
		
		
    }else{
        $.fn.digits = function(){ 
            return this.each(function(){ 
                $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") ); 
            })
        }
		
		//price
        $(".pricetemp-slider").slider({
            range: true,
            step: 10,
            min: 35,
            max: 695,
            values: [35, 695],
            slide: function (event, ui) {
              $("#price-amount").val("<sup>$</sup>"+ui.values[ 0 ]+" - <sup>$</sup>"+ui.values[ 1 ]).digits();
              $('#price-low').html("<sup>$</sup>" + ui.values[0]).digits();
              $('#price-high').html("<sup>$</sup>" + ui.values[1]).digits();
			  curPriceLow= ui.values[0];
			  curPriceHigh = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#price-low').html("<sup>$</sup>" + 35).digits();
        $('#price-high').html("<sup>$</sup>" + 695).digits();
        $( "#price-amount" ).val( "<sup>$</sup>" + 35 + " - <sup>$</sup>" + 695 ).digits();
		
		//weight
		 $(".weight-slider").slider({
            range: true,
            step: 0.1,
            min: 3.0,
            max: 11.80,
            values: [3,11.80],
			pips: { // Show a scale with the slider
				mode: 'steps',
				density: 1
			},
            slide: function (event, ui) {
              $("#weight-amount").val(ui.values[ 0 ]+"<sup>lbs</sup>"+ui.values[ 1 ]+"<sup>lbs</sup>").digits();
              $('#weight-low').html(ui.values[0]+"<sup>lbs</sup>").digits();
              $('#weight-high').html(ui.values[1].toFixed(2)+"<sup>lbs</sup>").digits();
			  curWeightLow = ui.values[0];
			  curWeightHigh  = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#weight-low').html(3.0+"<sup>lbs</sup>" ).digits();
        $('#weight-high').html(11.80+"<sup>lbs</sup>").digits();
        $( "#weight-amount" ).val( 3.0 +"<sup>lbs</sup> -" + 11.80 +"<sup>lbs</sup>" ).digits();
		
		//height
		 $(".height-slider").slider({
            range: true,
            step: 0.1,
            min: 21,
            max: 24.01,
            values: [21,24],
			
            slide: function (event, ui) {
              $("#height-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#height-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#height-high').html(ui.values[1]+"<sup>''</sup>").digits();
			  curHeightLow = ui.values[0];
			  curHeightHigh = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#height-low').html(21+" <sup>''</sup>" ).digits();
        $('#height-high').html(24+" <sup>''</sup>").digits();
        $( "#height-amount" ).val( 21 +" <sup>''</sup> -" + 24 +" <sup>''</sup>" ).digits();
		
		//width
		 $(".width-slider").slider({
            range: true,
            step: 0.1,
            min: 8.7,
            max: 17,
            values: [8.7,17],		
            slide: function (event, ui) {
              $("#width-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#width-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#width-high').html(ui.values[1]+"<sup>''</sup>").digits();
			  curWidthLow = ui.values[0];
			  curWidthHigh =ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#width-low').html(8.7+" <sup>''</sup>" ).digits();
        $('#width-high').html(17+" <sup>''</sup>").digits();
        $( "#width-amount" ).val( 8.7 +" <sup>''</sup> -" + 17 +" <sup>''</sup>" ).digits();
		
		
		//depth
		 $(".depth-slider").slider({
            range: true,
            step: 0.1,
            min: 3,
            max: 12.01,
            values: [3,12.01],
			
            slide: function (event, ui) {
              $("#depth-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#depth-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#depth-high').html(ui.values[1]+"<sup>''</sup>").digits();
			  curDepthLow = ui.values[0];
			  curDepthHigh = ui.values[1];
              checkPriceAndFilter(ui.values[0], ui.values[1], 0);
            }
        });

        $('#depth-low').html(3+" <sup>''</sup>" ).digits();
        $('#depth-high').html(12+" <sup>''</sup>").digits();
        $( "#depth-amount" ).val(3 +" <sup>''</sup> -" + 12 +" <sup>''</sup>" ).digits();
    }


   
	var myString1 = $("#price-low").html();
	myString1 = myString1.replace(/\D/g, '');
	var myString2 = $("#price-high").html();
	myString2 = myString2.replace(/\D/g, '');
	
	curPriceLow = myString1;
	curPriceHigh = myString2;
	
	var weightlow = $("#weight-low").html();
	weightlow = weightlow.replace("lbs",'');
	var weighthigh = $("#weight-high").html();
	weighthigh = weighthigh.replace("lbs",'');

	curWeightLow = weightlow;
	curWeightHigh = weighthigh;


	var heightlow = $("#height-low").html();
	heightlow = heightlow.replace("''","");
	var heighthigh = $("#height-high").html();
	heighthigh = heighthigh.replace("''","");

	curHeightLow = heightlow;
	curHeightHigh = heighthigh;
	
	var widthlow = $("#width-low").html();
	widthlow = widthlow.replace("lbs",'').replace("''","");
	var widthhigh = $("#width-high").html();
	widthhigh = widthhigh.replace("lbs",'').replace("''","");

	curWidthLow = widthlow;
	curWidthHigh = widthhigh;
	
	var depthlow = $("#depth-low").html();
	depthlow = depthlow.replace("lbs",'').replace("''","");;
	var depthhigh = $("#depth-high").html();
	depthhigh = depthhigh.replace("lbs",'').replace("''","");;

	curDepthLow = depthlow;
	curDepthHigh = depthhigh;
		
		
    //Filter Bags
    function checkPriceAndFilter(min, max, flag) {
		
        //Get min value and max value from slider
        var price_min = curPriceLow;
        var price_max = curPriceHigh;
        var temp = '';
        var chkCategory;
        chkCategory = filters['category'];
        chkMaterial = filters['material'];//material
        chkWheels = filters['wheels'];//wheels
        filters['price'] = '';
        //Check for roller bags
        if (chkCategory == '.roller') {
            var used = 0;
            for (i = 0; i < roller_bag_names.length; i++) {
                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && roller_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkWheels != 'undefined' && chkWheels != "" && roller_bag_wheels[i].match(chkWheels) == null)
                    continue;
					
				var weightPassed = weightList[i]>=curWeightLow && weightList[i]<=curWeightHigh;
				var heightPassed = heightList[i]>=curHeightLow && heightList[i]<=curHeightHigh;
				var widthPassed = widthList[i]>=curWidthLow && widthList[i]<=curWidthHigh;
				var depthPassed = depthList[i]>=curDepthLow && depthList[i]<=curDepthHigh;
				
                if ((msrplow[i] >= price_min && msrplow[i] <= price_max) && weightPassed && heightPassed && widthPassed && depthPassed) {
                    if (used == 0) {
                        temp = temp + '.' + roller_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + roller_bag_names[i];
                }
            }
            if (temp != "")
                filters["price"] = temp;
        } //check for Tri-Fold
        else if (chkCategory == '.tri-fold') {
            var used = 0;
            for (i = 0; i < trifold_bag_names.length; i++) {

                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && chkMaterial != trifold_bag_material[i])
                    continue;

                if (typeof chkWheels != 'undefined' && chkWheels != "" && chkWheels != ".zero")
                    break;
				
				var weightPassed = weightList[i+ trifoldStart]>=curWeightLow && weightList[i+ trifoldStart]<=curWeightHigh;
				var heightPassed = heightList[i+ trifoldStart]>=curHeightLow && heightList[i+ trifoldStart]<=curHeightHigh;
				var widthPassed = widthList[i+ trifoldStart]>=curWidthLow && widthList[i+ trifoldStart]<=curWidthHigh;
				var depthPassed = depthList[i+ trifoldStart]>=curDepthLow && depthList[i+ trifoldStart]<=curDepthHigh;
				
				if ((msrplow[i + trifoldStart] >= price_min && msrplow[i + trifoldStart] <= price_max)  && weightPassed && heightPassed && widthPassed && depthPassed){

                    if (used == 0) {
                        temp = temp + '.' + trifold_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + trifold_bag_names[i];
                }
            }

            filters["price"] = temp;
        } //check for duffel bags
        else if (chkCategory == '.duffel') {
            var used = 0;
            for (i = 0; i < duffel_bag_names.length; i++) {
			
                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && chkMaterial != duffel_bag_material[i])
                    continue;

                if (typeof chkWheels != 'undefined' && chkWheels != "" && chkWheels != ".zero")
                    break;
				var weightPassed = weightList[i+ duffelStart]>=curWeightLow && weightList[i+ duffelStart]<=curWeightHigh;
				var heightPassed = heightList[i+ duffelStart]>=curHeightLow && heightList[i+ duffelStart]<=curHeightHigh;
				var widthPassed = widthList[i+ duffelStart]>=curWidthLow && widthList[i+ duffelStart]<=curWidthHigh;
				var depthPassed = depthList[i+ duffelStart]>=curDepthLow && depthList[i+ duffelStart]<=curDepthHigh;
				
				if ((msrplow[i + duffelStart] >= price_min && msrplow[i + duffelStart] <= price_max) && weightPassed && heightPassed && widthPassed && depthPassed) {
                    if (used == 0) {
                        temp = temp + '.' + duffel_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + duffel_bag_names[i];
                }
                
            }
            filters["price"] = temp;
        }
		
        
        //for all categories
        else {
			var used = 0;
            for (i = 0; i < roller_bag_names.length; i++) {
                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && roller_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkWheels != 'undefined' && chkWheels != "" && roller_bag_wheels[i].match(chkWheels) == null)
                    continue;


                var weightPassed = weightList[i]>=curWeightLow && weightList[i]<=curWeightHigh;
				var heightPassed = heightList[i]>=curHeightLow && heightList[i]<=curHeightHigh;
				var widthPassed = widthList[i]>=curWidthLow && widthList[i]<=curWidthHigh;
				var depthPassed = depthList[i]>=curDepthLow && depthList[i]<=curDepthHigh;
				
                if ((msrplow[i] >= price_min && msrplow[i] <= price_max) && weightPassed && heightPassed && widthPassed && depthPassed) {

                    if (used == 0) {
                        temp = temp + '.' + roller_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + roller_bag_names[i];
                }
            }
			
            for (i = 0; i < trifold_bag_names.length; i++) {

                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && chkMaterial != trifold_bag_material[i])
                    continue;

                if (typeof chkWheels != 'undefined' && chkWheels != "" && chkWheels != ".zero")
                    break;

                var weightPassed = weightList[i+ trifoldStart]>=curWeightLow && weightList[i+ trifoldStart]<=curWeightHigh;
				var heightPassed = heightList[i+ trifoldStart]>=curHeightLow && heightList[i+ trifoldStart]<=curHeightHigh;
				var widthPassed = widthList[i+ trifoldStart]>=curWidthLow && widthList[i+ trifoldStart]<=curWidthHigh;
				var depthPassed = depthList[i+ trifoldStart]>=curDepthLow && depthList[i+ trifoldStart]<=curDepthHigh;
				
				if ((msrplow[i + trifoldStart] >= price_min && msrplow[i + trifoldStart] <= price_max)  && weightPassed && heightPassed && widthPassed && depthPassed){

                    if (used == 0) {
                        temp = temp + '.' + trifold_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + trifold_bag_names[i];
                }
            }
			
			for (i = 0; i < duffel_bag_names.length; i++) {
			
                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && chkMaterial != duffel_bag_material[i])
                    continue;

                if (typeof chkWheels != 'undefined' && chkWheels != "" && chkWheels != ".zero")
                    break;
				var weightPassed = weightList[i+ duffelStart]>=curWeightLow && weightList[i+ duffelStart]<=curWeightHigh;
				var heightPassed = heightList[i+ duffelStart]>=curHeightLow && heightList[i+ duffelStart]<=curHeightHigh;
				var widthPassed = widthList[i+ duffelStart]>=curWidthLow && widthList[i+ duffelStart]<=curWidthHigh;
				var depthPassed = depthList[i+ duffelStart]>=curDepthLow && depthList[i+ duffelStart]<=curDepthHigh;
				
				if ((msrplow[i + duffelStart] >= price_min && msrplow[i + duffelStart] <= price_max) && weightPassed && heightPassed && widthPassed && depthPassed) {

                    if (used == 0) {
                        temp = temp + '.' + duffel_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + duffel_bag_names[i];
                }
           
            }
            filters["price"] = temp;
        }

        if (filters["price"] == "")
            filters["price"] = 'none';

			
		//adhithya
		alreadyFilteredBags = [];
		var splitStr = filters["price"].split(",");
		for(var x in splitStr){
			alreadyFilteredBags.push(splitStr[x]);
		}

        filterValue = concatValues(filters);
        $grid.isotope({ filter: filterValue });
		
		
    }
	

    $('#bags').isotope('reloadItems').isotope();
    $('#bags').css('opacity','1');

});

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}