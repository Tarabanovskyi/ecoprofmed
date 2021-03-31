// // Dynamic Adapt v.1 Использовать в стартовый шаблон

(function () {
   let originalPositions = [];
   let daElements = document.querySelectorAll('[data-da]');
   let daElementsArray = [];
   let daMatchMedia = [];
   //Заполняем массивы
   if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
         const daElement = daElements[index];
         const daMove = daElement.getAttribute('data-da');
         if (daMove != '') {
            const daArray = daMove.split(',');
            const daPlace = daArray[1] ? daArray[1].trim() : 'last';
            const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
            const daDestination = document.querySelector('.' + daArray[0].trim())
            if (daArray.length > 0 && daDestination) {
               daElement.setAttribute('data-da-index', number);
               //Заполняем массив первоначальных позиций
               originalPositions[number] = {
                  "parent": daElement.parentNode,
                  "index": indexInParent(daElement)
               };
               //Заполняем массив элементов 
               daElementsArray[number] = {
                  "element": daElement,
                  "destination": document.querySelector('.' + daArray[0].trim()),
                  "place": daPlace,
                  "breakpoint": daBreakpoint
               }
               number++;
            }
         }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daBreakpoint = el.breakpoint;
         const daType = "max"; //Для MobileFirst поменять на min

         daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
         daMatchMedia[index].addListener(dynamicAdapt);
      }
   }
   //Основная функция
   function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daElement = el.element;
         const daDestination = el.destination;
         const daPlace = el.place;
         const daBreakpoint = el.breakpoint;
         const daClassname = "_dynamic_adapt_" + daBreakpoint;

         if (daMatchMedia[index].matches) {
            //Перебрасываем элементы
            if (!daElement.classList.contains(daClassname)) {
               let actualIndex = indexOfElements(daDestination)[daPlace];
               if (daPlace === 'first') {
                  actualIndex = indexOfElements(daDestination)[0];
               } else if (daPlace === 'last') {
                  actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
               }
               daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
               daElement.classList.add(daClassname);
            }
         } else {
            //Возвращаем на место
            if (daElement.classList.contains(daClassname)) {
               dynamicAdaptBack(daElement);
               daElement.classList.remove(daClassname);
            }
         }
      }
      customAdapt();
   }

   //Вызов основной функции
   dynamicAdapt();

   //Функция возврата на место
   function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
   }
   //Функция получения индекса внутри родителя
   function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
   }
   //Функция получения массива индексов элементов внутри родителя 
   function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
         const childrenElement = children[i];
         if (back) {
            childrenArray.push(i);
         } else {
            //Исключая перенесенный элемент
            if (childrenElement.getAttribute('data-da') == null) {
               childrenArray.push(i);
            }
         }
      }
      return childrenArray;
   }
   //Сортировка объекта
   function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
         if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
      });
      arr.sort(function (a, b) {
         if (a.place > b.place) { return 1 } else { return -1 }
      });
   }
   //Дополнительные сценарии адаптации
   function customAdapt() {
      const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }
}());
;

// =================================================================================

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

// =============<BURGER_MENU>=================================================================
$(document).ready(function () {
  $('.menu-burger-icon').click(function (event) {
    $('.menu-nav__body, .menu-burger-icon').toggleClass('_active');

  });
});
// =============</BURGER_MENU>================================================================

// =============<POP-UP>======================================================================
$('.info-content__button, .documents-item__button, .callback-item__button').on('click', function (e) {

  e.stopPropagation();
  $('.callback-popup').addClass('_active');
  $('.callback-popup__button-close, .callback-popup__button').on('click', function (e) {
    $('.callback-popup').removeClass('_active');
  });

});


$('.installment-main__button').on('click', function (e) {

  e.stopPropagation();
  $('.popup-installment__callback').addClass('_active');
  $('.callback-popup__button-close, .callback-popup__button').on('click', function (e) {
    $('.popup-installment__callback').removeClass('_active');
  });

});
// =============</POP-UP>=====================================================================


// ============<SLIDER-CARD>========================================================================

$(document).ready(function () {
  $(".slider-card").not('.slick-initialized').slick()

});


$('.slider-card').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  dots: true,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

$('.slider-partners-offices').slick({
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: false,
  dots: true,
  arrows: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});
// =============</SLIDER-CARD>======================================================================

// ==============<CARD-NAVIGATIONS>=================================================================
jQuery(document).ready(function ($) {

  var tabItems = $('.fake-for-navigations a'),
    tabContentWrapper = $('.popular-courses__content');

  tabItems.on('click', function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    if (!selectedItem.hasClass('_active')) {
      var selectedTab = selectedItem.data('content'),
        selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]'),
        slectedContentHeight = selectedContent.innerHeight();

      tabItems.removeClass('_active');
      selectedItem.addClass('_active');
      selectedContent.addClass('_active').siblings('li').removeClass('_active');
      // tabContentWrapper.animate({
      //   'min-height': slectedContentHeight
      // }, 200);
    }
  });

  var tabItems2 = $('.popular-courses__nav-list li'),
    tabContentWrapper2 = $('.popular-courses__content');

  tabItems2.on('click', function (event) {
    event.preventDefault();
    var selectedItem2 = $(this);
    if (!selectedItem2.hasClass('_active')) {
      var selectedTab2 = selectedItem2.data('content'),
        selectedContent2 = tabContentWrapper2.find('li[data-content="' + selectedTab2 + '"]'),
        slectedContentHeight2 = selectedContent2.innerHeight();

      tabItems2.removeClass('_active');
      selectedItem2.addClass('_active');
      selectedContent2.addClass('_active').siblings('li').removeClass('_active');
      // tabContentWrapper2.animate({
      //   'min-height': slectedContentHeight
      // }, 200);
    }
  });
});
// ================</CARD-NAVIGATIONS>==============================================================

// ================<GALLERY>=======================================================================
$(function () {
  $('.minimized').click(function (event) {
    var i_path = $(this).attr('src');
    $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
    $('#overlay, #magnify').fadeIn('fast');
  });

  $('body').on('click', '#close-popup, #overlay', function (event) {
    event.preventDefault();
    $('#overlay, #magnify').fadeOut('fast', function () {
      $('#close-popup, #magnify, #overlay').remove();
    });
  });
});
// ================</GALLERY>======================================================================

// ================<LOAD_MORE>=====================================================================
$(document).ready(function () {
  $(".partners__item").slice(0, 6).addClass('_active');
  $(".wrapper-button-partners a").on("click", function (e) {

    e.preventDefault();

    $(".partners__item:hidden").slice(0, 3).addClass('_active');
    if ($(".partners__item:hidden").length == 0) {
      $(".wrapper-button-partners").hide();
    }
  });

})
//=================</LOAD_MORE>=====================================================================

// ================<FAQ>============================================================================



$(document).ready(function () {
  $('.faq-main__item').click(function (event) {
    $(this).toggleClass('_active');
    $(this).find('.faq__answer').slideToggle();
    if ($('.faq-main__item').hasClass('_active')) {
      $('.faq-main__item').not(this).removeClass('_active');
      $('.faq-main__item').not(this).find('.faq__answer').slideUp();
    }
  });
});
const faqBtn = $('.faq-main__item'),
  faqMenu = $('.faq__answer');
$(document).click(function (e) {
  if (!faqBtn.is(e.target) && !faqMenu.is(e.target) && faqBtn.has(e.target).length === 0) {
    faqMenu.slideUp();
    faqBtn.removeClass('_active');
  };
});



// ================</FAQ>===========================================================================

// ================<YMAP>===========================================================================
; (function () {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('ymap', {
      center: [56.868462, 53.230912],
      zoom: 9
    }, {
      searchControlProvider: 'yandex#search'
    }),

      // Creating a content layout.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        balloonContent: 'г. Ижевск, ул. Софьи Ковалевской, 15'
      }, {
        /**
         * Options.
         * You must specify this type of layout.
         */
        iconLayout: 'default#image',
        // Custom image for the placemark icon.
        iconImageHref: '../img/icon_main-page/contacts/maps.png',
        // The size of the placemark.
        iconImageSize: [30, 42],
        /**
         * The offset of the upper left corner of the icon relative
         * to its "tail" (the anchor point).
         */
        iconImageOffset: [-5, -38]
      }),

      myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
        hintContent: 'A custom placemark icon with contents',
        balloonContent: 'This one — for Christmas',
        iconContent: '12'
      }, {
        /**
         * Options.
         * You must specify this type of layout.
         */
        iconLayout: 'default#imageWithContent',
        // Custom image for the placemark icon.
        iconImageHref: 'images/ball.png',
        // The size of the placemark.
        iconImageSize: [48, 48],
        /**
         * The offset of the upper left corner of the icon relative
         * to its "tail" (the anchor point).
         */
        iconImageOffset: [-24, -24],
        // Offset of the layer with content relative to the layer with the image.
        iconContentOffset: [15, 15],
        // Content layout.
        iconContentLayout: MyIconContentLayout
      });

    myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);
  });

})();

// ================</YMAP>===========================================================================

// ==================================================================================================
$(document).ready(function () {
  $('.offices-partners-title').click(function (event) {
    $(this).toggleClass('_active');
    $('.offices-partners-nav').slideToggle();
  });
});
// const faqBtn = $('.faq-main__item'),
//   faqMenu = $('.faq__answer');
// $(document).click(function (e) {
//   if (!faqBtn.is(e.target) && !faqMenu.is(e.target) && faqBtn.has(e.target).length === 0) {
//     faqMenu.slideUp();
//     faqBtn.removeClass('_active');
//   };
// });
// ==================================================================================================
