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
	default:
		icon = 'question';
	}
	return icon;
}

$(document).ready(function() {

	$('.search-input').on('keyup', function(){

		var q = $(this).val();
		var list = $('.search-results li');

		if ( q.length > 1 ) {

			_.each(list, function(li){
				$(li).addClass('hide');
				if ( $(li).text().toLowerCase().indexOf(q.toLowerCase()) !== -1 ) {
					$(li).removeClass('hide');
				}
			});

			var words = q.split(' ');
			var sentence = [];

			_.each(words, function(word, index){

				var icon = getIcon(word);

				word = '<span class="span-wrapper"><i class="fa fa-' + icon + '"></i><span class="span-content">' + word + '</span></span>';
				sentence.push(word);

			});

			$('.overlay').html(sentence.join(' '));

			$('.search-input').css('padding-left', '51px');

		} else {
			$('.overlay').html('');
			$('.search-input').css('padding-left', '0px');
		}

	});

});