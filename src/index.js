import $ from 'jquery'

$(document).ready(() => {
  var loadTopWord = () => {
    $.get('http://localhost:3000/api/v1/top_word', (data) => {
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
    }, 3000)
  }

  $('#word-submit').click(() => {
    let text = $.trim($("#word-text").val());
    text.split(' ').forEach(word => {
      $.post('http://localhost:3000/api/v1/words', { word: { value: word } }, (data) => {
        $('#success-message').append(`
          <p>${data['message']}</p>
          `)
      })
    })
    $("#word-text").val('')
    loadTopWord();
    clearSuccessMessage();
  })

  loadTopWord();
})
