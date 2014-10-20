function getIcon(word) {
	var icon;
	switch (word.toLowerCase()) {
	case 'brian':
	case 'rhea':
	case 'john':
		icon = 'user';
		break;
	case 'born':
		icon = 'calendar';
		break;
	case 'paris':
		icon = 'map-marker';
		break;
	case 'a':
	case 'an':
	case 'in':
	case 'is':
	case 'of':
	case 'on':
	case 'the':
		icon = 'none';
		break;
	default:
		icon = 'question';
	}
	return icon;
}

function shouldCombine(word) {
	var abbreviate = false;
	switch (word.toLowerCase()) {
	case 'born':
	case 'died':
	case 'married':
		abbreviate = true;
		break;
	default:
		abbreviate = false;
	}
	return abbreviate;
}

function combine(first, second) {
	return first.charAt(0) + ':' + second;
}

$(document).ready(function() {

	$('.search-input').on('keyup', function(){

		var q = $(this).val();

		if ( q.length > 1 ) {

			var list = $('.search-results li');
			_.each(list, function(li){
				$(li).addClass('hide');
				if ( $(li).text().toLowerCase().indexOf(q.toLowerCase()) !== -1 ) {
					$(li).removeClass('hide');
				}
			});

			var words = q.split(' ');
			var markupSentence = [];
			var newQ = [];

			_.each(words, function(word, index){

				var icon = getIcon(word);
				var plainWord = word;

				if ( icon === 'none' ) {
					word = '<span class="span-wrapper no-icon"><span class="span-content">' + word + '</span></span>';
				} else {
					word = '<span class="span-wrapper ' + icon + '"><i class="fa fa-' + icon + '"></i><span class="span-content">' + word + '</span></span>';
				}

				var twoWordsAgo = index - 2;
				var oneWordAgo = index - 1;

				if ( twoWordsAgo >= 0 && shouldCombine(words[twoWordsAgo]) ) {
					delete markupSentence[twoWordsAgo];
					delete markupSentence[oneWordAgo];
					var combinedWord = '<span class="span-wrapper ' + icon + '"><i class="fa fa-' + icon + '"></i><span class="span-content">' + combine( words[twoWordsAgo], words[oneWordAgo] ) + '</span></span>';

					markupSentence.push(combinedWord);
					markupSentence.push(word);

					newQ.push(combine( words[twoWordsAgo], words[oneWordAgo] ));
					newQ.push(plainWord);

				} else {
					markupSentence.push(word);
					newQ.push(plainWord + ' ');
				}

				console.log(plainWord);

			});

			$('.overlay').html(markupSentence.join(' '));

			var newQstr = newQ.join(' ');
			console.log(newQ);

			// $('.search-input').prop('value', newQstr);

		} else {
			$('.overlay').html('');
			// $('.search-input').css('padding-left', '0px');
		}



	});

});