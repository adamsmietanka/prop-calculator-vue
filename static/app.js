$('a#engine-link').on('click', () => {
    $('#prop-tab').hide();
    $('#engine-tab').show();
});

$('a#prop-link').on('click', () => {
    $('#engine-tab').hide();
    $('#prop-tab').show();
});

$(function hideInput() {
    $('input:radio[name="blade_type"]').on('change',function() {
        if ($(this).val() === 'var') {
            $('#angle-input, #speed-input').hide();
            $('#power-coefficient-input').show();
        } else {
            $('#angle-input, #speed-input').show();
            $('#power-coefficient-input').hide();
        }
    });
});