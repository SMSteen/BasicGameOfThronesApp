function saveHouseData(houseData){
    myHouseData = {
        houseName: houseData[0].name,
        houseWords: houseData[0].words,
        houseTitles: houseData[0].titles, //this is an array item
        houseCoat: houseData[0].coatOfArms,
        houseRegion: houseData[0].region,        
        houseCurrentLord: houseData[0].currentLord
    };
    if(houseData[0].currentLord == ""){
        houseCurrentLord: "unknown";
    }
    addHouseData(myHouseData)
    return myHouseData;
}

function addHouseData(myHouseData){
    var htmlFrontStr;
    if(myHouseData.houseCurrentLord == ""){
        htmlFrontStr = `
        <h1>${myHouseData.houseName}</h1>
        <ul>
            <li>Words: <span>${myHouseData.houseWords}</span></li>
            <li>Region: <span>${myHouseData.houseRegion}</span></li>
            <li>Coat of Arms: <span>${myHouseData.houseCoat}</span></li>
        </ul>
        <p>Titles: <span>${myHouseData.houseTitles}</span></p>
        `
    } else {
        htmlFrontStr = `
            <h1>${myHouseData.houseName}</h1>
            <ul>
                <li>Words: <span>${myHouseData.houseWords}</span></li>
                <li>Region: <span>${myHouseData.houseRegion}</span></li>
                <li>Coat of Arms: <span>${myHouseData.houseCoat}</span></li>
            </ul>
            <p>Titles: <span>${myHouseData.houseTitles}</span></p>
            <a href='#' altName='${myHouseData.houseName}' data-link='${myHouseData.houseCurrentLord}'>Click here for more...</a>
        `
    }
    $("#house-details").html(htmlFrontStr);
    //show the front card details
    $("#house-details").show();
}

function saveCharData(charData){
    myCharData = {
        name: charData.name,
        born: charData.born,
        titles: charData.titles,
        akas: charData.aliases
    };

    addCharData(myCharData)
    return myCharData;
}

function addCharData(charData){
   htmlBackStr = `
        <h1>${$("#house-details a").attr("altName")}</h1>
        <h2><span>${myCharData.name}</span>, Current Lord</h2>
        <ul>
            <li>Title: <span>${myCharData.titles}</span></li>
            <li>Born in: <span>${myCharData.born}</span></li>
            <li>Also known as: <span>${myCharData.akas}</span></li>
        </ul>
        <a href='#'>return</a>
        `
    $("#more-house-details").html(htmlBackStr);
}

$(document).ready(function(){
    $("#house-details").css("display", "none");
    $("#more-house-details").css("display", "none");
    var myHouseData = {};
    var myCharData = {};
    var htmlBackStr;

    var baseURL  = "https://anapioficeandfire.com/api/";

    $("img").click(function(){
        $("#house-details").css("display", "none");
        $("#more-house-details").css("display", "none");
        var wordSrch = $(this).attr("alt").replace(/ /g, "%20");
        var params = "houses?name=" + wordSrch;
        $.get(baseURL + params, function(houseData){
            saveHouseData(houseData);
        },'json');
    });

    //when clicked, show the back card details
    $("#house-details").on("click", "a", function(){
        console.log($(this).attr("data-link"))
        $("#house-details").hide();
        $("#more-house-details").show();
        $.get($(this).attr("data-link"), function(charData){
            saveCharData(charData);
        });
    });

    //when clicked, return to front card details
    $("#more-house-details").on("click", "a", function(){
        $("#more-house-details").hide();
        $("#house-details").show();
    });
});