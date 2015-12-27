/*--------Columnizer------*/
var setColumn = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		_column();
	};

	var _column = function(){
		$('.info__main').columnize({ width: 523 });
	};

	return {
		init: init
	};
})();

setColumn.init();


/*--------Сброс чекбоксов---------*/
var resetFilter = (function(){
	$('.accordeon__reset-filter').click(function(event){
	event.preventDefault();
    $('.list-check__input-check-origin').removeAttr('checked');
});
})();


/*-------Select - выпадающий список с выбором------*/
// var setSelect = (function(){
// 	var init = function(){
// 		_setUpListners();
// 	};

// 	var _setUpListners = function(){
// 		_select();
// 	};

// 	var _select = function(){
// 		$('.filter__select').styler();
// 	};

// 	return {
// 		init: init
// 	};
// })();

// setSelect.init();



//***************************Accordeon toggle************************
var accordeonToggle = (function() {

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		var trigger = $('.accordeon__trigger');
		trigger.on('click', _itemToggle);
		trigger.on('hover', _viewArrow);
		trigger.on('mouseleave', _removeArrow);
	};


	var _itemToggle = function(){
		var $this = $(this);

		$this.toggleClass('hide-margin');

		var _accordeonItem = $this.closest('.accordeon__item');
		var _accordeonHide = _accordeonItem.find('.accordeon__item__select');

		_accordeonHide.slideToggle();
	};
	var _removeArrow = function() {
		$(this).removeClass('hide-accordeon').removeClass('show-accordeon')
	};
	var _viewArrow = function(){
		var $this = $(this);

		var _accordeonItem = $this.closest('.accordeon__item');
		var _accordeonHide = _accordeonItem.find('.accordeon__item__select');

		if(_accordeonHide.is(':visible')) {
			console.log('visible');

			//var currentTrigger = $(this).closest('.accordeon__item').find('.accordeon__trigger');

			$this.removeClass('show-accordeon').addClass('hide-accordeon')
		} else {
			console.log('hidden');

			$this.removeClass('hide-accordeon').addClass('show-accordeon')
		}

	

	};
	return {
		init: init
	};

})();

accordeonToggle.init();

var oneRadio = (function(){
	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		$('.list-radio__input-radio-origin').on('change', _unselect);
	};

	var _unselect = function(){
		var $this = $(this);

		var parentRadio = $this.closest('.list-radio');
		var otherRadio = parentRadio.find('input[type=radio]');

		otherRadio.not(this).prop('checked', false)
	};

	return {
		init: init
	};
})();

oneRadio.init();


var changeListOne = $('.view-list__item_list-two'),
    _viewListOne = $('.product__list');

changeListOne.on('click', function() {
  
  _viewListOne
  .removeClass()
  .addClass('products-list_list-view');
});