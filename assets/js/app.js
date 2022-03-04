// selection 
const textarea = document.querySelector("form textarea");
const speechBtn = document.querySelector(".convert_btn button");
const voiceList = document.querySelector("select");

let synth = speechSynthesis;
function voices(){
   for(let voice of synth.getVoices()){
       let selected = voice.name === "Google US English" ? "selected" : ""; 
        let voicerTag = `<option value="${voice.name}" ${selected}>${voice.name} - (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", voicerTag);
    }
};
synth.addEventListener("voiceschanged", voices);

// fuction for pronounce word 
function textToSpeech(text){
    let utterances = new SpeechSynthesisUtterance(text);
     for(let voice of synth.getVoices()){
         if(voice.name === voiceList.value){
             utterances.voice = voice;
         }
     }
    synth.speak(utterances);

}

// let isSpeaking = true; 
let isSpeaking = true;
speechBtn.addEventListener("click",function(e){
    e.preventDefault();

    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";

            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";

            }
        }

        setInterval(() => {
            if(!synth.speaking && !isSpeaking){
                speechBtn.innerText = "Convert to Speech";
                isSpeaking = true;
            }
        });


    }else{
            alert("Enter text");
    }



})


