var browser = {
    // Opera 8.0+
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    // Firefox 1.0+
    isFirefox: typeof InstallTrigger !== 'undefined',
    // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    // Internet Explorer 6-11
    isIE: /*@cc_on!@*/ false || !!document.documentMode,
    // Edge 20+
    isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
    // Chrome 1+
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isYandex: !!window.yandex,
    isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
  },
  // Размреы экранов для медиазапросов
  // mediaQueries = {
  //   's': '(min-width:575.98px)',
  //   'm': '(min-width:767.98px)',
  //   'lg': '(min-width:1023.98px)',
  //   'xl': '(min-width:1439.98px)'
  // },
  SLIDER = {
    // nextArrow: '<button type="button" class="arrow"></button>',
    // prevArrow: '<button type="button" class="arrow"></button>',
    // dot: '<button type="button" class="dot"></button>',
    hasSlickClass: function($el) {
      return $el.hasClass('slick-slider');
    },
    unslick: function($el) {
      $el.slick('unslick');
    },
    createArrow: function(className, inside) {
      className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;
      return '<button type="button" class="arrow arrow_' + className + '">' + inside + '</button>';
    },
    // setImages: function(slides) {
    //   for (let i = 0, len = slides.length; i < len; i++) {
    //     let img = q('img', slides[i]);
    //     // Если элемент найден и он без display:none
    //     if (img && img.offsetParent) {
    //       img.src = img.getAttribute('data-lazy') || img.getAttribute('data-src');
    //     }
    //   }
    // }
  },
  /*
Объединение слушателей для window на события 'load', 'resize', 'scroll'
Все слушатели на окно следует задавать через него, например:
  window.resize.push(functionName)
Все ф-ии, добавленные в [] window.resize, будут заданы одним слушателем
*/
  windowFuncs = {
    load: [],
    resize: [],
    scroll: [],
    call: function(event) {
      let funcs = windowFuncs[event.type] || event;
      for (let i = funcs.length - 1; i >= 0; i--) {
        console.log(funcs[i].name);
        funcs[i]();
      }
    }
  },

  mask, // ф-я маски телефонов в поля ввода (в файле telMask.js)
  lazy,
  menu,
  burger,
  hdr,
  overlay,
  body,
  fakeScrollbar,
  // Сокращение записи querySelector
  q = function(selector, element) {
    element = element || body;
    return element.querySelector(selector);
  },
  // Сокращение записи querySelectorAll + перевод в массив
  qa = function(selectors, element, toArray) {
    element = element || body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // Сокращение записи getElementById
  id = function(selector) {
    return document.getElementById(selector);
  },
  // Фикс 100% высоты экрана для моб. браузеров
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  // Сокращение записи window.matchMedia('query').matches
  media = function(media) {
    return window.matchMedia(media).matches;
  },
  // Функция создания мобильного меню
  mobileMenu,
  // Прокрутка до элемента при помощи requestAnimationFrame
  scrollToTarget = function(e, target) {
    e.preventDefault();

    if (this === window) {
      _ = e.target;
    } else {
      _ = this;
    }

    if (target == 0) {
      target = body;
    } else {
      target = target || _.getAttribute('data-scroll-target');
    }

    if (!target && _.tagName === 'A') {
      target = q(_.getAttribute('href'));
    }

    if (target.constructor === String) {
      target = q(target);
    }

    if (!target) {
      console.warn('Scroll target not found');
      return;
    }

    menu && menu.close();

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  },
  // Функция запрета/разрешения прокрутки страницы
  pageScroll = function(disallow) {
    fakeScrollbar.classList.toggle('active', disallow);
    body.classList.toggle('no-scroll', disallow);
    body.style.paddingRight = disallow ? fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px' : '';
  },
  // Функция липкого элемента средствами js
  sticky = function($el, fixThresholdDir, className) {
    $el = typeof $el === 'string' ? q($el) : $el;
    className = className || 'fixed';
    fixThresholdDir = fixThresholdDir || 'bottom';

    let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + pageYOffset,
      $elClone = $el.cloneNode(true),
      $elParent = $el.parentElement,
      fixElement = function() {
        if (!$el.classList.contains(className) && pageYOffset >= fixThreshold) {
          $elParent.appendChild($elParent.replaceChild($elClone, $el));
          $el.classList.add(className);

          window.removeEventListener('scroll', fixElement);
          window.addEventListener('scroll', unfixElement);
        }
      },
      unfixElement = function() {
        if ($el.classList.contains(className) && pageYOffset <= fixThreshold) {
          $elParent.replaceChild($el, $elClone);
          $el.classList.remove(className);

          window.removeEventListener('scroll', unfixElement);
          window.addEventListener('scroll', fixElement);
        }
      };

    $elClone.classList.add('clone');
    fixElement();
    window.addEventListener('scroll', fixElement);
  };

document.addEventListener('DOMContentLoaded', function() {
  body = document.body;

  ;(function() {
    let setCursorPosition = function(pos, inputElement) {
      inputElement.focus();
      if (inputElement.setSelectionRange) {
        inputElement.setSelectionRange(pos, pos);
      } else if (inputElement.createTextRange) {
        let range = inputElement.createTextRange();
  
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
  
    mask = function() {
      let pattern = '+7 (___) ___-__-__',
        i = 0,
        def = pattern.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
  
      if (def.length >= val.length) {
        val = def;
      }
  
      this.value = pattern.replace(/./g, function(match) {
        return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
      });
  
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
          this.classList.remove('filled');
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    };
  
    let input = qa('[name=tel]');
  
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener('input', mask);
      input[i].addEventListener('focus', mask);
      input[i].addEventListener('blur', mask);
    }
  
  })();

  ;
  (function() {
    // Массив форм, на которые будет добавлена валидация
    let $forms = [
      id('request-form'),
      id('calc-form'),
    ];
  
    let formValidator = function(params) {
      let $form = params.form,
        $formBtn = params.formBtn,
        $uploadFilesBlock = params.uploadFilesBlock,
        errorsClass = 'invalid',
        $filesInput = params.filesInput,
        // Правила проверки форм, аналогично jquery.validate
        rules = {
          name: {
            required: true,
            pattern: /[^0-9]/,
          },
          tel: {
            required: true,
            pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
            // or: 'email'
          },
          email: {
            required: true,
            pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
            // or: 'tel'
          },
          msg: {
            required: true,
            pattern: /[^\<\>\[\]%\&'`]+$/
          },
          policy: {
            required: true
          }
        },
        messages = {
          tel: {
            required: 'Введите ваш телефон',
            pattern: 'Укажите верный телефон'
          },
          name: {
            required: 'Введите ваше имя',
            pattern: 'Имя не может содержать цифры'
          },
          email: {
            required: 'Введите ваш E-mail',
            pattern: 'Введите верный E-mail'
          },
          msg: {
            required: 'Введите ваше сообщение',
            pattern: 'Введены недопустимые символы'
          },
          policy: {
            required: 'Согласитель с политикой обработки персональных данных'
          }
        },
        /*
          Функция получения значения полей у текущей формы.
          Ищет только те элементы формы, именя которых указаны в rules.
          Возвращает объект:
          {название-поля: значение-поля}
          Например:
          {'user-email': 'mail@mail.ru'}
        */
        getFormData = function($form) {
          let formElements = $form.elements,
            values = {};
  
          for (let rule in rules) {
            let formElement = formElements[rule];
  
            if (formElement) {
              values[rule] = formElement.value;
            }
          }
  
          return values;
        },
        /*
          Функция проверки правильности заполнения формы.
        */
        validationForm = function(event) {
          let errors = {},
            thisForm = $form,
            values = getFormData(thisForm);
  
          for (let elementName in values) {
            let rule = rules[elementName],
              $formElement = thisForm[elementName],
              elementValue = values[elementName],
              or = rule.or,
              $orFormElement = thisForm[or];
  
            if (rule) {
              if ($formElement.hasAttribute('required') || rule.required === true) {
                let elementType = $formElement.type,
                  pattern = rule.pattern;
  
                // Если элемент не чекнут или пустой
                if (((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked) ||
                  elementValue === '') {
  
                  if (or && $orFormElement) {
                    if ($orFormElement.value === '') {
                      errors[elementName] = messages[elementName].required;
                      continue;
                    }
                  } else {
                    errors[elementName] = messages[elementName].required;
                    continue;
                  }
                }
  
                // Если текстовый элемент, у которого есть щаблон для заполнения
                if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
                  if (elementValue !== '' && pattern.test(elementValue) === false) {
                    errors[elementName] = messages[elementName].pattern;
                    continue;
                  }
                }
  
                hideError($formElement);
              }
            }
          }
  
          if (Object.keys(errors).length == 0) {
            thisForm.removeEventListener('change', validationForm);
            thisForm.removeEventListener('input', validationForm);
            $form.validatie = true;
          } else {
            thisForm.addEventListener('change', validationForm);
            thisForm.addEventListener('input', validationForm);
            showErrors(thisForm, errors);
            $form.validatie = false;
          }
  
        },
        showErrors = function($form, errors) {
          let $formElements = $form.elements;
  
          for (let elementName in errors) {
            let errorText = errors[elementName],
              $errorElement = `<span class="${errorsClass}">${errorText}</span>`,
              $formElement = $formElements[elementName],
              $nextElement = $formElement.nextElementSibling;
  
            // const parentEl = $formElement.parentElement
            // const fieldText = q('.field__text', parentEl)
  
            // if (fieldText) {
            //   fieldText.classList.add('t_invalid')
            // }
  
            if ($nextElement && $nextElement.classList.contains(errorsClass)) {
              if ($nextElement.textContent !== errorText) {
                $nextElement.textContent = errorText;
              }
              continue;
            } else {
              $formElement.insertAdjacentHTML('afterend', $errorElement);
            }
  
            $formElement.classList.add(errorsClass);
          }
  
        },
        hideError = function($formElement) {
          let $nextElement = $formElement.nextElementSibling;
          $formElement.classList.remove(errorsClass);
          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            $nextElement.parentElement.removeChild($nextElement);
          }
          const parentEl = $formElement.parentElement
          const fieldText = q('.field__text', parentEl)
  
          if (fieldText) {
            fieldText.classList.remove('t_invalid')
          }
        },
        submitHandler = function(e) {
          let $form = e.target || q('#' + e.detail.id + '>form'),
            eventType = e.type;
  
          if (eventType === 'wpcf7mailsent') {
            let $formElements = $form.elements;
  
            for (let i = 0; i < $formElements.length; i++) {
              hideError($formElements[i]);
              $formElements[i].classList.remove('filled');
            }
  
            setTimeout(function(){
              $form.classList.remove('sent');
            }, 3000);
  
            thanksPopup.openPopup();
            // thanksPopupTimer = setTimeout(function() {
            //   thanksPopup.closePopup();
            // }, 3000);
  
            $form.reset();
            if ($uploadFilesBlock) {
              $uploadFilesBlock.innerHTML = '';
            }
            // if ($form === $quizForm) {
            //   id('quiz').resetQuiz();
            // }
            // console.log('отправлено');
          } else if (eventType === 'wpcf7mailfailed') {
            // console.log('отправка не удалась');
            errorPopup && errorPopup.openPupup()
          }
          $form.classList.remove('loading');
        },
        toggleInputsClass = function() {
          let $input = event.target,
            type = $input.type,
            files = $input.files,
            classList = $input.classList,
            value = $input.value;
  
          if (type === 'text' || type === 'email' || type === 'tel' || type === 'number' || $input.tagName === 'TEXTAREA') {
            if (value === '') {
              classList.remove('filled');
            } else {
              classList.add('filled');
            }
          } else if (type === 'file') {
            // $input.filesArray = [];
  
            let uploadedFiles = '';
            for (let i = 0, len = files.length; i < len; i++) {
              // $input.filesArray[i] = files[i];
              uploadedFiles += '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' + files[i].name + '</span></span>';
            }
            $uploadFilesBlock.innerHTML = uploadedFiles;
          }
        };
  
      $form.setAttribute('novalidate', '');
      $form.validatie = false;
      $formBtn.addEventListener('click', function() {
        validationForm();
        if ($form.validatie === false) {
          event.preventDefault();
        } else {
          $form.classList.add('loading');
        }
      });
      if (!document.wpcf7mailsent) {
        document.addEventListener('wpcf7mailsent', submitHandler);
        document.wpcf7mailsent = true;
      }
      $form.addEventListener('input', toggleInputsClass);
    };
  
    for (var i = $forms.length - 1; i >= 0; i--) {
      if ($forms[i]) {
        formValidator({
          form: $forms[i],
          formBtn: q('.btn', $forms[i]) || q('.btn[form="' + $forms[i].id + '"]'),
          uploadFilesBlock: q('.uploadedfiles', $forms[i]),
          filesInput: q('input[type="file"]', $forms[i])
        });
      }
    }
  })();

  mobileMenu = function(_) {
    let setMenuStyles = function(trf, trs) {
        let args = [trf, trs],
          props = ['transform', 'transition'],
          values = ['translate3d(' + trf + ', 0px, 0px)', 'transform ' + trs];
  
        for (let i = args.length - 1; i >= 0; i--) {
          if (args[i] !== 0) {
            if (args[i] === '') {
              args[i] = '';
            } else {
              args[i] = values[i];
            }
            menuCnt.style[props[i]] = args[i];
          }
        }
      },
      checkForString = function(variable) {
        return variable.constructor === String ? q(variable) : variable;
      },
      openMenu = function() {
        if (!opened) {
          if (menu.hasAttribute('style')) {
            menu.removeAttribute('style');
            menu.offsetHeight;
          }
          menu.classList.add('active');
          openBtn.classList.add('active');
          menuCnt.scrollTop = 0;
  
          if (!fade) {
            setMenuStyles('0px', '.5s');
            menuWidth = menuCnt.offsetWidth;
          }
          if (!allowPageScroll) {
            pageScroll(true);
          }
        }
      },
      closeMenu = function(e, forSwipe) {
        if (opened) {
          let target = e && e.target;
          // Если меню открыто и произошел свайп или нет события (закрыто вызовом функции close()) или есть евент и его св-ва
          if (forSwipe || !e || (e.type === 'keyup' && e.keyCode === 27 || target === menu || target === closeBtn)) {
            menu.classList.remove('active');
            openBtn.classList.remove('active');
  
            if (!fade) {
              setMenuStyles(initialTransformX, '.5s');
            }
          }
        }
      },
      swipeStart = function(e) {
        if (allowSwipe) {
          let evt = e.touches[0] || window.e.touches[0];
  
          isSwipe = isScroll = false;
          posInitX = posX1 = evt.clientX;
          posInitY = posY1 = evt.clientY;
          swipeStartTime = Date.now();
  
          menuCnt.addEventListener('touchend', swipeEnd);
          menuCnt.addEventListener('touchmove', swipeAction);
          setMenuStyles(0, '');
        }
      },
      swipeAction = function(e) {
        if (allowSwipe) {
          let evt = e.touches[0] || window.e.touches[0],
            style = menuCnt.style.transform,
            transform = +style.match(trfRegExp)[0];
  
          posX2 = posX1 - evt.clientX;
          posX1 = evt.clientX;
  
          posY2 = posY1 - evt.clientY;
          posY1 = evt.clientY;
  
          // Если еще не определено свайп или скролл (двигаемся в бок или вверх/вниз)
          if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2),
              posX = Math.abs(posX2);
  
            if (posY > 7 || posX2 === 0) {
              isScroll = true;
            } else if (posY < 7) {
              isSwipe = true;
            }
          }
  
          if (isSwipe) {
            // Если двигаемся влево или вправо при уже открытом меню, фиксируем позицию
            if ((toLeft && posInitX > posX1) || (toRight && posInitX < posX1)) {
              setMenuStyles('0px', 0);
              return;
            }
            setMenuStyles(transform - posX2 + 'px', 0);
          }
        }
      },
      swipeEnd = function(e) {
        posFinal = posInitX - posX1;
  
        let absPosFinal = Math.abs(posFinal);
  
        swipeEndTime = Date.now();
  
        if (absPosFinal > 1 && isSwipe) {
          if (toLeft && posFinal < 0 || toRight && posFinal > 0) {
            if (absPosFinal >= menuWidth * swipeThreshold || swipeEndTime - swipeStartTime < 300) {
              closeMenu(e, true);
            } else {
              opened = false;
              openMenu(e, true);
            }
          }
          allowSwipe = false;
        }
  
        menu.removeEventListener('touchend', swipeEnd);
        menu.removeEventListener('touchmove', swipeAction);
  
      },
      transitionEnd = function(e) {
        if (fade) {
          if (e.propertyName === 'opacity') {
            transitionEndEvents();
          }
        } else {
          if (e.propertyName === 'transform') {
            transitionEndEvents();
          }
        } 
        allowSwipe = true;
      },
      transitionEndEvents = function() {
        if (opened) {
          menu.isOpened = opened = false;
          openBtn.addEventListener('click', openMenu);
          closeBtn.removeEventListener('click', closeMenu);
          if (!allowPageScroll) {
            pageScroll(false);
          }
          console.log('sticky hdr');
          sticky(hdr);
        } else {
          menu.isOpened = opened = true;
          openBtn.removeEventListener('click', openMenu);
          closeBtn.addEventListener('click', closeMenu);
        }
      },
      init = function() {
        menu = checkForString(_.menu);
        menuCnt = checkForString(_.menuCnt);
        openBtn = checkForString(_.openBtn);
        closeBtn = checkForString(_.closeBtn);
        allowPageScroll = options.allowPageScroll;
        toRight = options.toRight;
        toLeft = options.toLeft;
        initialTransformX = toLeft ? '100%' : toRight ? '-100%' : 0;
        fade = options.fade;
  
        setListeners('add');
  
        if (fade) {
          toRight = toLeft = false;
        } else {
          setMenuStyles(initialTransformX, 0);
          menu.addEventListener('touchstart', swipeStart);
        }
        menu.isOpened = false;
      },
      setListeners = function(action) {
        openBtn[action + 'EventListener']('click', openMenu);
        menu[action + 'EventListener']('click', closeMenu);
        menu[action + 'EventListener']('transitionend', transitionEnd);
        document[action + 'EventListener']('keyup', closeMenu);
      },
      destroy = function() {
        if (opened) {
          closeMenu();
        }
  
        if (fade) {
          toRight = toLeft = false;
        } else {
          setMenuStyles('', '');
          menu.removeEventListener('touchstart', swipeStart);
        }
  
        setListeners('remove');
        menu = null;
        menuCnt = null;
        openBtn = null;
        closeBtn = null;
      },
      applyMediaParams = function() {
        // console.log('applyMediaParams');
        if (targetMediaQuery) {
          // console.log('set ' + targetMediaQuery + ' params');
          for (let option in responsive[targetMediaQuery]) {
            options[option] = responsive[targetMediaQuery][option];
          }
          currentMediaQuery = targetMediaQuery;
        } else { // set initial params
          for (let option in initialOptions) {
            options[option] = initialOptions[option];
          }
          currentMediaQuery = null;
        }
        if (menu) {
          destroy();
          init();
        }
      },
      checkMedia = function() {
        if (responsive) {
          targetMediaQuery = null;
          for (let mediaQuery in responsive) {
            if (media(mediaQuery)) {
              targetMediaQuery = mediaQuery;
            }
          }
          if (targetMediaQuery !== currentMediaQuery) {
            applyMediaParams();
          }
        }
        if (!menu) {
          init();
        }
      },
      options = JSON.parse(JSON.stringify(_)),
      initialOptions = JSON.parse(JSON.stringify(_)),
      responsive = _.responsive,
      targetMediaQuery = null,
      currentMediaQuery = null,
      menu,
      menuCnt,
      openBtn,
      closeBtn,
      swipeStartTime,
      swipeEndTime,
      allowPageScroll,
      swipeThreshold = 0.5,
      toRight,
      toLeft,
      initialTransformX,
      fade,
      startPageY = pageYOffset,
      trfRegExp = /([-0-9.]+(?=px))/,
      isSwipe = false,
      isScroll = false,
      allowSwipe = false,
      opened = false,
      posX1 = 0,
      posX2 = 0,
      posY1 = 0,
      posY2 = 0,
      posInitX = 0,
      posInitY = 0,
      posFinal = 0,
      menuWidth = 0;
  
    if (_.menu) {
      // Элементы не изменяются через responsive
      checkMedia();
  
      windowFuncs.resize.push(checkMedia);
  
      // Если разрешена прокрутка, то закрываем при прокрутке
      // if (allowPageScroll) {
      //   windowFuncs.scroll.push(closeMenu);
      // }
  
      return {
        options: options,
        menu: menu,
        menuCnt: menuCnt,
        openBtn: openBtn,
        closeBtn: closeBtn,
        open: openMenu,
        close: closeMenu,
        destroy: destroy,
        opened: opened
      };
    }
  };

  // В основном для IE
  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (!HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }

  fakeScrollbar = id('fake-scrollbar');

  // burger = q('.hdr__burger');

  // hdr = q('.hdr');

  // menu = mobileMenu({
  //   menu: q('.menu'),
  //   menuCnt: q('.menu__cnt'),
  //   openBtn: burger,
  //   closeBtn: burger,
  //   toRight: true,
  //   fade: false,
  //   allowPageScroll: false
  // });

  // let navLinks = qa('.nav-link, .hdr__callback');

  // for (let i = 0, len = navLinks.length; i < len; i++) {
  // navLinks[i].addEventListener('click', scrollToTarget);
  // }

  // sticky(hdr);

  // thanksPopup = new Popup('.thanks', {
  // closeButtons: '.thanks__close'
  // });

  // Инициализация lazyload
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  window.svg4everybody && svg4everybody();

  // Добавление расчета vh на ресайз окна
  windowFuncs.resize.push(setVh);

  // Сбор событий resize, load, scroll и установка на window
  for (let eventType in windowFuncs) {
    if (eventType !== 'call') {
      let funcsArray = windowFuncs[eventType];
      if (funcsArray.length > 0) {
        windowFuncs.call(funcsArray);
        window.addEventListener(eventType, windowFuncs.call);
      }
    }
  }

  // настройки grab курсора на всех слайдерах
  // let slickLists = $('.slick-list.draggable');

  // slickLists.on('mousedown', function() {
  //   $(this).addClass('grabbing');
  // }).on('beforeChange', function() {
  //   $(this).removeClass('grabbing');
  // });

  // $(document).on('mouseup', function() {
  //   slickLists.removeClass('grabbing');
  // });
});