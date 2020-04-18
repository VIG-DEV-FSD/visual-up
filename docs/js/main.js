
$(function () {

    $('.main-screen__text').slick({
        arrows: false,
        dots: true,
        infinite: true,
        dotsClass: 'main-screen__text-dots dots',
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 741,
                settings: {
                    dots: false
                }
            },
        ]
    });

    if (document.documentElement.clientWidth > 1000) {
        let scene = $('#scene').get(0);
        let parallaxInstance = new Parallax(scene);
    }

    $('.portfolio__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 800,
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

    new WOW().init();

    // Service img convert

    $('img.img-svg').each(function () {
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        let grad = $('#linear-gradient').get(0);
        $.get(imgURL, function (data) {
            var $svg = $(data).find('svg');
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $svg.prepend(grad);
            $svg.find('path').each(function () {
                $(this).attr('fill', 'white');
            });
            $img.replaceWith($svg);
        }, 'xml');
    });

    //Navigation

    document.addEventListener('click', navigation);

    //More portfolio

    document.addEventListener('click', loadPortfolio);

    //More reviews

    document.addEventListener('click', loadReviews);

    //Sale window

    function saleModal() {
        if (document.documentElement.clientWidth > 768) {
            if (document.querySelector('#modal-count').style.display != 'flex') {
                let modal = document.querySelector('#modal-sale');
                openModal(modal, null);
            } else {
                setTimeout(saleModal, 30000);
            }
        }
    }

    if (document.documentElement.clientWidth > 768) {
        setTimeout(saleModal, 30000);
    }

    //Mask for phone

    let timeout;
    $('.discus input[type="tel"]').each(function () {
        $(this).mask('+7 (000) 000 00 00', {
            onChange: function (cep, e) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    checkPhone(cep, e);
                }, 800);
            }
        });
    });

    //Arrow to top

    document.addEventListener('scroll', scrollToBack);
    document.addEventListener('click', arrowTop);
    scrollToBack();

    //Check inputs and forms

    document.addEventListener('change', function () {
        checkInput(event.target);
    });
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

    let errs = {};
    document.querySelectorAll('form').forEach((form) => {
        errs[form] = [];
    });

    //Modal window

    $(document).on('click', function () {

        if (!event.target.closest('.btn-count')) return;

        event.preventDefault();

        let modal = document.querySelector('#modal-count');
        let content = document.querySelector('.form-module').innerHTML;

        openModal(modal, content);

    });

    //Prices countUp

    let prices = $('.prices').get(0);
    document.addEventListener('scroll', checkPrices);
    checkPrices();

    //Services effects

    let services = document.querySelector('.services__inner');
    let currentService = services.querySelector('.services__item-main');
    checkServices();

    checkWidth();

    $(window).resize(function () {
        checkWidth();
    });

    //Mobile menu

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

    //Kit effects

    document.querySelector('.kit__img').addEventListener('mouseover', function () {
        let circle = document.querySelector('.kit__circle');
        circle.classList.add('animate');
        circle.addEventListener('animationend', function () {
            event.target.classList.remove('animate');
        });
    });

    //Special effects

    document.querySelector('.special__img').addEventListener('mouseover', function () {
        let circle = document.querySelector('.special__circle');
        circle.classList.add('animate');
        circle.addEventListener('animationend', function () {
            event.target.classList.remove('animate');
        });
    });

    // FUNCTIONS

    function checkWidth() {
        if (document.documentElement.clientWidth < 1031 && !$('.services__inner').hasClass('slick-slider')) {
            if (currentService) currentService.classList.remove('active');
            services.removeEventListener('mouseover', onService);
            services.removeEventListener('mouseout', offService);
            $('.services__inner').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dotsClass: 'dots services__dots',
                arrows: false,
                autoplay: 2000,
                infinite: true,
                initialSlide: 2,
                dots: true,
            });
            document.querySelectorAll('.services__item').forEach((item) => {
                item.classList.remove('wow');
                item.classList.remove('fadeIn');
                item.classList.remove('fadeInUp');
            });
        }
        else if (document.documentElement.clientWidth >= 1031 && $('.services__inner').hasClass('slick-slider')) {
            $('.services__inner').slick('unslick');
            if (currentService) currentService.classList.add('active');
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

        if (currentService) currentService.classList.remove('active');
        currentService = target.closest('.services__item');
        currentService.classList.add('active');
    }

    function offService() {

        if (!currentService) return;

        if (currentService.contains(event.relatedTarget)) return;

        currentService.classList.remove('active');
        currentService = null;
    }

    function checkInput(target) {
        let type = target.type;
        let form = target.closest('form');
        let regexp;
        let index = errs[form].indexOf(target);

        switch (type) {
            case 'text':
                regexp = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я\s]+$/;
                if (!target.value) {
                    form.nameValid = false;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.remove('success');
                    if (index != -1) {
                        errs[form].splice(index, 1);
                        hideError(form);
                    }
                }
                else if (regexp.test(target.value)) {
                    form.nameValid = true;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.add('success');
                    if (index != -1) {
                        errs[form].splice(index, 1);
                        hideError(form);
                    }
                }
                else {
                    form.nameValid = false;
                    target.closest('.input-wrapper').classList.remove('success');
                    target.closest('.input-wrapper').classList.add('error');
                    if (!errs[form].includes(target)) {
                        errs[form].push(target);
                    }
                    showError(form);
                }
                break;
            case 'email':
                regexp = /^[\w-.]+@([-\w]+\.)+[-\w]+$/;

                if (!target.value) {
                    form.emailValid = false;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.remove('success');
                    if (index != -1) {
                        errs[form].splice(index, 1);
                        hideError(form);
                    }
                }
                else if (regexp.test(target.value)) {
                    form.emailValid = true;
                    target.closest('.input-wrapper').classList.remove('error');
                    target.closest('.input-wrapper').classList.add('success');
                    if (index != -1) {
                        errs[form].splice(index, 1);
                        hideError(form);
                    }
                }
                else {
                    form.emailValid = false;
                    target.closest('.input-wrapper').classList.remove('success');
                    target.closest('.input-wrapper').classList.add('error');
                    if (!errs[form].includes(target)) {
                        errs[form].push(target);
                    }
                    showError(form);
                }
                break;
            case 'checkbox':
                if (target.checked) {
                    if (index != -1) {
                        errs[form].splice(index, 1);
                        hideError(form);
                    }
                }
                else {
                    if (!errs[form].includes(target)) {
                        errs[form].push(target);
                    }
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

        if (num > 5) {
            field.innerHTML = (document.documentElement.clientWidth > 880) ? 'Можно выбрать максимум 5 файлов' : '!';
            field.style.display = 'flex';
            field.classList.add('error');
            form.fileValid = false;
        }
        else if (num == 0) {
            field.innerHTML = '';
            field.style.display = 'none';
            field.classList.remove('error');
            form.fileValid = false;
        }
        else if (num == 1) {
            field.innerHTML = (document.documentElement.clientWidth > 880) ? 'Выбран 1 файл' : '1';
            field.classList.remove('error');
            field.style.display = 'flex';
            form.fileValid = true;
        }
        else if (num == 5) {
            field.innerHTML = (document.documentElement.clientWidth > 880) ? 'Выбрано 5 файлов' : '5';
            field.classList.remove('error');
            field.style.display = 'flex';
            form.fileValid = true;
        }
        else {
            field.innerHTML = (document.documentElement.clientWidth > 880) ? 'Выбрано ' + num + ' файла' : num;
            field.classList.remove('error');
            field.style.display = 'flex';
            form.fileValid = true;
        }
    }

    function checkPhone(value, event) {
        let target = event.target;
        let form = target.closest('form');
        let index = errs[form].indexOf(target);

        if (target.value.length == 0) {
            form.telValid = false;
            target.closest('.input-wrapper').classList.remove('error');
            target.closest('.input-wrapper').classList.remove('success');
            if (index != -1) {
                errs[form].splice(index, 1);
                hideError(form);
            }
        }
        else if (target.value.length == 18) {
            form.telValid = true;
            target.closest('.input-wrapper').classList.remove('error');
            target.closest('.input-wrapper').classList.add('success');
            if (index != -1) {
                errs[form].splice(index, 1);
                hideError(form);
            }
        }
        else {
            form.telValid = false;
            target.closest('.input-wrapper').classList.remove('success');
            target.closest('.input-wrapper').classList.add('error');
            if (!errs[form].includes(target)) {
                errs[form].push(target);
            }
            showError(form);
        }
    }

    function checkForm() {
        event.preventDefault();

        let form = event.target;

        let data = new FormData();
        if (form.name) {
            if (!(form.nameValid) && !(errs[form].includes(form.name))) {
                errs[form].push(form.name);
            } else {
                data.append('name', form.name.value);
            }
        }
        if (form.tel) {
            if (!(form.telValid) && !(errs[form].includes(form.tel))) {
                errs[form].push(form.tel);
            } else {
                data.append('phone', form.tel.value);
            }
        }
        if (form.email) {
            if (!(form.emailValid) && !(errs[form].includes(form.email))) {
                errs[form].push(form.email);
            } else {
                data.append('email', form.email.value);
            }
        }
        if (form.textarea) {
            if (form.textarea.value) {
                data.append('comment', form.textarea.value);
            }
        }
        if (form.file) {
            if (form.fileValid) {
                for (let i = 0; i < form.file.files.length; i++) {
                    data.append(i, form.file.files[i]);
                }
            }
        }
        if (errs[form].length != 0) {
            showError(form);
            for (err of errs[form]) {
                if (err.name != 'confirm') {
                    err.closest('.input-wrapper').classList.remove('success');
                    err.closest('.input-wrapper').classList.add('error');
                }
            }
            return;
        }

        if (!(form.confirm.checked) && !(errs[form].includes(form.confirm))) {
            errs[form].push(form.confirm);
            showError(form);
            return;
        }

        $.ajax({
            url: 'mail.php',
            data: data,
            method: 'POST',
            contentType: false,
            processData: false,
            dataType: 'text',
            beforeSend: function () {

            },
            success: function (resp) {
                if (form.closest('.modal')) {
                    let modalBody = form.closest('.modal').querySelector('.modal__body');
                    modalBody.classList.add('off');

                    setTimeout(() => {
                        modalBody.innerHTML = document.querySelector('.thanks-module').innerHTML;
                        modalBody.classList.add('modal__body-thanks');
                        setTimeout(() => {
                            modalBody.classList.remove('off');
                        }, 500);
                    }, 500);

                } else {
                    let modal = document.querySelector('#modal-count');
                    let content = document.querySelector('.thanks-module').innerHTML;
                    openModal(modal, content, true);
                    clearForm(form);
                }
            }
        });

    }

    function clearForm(form) {
        if (form.name) {
            form.name.value = '';
            form.name.closest('.input-wrapper').classList.remove('success');
            form.nameValid = false;
        }
        if (form.email) {
            form.email.value = '';
            form.email.closest('.input-wrapper').classList.remove('success');
            form.emailValid = false;
        }
        if (form.tel) {
            form.tel.value = '';
            form.tel.closest('.input-wrapper').classList.remove('success');
            form.telValid = false;
        }
        if (form.textarea) {
            form.textarea.value = '';
        }
        if (form.file) {
            form.file.value = '';
            form.fileValid = false;
            form.querySelector('.discus-file__content').innerHTML = '';
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

    function openModal(modal, content, isThanks) {

        if (content) modal.querySelector('.modal__body').innerHTML = content;

        if (isThanks) modal.querySelector('.modal__body').classList.add('modal__body-thanks');

        $(modal).find('input[type="tel"]').each(function () {
            $(this).mask('+7 (000) 000 00 00', {
                onChange: function (cep, e) {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        checkPhone(cep, e);
                    }, 800);
                }
            });
        });

        modal.style.display = 'flex';
        modal.classList.remove('off');
        modal.classList.add('on');
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', function () {
            closeModal(event, modal);
        });
        document.addEventListener('keyup', function () {
            closeModal(event, modal);
        });

    }

    function closeModal(event, modal) {

        let target = event.target;

        if (!(target.closest('.close') || target.classList.contains('modal') || event.key == 'Escape')) return;

        modal.classList.remove('on');
        modal.classList.add('off');
        modal.querySelector('.modal__inner').classList.remove('on');
        modal.querySelector('.modal__inner').classList.add('off');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 1500);
        document.body.style.overflow = 'auto';
        modal.removeEventListener('click', closeModal);
        document.removeEventListener('keyup', closeModal);
    }

    function navigation() {
        let target = event.target;

        if (!target.closest('.nav__menu')) return;
        if (target.tagName != 'A') return;

        event.preventDefault();

        if (document.querySelector('.header__menu').style.display == 'block') {
            $('.header__menu').slideUp(800);
        }

        let obj = document.querySelector('.' + target.dataset.target + '__title');

        obj.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function scrollToBack() {
        let mainBlock = document.querySelector('.phone-bg').offsetHeight + 100;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop >= mainBlock) {
            document.querySelector('.arrow-top').style.display = 'flex';
        }
        else {
            document.querySelector('.arrow-top').style.display = 'none';
        }
    }

    function arrowTop() {

        if (!event.target.closest('.arrow-top')) return;

        event.preventDefault();

        document.querySelector('.header').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function checkServices() {
        if (currentService.style.visibility == 'visible') {
            setTimeout(() => {
                currentService.classList.add('active');
                services.addEventListener('mouseover', onService);
                services.addEventListener('mouseout', offService);
            }, 2000)
        } else {
            setTimeout(checkServices, 500);
        }
    }

    function loadPortfolio() {

        if (!event.target.closest('.portfolio__more-btn')) return;

        event.preventDefault();

        $(event.target.closest('.more')).fadeOut(800);

        setTimeout(() => {
            $('.portfolio-more__wrapper').fadeIn(800);
            $('.portfolio-more').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                removalDelay: 300,
                mainClass: 'mfp-img-mobile mfp-fade',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    titleSrc: 'title'
                },
            })
        }, 800);

    }

    function loadReviews() {

        if (!event.target.closest('.reviews__more-btn')) return;

        event.preventDefault();

        $(event.target.closest('.more')).fadeOut(800);

        let more = '<div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div><div class="reviews__item reviews__item-more"><div class="reviews__item-bg"></div> <div class="reviews__item-inner"> <div class="reviews__item-head"><div class="reviews__item-img"><img src="img/review-1.png" alt=""></div><div class="reviews__item-content"><div class="reviews__item-author"> Иванов Иван</div><div class="reviews__item-service">Landing page, адаптив</div></div><a href="#" class="reviews__item-link"><img src="img/arrow-review.png" alt=""></a> </div><div class="reviews__item-body"> В рот ебал первый канал. Ну и второй канал тоже в рот ебал!Спасибо большое! И ещё раз спасибо приспасибо!Спасибочки бля! УУУУУУ сука!</div></div></div>';

        $('.reviews__inner').append(more);

        setTimeout(() => {
            $('.reviews__item-more').each(function () {
                $(this).addClass('on');
            });
        }, 800);
    }

    function checkPrices() {
        prices.querySelectorAll('.prices__item').forEach((item) => {
            if (item.style.visibility == 'visible' && !item.classList.contains('done')) {
                let price = item.querySelector('.prices__item-price');
                item.classList.add('done');
                countNumber(price.querySelector('span'), price.dataset.max);
            }
        })
    }

    function countNumber(field, max) {
        let val = 0;
        field.innerHTML = val;
        let step = Math.round(max / 500);
        let interval = setInterval(() => {
            if (val < max) {
                val += step;
                field.innerHTML = val;
            }
            else {
                field.innerHTML = max;
                clearInterval(interval);
            }
        }, 1)
    }

});

