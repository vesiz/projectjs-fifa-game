var actionGetTeams   = DOMlib.get("teams-button");
var actionGetGroups  = DOMlib.get("groups-button");
var actionGetMatches = DOMlib.get("matches-button");
var actionSearch     = DOMlib.get("search-button");

var getTeams = function(){
    Ajax.get("http://worldcup.sfg.io/teams", (data) => { 
        var teams = data;
        DOMlib.changeInnerHTML("info-wrapper", "");

        for(var i = 0; i < teams.length; i++){

            DOMlib.addChildWithClass("info-wrapper", "div", "team-info","");
            var cells = DOMlib.getAll(".team-info");

            var addOnElement =`<h4>${teams[i].country} (${teams[i].fifa_code})</h4>`;
            cells[cells.length-1].innerHTML += addOnElement;

            addOnElement = `<p>Group: ${teams[i].group_letter}</p>`;
            cells[cells.length-1].innerHTML += addOnElement;

            addOnElement = document.createElement("button");
            addOnElement.setAttribute("id", teams[i].fifa_code);
            addOnElement.setAttribute("onclick", "getMatchesByCountry(this.id)");
            addOnElement.innerHTML = "View Matches";
            cells[cells.length-1].appendChild(addOnElement);
        }
    });
};

var getGroups = function(){
    Ajax.get("http://worldcup.sfg.io/teams/group_results", (data) => {
        var groups = data;
        DOMlib.changeInnerHTML("info-wrapper", "");

        for(var i = 0; i < groups.length; i++){
            DOMlib.addChildWithClass("info-wrapper", "div", "group-info","");
            var cells = DOMlib.getAll(".group-info");

            var addOnElement =`<h4>Group \"${groups[i].letter}\"</h4>` ;
            cells[cells.length-1].innerHTML += addOnElement;

            for(var j = 0; j < groups[i].ordered_teams.length; j++){
                addOnElement = `<p> ${j+1}) ${groups[i].ordered_teams[j].country} (${groups[i].ordered_teams[j].wins}-${groups[i].ordered_teams[j].draws}-${groups[i].ordered_teams[j].losses}) <br>`;
                addOnElement += `Games Played: ${groups[i].ordered_teams[j].games_played} / Points Total: ${groups[i].ordered_teams[j].points}</p>`;
                cells[cells.length-1].innerHTML += addOnElement;
            }
        }
    });
};

var getMatches = function(_url){

    Ajax.get(_url, (data) => {

        var matches = data;
        DOMlib.changeInnerHTML("info-wrapper", "");

        for(var i = 0; i < matches.length; i++){
            DOMlib.addChildWithClass("info-wrapper", "div", "match-info","");
            var cells = DOMlib.getAll(".match-info");

            var addOnElement = `<p><b>${(matches[i].datetime).split("T", 1)} / ${matches[i].venue} / ${matches[i].location}</b></p>`;
            cells[cells.length-1].innerHTML += addOnElement;

            addOnElement = `<p>${matches[i].home_team_country} (${matches[i].home_team.goals}) - (${matches[i].away_team.goals}) ${matches[i].away_team_country}</p>`;
            cells[cells.length-1].innerHTML += addOnElement;

            addOnElement = `<p>Winner: ${matches[i].winner}</p>`;
            cells[cells.length-1].innerHTML += addOnElement;
        }
    });
};

var generateSearchFields = function(_url){
    DOMlib.changeInnerHTML("info-wrapper", "");

    var parent = DOMlib.get("info-wrapper");
    var addOnElement = "<p>Search venue weather report:</p>";
    parent.innerHTML += addOnElement;

    addOnElement = document.createElement("input");
    addOnElement.setAttribute("type", "number");
    addOnElement.setAttribute("min", 1);
    addOnElement.setAttribute("max", 31);
    addOnElement.setAttribute("placeholder", "Date");
    parent.appendChild(addOnElement);
    
    addOnElement = document.createElement("input");
    addOnElement.setAttribute("type", "number");
    addOnElement.setAttribute("min", 1);
    addOnElement.setAttribute("max", 12);
    addOnElement.setAttribute("placeholder", "Month");
    parent.appendChild(addOnElement);

    addOnElement = document.createElement("select");

    var matches = _url;
    var venues = [];

    for(var i = 0; i < matches.length; i++){
        if(!venues.includes(matches[i].venue)){
            venues.push(matches[i].venue);
        }
    }

    for(var i = 0; i < venues.length; i++){
        var option = document.createElement("option");
        option.setAttribute("value", venues[i]);
        option.innerHTML = venues[i];
        addOnElement.appendChild(option);
    }

    parent.appendChild(addOnElement);

    addOnElement = document.createElement("input");
    addOnElement.setAttribute("type", "submit");
    addOnElement.setAttribute("id", "submit");
    parent.appendChild(addOnElement);
};

var getSearchResult = function(_date, _month, _venue, _url){
    var matches = _url;

    if((_date > 31 || _date < 1) || (_month < 1 || _month > 12)){
        alert("Incorrect data input.");
        location.reload();
        return;
    }

    DOMlib.changeInnerHTML("info-wrapper", "");

    for(var i = 0; i < matches.length; i++){

        var matchDate = ((matches[i].datetime).split("T", 1))[0].split("-");

        if(_date == parseInt(matchDate[2]) && _month == parseInt(matchDate[1]) && _venue == matches[i].venue){
            
            var addOnElement = `<p>The weather report for date ${((matches[i].datetime).split("T", 1))[0]} is:</p>`;
            DOMlib.get("info-wrapper").innerHTML += addOnElement;
            addOnElement = `<p>Sunny / Humidity: ${matches[i].weather.humidity}% / Temperature: ${matches[i].weather.temp_celsius}°C, ${matches[i].weather.temp_farenheit}°F / Wind Speed: ${matches[i].weather.wind_speed}km/h </p>`;
            DOMlib.get("info-wrapper").innerHTML += addOnElement;
            addOnElement = `<p>On this day the teams of ${matches[i].home_team_country} and ${matches[i].away_team_country} played against each other.</p>`;
            DOMlib.get("info-wrapper").innerHTML += addOnElement;

        }
    } 

    if(DOMlib.get("info-wrapper").innerHTML == ""){
        DOMlib.changeInnerHTML("info-wrapper", "There is no weather report for this date, because there was not a game that day on the venue.");
    }
};

var search = function(){
    Ajax.get("http://worldcup.sfg.io/matches", (data) => {

        generateSearchFields(data);

        DOMlib.get("submit").addEventListener("click", (e) => {
            
            var selectedDate = (document.getElementsByTagName("input"))[0].value;
            var selectedMonth = (document.getElementsByTagName("input"))[1].value;
            var selectedVenue = ((document.getElementsByTagName("select"))[0]).options[((document.getElementsByTagName("select"))[0]).selectedIndex].text;
            
            getSearchResult(selectedDate, selectedMonth, selectedVenue, data);
        });
    });    
};

var getMatchesByCountry = function(_countryId){
    getMatches(`http://worldcup.sfg.io/matches/country?fifa_code=${_countryId}`);
};

actionGetTeams.addEventListener("click", (e) => {
    e.preventDefault();
    getTeams();
});

actionGetMatches.addEventListener("click", (e) => {
    e.preventDefault();
    getMatches("http://worldcup.sfg.io/matches");
});

actionGetGroups.addEventListener("click", (e) => {
    e.preventDefault();
    getGroups();
});

actionSearch.addEventListener("click", (e) => {
    e.preventDefault();
    search();
});


