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
    hightscroe: localStorage.getItem('score') || 0,
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
    document.addEventListener('keydown', (e) => {
      if(!/Arrow/gi.test(e.key)) {
        return
      }
      event.preventDefault()
      const  direction = getDirection(event.key)
      if(!isDirectionCorrect(direction)) {
        return
      }
    })
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
        randomFood()
        window.requestAnimationFrame(play)
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
    for(let i = option.snake.length -1; i >= 0; --i) {
      buildSnake(context, option.snake[i].x, option.snake[i].y, i === 0)
    }
  }
  const setDirection = (number, value) => {
    while(value < 0) {
      value += number
    }
    return value % number
  }

  const setBody = () => {
    const tail = option.snake[option.snake.length - 1]
    const direction = tail.direction
    let x = tail.x
    let y = tail.y
    switch(direction) {
      case 1:
        y = setDirection(300, y -10)
        break
      case -1:
        y = setDirection(300, y + 10)
        break 
      case -2:
        x = setDirection(300, x -10)
        break
      case 2:
        x = setDirection(300, x + 10)
        break
    }
    option.snake.push(x, y, direction)
  }

  const getFood = () => {
    const snakeX = option.snake[0].x
    const snakeY = option.snake[0].y
    const foodX = option.food[0].x
    const foodY = option.food[0].y
    if(snakeX == foodX && snakeY == foodY ) {
      option.score++
      $score.innerHTML = `점수 : ${option.score}점`
      setBody()
      randomFood()
    }
  }
  const randomFood = () => {
    let x = Math.floor(Math.random() * 25) * 10
    let y = Math.floor(Math.random() * 25) * 10
    while(option.snake.some((part) => part.x === x && part.y === y)) {
      x = Math.floor(Math.random() * 25) * 10
      y = Math.floor(Math.random() * 25) * 10
    }
    option.food = {x, y}
  }

  const play = (timestamp) => {
    start++
    if(option.gameEnd) {
      return
    }
    if(timestamp - start > 1000 / 10) {
      buildBoard()
      buildFood(context, option.food.x, option.food.y)
      setSnake()
      getFood()
      start = timestamp;
    }
    window.requestAnimationFrame(play)
    // if(gameOver()) {
    //   option.gameEnd = true
    //   setHighscore();
    //   alert('게임오버')
    //   return
    // }
  }

  init()
})()
