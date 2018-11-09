class SpeechListener implements EventListenerObject {
    private speechRecognizer: any; // current version of typescript doesn't recongize SpeechRecognition
    private speechButton: HTMLButtonElement = null;
    private wordsSection: HTMLDivElement = null;

    private startSpeechRecognizitionHelper() {
        this.speechButton.disabled = true;
        this.speechRecognizer.start();
    }

    handleEvent(ev: Event) {
        this.speechButton = document.querySelector<HTMLButtonElement>("#startRecognition");
        this.speechButton.addEventListener("click", () => { this.startSpeechRecognizitionHelper(); });

        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            alert("Speech Recognition API is currently only supported in Chrome");
            this.speechButton.disabled = true;
        }
        let speechRecognitionObj = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognizer = new speechRecognitionObj();
        this.speechRecognizer.interimResults = true;
        this.speechRecognizer.lang = "en-US";

        this.wordsSection = document.querySelector<HTMLDivElement>(".words");


        this.speechRecognizer.addEventListener("end", () => { this.speechButton.disabled = false; })
        this.speechRecognizer.addEventListener("result", (e) => {
            if (e.results[0].isFinal) {
                // const transcript = Array.from(e.results)
                // .map(result => result[0])
                // .map(result => result.transcript)
                // .join('');
                const recognizedWords = e.results[0][0].transcript as string;
                const confidence = e.results[0][0].confidence as number;

                const transcript = `${recognizedWords}  =>  Confidence: ${parseFloat(confidence.toFixed(2)) * 100}%`;

                let paragraphPresentation = document.createElement("p");
                paragraphPresentation.textContent = transcript;
                this.wordsSection.appendChild(paragraphPresentation);
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", new SpeechListener());
