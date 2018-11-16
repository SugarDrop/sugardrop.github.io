var SpeechSynthesizer = /** @class */ (function () {
    function SpeechSynthesizer() {
        this.speechSynthUtterance = new SpeechSynthesisUtterance();
        this.voicesDropdown = null;
        this.options = null;
        this.speakButton = null;
        this.stopButton = null;
        this.voices = null;
    }
    SpeechSynthesizer.prototype.populateVoices = function () {
        this.voices = window.speechSynthesis.getVoices();
        var englishVoices = [];
        for (var _i = 0, _a = this.voices; _i < _a.length; _i++) {
            var voice = _a[_i];
            if (voice.lang.indexOf("en") >= 0) {
                englishVoices.push(voice);
            }
        }
        var voiceOptionsHtml = englishVoices
            .map(function (voice) { return "<option value=\"" + voice.name + "\">" + voice.name + " " + voice.lang + "</option>"; })
            .join('');
        this.voicesDropdown.innerHTML = voiceOptionsHtml;
    };
    SpeechSynthesizer.prototype.setVoice = function () {
        for (var _i = 0, _a = this.voices; _i < _a.length; _i++) {
            var voice = _a[_i];
            if (voice.name == this.voicesDropdown.value) {
                this.speechSynthUtterance.voice = voice;
                break;
            }
        }
        this.speak();
    };
    SpeechSynthesizer.prototype.setOption = function (changedInput) {
        this.speechSynthUtterance[changedInput.name] = changedInput.value;
        this.speak();
    };
    SpeechSynthesizer.prototype.speak = function () {
        window.speechSynthesis.cancel();
        this.speechSynthUtterance.text = document.querySelector('[name="text"]').value;
        window.speechSynthesis.speak(this.speechSynthUtterance);
    };
    SpeechSynthesizer.prototype.stop = function () {
        window.speechSynthesis.cancel();
    };
    SpeechSynthesizer.prototype.handleEvent = function (ev) {
        var _this = this;
        this.voicesDropdown = document.querySelector('[name="voices"]');
        this.options = document.querySelectorAll('[type="range"]');
        this.speakButton = document.querySelector("#speak");
        this.stopButton = document.querySelector("#stop");
        window.speechSynthesis.addEventListener("voiceschanged", function () { _this.populateVoices(); });
        this.voicesDropdown.addEventListener("change", function () { _this.setVoice(); });
        this.options.forEach(function (option) { return option.addEventListener("change", function (ev) {
            var changedInput = ev.target;
            _this.setOption(changedInput);
        }); });
        this.speakButton.addEventListener("click", function () { _this.speak(); });
        this.stopButton.addEventListener("click", function () { _this.stop(); });
        this.populateVoices();
    };
    return SpeechSynthesizer;
}());
document.addEventListener("DOMContentLoaded", new SpeechSynthesizer());
//# sourceMappingURL=speechSynthesizer.js.map