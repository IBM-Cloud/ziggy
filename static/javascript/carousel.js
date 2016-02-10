  var bowies = [
      {
          name: "Man Who Sold The World",
          image: "bowie-early.png",
          style: "Psychedelic Folk",
          background: "#dd4131",
          date: "1967-72"
    },
      {
          name: "Ziggy Stardust",
          image: "bowie-ziggy.png",
          style: "Glam Rock",
          background: "#9694a2",
          date: "1972-73"
    },
      {
          name: "Aladdin Sane",
          image: "bowie-aladdin.png",
          style: "Glam Rock",
          background: "#f9df3c",
          date: "1972-73"
    },

      {
          name: "Berlin Trilogy",
          image: "bowie-berlin.png",
          style: "Industrial",
          background: "#014f83",
          date: "1976-79"
    },
      {
          name: "Pierrot",
          image: "bowie-pierrot.png",
          style: "New Wave",
          background: "#b18f67",
          date: "1980-83"
    },
      {
          name: "Modern Love",
          image: "bowie-modern.png",
          style: "Pop",
          background: "#8fa6ce",
          date: "1984-88"
    },
      {
          name: "Earthling",
          image: "bowie-outside.png",
          style: "Electronic, Grunge",
          background: "#7bc253",
          date: "1992-98"
    },
      {
          name: "Lazarus",
          image: "bowie-lazarus.png",
          style: "Neoclassicist",
          background: "#f3776b",
          date: "2013-16"
    }
]

  var mugshots = [
      {
          name: "Man Who Sold The World",
          image: "early.png",
          style: "Psychedelic Folk",
          background: "#dd4131",
          date: "1967-72"
    },
      {
          name: "Ziggy Stardust",
          image: "ziggy.png",
          style: "Glam Rock",
          background: "#9694a2",
          date: "1972-73"
    },
      {
          name: "Aladdin Sane",
          image: "aladdin.png",
          style: "Glam Rock",
          background: "#f9df3c",
          date: "1972-73"
    },

      {
          name: "Berlin Trilogy",
          image: "berlin.png",
          style: "Industrial",
          background: "#014f83",
          date: "1976-79"
    },
      {
          name: "Pierrot",
          image: "pierrot.png",
          style: "New Wave",
          background: "#b18f67",
          date: "1980-83"
    },
      {
          name: "Modern Love",
          image: "modern.png",
          style: "Pop",
          background: "#8fa6ce",
          date: "1984-88"
    },
      {
          name: "Earthling",
          image: "earthling.png",
          style: "Electronic, Grunge",
          background: "#7bc253",
          date: "1992-98"
    },
      {
          name: "Lazarus",
          image: "lazarus.png",
          style: "Neoclassicist",
          background: "#f3776b",
          date: "2013-16"
    }
]

  function fullBowies() {
      carousel = document.getElementById('carousel');
      for (var count = 0; count < bowies.length; count++) {
          var item = document.createElement('div');
          //        item.className = "carousel-seat";
          var holder = document.createElement('div');
          //        h.innerHTML = count;

          var index = document.createElement('div');
          index.innerHTML = count + 1;
          index.className = "indexBowie";


          holder.className = "holder";
          var image = document.createElement('img');
          image.src = 'static/images/' + bowies[count].image;
          image.className = "imageBowie";
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

          holder.appendChild(index);

          holder.appendChild(image);
          holder.appendChild(description);
          holder.appendChild(style);
          holder.appendChild(date);

          item.appendChild(holder);
          carousel.appendChild(item);
      }
  }

  function circleBowies() {
      carousel = document.getElementById('carousel');
      for (var count = 0; count < mugshots.length; count++) {
          var item = document.createElement('div');
          //        item.className = "carousel-seat";
          var holder = document.createElement('div');
          //        h.innerHTML = count;

          //          holder.className = "holder";
          var image = document.createElement('img');
          image.src = 'static/images/mug/' + mugshots[count].image;
          image.className = "bowieCircle";

          //          var description = document.createElement('div');
          //          description.innerHTML = mugs[count].name;
          //          description.className = "aboutBowie";
          //
          //          var style = document.createElement('div');
          //          style.innerHTML = bowies[count].style;
          //          style.className = "styleBowie";
          //
          //          var date = document.createElement('div');
          //          date.innerHTML = bowies[count].date;
          //          date.className = "timeBowie";

          holder.appendChild(image);
          //          holder.appendChild(description);
          //          holder.appendChild(style);
          //          holder.appendChild(date);

          item.appendChild(holder);
          carousel.appendChild(item);
      }
  }

  //    < div class = "flip-container"
  //    ontouchstart = "this.classList.toggle('hover');" >
  //        < div class = "flipper" >
  //        < div class = "front" >
  //        <!-- front content -->
  //        < /div> < div class = "back" >
  //        <!-- back content -->
  //        < /div> < /div> < /div>


  window.onload = function () {

      var carousel, next, prev, seats;

      fullBowies();

      $('.carousel').slick({
          //          centerMode: true,
          //        centerPadding: '60px',
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          arrows: true,
          responsive: [
              {
                  breakpoint: 768,
                  settings: {
                      arrows: false,
                      centerMode: true,
                      centerPadding: '40px',
                      slidesToShow: 3,
                      dots: true
                  }
    },
              {
                  breakpoint: 480,
                  settings: {
                      arrows: false,
                      centerMode: true,
                      centerPadding: '40px',
                      slidesToShow: 1,
                      dots: true
                  }
    }
  ]
      });

  }