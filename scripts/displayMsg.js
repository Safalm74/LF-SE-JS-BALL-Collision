
//Div wapper

const divWrapper = document.createElement('div');
divWrapper.style.display="flex";
divWrapper.style.justifyContent="space-between";
divWrapper.style.flexDirection="column";
document.body.appendChild(divWrapper);
//Message2
const msg2 = document.createElement('p');
msg2.innerHTML = "Enter Number of Balls: (Press Enter to take effect)";
msg2.style.fontWeight = 900;
msg2.style.color="#FFF";
msg2.style.fontSize = "1rem";
divWrapper.appendChild(msg2);


//Message1
const msg = document.createElement('p');
msg.innerHTML = "Ball Collision using Canvas: DOM is used in other branch";
msg.style.fontWeight = 900;
msg.style.color="#FFF";
msg.style.fontSize = "1.5rem";
msg.style.padding='.8rem';
msg.style.border='1px dashed #fff'
divWrapper.appendChild(msg);


