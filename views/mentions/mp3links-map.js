
function(doc){var fetchurl=doc.fetch&&doc.fetch.url;if(!fetchurl)return;doc.entries&&doc.entries.forEach(function(e){e.mp3s&&e.mp3s.forEach(function(mp3){mp3.href&&emit(mp3.href,fetchurl);});});doc.playlist&&doc.playlist.track&&doc.playlist.track.forEach(function(t){t.location&&t.location.forEach(function(url){emit(url,fetchurl);});});doc.mp3s&&doc.mp3s.forEach(function(mp3){mp3.href&&emit(mp3.href,fetchurl);});}