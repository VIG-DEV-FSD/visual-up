"use strict";$(function(){if($(".main-screen__text").slick({arrows:!1,dots:!0,infinite:!0,dotsClass:"main-screen__text-dots dots",autoplay:!0,autoplaySpeed:4e3,responsive:[{breakpoint:741,settings:{dots:!1}}]}),1e3<document.documentElement.clientWidth){var e=$("#scene").get(0);new Parallax(e)}var s;$(".portfolio__slider").slick({slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,speed:800,infinite:!0,nextArrow:'<button class="slick-next portfolio-next"><img src="img/arrow-right.png"></button>',prevArrow:'<button class="slick-prev portfolio-prev"><img src="img/arrow-left.png"></button>',responsive:[{breakpoint:768,settings:{arrows:!1}}]}),(new WOW).init(),$("img.img-svg").each(function(){var i=$(this),s=i.attr("class"),e=i.attr("src"),r=$("#linear-gradient").get(0);$.get(e,function(e){var t=$(e).find("svg");void 0!==s&&(t=t.attr("class",s+" replaced-svg")),!(t=t.removeAttr("xmlns:a")).attr("viewBox")&&t.attr("height")&&t.attr("width")&&t.attr("viewBox","0 0 "+t.attr("height")+" "+t.attr("width")),t.prepend(r),t.find("path").each(function(){$(this).attr("fill","white")}),i.replaceWith(t)},"xml")}),document.addEventListener("click",function(){var e=event.target;if(!e.closest(".nav__menu"))return;if("A"!=e.tagName)return;event.preventDefault(),"block"==document.querySelector(".header__menu").style.display&&$(".header__menu").slideUp(800);document.querySelector("."+e.dataset.target+"__title").scrollIntoView({behavior:"smooth",block:"start"})}),document.addEventListener("click",function(){if(!event.target.closest(".portfolio__more-btn"))return;event.preventDefault(),$(event.target.closest(".more")).fadeOut(800),setTimeout(function(){$(".portfolio-more__wrapper").fadeIn(800),$(".portfolio-more").magnificPopup({delegate:"a",type:"image",tLoading:"Loading image #%curr%...",removalDelay:300,mainClass:"mfp-img-mobile mfp-fade",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{titleSrc:"title"}})},800)}),document.addEventListener("click",function(){if(!event.target.closest(".reviews__more-btn"))return;event.preventDefault(),$(event.target.closest(".more")).fadeOut(800);$(".reviews__inner").append('<div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div>'),setTimeout(function(){$(".reviews__item-more").each(function(){$(this).addClass("on")})},800)}),768<document.documentElement.clientWidth&&setTimeout(function e(){768<document.documentElement.clientWidth&&("flex"!=document.querySelector("#modal-count").style.display?m(document.querySelector("#modal-sale"),null):setTimeout(e,3e4))},3e4),$('.discus input[type="tel"]').each(function(){$(this).mask("+7 (000) 000 00 00",{onChange:function(e,t){clearTimeout(s),s=setTimeout(function(){o(e,t)},800)}})}),document.addEventListener("scroll",_),document.addEventListener("click",function(){if(!event.target.closest(".arrow-top"))return;event.preventDefault(),document.querySelector(".header").scrollIntoView({behavior:"smooth",block:"start"})}),_(),document.addEventListener("change",function(){!function(e){var t,i=e.type,s=e.closest("form"),r=l[s].indexOf(e);switch(i){case"text":t=/^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я\s]+$/,e.value?t.test(e.value)?(s.nameValid=!0,e.closest(".input-wrapper").classList.remove("error"),e.closest(".input-wrapper").classList.add("success"),-1!=r&&(l[s].splice(r,1),v(s))):(s.nameValid=!1,e.closest(".input-wrapper").classList.remove("success"),e.closest(".input-wrapper").classList.add("error"),l[s].includes(e)||l[s].push(e),d(s)):(s.nameValid=!1,e.closest(".input-wrapper").classList.remove("error"),e.closest(".input-wrapper").classList.remove("success"),-1!=r&&(l[s].splice(r,1),v(s)));break;case"email":t=/^[\w-.]+@([-\w]+\.)+[-\w]+$/,e.value?t.test(e.value)?(s.emailValid=!0,e.closest(".input-wrapper").classList.remove("error"),e.closest(".input-wrapper").classList.add("success"),-1!=r&&(l[s].splice(r,1),v(s))):(s.emailValid=!1,e.closest(".input-wrapper").classList.remove("success"),e.closest(".input-wrapper").classList.add("error"),l[s].includes(e)||l[s].push(e),d(s)):(s.emailValid=!1,e.closest(".input-wrapper").classList.remove("error"),e.closest(".input-wrapper").classList.remove("success"),-1!=r&&(l[s].splice(r,1),v(s)));break;case"checkbox":e.checked?-1!=r&&(l[s].splice(r,1),v(s)):(l[s].includes(e)||l[s].push(e),d(s));break;case"file":!function(e){var t=e.files.length,i=e.closest("form"),s=e.closest(".discus__form-file").querySelector(".discus-file__content");5<t?(s.innerHTML=880<document.documentElement.clientWidth?"Можно выбрать максимум 5 файлов":"!",s.style.display="flex",s.classList.add("error"),i.fileValid=!1):0==t?(s.innerHTML="",s.style.display="none",s.classList.remove("error"),i.fileValid=!1):(s.innerHTML=1==t?880<document.documentElement.clientWidth?"Выбран 1 файл":"1":5==t?880<document.documentElement.clientWidth?"Выбрано 5 файлов":"5":880<document.documentElement.clientWidth?"Выбрано "+t+" файла":t,s.classList.remove("error"),s.style.display="flex",i.fileValid=!0)}(e)}}(event.target)}),document.addEventListener("submit",function(){event.preventDefault();var t=event.target,e=new FormData;t.name&&(t.nameValid||l[t].includes(t.name)?e.append("name",t.name.value):l[t].push(t.name));t.tel&&(t.telValid||l[t].includes(t.tel)?e.append("phone",t.tel.value):l[t].push(t.tel));t.email&&(t.emailValid||l[t].includes(t.email)?e.append("email",t.email.value):l[t].push(t.email));t.textarea&&t.textarea.value&&e.append("comment",t.textarea.value);if(t.file&&t.fileValid)for(var i=0;i<t.file.files.length;i++)e.append(i,t.file.files[i]);if(0!=l[t].length){d(t);var s=!0,r=!1,n=void 0;try{for(var a,c=l[t][Symbol.iterator]();!(s=(a=c.next()).done);s=!0)err=a.value,"confirm"!=err.name&&(err.closest(".input-wrapper").classList.remove("success"),err.closest(".input-wrapper").classList.add("error"))}catch(e){r=!0,n=e}finally{try{s||null==c.return||c.return()}finally{if(r)throw n}}return}if(!t.confirm.checked&&!l[t].includes(t.confirm))return l[t].push(t.confirm),void d(t);$.ajax({url:"mail.php",data:e,method:"POST",contentType:!1,processData:!1,dataType:"text",beforeSend:function(){},success:function(){if(t.closest(".modal")){var e=t.closest(".modal").querySelector(".modal__body");e.classList.add("off"),setTimeout(function(){e.innerHTML=document.querySelector(".thanks-module").innerHTML,e.classList.add("modal__body-thanks"),setTimeout(function(){e.classList.remove("off")},500)},500)}else{m(document.querySelector("#modal-count"),document.querySelector(".thanks-module").innerHTML,!0),function(e){e.name&&(e.name.value="",e.name.closest(".input-wrapper").classList.remove("success"),e.nameValid=!1);e.email&&(e.email.value="",e.email.closest(".input-wrapper").classList.remove("success"),e.emailValid=!1);e.tel&&(e.tel.value="",e.tel.closest(".input-wrapper").classList.remove("success"),e.telValid=!1);e.textarea&&(e.textarea.value="");e.file&&(e.file.value="",e.fileValid=!1,e.querySelector(".discus-file__content").innerHTML="")}(t)}}})}),$(document).on("change",function(){var e=event.target;if(e.closest(".checkbox-wrapper")){var t=e.closest(".checkbox-wrapper");t.querySelector("input").checked?t.querySelector(".checkbox").classList.add("checked"):t.querySelector(".checkbox").classList.remove("checked")}});var l={};document.querySelectorAll("form").forEach(function(e){l[e]=[]}),$(document).on("click",function(){event.target.closest(".btn-count")&&(event.preventDefault(),m(document.querySelector("#modal-count"),document.querySelector(".form-module").innerHTML))});var t=$(".prices").get(0);document.addEventListener("scroll",p),p();var i=document.querySelector(".services__inner"),r=i.querySelector(".services__item-main");function n(){document.documentElement.clientWidth<1031&&!$(".services__inner").hasClass("slick-slider")?(r&&r.classList.remove("active"),i.removeEventListener("mouseover",a),i.removeEventListener("mouseout",c),$(".services__inner").slick({slidesToShow:1,slidesToScroll:1,dotsClass:"dots services__dots",arrows:!1,autoplay:2e3,infinite:!0,initialSlide:2,dots:!0}),document.querySelectorAll(".services__item").forEach(function(e){e.classList.remove("wow"),e.classList.remove("fadeIn"),e.classList.remove("fadeInUp")})):1031<=document.documentElement.clientWidth&&$(".services__inner").hasClass("slick-slider")&&($(".services__inner").slick("unslick"),r&&r.classList.add("active"),i.addEventListener("mouseover",a),i.addEventListener("mouseout",c)),document.documentElement.clientWidth<971&&!$(".reviews__inner").hasClass("slick-slider")?$(".reviews__inner").slick({slidesToShow:1,slidesToScroll:1,dotsClass:"dots reviews__dots",arrows:!1,autoplay:2e3,infinite:!0,dots:!0}):971<=document.documentElement.clientWidth&&$(".reviews__inner").hasClass("slick-slider")&&$(".reviews__inner").slick("unslick")}function a(){var e=event.target;e.closest(".services__item")&&e.closest(".services__item")!=r&&(r&&r.classList.remove("active"),(r=e.closest(".services__item")).classList.add("active"))}function c(){r&&(r.contains(event.relatedTarget)||(r.classList.remove("active"),r=null))}function o(e,t){var i=t.target,s=i.closest("form"),r=l[s].indexOf(i);0==i.value.length?(s.telValid=!1,i.closest(".input-wrapper").classList.remove("error"),i.closest(".input-wrapper").classList.remove("success"),-1!=r&&(l[s].splice(r,1),v(s))):18==i.value.length?(s.telValid=!0,i.closest(".input-wrapper").classList.remove("error"),i.closest(".input-wrapper").classList.add("success"),-1!=r&&(l[s].splice(r,1),v(s))):(s.telValid=!1,i.closest(".input-wrapper").classList.remove("success"),i.closest(".input-wrapper").classList.add("error"),l[s].includes(i)||l[s].push(i),d(s))}function d(e){(e.closest("section")||e.closest(".modal")).querySelector(".form-error").style.display="block"}function v(e){0==l[e].length&&((e.closest("section")||e.closest(".modal")).querySelector(".form-error").style.display="none")}function m(e,t,i){t&&(e.querySelector(".modal__body").innerHTML=t),i&&e.querySelector(".modal__body").classList.add("modal__body-thanks"),$(e).find('input[type="tel"]').each(function(){$(this).mask("+7 (000) 000 00 00",{onChange:function(e,t){clearTimeout(s),s=setTimeout(function(){o(0,t)},800)}})}),e.style.display="flex",e.classList.remove("off"),e.classList.add("on"),document.body.style.overflow="hidden",e.addEventListener("click",function(){u(event,e)}),document.addEventListener("keyup",function(){u(event,e)})}function u(e,t){var i=e.target;(i.closest(".close")||i.classList.contains("modal")||"Escape"==e.key)&&(t.classList.remove("on"),t.classList.add("off"),t.querySelector(".modal__inner").classList.remove("on"),t.querySelector(".modal__inner").classList.add("off"),setTimeout(function(){t.style.display="none"},1500),document.body.style.overflow="auto",t.removeEventListener("click",u),document.removeEventListener("keyup",u))}function _(){var e=document.querySelector(".phone-bg").offsetHeight+100,t=window.pageYOffset||document.documentElement.scrollTop;document.querySelector(".arrow-top").style.display=e<=t?"flex":"none"}function p(){t.querySelectorAll(".prices__item").forEach(function(e){if("visible"==e.style.visibility&&!e.classList.contains("done")){var t=e.querySelector(".prices__item-price");e.classList.add("done"),function(e,t){var i=0;e.innerHTML=i;var s=Math.round(t/500),r=setInterval(function(){i<t?(i+=s,e.innerHTML=i):(e.innerHTML=t,clearInterval(r))},1)}(t.querySelector("span"),t.dataset.max)}})}!function e(){"visible"==r.style.visibility?setTimeout(function(){r.classList.add("active"),i.addEventListener("mouseover",a),i.addEventListener("mouseout",c)},2e3):setTimeout(e,500)}(),n(),$(window).resize(function(){n()}),$(".header__menu-btn").on("click",function(){var e=document.querySelector(".nav").innerHTML,t=document.querySelector(".header__com").innerHTML;$(".header__menu-body").html(e+'<div class="header__com">'+t+"</div>"),$(".header__menu").slideDown(800)}),$(".header__menu").on("click",function(){event.target.closest(".close")&&$(".header__menu").slideUp(800)}),document.querySelector(".kit__img").addEventListener("mouseover",function(){var e=document.querySelector(".kit__circle");e.classList.add("animate"),e.addEventListener("animationend",function(){event.target.classList.remove("animate")})}),document.querySelector(".special__img").addEventListener("mouseover",function(){var e=document.querySelector(".special__circle");e.classList.add("animate"),e.addEventListener("animationend",function(){event.target.classList.remove("animate")})})});