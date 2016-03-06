(function () {
    $(document).ready(function () {
        var quote = $('.quote');
        var author = $('.author');
        var randomQuote = $('#randomQuote');
        var authorName = $('#authorName');
        
        var tweetQuote = function tweetQuote() {
            window.open(
                'https://twitter.com/intent/tweet?hashtags=sugardrop&related=sugardrop&text=' + encodeURIComponent(randomQuote.text()),
                'Share');
        }

        var generateQuote = function generateQuote() {
            quote.animate({
                opacity: 0
            }, 250);
            author.animate({
                opacity: 0
            }, 250);

            $.ajax({
                headers: {
                    "X-Mashape-Key": "5LJ3Ye4smGmshk108kwdWJ3UtlUdp12tbvOjsnyU0gedylc9wY",
                    Accept: "application/json",
                    "Conecnt-Type": "application/x-www-form-urlencoded"
                },
                url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
                success: function (response) {
                    var data = JSON.parse(response);
                    randomQuote.text(data["quote"]);
                    authorName.text(data["author"]);
                    quote.animate({
                        opacity: 1
                    }, 250);

                    author.animate({
                        opacity: 1
                    }, 250);
                }
            });
        }

        generateQuote();
        $('#newQuote').on("click", generateQuote);
        $('#tweetQuote').on("click", tweetQuote);
    });
})();