
$(function () {

    document.addEventListener('change', checkInput);
    document.addEventListener('submit', checkForm);
    $(document).on('change', function () {
        let target = event.target;

        if (!target.closest('.checkbox-wrapper')) return;

        let box = target.closest('.checkbox-wrapper');

        let checkbox = box.querySelector('input');

        if (checkbox.checked) {
            box.querySelector('.checkbox').classList.add('checked');
        } else {
            box.querySelector('.checkbox').classList.remove('checked');
        }
    });
    $('.header__menu-btn').on('click', function () {
        let menu = document.querySelector('.nav').innerHTML;
        let com = document.querySelector('.header__com').innerHTML;
        $('.header__menu-body').html(menu + '<div class="header__com">' + com + '</div>');
        $('.header__menu').slideDown(800);
    });
    $('.header__menu').on('click', function () {
        let target = event.target;

        if (!target.closest('.close')) return;

        $('.header__menu').slideUp(800);
    });
    $('input[type="tel"]').each(function () {
        $(this).mask('+7 (000) 000 00 00', {
            onChange: function (cep, e) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    checkPhone(cep, e);
                }, 800);
            }
        });
    });
    let timeout;
    let errs = {};
    document.querySelectorAll('form').forEach((form) => {
        errs[form] = [];
    });

    if (document.documentElement.clientWidth > 1000) {
        let scene = $('#scene').get(0);
        let parallaxInstance = new Parallax(scene);
    }

    $('.main-screen__text').slick({
        arrows: false,
        dots: true,
        infinite: true,
        dotsClass: 'main-screen__text-dots dots',
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        speed: 1000,
        responsive: [
            {
                breakpoint: 741,
                settings: {
                    dots: false
                }
            },
        ]
    });




    $(document).on('click', function () {

        if (!event.target.closest('.btn-count')) return;

        event.preventDefault();

        let modal = document.querySelector('#modal-count');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', function () {
            closeModal(event, modal);
        });
        document.addEventListener('keyup', function () {
            closeModal(event, modal);
        });

    });

    let services = document.querySelector('.services__inner');
    let currentService = services.querySelector('.services__item-main');
    currentService.classList.add('active');
    services.addEventListener('mouseover', onService);
    services.addEventListener('mouseout', offService);

    checkWidth();

    $(window).resize(function () {
        checkWidth();
    });


    $('.portfolio__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        speed: 1000,
        infinite: true,
        nextArrow: '<button class="slick-next portfolio-next"><img src="img/arrow-right.png"></button>',
        prevArrow: '<button class="slick-prev portfolio-prev"><img src="img/arrow-left.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // $('img.img-svg').each(function(){
    //     var $img = $(this);
    //     var imgClass = $img.attr('class');
    //     var imgURL = $img.attr('src');
    //     $.get(imgURL, function(data) {
    //       var $svg = $(data).find('svg');
    //       $svg.prepend('<defs><linearGradient id="grad"><stop offset="0%" stop-color="gold"/><stop offset="100%" stop-color="teal"/></linearGradient></defs>');
    //       if(typeof imgClass !== 'undefined') {
    //         $svg = $svg.attr('class', imgClass+' replaced-svg');
    //       }
    //       $svg = $svg.removeAttr('xmlns:a');
    //       if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
    //         $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    //       }
    //     //   $svg.find('path').each(function(){
    //     //     $(this).attr('fill', 'url(#grad)');
    //     //   });
    //       $img.replaceWith($svg);
    //     }, 'xml');
    //   });

    function checkWidth() {
        if (document.documentElement.clientWidth < 1031 && !$('.services__inner').hasClass('slick-slider')) {
            currentService.classList.remove('active');
            services.removeEventListener('mouseover', onService);
            services.removeEventListener('mouseout', offService);
            $('.services__inner').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                dotsClass: 'dots services__dots',
                arrows: false,
                centerMode: true,
                focusOnSelect: true,
                centerPadding: '30px',
                autoplay: 2000,
                infinite: true,
                initialSlide: 2,
                dots: true,
                responsive: [
                    {
                        breakpoint: 955,
                        settings: {
                            centerMode: false,
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
        else if (document.documentElement.clientWidth >= 1031 && $('.services__inner').hasClass('slick-slider')) {
            $('.services__inner').slick('unslick');
            currentService.classList.add('active');
            services.addEventListener('mouseover', onService);
            services.addEventListener('mouseout', offService);
        }
        if (document.documentElement.clientWidth < 971 && !$('.reviews__inner').hasClass('slick-slider')) {
            $('.reviews__inner').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dotsClass: 'dots reviews__dots',
                arrows: false,
                autoplay: 2000,
                infinite: true,
                dots: true,
            });
        }
        else if (document.documentElement.clientWidth >= 971 && $('.reviews__inner').hasClass('slick-slider')) {
            $('.reviews__inner').slick('unslick');
        }
    }

    function onService() {

        let target = event.target;

        if (!target.closest('.services__item')) return;

        if (target.closest('.services__item') == currentService) return;

        currentService.classList.remove('active');
        currentService = target.closest('.services__item');
        currentService.classList.add('active');
    }

    function offService() {

        if (currentService.contains(event.relatedTarget)) return;

        currentService.classList.remove('active');
        currentService = services.querySelector('.services__item-main');
        currentService.classList.add('active');
    }

    function checkInput() {
        let target = event.target;
        let type = target.type;
        let form = target.closest('form');
        let regexp;
        let index = errs[form].indexOf(target);

        switch (type) {
            case 'text':
                regexp = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я]+$/;
                if (!target.value) {
                    form.nameValid = false;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.remove('success');
                    errs[form].splice(index, 1);
                    hideError(form);
                }
                else if (regexp.test(target.value)) {
                    form.nameValid = true;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.add('success');
                    errs[form].splice(index, 1);
                    hideError(form);
                }
                else {
                    form.nameValid = false;
                    target.closest('.input-wrapper').classList.remove('success');
                    target.closest('.input-wrapper').classList.add('error');
                    errs[form].push(target);
                    showError(form);
                }
                break;
            case 'email':
                regexp = /^[\w-.]+@([-\w]+\.)+[-\w]+$/;

                if (!target.value) {
                    form.emailValid = false;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.remove('success');
                    errs[form].splice(index, 1);
                    hideError(form);
                }
                else if (regexp.test(target.value)) {
                    form.emailValid = true;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.add('success');
                    errs[form].splice(index, 1);
                    hideError(form);
                }
                else {
                    form.emailValid = false;
                    target.closest('.input-wrapper').classList.remove('success');
                    target.closest('.input-wrapper').classList.add('error');
                    errs[form].push(target);
                    showError(form);
                }
                break;
            case 'checkbox':
                if (target.checked) {
                    errs[form].splice(index, 1);
                    hideError(form);
                }
                else {
                    errs[form].push(target);
                    showError(form);
                }
                break;
            case 'file':
                checkFile(target); 
                break;
        }
    }

    function checkFile(target) {
        let num = target.files.length;
        let form = target.closest('form');
        let field = target.closest('.discus__form-file').querySelector('.discus-file__content');

        if (num > 5){
            field.innerHTML = 'Можно выбрать максимум 5 файлов'
            field.classList.add('error');
            form.fileValid = false;
        }
        else if (num == 0){
            field.innerHTML = '';
            field.classList.remove('error');
            form.fileValid = false;
        }
        else if (num == 1){
            field.innerHTML = 'Выбран 1 файл';
            field.classList.remove('error');
            form.fileValid = true;
        }
        else if (num == 5){
            field.innerHTML = 'Выбрано 5 файлов';
            field.classList.remove('error');
            form.fileValid = true;
        }
        else{
            field.innerHTML = 'Выбрано ' + num + ' файла';
            field.classList.remove('error');
            form.fileValid = true;
        }
    }

    function checkPhone(value, event) {
        let target = event.target;
        let form = target.closest('form');
        let index = errs[form].indexOf(target);

        if (value.length == 0) {
            form.telValid = false;
            target.closest('.input-wrapper').classList.remove('error');
            target.closest('.input-wrapper').classList.remove('success');
            errs[form].splice(index, 1);
            hideError(form);
        }
        else if (value.length == 18) {
            form.telValid = true;
            target.closest('.input-wrapper').classList.remove('error');
            target.closest('.input-wrapper').classList.add('success');
            errs[form].splice(index, 1);
            hideError(form);
        }
        else {
            form.telValid = false;
            target.closest('.input-wrapper').classList.remove('success');
            target.closest('.input-wrapper').classList.add('error');
            errs[form].push(target);
            showError(form);
        }
    }

    function checkForm() {
        event.preventDefault();

        let target = event.target;
        let form = target.closest('form');

        let data = {};
        if (form.name) {
            if (!form.nameValid) {
                errs[form].push(form.name);
            } else {
                data.name = form.name.value;
            }
        }
        if (form.tel) {
            if (!form.telValid) {
                errs[form].push(form.tel);
            } else {
                data.phone = form.tel.value;
            }
        }
        if (form.email) {
            if (!form.emailValid) {
                errs[form].push(form.email);
            } else {
                data.email = form.email.value;
            }
        }
        if (form.textarea) {
            if (form.textarea.value){
                data.comment = form.textarea.value;
            }
        }
        if (form.file){
            if (form.fileValid){
                data.files = form.file.files;
            }
        }

        if (errs[form].length != 0) {
            showError(form);
            for (err of errs[form]) {
                err.closest('.input-wrapper').classList.remove('success');
                err.closest('.input-wrapper').classList.add('error');
            }
            return;
        }

        if (!form.confirm.checked) {
            showError(form);
            return;
        }

        if (form.closest('.modal')) {
            form.closest('.modal').querySelector('.modal__body').innerHTML = '<div class="modal__title modal__title-thanks">Заявка принята!</div><div class="modal__text modal__text-thanks">Спасибо, что выбрали нас!</div><div class="modal__thanks"><img src="img/thanks.png" alt=""></div><div class="modal__descr modal__descr-thanks">Рекомендуем подписаться на наши социальные сети и получить скидку 10%</div><div class="messengers"><a href="https://www.instagram.com/visual.up/" class="messenger"><img src="img/instagram.png" alt=""></a><a href="https://www.behance.net/visual_up" class="messenger"><img src="img/behance.png" alt=""></a></div>';

            if (document.documentElement.clientWidth > 600) {
                form.closest('.modal').querySelector('.modal__body').style.background = 'none';
            }
        }
    }

    function showError(form) {
        let parent = form.closest('section') || form.closest('.modal');
        parent.querySelector('.form-error').style.display = 'block';
    }

    function hideError(form) {
        if (errs[form].length == 0) {
            let parent = form.closest('section') || form.closest('.modal');
            parent.querySelector('.form-error').style.display = 'none';
        }
    }

    function closeModal(event, modal) {

        let target = event.target;

        if (!(target.closest('.close') || target.classList.contains('modal') || event.key == 'Escape')) return;

        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.removeEventListener('click', closeModal);
        document.removeEventListener('keyup', closeModal);
    }

});

