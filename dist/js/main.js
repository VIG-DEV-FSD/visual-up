
$(function () {


    if (document.documentElement.clientWidth > 1000) {
        let scene = $('#scene').get(0);
        let parallaxInstance = new Parallax(scene);
    }

    $('.main-screen__text').slick({
        arrows: false,
        dots: true,
        infinite: true,
        dotsClass: 'main-screen__text-dots',
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

    $('.header__menu-btn').on('click', function () {
        let menu = document.querySelector('.nav').innerHTML;
        let com = document.querySelector('.header__com').innerHTML;
        $('.header__menu-body').html(menu + '<div class="header__com">' + com + '</div>');
        $('.header__menu').slideToggle(800);
    });

    $('.header__menu').on('click', function () {
        let target = event.target;

        if (!target.closest('.close')) return;

        $('.header__menu').slideToggle(800);
    });

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

    $(document).on('click', function () {

        if (!event.target.closest('.btn-count')) return;

        event.preventDefault();

        let modal = document.querySelector('#modal-count');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        let telNumber;
        let telField = modal.querySelector('input[type="tel"]');
        let timeout;
        $(telField).mask('+7 (000) 000 00 00', {
            onChange: function(cep){
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    checkPhone(cep);
                }, 1000);
            },
        });
        let errs = [];


        modal.addEventListener('click', closeModal);
        document.addEventListener('keyup', closeModal);

        modal.addEventListener('change', checkInput);
        modal.addEventListener('submit', checkForm);

        function checkInput() {
            let target = event.target;
            let type = target.type;
            let form = target.closest('form');
            let regexp;
            let index = errs.indexOf(target);

            switch (type) {
                case 'text':
                    regexp = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я]+$/;
                    if (!target.value) {
                        form.nameValid = false;
                        target.closest('.input-wrapper').classList.remove('error');
                        target.closest('.input-wrapper').classList.remove('success');
                        errs.splice(index, 1);
                        hideError();
                    }
                    else if (regexp.test(target.value)) {
                        form.nameValid = true;
                        target.closest('.input-wrapper').classList.remove('error');
                        target.closest('.input-wrapper').classList.add('success');
                        errs.splice(index, 1);
                        hideError();
                    }
                    else {
                        form.nameValid = false;
                        target.closest('.input-wrapper').classList.remove('success');
                        target.closest('.input-wrapper').classList.add('error');
                        errs.push(target);
                        showError();
                    }
                    break;
                case 'email':
                    regexp = /^[\w-.]+@([-\w]+\.)+[-\w]+$/;

                    if (!target.value) {
                        form.emailValid = false;
                        target.closest('.input-wrapper').classList.remove('error');
                        target.closest('.input-wrapper').classList.remove('success');
                        errs.splice(index, 1);
                        hideError();
                    }
                    else if (regexp.test(target.value)) {
                        form.emailValid = true;
                        target.closest('.input-wrapper').classList.remove('error');
                        target.closest('.input-wrapper').classList.add('success');
                        errs.splice(index, 1);
                        hideError();
                    }
                    else {
                        form.emailValid = false;
                        target.closest('.input-wrapper').classList.remove('success');
                        target.closest('.input-wrapper').classList.add('error');
                        errs.push(target);
                        showError();
                    }
                    break;
                case 'checkbox':
                    if (target.checked){
                        errs.splice(index, 1);
                        hideError();
                    }
                    else{
                        errs.push(target);
                        showError();
                    }
                    break;
            }
        }

        function checkPhone(value) {
            let tel = modal.querySelector('input[type="tel"]');
            let form = tel.closest('form');
            telNumber = value;
            let index = errs.indexOf(tel);

            if(value.length == 0){
                form.telValid = false;
                tel.closest('.input-wrapper').classList.remove('error');
                tel.closest('.input-wrapper').classList.remove('success');
                errs.splice(index, 1);
                hideError();
            }
            else if (value.length == 18) {
                form.telValid = true;
                tel.closest('.input-wrapper').classList.remove('error');
                tel.closest('.input-wrapper').classList.add('success');
                errs.splice(index, 1);
                hideError();
            }
            else {
                form.telValid = false;
                tel.closest('.input-wrapper').classList.remove('success');
                tel.closest('.input-wrapper').classList.add('error');
                errs.push(tel);
                showError();
            }
        }

        function checkForm() {
            event.preventDefault();

            let target = event.target;
            let form = target.closest('form');

            let data = {};
            if (form.name) {
                if (!form.nameValid) {
                    errs.push(form.name);
                } else {
                    data.name = form.name.value;
                }
            }
            if (form.tel) {
                if (!form.telValid) {
                    errs.push(form.tel);
                } else {
                    data.phone = telNumber;
                }
            }
            if (form.email) {
                if (!form.emailValid) {
                    errs.push(form.email);
                } else {
                    data.email = form.email.value;
                }
            }

            if (errs.length != 0) {
                showError();
                for (err of errs) {
                    err.closest('.input-wrapper').classList.remove('success');
                    err.closest('.input-wrapper').classList.add('error');
                }
                return;
            }

            if (!form.confirm.checked) {
                showError();
                return;
            }

            modal.querySelector('.modal__body').innerHTML = '<div class="modal__title modal__title-thanks">Заявка принята!</div><div class="modal__text modal__text-thanks">Спасибо, что выбрали нас!</div><div class="modal__thanks"><img src="img/thanks.png" alt=""></div><div class="modal__descr modal__descr-thanks">Рекомендуем подписаться на наши социальные сети и получить скидку 10%</div><div class="messengers"><a href="https://www.instagram.com/visual.up/" class="messenger"><img src="img/instagram.png" alt=""></a><a href="https://www.behance.net/visual_up" class="messenger"><img src="img/behance.png" alt=""></a></div>';

            if (document.documentElement.clientWidth > 600){
               modal.querySelector('.modal__body').style.background = 'none'; 
            }

            modal.removeEventListener('change', checkInput);
            modal.removeEventListener('submit', checkForm);
        }

        function showError() {
            modal.querySelector('.modal__error').style.display = 'block';
        }

        function hideError() {
            if (errs.length == 0) {
                modal.querySelector('.modal__error').style.display = 'none';
            }
        }

        function closeModal() {

            let target = event.target;

            if (!(target.closest('.close') || target.classList.contains('modal') || event.key == 'Escape')) return;

            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.removeEventListener('click', closeModal);
            document.removeEventListener('keyup', closeModal);
            modal.removeEventListener('change', checkInput);
            modal.removeEventListener('submit', checkForm);
        }
    });

});

