var topics = 
[
    "cat", "dog", "snake", "owl", "duck"
]

createButtons();

var userInput = $("<input>");
userInput.attr("type", "text");
userInput.attr("id", "input");
var topicButton = $("<button>");
topicButton.attr("id", "create");
topicButton.text("New Topic");

$("#topicDiv").append(userInput);
$("#topicDiv").append(topicButton);

$(".topic").on("click", function()
{
    var searchTerm = this.innerHTML;
    console.log(searchTerm);
    getGif(searchTerm);
})

$(".gif").on("click", function()
{
    console.log("Clicked");
    // var state = $(this).attr("data-state");
    // if (state === "animate")
    // {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    // }
    // else
    // {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    // }
})

$("#create").on("click", function()
{
    console.log("Cliked");
    var userTopic = $("#input").val().trim();
    if (userTopic != "")
    {
        userInput.empty();
        newTopic(userTopic);
    }
})

function createButtons()
{
    for(i = 0; i < topics.length; i++)
    {
        var gifButton = $("<button>");
        gifButton.addClass("topic");
        gifButton.text(topics[i]);
        $("#buttonsDiv").append(gifButton);
    }
}

function getGif(term)
{
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5tQ9UTo8mjRwwFkXBekijv4vt8KzKW9t&q=" + term + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response)
    {
        for (i = 0; i < 10; i++)
        {
            var answerImage = $("<img>");
            var rating = response.data[i].rating;
            answerImage.addClass("gif");
            answerImage.attr("src", response.data[i].images.original.url);
            answerImage.attr("data-still", response.data[i].images.original_still.url);
            answerImage.attr("data-animate", response.data[i].images.original.url);
            answerImage.attr("data-state", "animate");
            // $("#imagesDiv").prepend("<p>" + rating + "</p>");
            $("#imagesDiv").prepend(answerImage);
        }
    })
}

function newTopic(topic)
{
    topics.push(topic);
    $("#buttonsDiv").empty();
    createButtons();
}
