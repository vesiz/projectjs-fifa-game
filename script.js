var actionGetTeams = DOMlib.get("teams-button");
var actionGetGroups = DOMlib.get("groups-button");
var actionGetMatches = DOMlib.get("matches-button");

actionGetTeams.addEventListener("click", (e) => {
    e.preventDefault();
    var teams = null;

    Ajax.get("http://worldcup.sfg.io/teams", (data) => { 
        teams = data;
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
});

actionGetGroups.addEventListener("click", (e) => {
    e.preventDefault();
    var groups = null;

    Ajax.get("http://worldcup.sfg.io/teams/group_results", (data) => {
        groups = data;
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
});

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

actionGetMatches.addEventListener("click", (e) => {
    e.preventDefault();
    getMatches("http://worldcup.sfg.io/matches");
});

var getMatchesByCountry = function(_countryId){
    getMatches(`http://worldcup.sfg.io/matches/country?fifa_code=${_countryId}`);
};



