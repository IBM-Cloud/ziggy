window.onload = function () {

    var carousel, next, prev, seats;

    var bowies = [
        {
            name: "Ziggy Stardust",
            image: "bowie-ziggy.png",
            style: "Glam Rock",
            date: "1972-73"
    },
        {
            name: "Aladdin Sane",
            image: "bowie-aladdin.png",
            style: "Glam Rock",
            date: "1972-73"
    },
        {
            name: "Pierrot",
            image: "bowie-pierrot.png",
            style: "New Wave",
            date: "1980-83"
    },
        {
            name: "Modern Love",
            image: "bowie-modern.png",
            style: "Pop",
            date: "1984-88"
    },
        {
            name: "Earthling",
            image: "bowie-outside.png",
            style: "Electronic, Grunge",
            date: "1992-98"
    },
        {
            name: "Lazarus",
            image: "bowie-lazarus.png",
            style: "Neoclassicist",
            date: "2013-16"
    }
]


    carousel = document.getElementById('carousel');

    seats = [];

    for (var count = 0; count < bowies.length; count++) {
        var item = document.createElement('li');
        item.className = "carousel-seat";
        var holder = document.createElement('div');
        //        h.innerHTML = count;

        holder.className = "holder";
        var image = document.createElement('img');
        image.src = 'static/images/' + bowies[count].image;
        image.className = "imageBowie";

        var description = document.createElement('div');
        description.innerHTML = bowies[count].name;
        description.className = "aboutBowie";

        //        var index = document.createElement('div ');
        //        index.innerHTML = count + 1;
        //        index.className = "indexBowie";

        //        holder.appendChild(index);

        var style = document.createElement('div');
        style.innerHTML = bowies[count].style;
        style.className = "styleBowie";


        var date = document.createElement('div');
        date.innerHTML = bowies[count].date;
        date.className = "timeBowie";

        holder.appendChild(image);
        holder.appendChild(description);
        holder.appendChild(style);
        holder.appendChild(date);

        item.appendChild(holder);
        carousel.appendChild(item);
        seats.push(item);

        if (count === 2) {
            item.classList.add('is-ref');
        }

    }


    //    next = function (el) {
    //
    //        if (el.nextSibling) {
    //            return el.nextSibling;
    //        } else {
    //            return seats[0];
    //        }
    //    };
    //
    //    prev = function (el) {
    //        if (el.previousSibling) {
    //            return el.previousSibling;
    //        } else {
    //            return seats[seats.length - 1];
    //        }
    //    };
    //
    //
    //    function navigate(e) {
    //
    //        console.log('navigate');
    //
    //
    //        var el, i, j, new_seat, ref;
    //
    //        el = document.getElementsByClassName('is-ref');
    //        el[0].classList.remove('is-ref');
    //
    //        var t = e.currentTarget.getAttribute('data-toggle');
    //
    //        if (t === 'next') {
    //            new_seat = next(el);
    //            carousel.classList.remove('is-reversing');
    //        } else {
    //            new_seat = prev(el);
    //            carousel.classList.add('is-reversing');
    //        }
    //
    //        new_seat.classList.add('is-ref');
    //        //        for (i = j = 2, ref = seats.length; 2 <= ref ? j <= ref : j >= ref; i = 2 <= ref ? ++j : --j) {
    //        //            //            if (window.CP.shouldStopExecution(1)) {
    //        //            //                break;
    //        //            //            }
    //        //            new_seat = next(new_seat) // .css('order', i);
    //        //        }
    //        //        window.CP.exitedLoop(1);
    //        carousel.classList.remove('is-set');
    //        return setTimeout(function () {
    //            return carousel.classList.add('is-set');
    //        }, 50);
    //    }
    //
    //    var back = document.getElementById('back');
    //    var forward = document.getElementById('forward');
    //
    //    back.onclick = navigate;
    //    forward.onclick = navigate;

    var carousel, next, prev, seats;
    carousel = $('.carousel');
    seats = $('.carousel-seat');
    next = function (el) {
        if (el.next().length > 0) {
            return el.next();
        } else {
            return seats.first();
        }
    };
    prev = function (el) {
        if (el.prev().length > 0) {
            return el.prev();
        } else {
            return seats.last();
        }
    };
    $('.toggle').on('click', function (e) {
        var el, i, j, new_seat, ref;
        el = $('.is-ref').removeClass('is-ref');
        if ($(e.currentTarget).data('toggle') === 'next') {
            new_seat = next(el);
            carousel.removeClass('is-reversing');
        } else {
            new_seat = prev(el);
            carousel.addClass('is-reversing');
        }
        new_seat.addClass('is-ref').css('order', 1);
        for (i = j = 2, ref = seats.length; 2 <= ref ? j <= ref : j >= ref; i = 2 <= ref ? ++j : --j) {
            //            if (window.CP.shouldStopExecution(1)) {
            //                break;
            //            }
            new_seat = next(new_seat).css('order', i);
        }
        //        window.CP.exitedLoop(1);
        carousel.removeClass('is-set');
        return setTimeout(function () {
            return carousel.addClass('is-set');
        }, 50);
    });

}