import $ from 'jquery'

$(document).ready(() => {
  $.get('http://localhost:3000/api/v1/top_word', (data) => {
    appendTopWord(data.word);
  })

  var appendTopWord = (word) => {
    let top_word = Object.keys(word)[0].charAt(0).toUpperCase() + Object.keys(word)[0].slice(1)
    let word_count = word[Object.keys(word)[0]];
    $('.word-count').append(`
      <h2>${top_word}</h2>
      `)
    $('.word-count').append(`
      <p>Count: ${word_count}</p>
      `)
  }
})
