/*
    summary for what i have done here:

    1. Creating Container
    2. Creating ball
        i.ball class
        ii. random ball position within boundry and without overlapping with each other
        iii. boundry collision [velocity=velocity*-1]
        iv. ball collision: Elastic Collision
    3. main loop to update positions and speed

    ***********************Requirements**********************************

    Rectangular boundary box
    Instances of balls generated within the box. OOP using ES6
    Rectangular collision detection with boundary walls of the box and should bounce back.
    Rectangular/circular collision with other balls and should bounce back maintaining correct directions.
    Balls not overlap when colliding.
    Balls do not go outside of the boundary.
    Balls should variable direction. When initialized, all balls should start moving in different directions.
    Done using DOM
*/

/*

    Extra Features:
    1. Number of balls: User input And variable ball count,speed and size
    2. Elastic Collision
    3. Used Canvas
    4. no laggy with 500 balls (Stress Test)

*/



canvas.width = boundry_max_x;
canvas.height = boundry_max_y;
canvas.style.border = `.1rem solid #22f`;
canvas.style.margin = '1rem auto';
canvas.style.backgroundColor="#FFF"
console.log('Canvas initialized');


const ctx = canvas.getContext('2d');


const max_velocity = 10;
const min_velocity = -10;

const min_size = 1;
const max_size = 20;


const ballArray = [];

//alert to get ball count
let ball_count=50;
//input
const inputSpace = document.createElement('input');
inputSpace.type="number";
inputSpace.value=ball_count;
inputSpace.style.fontWeight = 900;
inputSpace.style.color="#51f";
inputSpace.style.fontSize = "1rem";
inputSpace.style.marginBottom="2rem"
inputSpace.addEventListener('keypress',
    (e)=>{
        if (e.key === 'Enter' && inputSpace.value){
            if (inputSpace.value>1000){
                window.alert("Ball count cannot have value more than 1000: Setting ball count to 1000");
                ball_count=1000;
            }
            else{
                ball_count=inputSpace.value
            }
            initializeBall()

        }
    }

);
divWrapper.appendChild(inputSpace);


initializeBall();

function mainloop() {
   if (ballInitialized) {
    boundry_max_x = Math.floor(window.innerWidth * 0.8);
    boundry_max_y = Math.floor(window.innerHeight*0.8);
    canvas.width = boundry_max_x;
    canvas.height = boundry_max_y;

    ctx.clearRect(0,0,boundry_max_x,boundry_max_y)

    for (let ind = 0; ind < ballArray.length - 1; ind++) {
        ballArray[ind].collisionBall(ballArray.slice(ind + 1));
        ballArray[ind].collisionBoundry();
        ballArray[ind].moveBall();
        ballArray[ind].drawBall();
    }
    ballArray[ballArray.length - 1].collisionBoundry();
    ballArray[ballArray.length - 1].moveBall();
    ballArray[ballArray.length - 1].drawBall();

   };
   requestAnimationFrame(mainloop)
}

mainloop();
