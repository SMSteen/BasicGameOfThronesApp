function showHouseData(results){
    var htmlFrontData = `
        <h1>${results[0].name}</h1>
        <ul>
            <li>Words:  <span>${results[0].words}</span></li>
            <li>Region:  <span>${results[0].region}</span></li>
            <li>Coat of Arms:  <span>${results[0].coatOfArms}</span></li>
            <li>Titles:  <span>${results[0].titles}</span></li>
        </ul>
    `;
    if (results[0].currentLord){ //house has a Lord, create link to access data on House Lord
        htmlFrontData += `<a href="#" altName="${results[0].name}" data-link="${results[0].currentLord}">Click here for more...</a>`;
    }
    // add the data to front of card
    $("#house-details").html(htmlFrontData);
    //show the front card details
    $("#house-details").show();
}

function showLordData(results){
    var htmlBackData = `
        <h1>${$("#house-details a").attr("altName")}</h1>
        <h3><span>${results.name}</span>, Current Lord</h3>
        <ul>
            <li>Title:  <span>${results.titles}</span></li>
            <li>Born in:  <span>${results.born}</span></li>
            <li>Also known as:  <span>${results.aliases}</span></li>
        </ul>
        <a href='#'>return</a>
    `;
    // add the data to the back of card
    $("#more-house-details").html(htmlBackData);
    // show the back card details
    $("#more-house-details").show();
}

$(document).ready(function(){
    $("#house-details").css("display", "none");
    $("#more-house-details").css("display", "none");

    let baseURL  = "https://anapioficeandfire.com/api/";
    let errorMsg = `
        <p class="text-danger">Oops, something went wrong with this request. If the URL is correct, there could be an issue with the server. Please try again at a later time.</p>
    `;
    $("img").click(function(){
        // ensure back of former house viewed is hidden when a new house is selected
        $("#more-house-details").css("display", "none");
        //get house data for to append to url
        let wordSrch = $(this).attr("alt").replace(/ /g, "%20");
        let params = "houses?name=" + wordSrch;
        //create a promise for get (house) request
        var getHouseData = Promise.resolve($.get(baseURL+params));
        getHouseData.then(function(response) { //process the data, show on page
           showHouseData(response);
        }).catch(function(xhrObj) { //show error message
            $("#house-details").html(errorMsg);
            $("#house-details").show();
        });
    });

    //when clicked, show the back card details
    $("#house-details").on("click", "a", function(){
        let moreParams = $(this).attr("data-link");
        $("#house-details").hide();
        //create a promise for get (lord) request
        var getLordData = Promise.resolve($.get(moreParams));
        getLordData.then(function(response){ //process the data, show on page
            showLordData(response);
        }).catch(function(xhrObj){ //show error message
            $("#more-house-details").html(errorMsg);
            $("#more-house-details").show();
        });
    });

    //when clicked, return to front card details
    $("#more-house-details").on("click", "a", function(){
        $("#more-house-details").hide();
        $("#house-details").show();
    });
});