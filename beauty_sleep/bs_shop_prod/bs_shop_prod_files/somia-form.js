function child_minus(obj) {
	let count = $(obj).next('.child-count').text()
	if (count > 0) {
		$(obj).closest('.child-check').find('input[name="children_count"]').val(count*1 - 1)
		$(obj).next('.child-count').text(count*1 - 1)
		$(obj).closest('.child-check').find('.children_age').val(count*1 - 1)
		if (!$(obj).hasClass('elem')) $('.somia_form-content-block-form-childrens > div').last().remove()
	}
}

function child_plus(obj) {
	let count = $(obj).prev('.child-count').text()
	$(obj).closest('.child-check').find('input[name="children_count"]').val(count*1 + 1)
	$(obj).closest('.child-check').find('.children_age').val(count*1 + 1)
	$(obj).prev('.child-count').text(count*1 + 1)
	
	if (!$(obj).hasClass('elem')) $('.somia_form-content-block-form-childrens').append('<div class="somia_form-content-block-form-children child-check"><div class="select-down"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M8 1L4.5 5.06452L1 1" stroke="black"/></svg></div><select name="children['+(count*1 + 1)+'][sex]"><option value="сын">сын</option><option value="дочь">дочь</option></select><input type="hidden" name="children['+(count*1 + 1)+'][age]" value="0" class="children_age"><div class="child-counter"><div class="child-minus elem" onclick="child_minus(this)"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M8 1L4.5 5.06452L1 1" stroke="black"/></svg></div><div class="child-count">0</div><div class="child-plus elem" onclick="child_plus(this)"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M8 5.0625L4.5 0.997983L1 5.0625" stroke="black"/></svg></div></div></div>')
}

$(".somia_form-close").on('click', function() {
	$("html, body").removeClass("noscroll")
	$(".somia_form").hide()
})

$(".show_somia_form").on('click', function(e) {
	e.preventDefault()
	$("html, body").addClass("noscroll")
	$(".somia_form").css('display', 'flex')
})

$(".somia_form-content").on('submit', function() {
	$("html, body").removeClass("noscroll")
	$(".somia_form").hide()
})
