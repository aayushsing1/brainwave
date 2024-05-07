click_to_convert.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("convert_text").innerHTML = transcript;
        console.log(transcript);
    });
    
    if (speech == true) {
        recognition.start();
    }  else {
        alert("Speech recognition not supported in this browser.");
    }
});

document.getElementById('copy_to_clipboard').addEventListener('click', function() {
    var textarea = document.getElementById('convert_text');
    textarea.select();

    // Attempt to copy the selected text
    try {
        document.execCommand('copy');
    } catch (err) {
        alert('Failed to copy text to clipboard. Please copy manually.');
    }
});