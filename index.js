var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resaultHeader = document.querySelector ('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247',
 '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED']

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show ($el) {
    $el.classList.remove('hide')
}

function hide ($el) {
    $el.classList.add('hide')
}

function startGame () {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')

    var interval = setInterval(function(){ /* setInterval(a, n) - запускает определённый интервал */
        var time = parseFloat($time.textContent)
        
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)


    renderBox()
}

function setGameScore () {
    $result.textContent = score.toString()
}

function setGameTime () {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1) 
    show($timeHeader)
    hide($resaultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resaultHeader)
}



/*?*/ function handleBoxClick (event) { /* Вопрос касаемо функции (event)*/
   if (!isGameStarted) {
        return
   }
   
    if (event.target.dataset.box) { /* дата box для проверки нажимаем ли мы на квадрат или нет, не понимаю!! */
        score++
        renderBox()
    }
} 


function renderBox() {
    $game.innerHTML = '' /* при клике квадраты не копятся а удаляются, что это значит innetHTML */
    var box = document.createElement('div') /* .createElement создание элемента внутри JS */
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect() /*Этот метод позволяет увидеть все характеристики клика и куда кликнут*/
    var maxTop = gameSize.height - boxSize /* С эти нужно будет покумекать */
    var maxLeft = gameSize.width - boxSize
    // [1, 2, 3] -> length == 3
    var randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px' /* Изменяем значение квадрата */
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px' 
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer' /* cursor = 'pointer' - стиль показывает пользователю, что по данному элементу можно кликать */
/*?*/ box.setAttribute('data-box', 'true') /* Добаввляем дата атрибут data-box к div , не понимаю */

    $game.insertAdjacentElement('afterbegin', box) /* Добавляет переданный элемент в DOM,  с двумя парамтрами в MDN подробнее */
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min) /* math.floor - берет только целое значение */
}