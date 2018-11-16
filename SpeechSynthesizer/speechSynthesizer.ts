class SpeechSynthesizer implements EventListenerObject {
    private speechSynthUtterance = new SpeechSynthesisUtterance();
    private voicesDropdown: HTMLSelectElement = null;
    private options: NodeListOf<HTMLInputElement> = null;
    private speakButton: HTMLButtonElement = null;
    private stopButton: HTMLButtonElement = null;
    private voices: SpeechSynthesisVoice[] = null;

    private populateVoices() {
        this.voices = window.speechSynthesis.getVoices();
        let englishVoices: SpeechSynthesisVoice[] = [];
        for (const voice of this.voices) {
            if (voice.lang.indexOf("en") >= 0) {
                englishVoices.push(voice);
            }
        }
        const voiceOptionsHtml = englishVoices
                   .map( voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`)
                   .join('');
        this.voicesDropdown.innerHTML = voiceOptionsHtml
    }

    private setVoice() {
        for (const voice of this.voices) {
            if (voice.name == this.voicesDropdown.value) {
                this.speechSynthUtterance.voice = voice;
                break;
            }
        }
        this.speak();
    }

    private setOption(changedInput: HTMLInputElement) {
        this.speechSynthUtterance[changedInput.name] = changedInput.value;
        this.speak();
    }

    private speak() {
        window.speechSynthesis.cancel();
        this.speechSynthUtterance.text = document.querySelector<HTMLTextAreaElement>('[name="text"]').value;
        window.speechSynthesis.speak(this.speechSynthUtterance);
    }

    private stop() {
        window.speechSynthesis.cancel();
    }

    handleEvent(ev: Event) {
        this.voicesDropdown = document.querySelector<HTMLSelectElement>('[name="voices"]');
        this.options = document.querySelectorAll<HTMLInputElement>('[type="range"]');
        this.speakButton = document.querySelector<HTMLButtonElement>("#speak");
        this.stopButton = document.querySelector<HTMLButtonElement>("#stop");

        window.speechSynthesis.addEventListener("voiceschanged", () => { this.populateVoices(); });
        this.voicesDropdown.addEventListener("change", () => { this.setVoice(); });
        this.options.forEach(option => option.addEventListener("change", (ev: Event) => {
            const changedInput = ev.target as any as HTMLInputElement;
            this.setOption(changedInput);
        }));
        this.speakButton.addEventListener("click", () => { this.speak(); });
        this.stopButton.addEventListener("click", () => { this.stop(); });

        this.populateVoices();
    }
}
document.addEventListener("DOMContentLoaded", new SpeechSynthesizer())