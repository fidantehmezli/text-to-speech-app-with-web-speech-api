const textInput = document.querySelector('#text-input');
const speakButton = document.querySelector('.speak-pause');
const voiceSelect = document.querySelector('#voice-select')
const pitchBtn = document.querySelector('#pitch-button')
const volumeBtn = document.querySelector('#volume-button')
const rateBtn = document.querySelector('#rate-button')
const rateRange = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitchRange = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')
const volumeRange = document.querySelector('#volume')
const volumeValue = document.querySelector('#volume-value')
const rateContainer = document.querySelector('.rate-container')
const pitchContainer = document.querySelector('.pitch-container')
const volumeContainer = document.querySelector('.volume-container')


const synth = window.speechSynthesis;

const speakText = new SpeechSynthesisUtterance();

speakButton.addEventListener('click', () => {
  speakText.text = textInput.value;

  synth.speak(speakText);
  if(textInput.value === ''){
    alert('Please, type something...')
  }
});

volumeRange.addEventListener('input', () => {
  speakText.volume = volumeRange.value;
});

rateRange.addEventListener('input', () => {
  speakText.rate = rateRange.value;
});

pitchRange.addEventListener('input', () => {
  speakText.pitch = pitchRange.value;
});

synth.onvoiceschanged = () => {
  const voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + ' (' + voice.lang + ')';
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });

  speakText.voice = voices[0];
};

speakText.lang = 'en-US';
speakText.volume = volumeRange.value;
speakText.rate = rateRange.value;
speakText.pitch = pitchRange.value;

voiceSelect.addEventListener('change', () => {
  speakText.voice = synth.getVoices().find(voice => voice.name === voiceSelect.value);
});

rate.addEventListener('change', e => rateValue.textContent = rate.value)



rateBtn.addEventListener('click', function(){
  rateContainer.classList.toggle('active')
  pitchContainer.classList.remove('active')
  volumeContainer.classList.remove('active')
})

pitchBtn.addEventListener('click', function(){
  pitchContainer.classList.toggle('active')
  rateContainer.classList.remove('active')
  volumeContainer.classList.remove('active')
})


volumeBtn.addEventListener('click', function(){
  volumeContainer.classList.toggle('active')
  pitchContainer.classList.remove('active')
  rateContainer.classList.remove('active')
})

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

volume.addEventListener('change', e => volumeValue.textContent = volume.value)


document.addEventListener('click', function(event) {
  if (!event.target.closest('#rate-button') && !event.target.closest('.rate-container') && !event.target.closest('#pitch-button') && !event.target.closest('.pitch-container') && !event.target.closest('#volume-button') && !event.target.closest('.volume-container')) {
    rateContainer.classList.remove('active');
    pitchContainer.classList.remove('active');
    volumeContainer.classList.remove('active');
  }
});
