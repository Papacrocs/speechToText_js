// Get the result element where the converted text will be displayed
const resultElement = document.getElementById("result");
let recognition;  // Variable to hold the instance of webkitSpeechRecognition
let recognizing = false;  // Flag to track if speech recognition is currently active

// Function to start speech recognition
function startConverting() {
    // If recognition is already active, stop it and return
    if (recognizing) {
        recognition.stop();
        return;
    }

    // Check if the browser supports webkitSpeechRecognition
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();  // Create a new instance of webkitSpeechRecognition
        setupRecognition(recognition);  // Set up recognition parameters and event handlers
        recognition.start();  // Start the speech recognition
        recognizing = true;  // Set recognizing flag to true
    } else {
        // Alert the user if speech recognition is not supported
        alert("Speech recognition not supported in this browser.");
    }
}

// Function to set up recognition parameters and event handlers
function setupRecognition(recognition) {
    recognition.continuous = true;  // Allow continuous speech recognition
    recognition.interimResults = true;  // Show interim results (results that are not final)
    recognition.lang = 'en-US';  // Set the language to US English

    // Event handler for processing the results of speech recognition
    recognition.onresult = function (event) {
        // Process the results and get final and interim transcripts
        const { finalTranscript, interTranscript } = processResult(event.results);
        // Update the result element with the final and interim transcripts
        resultElement.innerHTML = finalTranscript + interTranscript;
    };

    // Event handler for handling errors during speech recognition
    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);  // Log the error to the console
        recognizing = false;  // Reset the recognizing flag
    };

    // Event handler for when speech recognition ends
    recognition.onend = function () {
        console.log("Speech recognition ended.");  // Log to the console
        recognizing = false;  // Reset the recognizing flag
    };
}

// Function to process the results of speech recognition
function processResult(results) {
    let finalTranscript = '';  // String to hold the final transcript
    let interTranscript = '';  // String to hold the interim transcript

    // Loop through the results
    for (let i = 0; i < results.length; i++) {
        let transcript = results[i][0].transcript;  // Get the transcript of the current result
        transcript = transcript.replace("\n", "<br>");  // Replace newlines with HTML line breaks

        // Check if the result is final or interim
        if (results[i].isFinal) {
            finalTranscript += transcript;  // Add to final transcript if the result is final
        } else {
            interTranscript += transcript;  // Add to interim transcript if the result is interim
        }
    }
    // Return an object containing both final and interim transcripts
    return { finalTranscript, interTranscript };
}

// Function to stop speech recognition
function stopConverting() {
    // Check if recognition is active and recognition object exists
    if (recognizing && recognition) {
        recognition.stop();  // Stop the speech recognition
    }
}
