class Ball {
    constructor(
        x = 0,
        y = 0,
        velocity = [2, 2], //xi,yj
        r = 10,
        color = 'red') {
        this.x = x;
        this.y = y;
        this.r = r; //radius
        this.w = r; //weight=radius*10
        this.color = color;
        this.velocity = velocity;
    }
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    moveBall() {
        this.x += this.velocity[0]; //Update in x direction
        this.y += this.velocity[1]; //Update in y direction

    }

    magnitudeOfVector(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    unitVector(vectorBall) {
        const [dx, dy] = [this.x - vectorBall.x, this.y - vectorBall.y];
        const magnitude = this.magnitudeOfVector(dx, dy);
        return [dx / magnitude, dy / magnitude];
    }
    collisionBoundry() {
        if (this.x - this.r <= boundry_min_x || (this.x + this.r) >= boundry_max_x) {
            this.velocity[0] *= -1;
            //for ball moving outside x axis
            if (this.x - this.r <= boundry_min_x) this.x = this.r;
            if ((this.x + this.r) >= boundry_max_x) this.x = boundry_max_x - this.r;
        }
        if (this.y - this.r <= boundry_min_y || (this.y + this.r) >= boundry_max_y) {
            this.velocity[1] *= -1;

            //for ball moving outside y axis
            if (this.y - this.r <= boundry_min_y) this.y = this.r;
            if ((this.y + this.r) >= boundry_max_y) this.y = boundry_max_y - this.r;
        }
    }
    collisionBall(sibbling_balls) {
        const cal_a = (ma, mb) => (ma - mb) / (ma + mb);
        const cal_b = (ma, mb) => (2 * mb) / (ma + mb);
        sibbling_balls.forEach(
            (sibbling_ball) => {
                //calculating distance
                const x_diff = sibbling_ball.x - this.x;
                const y_diff = sibbling_ball.y - this.y;
                const distance_btn = Math.sqrt(x_diff * x_diff + y_diff * y_diff);
                if (distance_btn <= (this.r + sibbling_ball.r)) { //collision detection
                    /*
    
                    Elastic Collision:
                    
                    Theory:
                    1. calculating unit normal vector between this ball and the sibbling ball
                    2. calculating unit tanget vector using unit normal vector
                    3. evaluating scalar normal vectors and scalar tanget vectors for both this and sibbling ball
                        this is done by dot product of unit vectors and velocity vector
                    4. Using below formula below on normal scalar only. this is because when ball collides there is only change in normal not in tangent
                        this conserves kinetic energy
                    5. calculating new normal velocity vector and tangent velocity vector. by mul(unit vector, scalar values)
                    6. Finally normal vector and tangent vector is added to get resultant velocity
    
    
                     
                    Using formula:
                    v_final_a= ((ma-mb)/(ma+mb))*va + (2*mb/(ma+mb)*vb)
    
                    (ma-mb)/(ma+mb)==> cal_a
                    2*mb/(ma+mb)==> cal_b
    
                    velocity in our case is in vector
                    */
                    //vector unit normal and tangent
                    const unitNormal = this.unitVector(sibbling_ball);
                    const unitTangent = [(-1) * unitNormal[1], unitNormal[0]];


                    //Scalar normal and tangent Values [dot product] [0]=>velocity in x [1]=>velocity in y
                    const thisScalarNormalVelocity = this.velocity[0] * unitNormal[0] + this.velocity[1] * unitNormal[1];
                    const sibblScalarNormalVelocity = sibbling_ball.velocity[0] * unitNormal[0] + sibbling_ball.velocity[1] * unitNormal[1];
                    const thisTangentVelocity = this.velocity[0] * unitTangent[0] + this.velocity[1] * unitTangent[1];
                    const sibblingTangentVelocity = sibbling_ball.velocity[0] * unitTangent[0] + sibbling_ball.velocity[1] * unitTangent[1];

                    let cal_a_temp = cal_a(this.w, sibbling_ball.w);// (ma-mb)/(ma+mb)
                    let cal_b_temp = cal_b(this.w, sibbling_ball.w);// 2*mb/(ma+mb)

                    const thisNormalVelocity = cal_a_temp * thisScalarNormalVelocity + cal_b_temp * sibblScalarNormalVelocity;

                    cal_a_temp = cal_a(sibbling_ball.w, this.w);// (ma-mb)/(ma+mb)
                    cal_b_temp = cal_b(sibbling_ball.w, this.w);// 2*mb/(ma+mb)

                    const sibblingNormalVelocity = cal_b_temp * thisScalarNormalVelocity + cal_a_temp * sibblScalarNormalVelocity;

                    const thisNormalVector = [
                        thisNormalVelocity * unitNormal[0],
                        thisNormalVelocity * unitNormal[1]
                    ]
                    const sibblingNormalVector = [
                        sibblingNormalVelocity * unitNormal[0],
                        sibblingNormalVelocity * unitNormal[1]
                    ]
                    const thisTangentVector = [
                        thisTangentVelocity * unitTangent[0],
                        thisTangentVelocity * unitTangent[1]
                    ]
                    const sibblingTangentVector = [
                        sibblingTangentVelocity * unitTangent[0],
                        sibblingTangentVelocity * unitTangent[1]
                    ]
                    sibbling_ball.velocity = [
                        sibblingNormalVector[0] + sibblingTangentVector[0],
                        sibblingNormalVector[1] + sibblingTangentVector[1]

                    ]

                    this.velocity = [

                        thisNormalVector[0] + thisTangentVector[0],
                        thisNormalVector[1] + thisTangentVector[1]
                    ]


                    const m_v = thisNormalVelocity; //my velocity
                    const s_v = sibblingNormalVelocity; //sibbling ball velocity



                    this.x = (sibbling_ball.x + ((this.x - sibbling_ball.x) / distance_btn) * (sibbling_ball.r + this.r));
                    this.y = (sibbling_ball.y + ((this.y - sibbling_ball.y) / distance_btn) * (sibbling_ball.r + this.r));
                }
            }
        );

    }
}
