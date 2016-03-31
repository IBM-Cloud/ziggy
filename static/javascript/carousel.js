  var bowies = [
      {
          name: "Man Who Sold The World",
          image: "early.svg",
          style: "Psychedelic Folk",
          background: "#dd4131",
          date: "1967-72",
          start: "1967",
          end: "1972",
          sketch: "svg/early.svg",
          mugshot: "mug/early.svg",
          photo: "photo/early.png",
          albums: ["David Bowie", "Space Oddity", "The Man Who Sold The World"]
      },
      {
          name: "Ziggy Stardust",
          image: "ziggy.svg",
          style: "Glam Rock",
          background: "#9694a2",
          date: "1972-73",
          start: "1972",
          end: "1973",
          sketch: "svg/ziggy.svg",
          mugshot: "mug/ziggy.svg",
          photo: "photo/ziggy.png",
          albums: ["The Rise And Fall Of Ziggy Stardust And The Spiders From Mars"]
      },
      {
          name: "Aladdin Sane",
          image: "aladdin.svg",
          style: "Glam Rock",
          background: "#f9df3c",
          date: "1973-74",
          start: "1973",
          end: "1974",
          sketch: "svg/aladdin.svg",
          mugshot: "mug/aladdin.svg",
          photo: "photo/aladdin.png",
          albums: ["Aladdin Sane", "Pin Ups", "Diamond Dogs"]
      },
      {
          name: "Thin White Duke",
          image: "duke.svg",
          style: "Soul, Funk",
          background: "#f9df3c",
          date: "1974-76",
          start: "1975",
          end: "1976",
          sketch: "svg/duke.svg",
          mugshot: "mug/duke.svg",
          photo: "photo/duke.png",
          albums: ["Young Americans", "Station To Station"]
      },
      {
          name: "Berlin Trilogy",
          image: "berlin.svg",
          style: "Industrial",
          background: "#014f83",
          date: "1976-79",
          start: "1976",
          end: "1979",
          sketch: "svg/berlin.svg",
          mugshot: "mug/berlin.svg",
          photo: "photo/berlin.png",
          albums: ["Low", "Heros", "Lodger"]
      },
      {
          name: "Pierrot",
          image: "pierrot.svg",
          style: "New Wave",
          background: "#b18f67",
          date: "1980-83",
          start: "1980",
          end: "1983",
          sketch: "svg/pierrot.svg",
          mugshot: "mug/pierrot.svg",
          photo: "photo/pierrot.png",
          albums: ["Scary Monsters"]
      },
      {
          name: "Modern Love",
          image: "modern.svg",
          style: "Pop",
          background: "#8fa6ce",
          date: "1984-88",
          start: "1984",
          end: "1988",
          sketch: "svg/modern.svg",
          mugshot: "mug/modern.svg",
          photo: "photo/modern.png",
          albums: ["Let's Dance", "Tonight", "Never Let Me Down"]
      },
      {
          name: "Earthling",
          image: "earthling.svg",
          style: "Electronic, Grunge",
          background: "#7bc253",
          date: "1992-98",
          start: "1992",
          end: "1998",
          sketch: "svg/earthling.svg",
          mugshot: "mug/earthling.svg",
          photo: "photo/earthling.png",
          albums: ["Outside", "Earthling", "Hours"]
      },
      {
          name: "Lazarus",
          image: "lazarus.svg",
          style: "Neoclassicist",
          background: "#f3776b",
          date: "2013-16",
          start: "2013",
          end: "2016",
          sketch: "svg/lazarus.svg",
          mugshot: "mug/lazarus.svg",
          photo: "photo/lazarus.png",
          albums: ["The Next Day", "Blackstar"]
      }
]

  var currentBowie = 0;

  function fullBowies() {

      carousel = document.getElementById('carousel');
      var h = carousel.parentElement.parentElement.clientHeight;

      var personaHeight = h - 360;

      for (var count = 0; count < bowies.length; count++) {
          var item = document.createElement('div');
          item.dataset.bowie = bowies[count].name;
          item.className = 'bowieItem';
          var holder = document.createElement('div');
          var index = document.createElement('div');
          index.innerHTML = count + 1;
          index.className = "indexBowie";

          holder.className = "holder";
          var image = document.createElement('img');
          image.src = 'static/images/svg/' + bowies[count].image;
          image.className = "imageBowie";

          image.style.height = personaHeight + "px";

          image.id = item.dataset.bowie;

          image.onclick = shareInsight;

          holder.backgroundColor = bowies[count].background;

          var description = document.createElement('div');
          description.innerHTML = bowies[count].name;
          description.className = "aboutBowie";

          var style = document.createElement('div');
          style.innerHTML = bowies[count].style;
          style.className = "styleBowie";

          var date = document.createElement('div');
          date.innerHTML = bowies[count].date;
          date.className = "timeBowie";

          holder.appendChild(image);
          holder.appendChild(description);
          //          holder.appendChild(style);
          //          holder.appendChild(date);

          if (count != 0) {
              //              item.style.display = 'block';
              //              item.style.marginTop = '-' + 780 + 'px';

              var gap = bowies[0].element.clientHeight;
              item.style.marginTop = '-' + gap + 'px';
              item.style.margin
              item.style.top = bowies[0].element.style.top;
              item.style.opacity = 0;

              carousel.style.marginTop = gap + 'px';

          } else {
              //              item.style.marginTop = '-' + gap + 'px';

          }

          bowies[count].element = item;

          item.style.zIndex = count + 1;
          item.style.order = bowies.length - count;

          var c = personaHeight * count;

          item.appendChild(holder);

          carousel.appendChild(item);
      }

      currentBowie = 0;
      var gap = bowies[0].element.clientHeight;
      bowies[0].element.style.marginTop = '-' + gap + 'px';
  }

  function chooseBowie(index) {

      bowies[currentBowie].element.style.opacity = 0;
      bowies[currentBowie].node.className = 'nodeDimmed';
      bowies[currentBowie].nodeLabel.className = 'startDimmed';

      bowies[index].element.style.opacity = 1;
      bowies[index].node.className = 'nodeLit';
      bowies[index].nodeLabel.className = 'startLit';

      currentBowie = index;
  }

  function addTimeLine() {

      var timeline = document.getElementById('timeline');
      var count = 0;

      bowies.forEach(function (bowie) {
          var entry = document.createElement('div');
          entry.className = 'entry';
          entry.dataset.index = count;
          entry.dataset.bowie = bowie.name;

          entry.onclick = function (e) {
              var index = e.target.dataset.index;
              chooseBowie(index);
          }

          bowie.node = document.createElement('div');
          bowie.node.className = 'nodeDimmed';
          bowie.node.dataset.index = count;
          entry.appendChild(bowie.node);

          bowie.line = document.createElement('div');
          bowie.line.className = 'nodeLine';
          entry.appendChild(bowie.line);

          bowie.nodeLabel = document.createElement('div');
          bowie.nodeLabel.innerHTML = bowie.start;
          bowie.nodeLabel.className = 'startDimmed';
          entry.appendChild(bowie.nodeLabel);

          if (count === 0) {
              bowie.node.className = 'nodeLit';
              bowie.nodeLabel.className = 'startLit';
          }

          timeline.appendChild(entry);
          count++;
      })
  }

  function compare(e) {
      var path = './static/comparison.html';

      window.open(path, '_self', false);
  }

  function persona(e) {
      var path = './static/persona.html';

      window.open(path, '_self', false);
  }

  function about(e) {
      var path = './static/about.html';

      window.open(path, '_self', false);
  }

  function shareInsight(e) {
      //      var path = './static/personality.html?persona=' + e.currentTarget.id;
      var path = './static/personality.html?persona=' + bowies[currentBowie].name;

      window.open(path, '_self', false);
  }

  window.onresize = function () {
      carousel = document.getElementById('carousel');
      carousel.innerHTML = null;
      fullBowies();
  }

  window.onload = function () {
      fullBowies();
      addTimeLine();

      var nextBowie;
      var cap = bowies.length - 1

      setInterval(function () {

          if (currentBowie < cap) {
              nextBowie = currentBowie + 1;
          } else {
              nextBowie = 0;
          }
          chooseBowie(nextBowie);
      }, 4000);
  }