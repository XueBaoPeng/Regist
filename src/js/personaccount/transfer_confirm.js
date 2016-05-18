function init(){
//	getSpot();//景区
//	getPerson();//个人
//	getGuide();//导游
//	getTravel();//旅行社
//	getHotel();//酒店
}

//景区
function getSpot(){
	var param={
		name:"俄罗斯风情小镇"
	}
	GetScenicByShortName(param,true, function(result){
		if(result.code==0){
		    $("#spot").html(template("tempSpot", result));	 
	    }
	});
}	
//个人
function getPerson(){
	var param={
		name:"songqian"
	}
	GetUserByLoginName(param,true, function(result){
		if(result.code==0){
		    $("#person").html(template("tempPerson", result));	 
	    }
	});
}
//导游
function getGuide(){
	var param={
		name:"周敏"
	}
	GetTourGuideByName(param,true, function(result){
		if(result.code==0){
		    $("#guide").html(template("tempGuide", result));	 
	    }
	});
}

//旅行社
function getTravel(){
	var param={
		name:"七星旅游网"
	}
	GetTravelByShortName(param,true, function(result){
		if(result.code==0){
		    $("#travel").html(template("tempTravel", result));	 
	    }
	});
}
//酒店
function getHotel(){
	var param={
		name:"香格里拉大酒店"
	}
	GetHotelByShortName(param,true, function(result){
		if(result.code==0){
		    $("#hotel").html(template("tempHotel", result));	 
	    }
	});
}

