const app = new PIXI.Application();
const moveSpeed = 5;
const ufoList = [];
const planetList = [];

const hp = 3;

const leben1 = PIXI.Sprite.from('assets/leben.png');
leben1.scale.x = 0.03;
leben1.scale.y = 0.03;
leben1.x = 670;
leben1.y = 10;

const leben2 = PIXI.Sprite.from('assets/leben.png');
leben2.scale.x = 0.03;
leben2.scale.y = 0.03;
leben2.x = 695;
leben2.y = 10;

const leben3 = PIXI.Sprite.from('assets/leben.png');
leben3.scale.x = 0.03;
leben3.scale.y = 0.03;
leben3.x = 720;
leben3.y = 10;

app.stage.addChild(leben1);
app.stage.addChild(leben2);
app.stage.addChild(leben3);

const gameOver = PIXI.Sprite.from('assets/gameOver.png');
gameOver.x = 210;
gameOver.y = 100;
gameOver.scale.x = 0.3;
gameOver.scale.y = 0.3;

/**
 * The Button witch will spawn, when the Game ends, witch goes in the same URL
 * and starts the Game again
 */
const button = document.createElement('button');
button.textContent = 'Restart Game';
button.addEventListener('click', () => {
    gameInterval(function(){
        console.log(location.href = window.location.href);
    })
});

document.body.appendChild(app.view);

//The Rocket is Implmented
const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.scale.x = 0.03;
rocket.scale.y = 0.03;
rocket.x = 370;
rocket.y = 550;
app.stage.addChild(rocket);
   
/**
 * A Ufo will spawn on a random X coordinate every second
 */
gameInterval(function() {
    const ufo = PIXI.Sprite.from('assets/ufo.png');
    ufo.scale.x = 0.06;
    ufo.scale.y = 0.06;
    ufo.x = random(0, 750);
    ufo.y = -20;
    flyDown(ufo, 1.5);
    app.stage.addChild(ufo);
    ufoList.push(ufo);

        
    /**
     * If a Ufo collidates with the Rocket, the Rocket will despawn and a explosion
     * will spawn and the Game will end
     */
    waitForCollision(ufo, rocket).then(function(){
        const explosion = PIXI.Sprite.from('assets/explosion.png');
        explosion.scale.x = 0.08;
        explosion.scale.y = 0.08;
        app.stage.removeChild(rocket);
        explosion.x = rocket.x-10;
        explosion.y = rocket.y-5;
        app.stage.addChild(explosion);
        stopGame();
        app.stage.addChild(gameOver);
        document.body.appendChild(button);
    });

}, random(1000, 3000));

//Rocket goes with to the left, untill it hits the end of the Game
function leftKeyPressed(){
    if(0<rocket.x - moveSpeed)
        rocket.x = rocket.x - moveSpeed;
}

//Rocket goes with to the right, untill it hits the end of the Game
function rightKeyPressed(){
    if(rocket.x + moveSpeed<780)
        rocket.x = rocket.x + moveSpeed;
}

/**
 * When the Spacekey is pressed, a Bullet will spawn and fly up
 */
function spaceKeyPressed(){
    const bullet = PIXI.Sprite.from('assets/bullet.png');
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    bullet.x = rocket.x + 9;
    bullet.y = rocket.y - 8;
    flyUp(bullet);
    app.stage.addChild(bullet);

    /**
     * If a Bullet collidates with a Ufo, the Ufo and the Bullet
     * will despawn and a explosion will spawn for 800 milliseconds
     */
    waitForCollision(bullet, ufoList).then(function([bullet, ufo]){
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);
        const explosion = PIXI.Sprite.from('assets/explosion.png');
        explosion.x = ufo.x;
        explosion.y = ufo.y;
        explosion.scale.x = 0.08;
        explosion.scale.y = 0.08;
        app.stage.addChild(explosion);
        //Waits 800 milliseconds, befor explosion will despwan
        setTimeout(function () {
            app.stage.removeChild(explosion);
        }, 800);
    });

    /**
     * If a Bullet collidates with a Plane, it will end the Game
     */
    waitForCollision(bullet, planetList).then(function([bullet, planet]){
        app.stage.removeChild(bullet);
        app.stage.removeChild(planet);
        const explosion = PIXI.Sprite.from('assets/explosion.png');
        explosion.x = planet.x - 30;
        explosion.y = planet.y - 20;
        explosion.scale.x = 0.2;
        explosion.scale.y = 0.2;
        app.stage.addChild(explosion);
        stopGame();
        app.stage.addChild(gameOver);
        document.body.appendChild(button); 
    });
}

/**
 * A Planet will spawn on a random X coordinate in a random timeperiod
 */
gameInterval(function(){
    const planet = PIXI.Sprite.from('assets/planet' + random(1, 3) + '.png');
    planet.scale.x = 0.1;
    planet.scale.y = 0.1;
    planet.x = random(0, 750);
    planet.y = -50;
    flyDown(planet, 1.5);
    app.stage.addChild(planet);
    planetList.push(planet);

    /**
     * If a Planet collidates with the Rocket, the Rocket will despawn and a explosion
     * will spawn and the Game will end
     */
    waitForCollision(planet, rocket).then(function(){
        const explosion = PIXI.Sprite.from('assets/explosion.png');
        explosion.scale.x = 0.08;
        explosion.scale.y = 0.08;
        app.stage.removeChild(rocket);
        explosion.x = rocket.x-10;
        explosion.y = rocket.y-5;
        app.stage.addChild(explosion);
        stopGame();
        app.stage.addChild(gameOver);
        document.body.appendChild(button);
    });
}, random(5000, 15000));

trought(ufoList).then(function([ufo]){
    app.stage.removeChild(leben5);
});