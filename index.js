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


// Variables

const boundry_min_x=0;
const boundry_min_y=0;

const max_velocity=10;
const min_velocity=-10;

const min_size=1;
const max_size=20;


const ballArray=[];

//alert to get ball count
const ball_count=200;
console.log('Number of balls: ',ball_count);

//creating container
const container= document.createElement('div');
container.style.width=`80%`;
container.style.height=`90vh`;
container.style.border=`.1rem solid #22f`;
container.style.margin='1rem auto';
container.style.position='relative';

document.body.appendChild(container);

let boundry_max_x=container.offsetWidth;
let boundry_max_y=container.offsetHeight;

//message
const msg=document.createElement('p');
msg.innerHTML="Ball Collision using DIV";
msg.style.fontWeight=900;
document.body.appendChild(msg);


console.log('Container initialized');

//Creating ball
//ball class
class Ball{
    constructor(
        x=0,
        y=0,
        velocity=[2,2], //xi,yj
        r=10,
        color='red'){
        this.x=x+r;
        this.y=y+r;
        this.r=r; //radius
        this.w=r; //weight=radius
        this.color=color;
        this.velocity=velocity;

        this.element=document.createElement('div');

        this.element.style.position=`absolute`;
        this.element.style.width=`${this.r * 2}px`; //2r for diameter
        this.element.style.height=`${this.r * 2}px`;//2r for diameter
        this.element.style.top=`${this.y-this.r}px`;
        this.element.style.left=`${this.x-this.r}px`;
        this.element.style.borderRadius=`50%`;
        this.element.style.backgroundColor=`${this.color}`;
    }
    moveBall(){

        this.x +=this.velocity[0]; //Update in x direction
        this.y +=this.velocity[1]; //Update in y direction

    }
    magnitudeOfVector(x,y){
        return Math.sqrt(x*x +y*y);
    }
    unitVector(vectorBall){
        const [dx,dy]=[this.x-vectorBall.x,this.y-vectorBall.y];
        const magnitude = this.magnitudeOfVector(dx,dy);
        return [dx/magnitude, dy/magnitude];
    }
    collisionBoundry(){
        if (this.x-this.r <=boundry_min_x || (this.x + this.r)>=boundry_max_x){
            this.velocity[0] *=-1;
            //for ball moving outside x axis
            if (this.x-this.r <=boundry_min_x) this.x=this.r;
            if ((this.x + this.r)>=boundry_max_x) this.x=boundry_max_x-this.r;
        }
        if (this.y-this.r <=boundry_min_y || (this.y + this.r)>=boundry_max_y){
            this.velocity[1] *=-1;

            //for ball moving outside y axis
            if (this.y-this.r <=boundry_min_y) this.y=this.r;
            if ( (this.y + this.r)>=boundry_max_y) this.y=boundry_max_y-this.r;
        }

        this.element.style.top=`${this.y-this.r}px`;
        this.element.style.left=`${this.x-this.r}px`;
    }
    collisionBall(sibbling_balls){
        const cal_a = (ma,mb) =>(ma-mb)/(ma+mb);
        const cal_b = (ma,mb) =>(2*mb)/(ma+mb);
        sibbling_balls.forEach(
            (sibbling_ball)=>{
                //calculating distance
                const x_diff=sibbling_ball.x-this.x;
                const y_diff=sibbling_ball.y-this.y;
                const distance_btn=Math.sqrt(x_diff*x_diff + y_diff*y_diff);
                if (distance_btn<=(this.r+sibbling_ball.r)){ //collision detection
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
                    const unitNormal=this.unitVector(sibbling_ball);
                    const unitTangent=[(-1)*unitNormal[1],unitNormal[0]];


                    //Scalar normal and tangent Values [dot product] [0]=>velocity in x [1]=>velocity in y
                    const thisScalarNormalVelocity=this.velocity[0]*unitNormal[0] +this.velocity[1]*unitNormal[1];
                    const sibblScalarNormalVelocity=sibbling_ball.velocity[0]*unitNormal[0] +sibbling_ball.velocity[1]*unitNormal[1];
                    const thisTangentVelocity=this.velocity[0]*unitTangent[0] +this.velocity[1]*unitTangent[1];
                    const sibblingTangentVelocity=sibbling_ball.velocity[0]*unitTangent[0] +sibbling_ball.velocity[1]*unitTangent[1];
            
                    let cal_a_temp=cal_a(this.w,sibbling_ball.w);// (ma-mb)/(ma+mb)
                    let cal_b_temp=cal_b(this.w,sibbling_ball.w);// 2*mb/(ma+mb)
                    
                    const thisNormalVelocity=cal_a_temp*thisScalarNormalVelocity+cal_b_temp*sibblScalarNormalVelocity;
                    
                    cal_a_temp=cal_a(sibbling_ball.w,this.w);// (ma-mb)/(ma+mb)
                    cal_b_temp=cal_b(sibbling_ball.w,this.w);// 2*mb/(ma+mb)

                    const sibblingNormalVelocity=cal_b_temp*thisScalarNormalVelocity+cal_a_temp*sibblScalarNormalVelocity;
                    
                    const thisNormalVector = [
                        thisNormalVelocity*unitNormal[0],
                        thisNormalVelocity*unitNormal[1]
                    ]
                    const sibblingNormalVector=[
                        sibblingNormalVelocity*unitNormal[0],
                        sibblingNormalVelocity*unitNormal[1]
                    ]
                    const thisTangentVector = [
                        thisTangentVelocity*unitTangent[0],
                        thisTangentVelocity*unitTangent[1]
                    ]
                    const sibblingTangentVector=[
                        sibblingTangentVelocity*unitTangent[0],
                        sibblingTangentVelocity*unitTangent[1]
                    ]
                    sibbling_ball.velocity=[
                        sibblingNormalVector[0]+sibblingTangentVector[0],
                        sibblingNormalVector[1]+sibblingTangentVector[1]
                        
                    ]

                    this.velocity=[
                        
                        thisNormalVector[0]+thisTangentVector[0],
                        thisNormalVector[1]+thisTangentVector[1]
                    ]


                    const m_v=thisNormalVelocity; //my velocity
                    const s_v=sibblingNormalVelocity; //sibbling ball velocity
                    

                  
                    this.x=(sibbling_ball.x + ((this.x-sibbling_ball.x)/distance_btn)*(sibbling_ball.r+this.r));
                    this.y=(sibbling_ball.y + ((this.y-sibbling_ball.y)/distance_btn)*(sibbling_ball.r+this.r));
                }
            }
        );        

    }
}
//random position generator
function getRandomInt(mini,maxi){
    const minCeiled= Math.ceil(mini + 5);
    const maxFloored=Math.floor(maxi - 5);
    return (Math.floor(Math.random()*(maxFloored-minCeiled)+minCeiled));
}

function nooverlap(ballArray){
    const overlap_detect= (x1,y1,r1,x2,y2,r2)=>{
        const x_diff=x1-x2;
        const y_diff=y1-y2;
        const distance_btn=Math.sqrt(x_diff*x_diff + y_diff*y_diff);
        return (distance_btn<=(r1+r2));}
        let r=max_size;

    for(let j=0;j<max_size;j++){
        r=getRandomInt(min_size,r);  //random radius
        for(let k=0;k<boundry_max_x;k++){
            const x=getRandomInt(boundry_min_x +r, boundry_max_x -r); //random position x
            const y=getRandomInt(boundry_min_y +r, boundry_max_y -r);//random position y
            const possile=ballArray.filter(
                (ball)=>{
                    return !overlap_detect(x,y,r,ball.x,ball.y,ball.r);
                }
            );
            if (possile.length==ballArray.length){
                return [x,y,r];
            }
        }
        if (r<=min_size) return false;
    }
    return false;

}


//Initiallizing balls
function initializeBall(){
    ballArray.length=0;
    for (let i = 0; i < ball_count; i++) {
        const xyr_holder=nooverlap(ballArray);
        if (xyr_holder){
            const [x,y,r]=xyr_holder;
            const v=[
                getRandomInt(min_velocity, max_velocity)//random velocity
                ,
                getRandomInt(min_velocity, max_velocity)
              ];
            const c=`#${getRandomInt(100,999)}`
            const ball = new Ball(x,y,v,r,c);
            container.appendChild(ball.element)
            ballArray.push(ball);
        }
        else{
            console.log('balls overlapping');
        }
        
      }
    console.log('Balls Initialized')
}
initializeBall()




function mainloop(){

    boundry_max_x=container.offsetWidth;
    boundry_max_y=container.offsetHeight;

    for (let ind=0;ind<ballArray.length-1;ind++){
        ballArray[ind].collisionBall(ballArray.slice(ind +1));
        ballArray[ind].collisionBoundry();
        ballArray[ind].moveBall();
    }
    ballArray[ballArray.length-1].collisionBoundry();
    ballArray[ballArray.length-1].moveBall();
    
    requestAnimationFrame(mainloop);
}

mainloop();
