(function(){
    document.addEventListener("DOMContentLoaded", function() {
        function removePlayingVisualEffect(e) {
            if (e.propertyName != 'transform') {
                return;
            }
            e.target.classList.remove('playingVisualEffect');
        }

        function playCorrespondingSound(e) {
            var dataKeyVal = null;
            if (e.type == "keydown") {
                dataKeyVal = e.keyCode;
            }
            else if (e.type == "mousedown") {
                dataKeyVal = e.currentTarget.getAttribute("data-key");
            }

            const associatedAudio = document.querySelector(`audio[data-key="${dataKeyVal}"]`);
            const keyElem = document.querySelector(`div[data-key="${dataKeyVal}"]`);

            if (!associatedAudio || !keyElem) {
                return;
            }
            keyElem.classList.add('playingVisualEffect');
            associatedAudio.currentTime = 0;
            associatedAudio.play();
        }

        const soundButtons = document.querySelectorAll(".key");
        for (var i = 0; i < soundButtons.length; i++) {
            const soundButton = soundButtons[i];
            soundButton.addEventListener("mousedown", playCorrespondingSound);
            soundButton.addEventListener("transitionend", removePlayingVisualEffect);
        }

        window.addEventListener("keydown", playCorrespondingSound);
    });
})();