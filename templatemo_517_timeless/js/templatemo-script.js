// https://codepen.io/AmruthPillai/pen/axvqB
(function ($) {
    $.fn.extend({
        rotaterator: function (options) {

            var defaults = {
                fadeSpeed: 500,
                pauseSpeed: 100,
                child: null
            };

            var options = $.extend(defaults, options);

            return this.each(function () {
                var o = options;
                var obj = $(this);
                var items = $(obj.children(), obj);
                items.each(function () {
                    $(this).hide();
                })
                if (!o.child) {
                    var next = $(obj).children(':first');
                } else {
                    var next = o.child;
                }
                $(next).fadeIn(o.fadeSpeed, function () {
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () {
                        var next = $(this).next();
                        if (next.length == 0) {
                            next = $(obj).children(':first');
                        }
                        $(obj).rotaterator({
                            child: next,
                            fadeSpeed: o.fadeSpeed,
                            pauseSpeed: o.pauseSpeed
                        });
                    })
                });
            });
        }
    });
})(jQuery);

$(document).ready(function () {

    // Check for video loading complete
    var video = document.getElementById("tm-welcome-video");

    video.onloadeddata = function() {
        $('#tm-video-text-overlay').removeClass('d-none');
        $('#tm-video-loader').addClass('d-none');

        //CHANGED THE SPEED FOR VISUAL ABILITY
        $('#rotate').rotaterator({
            fadeSpeed: 1200,
            pauseSpeed: 800
        });
    }

    // Update year in copyright text
    document.querySelector('.tm-current-year').textContent = new Date().getFullYear();
});


//JSON
const product = [
{
    id:0,
    image: "img/Turks.jpg",
    title: 'Lido',
    price: 299,
},
{
    id:1,
    image: "img/Metropolis.jpg",
    title: 'Metropolis',
    price: 399,
},
{
    id:2,
    image: "img/dubai.jpg",
    title: 'Soirée',
    price: 299,
},
{
    id:3,
    image: "img/Landmarks.png",
    title: 'Legacy',
    price: 499,
},
{
    id:4,
    image: "img/Forest.jpg",
    title: 'Arboreal',
    price: 199,
},
{
    id:5,
    image: "img/Savannah.jpg",
    title: 'Veld',
    price: 289,
},
{
    id:6,
    image: "img/Desert.jpg",
    title: 'Dune',
    price: 199,
},];


const categories = [...new Set(product.map((item)=>
{return item}))]
let i=0;
document.getElementById('root').innerHTML = categories.map((item)=> {
    var {image, title, price} = item;
    return (
        `<div class="box">
                <div class="img-box">
                    <img class="images" src=${image}></img>
                </div>
            <div class="bottom">
            <p class="your-cart-p">${title}</p>
            <p class="your-cart-p">${price}.00</p>` + "<button onclick='addtocart(" + (i++) + ")'Add to car</button>" + `</div></div>`
    )
}).join('')

var cart = [];

function addtocart(a){
    cart.push({...categories[a]})
    displaycart();
}

function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(a) {
    let j = 0, total=0;

    //Build to display what is happening when there is nothing in the cart
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById('total').innerHTML = "S "+0+".00"
    }

    //Builds transaction catalog if something is added or deleted
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00 (est. monthly) ";
            return(
                `<div class='cart-item'>
                <div class="row-img">
                    <img class="rowimg" src=${image}>
                    </div>
                    <p class="your-cart-p" style="font-size:12px">${title}</p>
                   <p class="your-car-p" style="font-size:15px;"> ${price}.00</p>` +
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('')
    }
}



/*Tried redoing my function with the implementation of JSON not working, JSON Script for add to cart

function displayProducts(services){
    const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
    document.getElementById('root').innerHTML = categories.map((item)=> {
        var {image, title, price} = item;
        return (
            `<div class="box">
                    <div class="img-box">
                        <img class="images" src=${image}></img>
                    </div>
                <div class="bottom">
                <p class="your-cart-p">${title}</p>
                <p class="your-cart-p">${price}.00</p>` + "<button onclick='addtocart(" + (i++) + ")'Add to car</button>" + `</div></div>`
        )
    }).join('')
}
var cart = [];

function addtocart(a){
    cart.push({...categories[a]})
    displaycart();
}

function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(a) {
    let j = 0, total=0;

    //Build to display what is happening when there is nothing in the cart
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById('total').innerHTML = "S "+0+".00"
    }

    //Builds transaction catalog if something is added or deleted
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00 (est. monthly) ";
            return(
                `<div class='cart-item'>
                <div class="row-img">
                    <img class="rowimg" src=${image}>
                    </div>
                    <p class="your-cart-p" style="font-size:12px">${title}</p>
                   <p class="your-car-p" style="font-size:15px;"> ${price}.00</p>` +
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('')
    }
} */
