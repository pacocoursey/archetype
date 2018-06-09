var song;
var amplitude;
var level;
var gain;
var playing;

// client_id: QyPi1UIiAXHektIfaZyKDQSp25ZaerWL

var CLIENT_ID = "QyPi1UIiAXHektIfaZyKDQSp25ZaerWL";
var TRACK_URL = "https://soundcloud.com/unlikepluto/runbobbyrun-plutotapes";

function preload() {
  // song = loadSound("../../audio/test.mp3");

  // SC.initialize({ client_id: CLIENT_ID });
  // SC.resolve(TRACK_URL).then(afterLoad).catch(function(error) {
  //   console.log(error);
  // });

  song = loadSound("https://api.soundcloud.com/tracks/450998643/stream?client_id=QyPi1UIiAXHektIfaZyKDQSp25ZaerWL");
}

function afterLoad(track) {
  streamUrl = track.stream_url + '?client_id=' + CLIENT_ID;
  console.log(streamUrl);
  song = loadSound(streamUrl);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  amplitude = new p5.Amplitude();
  song.disconnect();

  gain = new p5.Gain();
  gain.setInput(song);
  gain.connect();

  // showControls();
  amplitude.setInput(song);
  amplitude.smooth(.9);

  background(255);
  gain.amp(1,0.5,0);

  song.play();
  playing = true;
}

var t = 0;
var speed = 0.03;
// var colors = [[170, 193, 199], [142, 192, 193], [135, 202, 216], [150, 201, 192], [140, 160, 152]];
var colors = [[215, 109, 119], [255, 175, 123], [252, 182, 159], [255, 236, 210], [215, 109, 119]];

function draw() {
  level = amplitude.getLevel();

  var color = generateColor(level);
  fill(color[0], color[1], color[2], 10);
  rect(0, 0, windowWidth, windowHeight);

  var n = 100;
  var radius = map(sin(t), -1, 1, 30, windowWidth/5);
  var angleSteps = TWO_PI / n;
  fill(255);
  for (var i = 0; i < n; i++) {
    var angle = t + angleSteps * i;
    var hue = map(sin(angle/2), -1, 1, 100, 252);
    fill(hue, 109, 119);
    var x = width / 2 + sin(angle) * radius;
    var y = height / 2 + cos(angle) * radius;
    ellipse(x, y, level * 1000, level * 1000);
  }
  t += speed;
}

// resize canvas on windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//todo make this not terrible
function generateColor(level) {
  var factor = level * 100;
  var color;
  if (factor < 3) {
    color = colors[0];
  } else if (factor > 3 && factor <= 8) {
    color = colors[1];
  } else if (factor > 8 && factor <= 11) {
    color = colors[2];
  } else if (factor > 11 && factor <= 14) {
    color = colors[3];
  } else if (factor > 14) {
    color = colors[4];
  }
  return color;
}

document.onkeypress = function(e) {
    if(e.keyCode == 32) {
      if(playing) {
        song.pause();
        playing = !playing;
      } else {
        song.play();
        playing = !playing;
      }
    }
};
