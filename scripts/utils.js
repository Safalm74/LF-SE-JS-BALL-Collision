//random position generator
function getRandomInt(mini, maxi) {
    const minCeiled = Math.ceil(mini + max_size);
    const maxFloored = Math.floor(maxi - max_size);
    return (Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled));
}

//function to ensure no ovelapping balls during spwan
function nooverlap(ballArray) {
    const overlap_detect = (x1, y1, r1, x2, y2, r2) => {
        const x_diff = x1 - x2;
        const y_diff = y1 - y2;
        const distance_btn = Math.sqrt(x_diff * x_diff + y_diff * y_diff);
        return (distance_btn <= (r1 + r2));
    }
    let r = max_size;
    for (let j = 0; j < max_size; j++) {
        r = getRandomInt(min_size, r);  //random radius
        r>0?true:r=0;
        for (let k = 0; k < boundry_max_x; k++) {
            const x = getRandomInt(boundry_min_x + r, boundry_max_x - r); //random position x
            const y = getRandomInt(boundry_min_y + r, boundry_max_y - r);//random position y
            const possile = ballArray.filter(
                (ball) => {
                    return !overlap_detect(x, y, r, ball.x, ball.y, ball.r);
                }
            );
            if (possile.length == ballArray.length) {
                return [x, y, r];
            }
        }
        if (r <= min_size) return false;
    }
    return false;

}

//Initiallizing balls
function initializeBall() {
    ballInitialized=false;
    ballArray.length = 0;
    for (let i = 0; i < ball_count; i++) {
        const xyr_holder = nooverlap(ballArray);
        if (xyr_holder) {
            const [x, y, r] = xyr_holder;
            const v = [
                getRandomInt(min_velocity, max_velocity)//random velocity
                ,
                getRandomInt(min_velocity, max_velocity)
            ];
            const c = `#${getRandomInt(100, 999)}`
            const ball = new Ball(x, y, v, r, c);
            ball.drawBall();
            ballArray.push(ball);
        }
        else {
            console.log('balls overlapping');
        }

    }
    ballInitialized=true;

    console.log('Balls Initialized')
}
