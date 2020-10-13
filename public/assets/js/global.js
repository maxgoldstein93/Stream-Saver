// javascript for all pages
$(document).ready(function () {
   
    // Ajax call to database to get tv show or movie data
    function streamingData() {
        // Hardcoded title of tv shor or movie
        let Title = "Schitt's Creek"
        Title = Title.replace(/ /g, '+');
        const apiKey = "436032d6749a29a57b3c39ae36df859d"
        const queryUrl = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&page=1&query=" + Title + "&page=1&include_adult=false";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (titleData) {
            console.log(titleData)
            titleId = titleData.results[0].id
            console.log("Movie/Show ID: " + titleId)
            console.log("Searched Movie/Show: " + Title)

            // Ajax call to get similar movies
            const queryUrl2 = "https://api.themoviedb.org/3/movie/" + titleId + "/similar?api_key=" + apiKey + "&language=en-US&page=1"
            $.ajax({
                url: queryUrl2,
                method: "GET"
            }).then(function (similarMovieData) {
                // variable directly to movie titles 
                let similarMovies = similarMovieData.results
               
                // loop through the similar movie lsit to display all titles
                for (var i = 0; i < similarMovies.length; i++) {
                    var simMovieList = similarMovies[i].original_title;
                    console.log("SIMILAR MOVIE: " + simMovieList)
                }
            });
            const queryUrl3 = "https://api.themoviedb.org/3/tv/" + titleId + "/similar?api_key=" + apiKey + "&language=en-US&page=1";
            // Ajax call to similar tv shows
            $.ajax({
                url: queryUrl3,
                method: "GET"
            }).then(function (similarShowData) {
                // variable directly to show titles 
                let similarShows = similarShowData.results
                // loop through the similar show lsit to display all titles
                for (var i = 0; i < similarShows.length; i++) {
                    var simShowList = similarShows[i].name
                    console.log("SIMILAR TV SHOWS:" + simShowList)
                }
            });
        }
        )};
    streamingData();

});

