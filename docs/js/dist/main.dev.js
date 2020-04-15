"use strict";

$(function () {
  document.addEventListener('scroll', scrollToBack);
  document.addEventListener('click', arrowTop);
  scrollToBack();
  document.addEventListener('change', function () {
    checkInput(event.target);
  });
  document.addEventListener('submit', checkForm);
  $(document).on('change', function () {
    var target = event.target;
    if (!target.closest('.checkbox-wrapper')) return;
    var box = target.closest('.checkbox-wrapper');
    var checkbox = box.querySelector('input');

    if (checkbox.checked) {
      box.querySelector('.checkbox').classList.add('checked');
    } else {
      box.querySelector('.checkbox').classList.remove('checked');
    }
  });
  $('.header__menu-btn').on('click', function () {
    var menu = document.querySelector('.nav').innerHTML;
    var com = document.querySelector('.header__com').innerHTML;
    $('.header__menu-body').html(menu + '<div class="header__com">' + com + '</div>');
    $('.header__menu').slideDown(800);
  });
  $('.header__menu').on('click', function () {
    var target = event.target;
    if (!target.closest('.close')) return;
    $('.header__menu').slideUp(800);
  });
  document.addEventListener('click', navigation);
  var timeout;
  $('input[type="tel"]').each(function () {
    $(this).mask('+7 (000) 000 00 00', {
      onChange: function onChange(cep, e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          checkPhone(cep, e);
        }, 800);
      }
    });
  });
  var errs = {};
  document.querySelectorAll('form').forEach(function (form) {
    errs[form] = [];
  });

  if (document.documentElement.clientWidth > 1000) {
    var scene = $('#scene').get(0);
    var parallaxInstance = new Parallax(scene);
  }

  $('.main-screen__text').slick({
    arrows: false,
    dots: true,
    infinite: true,
    dotsClass: 'main-screen__text-dots dots',
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [{
      breakpoint: 741,
      settings: {
        dots: false
      }
    }]
  });
  $(document).on('click', function () {
    if (!event.target.closest('.btn-count')) return;
    event.preventDefault();
    var modal = document.querySelector('#modal-count');
    modal.style.display = 'flex';
    modal.classList.remove('off');
    modal.classList.add('on');
    modal.querySelector('.modal__inner').classList.remove('off');
    modal.querySelector('.modal__inner').classList.add('on');
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', function () {
      closeModal(event, modal);
    });
    document.addEventListener('keyup', function () {
      closeModal(event, modal);
    });
  });
  var services = document.querySelector('.services__inner');
  var currentService = services.querySelector('.services__item-main');
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
    speed: 800,
    infinite: true,
    nextArrow: '<button class="slick-next portfolio-next"><img src="img/arrow-right.png"></button>',
    prevArrow: '<button class="slick-prev portfolio-prev"><img src="img/arrow-left.png"></button>',
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false
      }
    }]
  });
  $('img.img-svg').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    var grad = $('#linear-gradient').get(0);
    $.get(imgURL, function (data) {
      var $svg = $(data).find('svg');

      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      $svg = $svg.removeAttr('xmlns:a');

      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      }

      $svg.prepend(grad);
      $svg.find('path').each(function () {
        $(this).attr('fill', 'white');
      });
      $img.replaceWith($svg);
    }, 'xml');
  });

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
        dots: true
      });
    } else if (document.documentElement.clientWidth >= 1031 && $('.services__inner').hasClass('slick-slider')) {
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
        dots: true
      });
    } else if (document.documentElement.clientWidth >= 971 && $('.reviews__inner').hasClass('slick-slider')) {
      $('.reviews__inner').slick('unslick');
    }
  }

  function onService() {
    var target = event.target;
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
    var type = target.type;
    var form = target.closest('form');
    var regexp;
    var index = errs[form].indexOf(target);

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
        } else if (regexp.test(target.value)) {
          form.nameValid = true;
          target.closest('.input-wrapper').classList.remove('error');
          target.closest('.input-wrapper').classList.add('success');

          if (index != -1) {
            errs[form].splice(index, 1);
            hideError(form);
          }
        } else {
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
        } else if (regexp.test(target.value)) {
          form.emailValid = true;
          target.closest('.input-wrapper').classList.remove('error');
          target.closest('.input-wrapper').classList.add('success');

          if (index != -1) {
            errs[form].splice(index, 1);
            hideError(form);
          }
        } else {
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
        } else {
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
    var num = target.files.length;
    var form = target.closest('form');
    var field = target.closest('.discus__form-file').querySelector('.discus-file__content');

    if (num > 5) {
      field.innerHTML = document.documentElement.clientWidth > 880 ? 'Можно выбрать максимум 5 файлов' : '!';
      field.style.display = 'flex';
      field.classList.add('error');
      form.fileValid = false;
    } else if (num == 0) {
      field.innerHTML = '';
      field.style.display = 'none';
      field.classList.remove('error');
      form.fileValid = false;
    } else if (num == 1) {
      field.innerHTML = document.documentElement.clientWidth > 880 ? 'Выбран 1 файл' : '1';
      field.classList.remove('error');
      field.style.display = 'flex';
      form.fileValid = true;
    } else if (num == 5) {
      field.innerHTML = document.documentElement.clientWidth > 880 ? 'Выбрано 5 файлов' : '5';
      field.classList.remove('error');
      field.style.display = 'flex';
      form.fileValid = true;
    } else {
      field.innerHTML = document.documentElement.clientWidth > 880 ? 'Выбрано ' + num + ' файла' : num;
      field.classList.remove('error');
      field.style.display = 'flex';
      form.fileValid = true;
    }
  }

  function checkPhone(value, event) {
    var target = event.target;
    var form = target.closest('form');
    var index = errs[form].indexOf(target);

    if (target.value.length == 0) {
      form.telValid = false;
      target.closest('.input-wrapper').classList.remove('error');
      target.closest('.input-wrapper').classList.remove('success');

      if (index != -1) {
        errs[form].splice(index, 1);
        hideError(form);
      }
    } else if (target.value.length == 18) {
      form.telValid = true;
      target.closest('.input-wrapper').classList.remove('error');
      target.closest('.input-wrapper').classList.add('success');

      if (index != -1) {
        errs[form].splice(index, 1);
        hideError(form);
      }
    } else {
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
    var form = event.target;
    var data = {};

    if (form.name) {
      if (!form.nameValid && !errs[form].includes(form.name)) {
        errs[form].push(form.name);
      } else {
        data.name = form.name.value;
      }
    }

    if (form.tel) {
      if (!form.telValid && !errs[form].includes(form.tel)) {
        errs[form].push(form.tel);
      } else {
        data.phone = form.tel.value;
      }
    }

    if (form.email) {
      if (!form.emailValid && !errs[form].includes(form.email)) {
        errs[form].push(form.email);
      } else {
        data.email = form.email.value;
      }
    }

    if (form.textarea) {
      if (form.textarea.value) {
        data.comment = form.textarea.value;
      }
    }

    if (form.file) {
      if (form.fileValid) {
        data.files = form.file.files;
      }
    }

    if (errs[form].length != 0) {
      showError(form);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = errs[form][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          err = _step.value;

          if (err.name != 'confirm') {
            err.closest('.input-wrapper').classList.remove('success');
            err.closest('.input-wrapper').classList.add('error');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return;
    }

    if (!form.confirm.checked && !errs[form].includes(form.confirm)) {
      errs[form].push(form.confirm);
      showError(form);
      return;
    }

    if (form.closest('.modal')) {
      var modalBody = form.closest('.modal').querySelector('.modal__body');
      modalBody.innerHTML = '<div class="modal__title modal__title-thanks">Заявка принята!</div><div class="modal__text modal__text-thanks">Спасибо, что выбрали нас!</div><div class="modal__thanks"><img src="img/thanks.png" alt=""></div><div class="modal__descr modal__descr-thanks">Рекомендуем подписаться на наши социальные сети и получить скидку 10%</div><div class="messengers"><a href="https://www.instagram.com/visual.up/" class="messenger"><img src="img/instagram.png" alt=""></a><a href="https://www.behance.net/visual_up" class="messenger"><img src="img/behance.png" alt=""></a></div>';

      if (document.documentElement.clientWidth > 600) {
        modalBody.style.background = 'none';
      }
    }
  }

  function showError(form) {
    var parent = form.closest('section') || form.closest('.modal');
    parent.querySelector('.form-error').style.display = 'block';
  }

  function hideError(form) {
    if (errs[form].length == 0) {
      var parent = form.closest('section') || form.closest('.modal');
      parent.querySelector('.form-error').style.display = 'none';
    }
  }

  function closeModal(event, modal) {
    var target = event.target;
    if (!(target.closest('.close') || target.classList.contains('modal') || event.key == 'Escape')) return;
    modal.classList.remove('on');
    modal.classList.add('off');
    modal.querySelector('.modal__inner').classList.remove('on');
    modal.querySelector('.modal__inner').classList.add('off');
    setTimeout(function () {
      modal.style.display = 'none';
    }, 1500);
    document.body.style.overflow = 'auto';
    modal.removeEventListener('click', closeModal);
    document.removeEventListener('keyup', closeModal);
  }

  function navigation() {
    var target = event.target;
    if (target.tagName != 'A' && !target.closest('.nav')) return;
    event.preventDefault();
    var obj = document.querySelector('.' + target.dataset.target + '__title');
    obj.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function scrollToBack() {
    var mainBlock = document.querySelector('.phone-bg').offsetHeight + 100;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop >= mainBlock) {
      document.querySelector('.arrow-top').style.display = 'flex';
    } else {
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
});