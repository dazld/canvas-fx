      var frameBufferSize = 4096/2;
      var bufferSize = frameBufferSize/2;
      
      var signal = new Float32Array(bufferSize);
      var peak = new Float32Array(bufferSize);
      
      var fft = new FFT(bufferSize, 44100);

      function loadedMetaData(event) {
        var audio = document.getElementById('input');
        audio.mozFrameBufferLength = frameBufferSize;
        audio.addEventListener("MozAudioAvailable", audioAvailable, false);
      }

      function audioAvailable(event) {
        // deinterleave and mix down to mono
        signal = DSP.getChannel(DSP.MIX, event.frameBuffer);

        // perform forward transform
        fft.forward(signal);
        //console.log("audio: "+fft.spectrum[20]);
        
        // calculate peak values
        for ( var i = 0; i < bufferSize; i++ ) {
          fft.spectrum[i] *= -1 * Math.log((fft.bufferSize/2 - i) * (0.5/fft.bufferSize/2)) * fft.bufferSize; // equalize, attenuates low freqs and boosts highs
          
          if ( peak[i] < fft.spectrum[i] ) {
            peak[i] = fft.spectrum[i];
          } else {
            peak[i] *= 0.99; // peak slowly falls until a new peak is found
          }
        }
         //alert(signal);
      }