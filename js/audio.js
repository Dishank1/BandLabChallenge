// var context;
// window.addEventListener('load', init, false);
// function init() {
//   try {
//     window.AudioContext = window.AudioContext;
//     context = new AudioContext();
//   }
//   catch(e) {
//     alert('Web Audio API is not supported in this browser');
//   }
// }

var soundTest = null;

function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
   .then(response => response.json())
   .then(json => {
     data = json;
     generate_table();
   });
}

function play(url) {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var audioStack = [];
  var nextTime = 0;

  fetch('https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg',{
    headers:{
      "Access-Control-Allow-Origin" : '*'
    }
  }
    ).then(function(response) {
    console.log('myResponse: '+JSON.stringify(response));
    var reader = response.body.getReader();
    function read() {
        return reader.read().then(({ value, done })=> {
          if (done) {
            console.log('done');
            return;
          }else{
            console.log(value,done);
            context.decodeAudioData(value.buffer, function(buffer) {
              audioStack.push(buffer);
              if (audioStack.length) {
                  scheduleBuffers();
              }
            }, function(err) {
              console.log("err(decodeAudioData): "+err);
            });
          }
          read()
        });
      }
    read();
  })

  function scheduleBuffers() {
      while ( audioStack.length) {
          var buffer    = audioStack.shift();
          var source    = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          if (nextTime == 0)
              nextTime = context.currentTime + 0.01;  /// add 50ms latency to work well across systems - tune this if you like
          source.start(nextTime);
          nextTime += source.buffer.duration; // Make the next buffer wait the length of the last buffer before being played
      };
  }
}
