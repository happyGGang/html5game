;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)

  const $canvas = get('.canvas')
  const context = $canvas.getContext('2d')

  const $score = get('.scroe')
  const $hightscroe = get('.hightscroe')
  const $play = get('.js-play')

  const colorSet = {
    board: 'rgb(20, 105, 38)',
    snakeHead: 'rgba(229, 65, 120, 0.929 )',
    snakeBody: 'rgba(153, 206, 244, 0.498)',
    food: 'rgb(66, 187, 103)'
  }

  let start = 0
  let option = {
    $hightscroe: localStorage.getItem('score') || 0,
    gameEnd: true,
    direction: 2,
    snake: [
      {x: 10, y: 10, direction: 2},
      {x: 10, y: 20, direction: 2},
      {x: 10, y: 30, direction: 2}
    ],
    food: {x: 0, y: 0},
    score: 0
  }

  const init = () => {
    /* document.addEventListener('keydown', (e) => {
      if(!/Arrow/gi.test(e.key)) {
        return
      }
      event.preventDefault()
      const  direction = getDirection(event.key)
      if(!isDirectionCorrect(direction)) {
        return
      }
    }) */
    $play.onClick = () => {
      if(option.gameEnd) {
        option = {
          hightscroe: localStorage.getItem('score') || 0,
          gameEnd: false,
          direction: 2,
          snake: [
            {x: 10, y: 10, direction: 2},
            {x: 10, y: 20, direction: 2},
            {x: 10, y: 30, direction: 2}
          ],
          food: {x: 0, y: 0},
          score: 0
        }
        $score.innerHTML = `점수 : 0점`
        $hightscroe.innerHTML = `최고점수 : ${option.hightscroe}점`
      }
    }
  }

  const buildBoard = () => {
    context.fillStyle = colorSet.board
    context.fillRect = (0, 0, 300, 300) 
  }

  const buildSnake = (context, x, y, head = false) => {
    context.fillStyle = head ? colorSet.snakeHead : colorSet.snakeBody
    context.fillRect(x, y, 10, 10)
  }

  const buildFood = () => {
    context.fillStyle = colorSet.food
    context.arc(x + 5, y + 5, 5, 0, 2 * Math.PI)
    context.fill()
  }

  const setSnake = () => {
    for(let i = option.snake.length -1; i >= 0; i++) {
      buildSnake(context, option.snake[i].x, option.snake[i].y, i === 0)
    }
  }

  init()
})()
