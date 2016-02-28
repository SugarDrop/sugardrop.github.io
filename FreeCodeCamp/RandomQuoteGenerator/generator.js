
function tweetQuote() {
    window.open(
        'https://twitter.com/intent/tweet?hashtags=sugardrop&related=sugardrop&text='+encodeURIComponent($('#randomQuote').text()),
        'Share');
}

function generateQuote() {
    var quote = $('.quote');
    var author = $('.author');
    var randomQuote = $('#randomQuote');
    var authorName = $('#authorName');
    
    $.ajax({
        headers: {
            "X-Mashape-Key": "5LJ3Ye4smGmshk108kwdWJ3UtlUdp12tbvOjsnyU0gedylc9wY",
            Accept: "application/json",
            "Conecnt-Type": "application/x-www-form-urlencoded"
        },
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
        success: function(response) {
            var data = JSON.parse(response);
            quote.animate({
                opacity: 0
            }, 500, 
            function() {
                randomQuote.text(data["quote"]);
                quote.animate({
                    opacity: 1
                }, 500);
            });
            
            author.animate({
                opacity: 0
            }, 500,
            function() {
                authorName.text(data["author"]);
                $(this).animate({
                    opacity: 1
                }, 500);
            });
        }
    });
}

$(document).ready(function(){
    generateQuote();
    $('#newQuote').on("click", generateQuote);
    $('#tweetQuote').on("click", tweetQuote);
});