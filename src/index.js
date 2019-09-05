import $ from 'jquery'

$(document).ready(() => {
  var loadTopWord = () => {
    $.get('https://wordwatch-api.herokuapp.com/api/v1/top_word', (data) => {
      showTopWord(data.word);
    })
  }

  var showTopWord = (word) => {
    $('.word-count').children().last().remove();
    $('.word-count').children().last().remove();
    let top_word = Object.keys(word)[0].charAt(0).toUpperCase() + Object.keys(word)[0].slice(1);
    let word_count = word[Object.keys(word)[0]];
    $('.word-count').append(`
      <h2>${top_word}</h2>
      <p>Count: ${word_count}</p>
      `)
  }

  var clearSuccessMessage = () => {
    setTimeout(() => {
      $('#success-message').children().remove()
    }, 5000)
  }

  $('#word-submit').click(() => {
    let text = $.trim($("#word-text").val());
    text.split(' ').forEach(word => {
      $.post('https://wordwatch-api.herokuapp.com/api/v1/words', { word: { value: word } }, (data) => {
        $('#success-message').append(`
          <p>${data['message']}</p>
          `)
      })
      .fail(() => {
        $('#success-message').append(`
          <p>'${word}' not added - make sure to only use letters</p>
          `)
      })
    })
    $("#word-text").val('')
    loadTopWord();
    clearSuccessMessage();
  })

  loadTopWord();
})
