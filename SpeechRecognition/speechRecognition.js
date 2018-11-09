var SpeechListener = /** @class */ (function () {
    function SpeechListener() {
        this.speechButton = null;
        this.wordsSection = null;
    }
    SpeechListener.prototype.startSpeechRecognizitionHelper = function () {
        this.speechButton.disabled = true;
        this.speechRecognizer.start();
    };
    SpeechListener.prototype.handleEvent = function (ev) {
        var _this = this;
        this.speechButton = document.querySelector("#startRecognition");
        this.speechButton.addEventListener("click", function () { _this.startSpeechRecognizitionHelper(); });
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            alert("Speech Recognition API is currently only supported in Chrome");
            this.speechButton.disabled = true;
        }
        var speechRecognitionObj = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognizer = new speechRecognitionObj();
        this.speechRecognizer.interimResults = true;
        this.speechRecognizer.lang = "en-US";
        this.wordsSection = document.querySelector(".words");
        this.speechRecognizer.addEventListener("end", function () { _this.speechButton.disabled = false; });
        this.speechRecognizer.addEventListener("result", function (e) {
            if (e.results[0].isFinal) {
                // const transcript = Array.from(e.results)
                // .map(result => result[0])
                // .map(result => result.transcript)
                // .join('');
                var recognizedWords = e.results[0][0].transcript;
                var confidence = e.results[0][0].confidence;
                var transcript = recognizedWords + "  =>  Confidence: " + parseFloat(confidence.toFixed(2)) * 100 + "%";
                var paragraphPresentation = document.createElement("p");
                paragraphPresentation.textContent = transcript;
                _this.wordsSection.appendChild(paragraphPresentation);
            }
        });
    };
    return SpeechListener;
}());
document.addEventListener("DOMContentLoaded", new SpeechListener());
//# sourceMappingURL=speechRecognition.js.map