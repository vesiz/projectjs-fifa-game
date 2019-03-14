var LocalStorage = {

    addHistoryItem(_value, _type){
        var date = new Date();
        var infoString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} / `;
        infoString += `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} / ${_value}|${_type}`;

        var fullHistory;

        if(!localStorage.getItem("history")){
            fullHistory = infoString;
        }
        else{
            fullHistory = `${localStorage.getItem("history")}, ${infoString}`;
        }

        localStorage.setItem("history", fullHistory);

    },

    returnFullHistory(){
        var historyArray = localStorage.getItem("history").split(",");
        return historyArray;
    },

    deleteHistory(){
        localStorage.removeItem("history");
    }
};