/**
 * Created with JetBrains PhpStorm.
 * User: Eugene
 * E-mail: yevgen_grytsay@mail.ru
 * Date: 03.05.13
 * Time: 14:55
 */

(function() {
	var codes = {
		CTRL: 17,
		ENTER: 13,
		SHIFT: 16,
		TAB: 9
	};

	var ignoreList = [codes.TAB];

	var keyDownPool = [];

	init();

	function addToPool(code) {
		if($.inArray(code, ignoreList) !== -1) {
			return false;
		}
		if($.inArray(code, keyDownPool) === -1) {
			keyDownPool.push(code);
		}
	}

	function removeFromPool(code) {
		var index = $.inArray(code, keyDownPool);

		if(index === -1) {
			return false;
		}

		var arrLeft = keyDownPool.slice(0, index);
		var arrRight = keyDownPool.slice(index + 1);

		keyDownPool = arrLeft.concat(arrRight);
	}

	function isDown(code) {
		return $.inArray(code, keyDownPool) !== -1;
	}

	function init() {
		if(document.body) {
			addEventHandlers();
		} else {
			$(window).load(addEventHandlers);
		}
	}

	function addEventHandlers() {
		$(document.body).keydown(function(event) {
			addToPool(event.keyCode);
			//console.log('After adding: '+keyDownPool);
		});

		$(document.body).keyup(function(event) {
			removeFromPool(event.keyCode);
			//console.log('After removing: '+keyDownPool);
		});

		$(window).blur(function() {
			keyDownPool = [];
		});
	}

	window.keyObserver = {
		codes: codes,
		isDown: isDown
	};
})();