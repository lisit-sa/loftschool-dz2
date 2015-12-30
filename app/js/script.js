/*--------Разбиваем информационный блок на колонки------*/
var setColumn = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		_column();
	};
/*---------Подключаем плагин columnizer-------*/
var _column = function(){
		$('.info__main').columnize({ columns: 2 });
	};

	return {
		init: init
	};
})();

setColumn.init();


/*--------Сброс чекбоксов (по нажатию на кнопку "сбросить фильтр" убирается атрибут checked---------*/
var resetFilter = (function(){
	$('.accordeon__reset-filter').click(function(event){
	event.preventDefault();
    $('.list-check__input-check-origin').removeAttr('checked');
});
})();


/*-------Стилизуем Select - выпадающий список с выбором------*/
var setSelect = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		_select();
	};
/*--------Подключаем плагин Formstyler-------*/
	var _select = function(){
		$('.filter__select').styler();
	};

	return {
		init: init
	};
})();

setSelect.init();



/*---------Создаем аккордеон----------*/
var accordeon = (function() {

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		var trigger = $('.accordeon__trigger');
		trigger.on('click', _itemHide); 
		trigger.on('mouseover', _viewArrow);
		trigger.on('mouseleave', _removeArrow);
	};

/*--------Добавляем класс hide-margin, при помощи которого двигается аккордеон--------*/
	var _itemHide = function(){
		var $this = $(this);

		$this.toggleClass('hide__trigger');

		var _accordeonItem = $this.closest('.accordeon__item');
		var _accordeonHide = _accordeonItem.find('.accordeon__item__select');

		_accordeonHide.slideToggle(); //переключение видимости элемента .accordeon__trigger
	};
/*----------Убираем стрелочки вверх-вниз при убирании мышки с аккордеона-----------*/
	var _removeArrow = function() {
		$(this).removeClass('hide-accordeon').removeClass('show-accordeon')
	};
/*--------При наведении на аккордеон появляются стрелочки вверх и вниз-------*/
	var _viewArrow = function(){
		var $this = $(this);

		var _accordeonItem = $this.closest('.accordeon__item');
		var _accordeonHide = _accordeonItem.find('.accordeon__item__select');

		if(_accordeonHide.is(':visible')) {
			$this.removeClass('show-accordeon').addClass('hide-accordeon');
		} else {
			$this.removeClass('hide-accordeon').addClass('show-accordeon');
		}

	};
	return {
		init: init
	};

})();

accordeon.init();

/*-----------Создаем радио-инпуты-----------*/
var inputRadio = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		$('.list-radio__input-radio-origin').on('change', _radioselect);
	};

	var _radioselect = function(){
		var $this = $(this);

		var listRadio = $this.closest('.list-radio');
		var typeRadio = listRadio.find('input[type=radio]');

		typeRadio.not(this).prop('checked', false)
	};

	return {
		init: init
	};
})();

inputRadio.init();

/*-----------Смена отображения товаров-----------*/
var changeView = (function(){
	var init = function(){
		_setUpListners();
	};


	var _setUpListners = function(){
		$('.view-list__link').on('click', _addClass);
		_setOneView();
	};

	var _setOneView = function(){
		$('.view-list__item_list-one')
			.closest('.view-list__item')
			.addClass('active');
	};

	var _addClass = function(event){
		event.preventDefault();

		var $this = $(this);

		var itemProduct = $('.product-item');

		var listItem = $this.closest('.view-list__item');
/*--------После добавления определeнных классов, заданных в css, меняется отображение---------*/
		if(listItem.hasClass('view-list__item_list-one')){
			listItem.addClass('active');
			$('.view-list__item').not(listItem).removeClass('active');

			itemProduct.each( function(){
				$(this).removeClass('products-list_tile-view products-list_list-view');
			} );
		}else if(listItem.hasClass('view-list__item_list-two')){
			listItem.addClass('active');
			$('.view-list__item').not(listItem).removeClass('active');

			itemProduct.each( function(){
				$(this).removeClass('products-list_list-view')
					.addClass('products-list_tile-view');
			} );
		} else if(listItem.hasClass('view-list__item_list-three')){
			listItem.addClass('active');
			$('.view-list__item').not(listItem).removeClass('active');

			itemProduct.each( function(){
				$(this).removeClass('products-list_tile-view')
					.addClass('products-list_list-view');
			} );
		}
  };

	return {
		init: init
	};
})();

changeView.init();

/*--------------Слайдер цен------------------*/
$(document).ready(function(){
$("#slider").slider({
	min: 0,
	max: 26000,
	values: [0,26000],
	range: true,
	stop: function(event, ui) {
		$("input#minCost").val($("#slider").slider("values",0));
		$("input#maxCost").val($("#slider").slider("values",1));
		
    },
    slide: function(event, ui){
		$("input#minCost").val($("#slider").slider("values",0));
		$("input#maxCost").val($("#slider").slider("values",1));
    }
});

$("input#minCost").change(function(){

	var value1=$("input#minCost").val();
	var value2=$("input#maxCost").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		$("input#minCost").val(value1);
	}
	$("#slider").slider("values",0,value1);	
});

	
$("input#maxCost").change(function(){
		
	var value1=$("input#minCost").val();
	var value2=$("input#maxCost").val();
	
	if (value2 > 26000) { value2 = 26000; $("input#maxCost").val(26000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		$("input#maxCost").val(value2);
	}
	$("#slider").slider("values",1,value2);
});
});


/*---------------Слайдшоу-------------*/

slideShow = (function() {

  _changeSlide = function(slide) {

    var container = slide.closest('.product-item__slider');
    var path = $(slide).attr('href');
    var display = container.find('.slider-product__main-img');


    return display.fadeOut(function() {
      $(this).attr('src', path).fadeIn();
    });
  };
  return {
    init: function() {
      return $('.slider-product__min-list a').on('click', function(event) {
        event.preventDefault();
        var slide = $(this);
        return _changeSlide(slide);
      });
    }
  };
})();
slideShow.init();