document.addEventListener(`DOMContentLoaded`,()=>{
    const box=document.querySelector(".boxes")
    let boxes=Array.from(document.querySelectorAll(".boxes div"))
    const startButton=document.querySelector("#startButton")
    const scoreDisplay=document.querySelector("#score")
    console.log(boxes)
    var playerPosition=94
    let timerId
    let score=0
    var vel=300
   
    //obstaculo movement
    function randomNumber(){
        return Math.floor(Math.random()*10)}
    function draw(v){
        boxes[v].classList.add("taken")
    }
    function undraw(v){
        boxes[v].classList.remove("taken")
    }
    boxes[playerPosition].classList.add("player")
    var k = randomNumber()
    draw(k)
    function moveDown(){
        gameOver()
        undraw(k)
        k+=10
        gameOver()
        draw(k)
        checker()
    }
    function moveDownP(){
        const isDown = (boxes[playerPosition+10].classList.contains("dead")||(playerPosition+10>99))
        if (!isDown){
            undrawP()
            playerPosition+=10
            drawP()            
        }
    }
    function control(e){
        if (e.keyCode===37){
            moveLeft()
        }else if (e.keyCode===39) {
            moveRight()
        }else if (e.keyCode===40) {
            moveDownP()
        }else if (e.keyCode===38){
            jump()
        }
    }
    document.addEventListener("keyup",control)
    //player movement
    function drawP(){
        boxes[playerPosition].classList.add("player")
    }
    function undrawP(){
        boxes[playerPosition].classList.remove("player")
    }
    function moveLeft(){
        undrawP()
        const isAtLeft = (playerPosition%10===0) || (boxes[playerPosition-1].classList.contains("dead"))
        if (!isAtLeft){
            playerPosition--
        }
        drawP()
    }
    function moveRight(){
        undrawP()
        const isAtRight = ((playerPosition+1)%10===0) || (boxes[playerPosition+1].classList.contains("dead"))
        if (!isAtRight){
            playerPosition++
        }
        drawP()
    }
    function jump(){
        const isUp = (boxes[playerPosition-10].classList.contains("dead")||(playerPosition-10<0))
        if (!isUp){
            undrawP()
            playerPosition-=10
            drawP()
        }
    }
    function checker(){
        if (k<90){
            if (boxes[k+10].classList.contains("dead")){
                boxes[k].classList.remove("taken")
                boxes[k].classList.add("dead")
                generate()
                addScore()
            }
         
        }else{
            for (let i = 90; i<100; i++){
                if (boxes[i].classList.contains("taken")){
                    boxes[i].classList.remove("taken")
                    boxes[k].classList.add("dead")
                    generate()
                    addScore()
                }    
        }
        }
        }
    function generate(){
        k=randomNumber()
        console.log(k)
        draw(k)
    }
    startButton.addEventListener("click",()=>{
        if (timerId){
            clearInterval(timerId)
            timerId=null
        }else{
            timerId = setInterval(moveDown,vel)
        }
    })
    function addScore(){
        score+=1
        vel = Math.max(vel - 10, 50)
        clearInterval(timerId)
        timerId=setInterval(moveDown,vel)
        scoreDisplay.innerHTML = score
    }
    function gameOver(){
        if (k===playerPosition){
            clearInterval(timerId)
        }
    }


})