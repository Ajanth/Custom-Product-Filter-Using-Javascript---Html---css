$('button').click(function(e){
	e.preventDefault();
});

// Isotope

	var curPriceLow = 0;
	var curPriceHigh = 0;
	
	var curWeightLow = 0;
	var curWeightHigh = 0;
	
	var curliterLow = 0;
	var curliterHigh = 0;

    var curlengthLow = 0;
    var curlengthHigh = 0;
	
	var curWidthLow = 0;
	var curWidthHigh = 0;
	
	var curDepthLow = 0;
	var curDepthHigh = 0;
	
	var large_bag_names = ['eBagsMotherLode','OspreyPorter46','CabinMaxMetz','CabinMaxOxford'];
	var medium_bag_names = ['OspreyFarpoint40','TopPower8006','HynesEagle38l','CrazyAntsMilitary','Outlander'];
	var small_bag_names = ['Timbuk2Uptown','OspreyDaylite'];
	
	var large_bag_material = ['.nylon','.nylon','.nylon','.canvas'];
    var large_bag_sideHandle =['.syes','.syes','.sno','.sno'];
    var large_bag_waistStrap =['.wyes','.wyes','.wno','.wno'];

    var medium_bag_material = ['.nylon','.nylon','.polyester','.canvas','.nylon'];
    var medium_bag_sideHandle =['.syes','.sno','.syes','.syes','.sno'];
    var medium_bag_waistStrap =['.wyes','.wno','.wno','.wyes','.wno'];

    var small_bag_material = ['.nylon','.nylon'];
    var small_bag_sideHandle =['.syes','.sno'];
    var small_bag_waistStrap =['.wno','.wno'];
	
	var msrplow =     [99,127,49,49,159,53,61,39,20,83,49];

    var literList =  [45,46,44,44,40,35,38,40,33,30,13];

    var lengthList =  [22,22,21.65,2.65,21,22,19.7,22,19,19.5,17.7];

	var weightList =  [3.93,2.43,1.54,1.98,2.87,2.8,1.8,2.6,0.5,2.4,1];
	
	var widthList =   [14,14,15.74,15.74,13,14,13,12,13,11.2,9.8];
	
	var depthList =   [9,9,7.8,7.8,9,7.8,7.9,7.5,8.2,6.5,8.6];
	
	var mediumStart = 4;
	var smallStart = 9;
	var bag = '';
	
	var alreadyFilteredBags = [];
		


function initializeSliderHandlers() {
    //price
        $(".pricetemp-slider").slider({
            range: true,
            step: 10,
            min: 20,
            max: 160,
            values: [20,160],
            slide: function (event, ui) {
              $("#price-amount").val("<sup>$</sup>"+ui.values[ 0 ]+" - <sup>$</sup>"+ui.values[ 1 ]).digits();
              $('#price-low').html("<sup>$</sup>" + ui.values[0]).digits();
              $('#price-high').html("<sup>$</sup>" + ui.values[1]).digits();
              curPriceLow= ui.values[0];
              curPriceHigh = ui.values[1];
              checkPriceAndFilter();
            }
        });

        $('#price-low').html("<sup>$</sup>" + 20).digits();
        $('#price-high').html("<sup>$</sup>" + 160).digits();
        $( "#price-amount" ).val( "<sup>$</sup>" + 20 + " - <sup>$</sup>" + 160 ).digits();
        
        //weight
         $(".weight-slider").slider({
            range: true,
            step: 0.1,
            min: 0.5,
            max: 3.95,
            values: [0.5,3.95],
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
              checkPriceAndFilter();
            }
        });

        $('#weight-low').html(0.5+"<sup>lbs</sup>" ).digits();
        $('#weight-high').html(3.95+"<sup>lbs</sup>").digits();
        $( "#weight-amount" ).val( 0.5 +"<sup>lbs</sup> -" + 3.95 +"<sup>lbs</sup>" ).digits();
        
        //liter
         $(".liter-slider").slider({
            range: true,
            step: 1,
            min: 13,
            max: 46,
            values: [13,46],
            
            slide: function (event, ui) {
              $("#liter-amount").val(ui.values[ 0 ]+ui.values[ 1 ]).digits();
              $('#liter-low').html(ui.values[0]).digits();
              $('#liter-high').html(ui.values[1]).digits();
              curliterLow = ui.values[0];
              curliterHigh = ui.values[1];
              checkPriceAndFilter();
            }
        });

        $('#liter-low').html(13 ).digits();
        $('#liter-high').html(46).digits();
        $( "#liter-amount" ).val( 13 +" -" + 46 +"" ).digits();

        //length
         $(".length-slider").slider({
            range: true,
            step: 1,
            min: 2,
            max: 22,
            values: [2,22],
            
            slide: function (event, ui) {
              $("#length-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#length-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#length-high').html(ui.values[1]+"<sup>''</sup>").digits();
              curlengthLow = ui.values[0];
              curlengthHigh = ui.values[1];
              checkPriceAndFilter();
            }
        });

        $('#length-low').html(2+" <sup>''</sup>" ).digits();
        $('#length-high').html(22+" <sup>''</sup>").digits();
        $("#length-amount" ).val(2+" <sup>''</sup> -" + 22 +" <sup>''</sup>" ).digits();
        
        //width
         $(".width-slider").slider({
            range: true,
            step: 0.1,
            min: 9.8,
            max: 15.90,
            values: [9.8,15.90],
            pips: { // Show a scale with the slider
                mode: 'steps',
                density: 1
            },
            
            slide: function (event, ui) {
              $("#width-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#width-low').html((ui.values[0]).toFixed(2)+"<sup>''</sup>").digits();
              $('#width-high').html((ui.values[1]).toFixed(2)+"<sup>''</sup>").digits();
              curWidthLow = ui.values[0];
              curWidthHigh =ui.values[1];
              checkPriceAndFilter();
            }
        });

        $('#width-low').html(9.8+" <sup>''</sup>" ).digits();
        $('#width-high').html(15.90+" <sup>''</sup>").digits();
        $( "#width-amount" ).val(9.8+" <sup>''</sup> -" + 15.90+" <sup>''</sup>" ).digits();
        
        
        //depth
         $(".depth-slider").slider({
            range: true,
            step: 0.1,
            min: 6.5,
            max: 9.1,
            values: [6.5,9.1],
            
            slide: function (event, ui) {
              $("#depth-amount").val(ui.values[ 0 ]+"<sup>''</sup>"+ui.values[ 1 ]+"<sup>''</sup>").digits();
              $('#depth-low').html(ui.values[0]+"<sup>''</sup>").digits();
              $('#depth-high').html(ui.values[1]+"<sup>''</sup>").digits();
              curDepthLow = ui.values[0];
              curDepthHigh = ui.values[1];
              checkPriceAndFilter();
            }
        });

        $('#depth-low').html(6.5+" <sup>''</sup>" ).digits();
        $('#depth-high').html(9.1+" <sup>''</sup>").digits();
        $( "#depth-amount" ).val(6.5 +" <sup>''</sup> -" + 9.1 +" <sup>''</sup>" ).digits();
}

function checkPriceAndFilter() {
        
        //Get min value and max value from slider
        var price_min = curPriceLow;
        var price_max = curPriceHigh;
        var temp = '';

        var chkCategory = filters['category'];
        var chkMaterial = filters['material'];//material
        var chkSideHandle = filters['sideHandle'];//side handle
        var chkWaistWrap = filters['waistStrap'];//waist wrap

        filters['price'] = '';
        //Check for large
        if (chkCategory == '.large') {
            var used = 0;
            for (i = 0; i < large_bag_names.length; i++) {
                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && large_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkSideHandle != 'undefined' && chkSideHandle != "" && large_bag_sideHandle[i].match(chkSideHandle) == null)
                    continue;

                if (typeof chkWaistWrap != 'undefined' && chkWaistWrap != "" && large_bag_waistStrap[i].match(chkWaistWrap) == null)
                    continue;
                    
                var pricePassed = (msrplow[i] >= price_min && msrplow[i] <= price_max);
                var weightPassed = weightList[i]>=curWeightLow && weightList[i]<=curWeightHigh;
                var literPassed = literList[i]>=curliterLow && literList[i]<=curliterHigh;
                var widthPassed = widthList[i]>=curWidthLow && widthList[i]<=curWidthHigh;
                var depthPassed = depthList[i]>=curDepthLow && depthList[i]<=curDepthHigh;
                var lengthPassed =  lengthList[i]>=curlengthLow && lengthList[i]<=curlengthHigh;
                
                if (pricePassed && weightPassed && literPassed && widthPassed && depthPassed && lengthPassed) {
                    if (used == 0) {
                        temp = temp + '.' + large_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + large_bag_names[i];
                }
            }
            if (temp != "")
                filters["price"] = temp;
        } //check for Tri-Fold
        else if (chkCategory == '.medium') {
            var used = 0;
            for (i = 0; i < medium_bag_names.length; i++) {

                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && medium_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkSideHandle != 'undefined' && chkSideHandle != "" && medium_bag_sideHandle[i].match(chkSideHandle) == null)
                    continue;

                if (typeof chkWaistWrap != 'undefined' && chkWaistWrap != "" && medium_bag_waistStrap[i].match(chkWaistWrap) == null)
                    continue;

                var pricePassed = (msrplow[i+mediumStart] >= price_min && msrplow[i+mediumStart] <= price_max);
                var weightPassed = weightList[i+mediumStart]>=curWeightLow && weightList[i+mediumStart]<=curWeightHigh;
                var literPassed = literList[i+mediumStart]>=curliterLow && literList[i+mediumStart]<=curliterHigh;
                var widthPassed = widthList[i+mediumStart]>=curWidthLow && widthList[i+mediumStart]<=curWidthHigh;
                var depthPassed = depthList[i+mediumStart]>=curDepthLow && depthList[i+mediumStart]<=curDepthHigh;
                var lengthPassed =  lengthList[i+mediumStart]>=curlengthLow && lengthList[i+mediumStart]<=curlengthHigh;
            
                
                if (pricePassed && weightPassed && lengthPassed && widthPassed && depthPassed && literPassed){

                    if (used == 0) {
                        temp = temp + '.' + medium_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + medium_bag_names[i];
                }
            }

            filters["price"] = temp;
        } //check for duffel bags
        else if (chkCategory == '.small') {
            var used = 0;
            for (i = 0; i < small_bag_names.length; i++) {
            
                 if (typeof chkMaterial != 'undefined' && chkMaterial != "" && small_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkSideHandle != 'undefined' && chkSideHandle != "" && small_bag_sideHandle[i].match(chkSideHandle) == null)
                    continue;

                if (typeof chkWaistWrap != 'undefined' && chkWaistWrap != "" && small_bag_waistStrap[i].match(chkWaistWrap) == null)
                    continue;

                var pricePassed = (msrplow[i+smallStart] >= price_min && msrplow[i+smallStart] <= price_max);
                var weightPassed = weightList[i+smallStart]>=curWeightLow && weightList[i+smallStart]<=curWeightHigh;
                var literPassed = literList[i+smallStart]>=curliterLow && literList[i+smallStart]<=curliterHigh;
                var widthPassed = widthList[i+smallStart]>=curWidthLow && widthList[i+smallStart]<=curWidthHigh;
                var depthPassed = depthList[i+smallStart]>=curDepthLow && depthList[i+smallStart]<=curDepthHigh;
                var lengthPassed =  lengthList[i+smallStart]>=curlengthLow && lengthList[i+smallStart]<=curlengthHigh;
            
                
                if (pricePassed && weightPassed && lengthPassed && widthPassed && depthPassed && literPassed){

                    if (used == 0) {
                        temp = temp + '.' + small_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + small_bag_names[i];
                }
            }
            filters["price"] = temp;
        }
        
        
        //for all categories
        else {
            var used = 0;
            for (i = 0; i < large_bag_names.length; i++) {
                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && large_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkSideHandle != 'undefined' && chkSideHandle != "" && large_bag_sideHandle[i].match(chkSideHandle) == null)
                    continue;

                if (typeof chkWaistWrap != 'undefined' && chkWaistWrap != "" && large_bag_waistStrap[i].match(chkWaistWrap) == null)
                    continue;
                    
                var pricePassed = (msrplow[i] >= price_min && msrplow[i] <= price_max);
                var weightPassed = weightList[i]>=curWeightLow && weightList[i]<=curWeightHigh;
                var literPassed = literList[i]>=curliterLow && literList[i]<=curliterHigh;
                var widthPassed = widthList[i]>=curWidthLow && widthList[i]<=curWidthHigh;
                var depthPassed = depthList[i]>=curDepthLow && depthList[i]<=curDepthHigh;
                var lengthPassed =  lengthList[i]>=curlengthLow && lengthList[i]<=curlengthHigh;
                
                if (pricePassed && weightPassed && literPassed && widthPassed && depthPassed && lengthPassed) {
                    if (used == 0) {
                        temp = temp + '.' + large_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + large_bag_names[i];
                }
            }
            
            for (i = 0; i < medium_bag_names.length; i++) {

                if (typeof chkMaterial != 'undefined' && chkMaterial != "" && medium_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkSideHandle != 'undefined' && chkSideHandle != "" && medium_bag_sideHandle[i].match(chkSideHandle) == null)
                    continue;

                if (typeof chkWaistWrap != 'undefined' && chkWaistWrap != "" && medium_bag_waistStrap[i].match(chkWaistWrap) == null)
                    continue;

                var pricePassed = (msrplow[i+mediumStart] >= price_min && msrplow[i+mediumStart] <= price_max);
                var weightPassed = weightList[i+mediumStart]>=curWeightLow && weightList[i+mediumStart]<=curWeightHigh;
                var literPassed = literList[i+mediumStart]>=curliterLow && literList[i+mediumStart]<=curliterHigh;
                var widthPassed = widthList[i+mediumStart]>=curWidthLow && widthList[i+mediumStart]<=curWidthHigh;
                var depthPassed = depthList[i+mediumStart]>=curDepthLow && depthList[i+mediumStart]<=curDepthHigh;
                var lengthPassed =  lengthList[i+mediumStart]>=curlengthLow && lengthList[i+mediumStart]<=curlengthHigh;
            
                
                if (pricePassed && weightPassed && lengthPassed && widthPassed && depthPassed && literPassed){

                    if (used == 0) {
                        temp = temp + '.' + medium_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + medium_bag_names[i];
                }
            }
            
            for (i = 0; i < small_bag_names.length; i++) {
            
                 if (typeof chkMaterial != 'undefined' && chkMaterial != "" && small_bag_material[i].match(chkMaterial) == null)
                    continue;

                if (typeof chkSideHandle != 'undefined' && chkSideHandle != "" && small_bag_sideHandle[i].match(chkSideHandle) == null)
                    continue;

                if (typeof chkWaistWrap != 'undefined' && chkWaistWrap != "" && small_bag_waistStrap[i].match(chkWaistWrap) == null)
                    continue;

                var pricePassed = (msrplow[i+smallStart] >= price_min && msrplow[i+smallStart] <= price_max);
                var weightPassed = weightList[i+smallStart]>=curWeightLow && weightList[i+smallStart]<=curWeightHigh;
                var literPassed = literList[i+smallStart]>=curliterLow && literList[i+smallStart]<=curliterHigh;
                var widthPassed = widthList[i+smallStart]>=curWidthLow && widthList[i+smallStart]<=curWidthHigh;
                var depthPassed = depthList[i+smallStart]>=curDepthLow && depthList[i+smallStart]<=curDepthHigh;
                var lengthPassed =  lengthList[i+smallStart]>=curlengthLow && lengthList[i+smallStart]<=curlengthHigh;
            
                
                if (pricePassed && weightPassed && lengthPassed && widthPassed && depthPassed && literPassed){

                    if (used == 0) {
                        temp = temp + '.' + small_bag_names[i];
                        used = 1;
                    }
                    else
                        temp = temp + ', .' + small_bag_names[i];
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
	
var $grid;
// store filter for each group
var filters = {};
var $this;
var buttonGroup;
var filterGroup;
var filterValue;
$(window).load( function() {
    // init Isotope
    $grid = $('.grid').isotope({
        isInitLayout: false,
        itemSelector: '.bag'
    });
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
	
	   //new code
		var literLow = $("#liter-low").html();
        literLow = literLow.replace("lbs",'').replace("''","");
        var literHigh = $("#liter-high").html();
        literHigh = literHigh.replace("lbs",'').replace("''","");
	
		curliterLow = literLow;
		curliterHigh = literHigh;

        var lengthLow = $("#length-low").html();
        lengthLow = lengthLow.replace("inches",'').replace("''","");
        var lengthHigh = $("#length-high").html();
        lengthHigh = lengthHigh.replace("inches",'').replace("''","");
    
        curlengthLow = lengthLow;
        curlengthHigh = lengthHigh;

        //new code ends
		
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
		
        checkPriceAndFilter();
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

		initializeSliderHandlers();
		
		
		
    }else{
        $.fn.digits = function(){ 
            return this.each(function(){ 
                $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") ); 
            })
        }
		
		initializeSliderHandlers();
    }


   
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
    
       //new code
        var literLow = $("#liter-low").html();
        literLow = literLow.replace("lbs",'').replace("''","");
        var literHigh = $("#liter-high").html();
        literHigh = literHigh.replace("lbs",'').replace("''","");
    
        curliterLow = literLow;
        curliterHigh = literHigh;

        var lengthLow = $("#length-low").html();
        lengthLow = lengthLow.replace("inches",'').replace("''","");
        var lengthHigh = $("#length-high").html();
        lengthHigh = lengthHigh.replace("inches",'').replace("''","");
    
        curlengthLow = lengthLow;
        curlengthHigh = lengthHigh;

        //new code ends
        
        var widthlow = $("#width-low").html();
        widthlow = widthlow.replace("lbs",'').replace("''","");
        var widthhigh = $("#width-high").html();
        widthhigh = widthhigh.replace("lbs",'').replace("''","");
    
        curWidthLow = widthlow;
        curWidthHigh = widthhigh;
        
        var depthlow = $("#depth-low").html();
        depthlow = depthlow.replace("lbs",'').replace("''","");
        var depthhigh = $("#depth-high").html();
        depthhigh = depthhigh.replace("lbs",'').replace("''","");
    
        curDepthLow = depthlow;
        curDepthHigh = depthhigh;
        
    //Filter Bags
    
	

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