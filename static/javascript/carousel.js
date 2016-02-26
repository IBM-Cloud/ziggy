  var bowies = [
      {
          name: "Man Who Sold The World",
          image: "early.svg",
          style: "Psychedelic Folk",
          background: "#dd4131",
          date: "1967-72",
          start: "1967",
          end: "1972"
    },
      {
          name: "Ziggy Stardust",
          image: "ziggy.svg",
          style: "Glam Rock",
          background: "#9694a2",
          date: "1972-73",
          start: "1972",
          end: "1973"
    },
      {
          name: "Aladdin Sane",
          image: "aladdin.svg",
          style: "Glam Rock",
          background: "#f9df3c",
          date: "1972-73",
          start: "1972",
          end: "1973"
    },

      {
          name: "Berlin Trilogy",
          image: "berlin.svg",
          style: "Industrial",
          background: "#014f83",
          date: "1976-79",
          start: "1976",
          end: "1979"
    },
      {
          name: "Pierrot",
          image: "pierrot.svg",
          style: "New Wave",
          background: "#b18f67",
          date: "1980-83",
          start: "1980",
          end: "1983"
    },
      {
          name: "Modern Love",
          image: "modern.svg",
          style: "Pop",
          background: "#8fa6ce",
          date: "1984-88",
          start: "1984",
          end: "1988"
    },
      {
          name: "Earthling",
          image: "earthling.svg",
          style: "Electronic, Grunge",
          background: "#7bc253",
          date: "1992-98",
          start: "1992",
          end: "1998"
    },
      {
          name: "Lazarus",
          image: "lazarus.svg",
          style: "Neoclassicist",
          background: "#f3776b",
          date: "2013-16",
          start: "2013",
          end: "2016"
    }
]

  var currentBowie = 0;

  function fullBowies() {
      carousel = document.getElementById('carousel');
      for (var count = 0; count < bowies.length; count++) {
          var item = document.createElement('div');
          item.dataset.bowie = bowies[count].name;
          item.className = 'bowieItem';
          //        item.className = "carousel-seat";
          var holder = document.createElement('div');
          //        h.innerHTML = count;

          var index = document.createElement('div');
          index.innerHTML = count + 1;
          index.className = "indexBowie";

          var h = carousel.parentElement.parentElement.clientHeight;

          var personaHeight = h - 280;

          //          console.log(personaHeight);

          holder.className = "holder";
          var image = document.createElement('img');
          image.src = 'static/images/svg/' + bowies[count].image;
          //          image.className = "imageBowie";

          image.style.height = personaHeight + "px";
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

          //          holder.appendChild(index);

          holder.appendChild(image);
          holder.appendChild(description);
          holder.appendChild(style);
          holder.appendChild(date);
          //          holder.appendChild(index);
          holder.id = bowies[count].name;

          holder.onclick = shareInsight;


          if (count === 0) {
              item.style.display = 'block';
          }

          bowies[count].element = item;

          item.appendChild(holder);
          carousel.appendChild(item);
      }

      currentBowie = 0;
  }

  function chooseBowie(index) {

      bowies[currentBowie].element.style.display = 'none';
      bowies[currentBowie].node.className = 'nodeDimmed';
      bowies[currentBowie].nodeLabel.className = 'startDimmed';

      bowies[index].element.style.display = 'block';
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

  function shareInsight(e) {
      var path = './static/personality.html?persona=' + e.currentTarget.id;
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
      }, 3000);




  }