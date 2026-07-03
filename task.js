flatpickr("#birth-date", {
    dateFormat: "Y-m-d",
    maxDate:"today",
    locale:"en"
});



const birthDate = document.getElementById("birth-date");
const myButton = document.getElementById("calculate-button");
const result = document.getElementById("result");
const months =document.getElementById("months")
const day =document.getElementById("day")
const weeks =document.getElementById("week")
const lifeChapter =document.querySelectorAll(".chapter")
const group =document.getElementById("group-section")
const overlay =document.getElementById("birthday-overlay")
const birthaudio =document.getElementById("audio")
let interval;
const balloons =document.getElementById("balloons")
const cake =document.getElementById("cake-contianer")


myButton.addEventListener("click", function () {
    if (birthDate.value ==="") {
    result.textContent = "Please select your birth date";
    return;
}

group.style.display="grid"
  let birth =new Date(birthDate.value)
  let today =new Date()
  let birthMonth = birth.getMonth()
  let currentMonth = today.getMonth()
  let currentDay = today.getDate()
  let birthDay = birth.getDate()
  let age = today.getFullYear()-birth.getFullYear()
  let difference = today - birth;
  let totalDays =difference/(1000*60*60*24)
  let totalweeks =totalDays/7

  if (
    birthMonth > currentMonth ||
    (birthMonth === currentMonth && birthDay > currentDay)
) {
  age--
}

let totalMonth =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());

if (today.getDate() < birth.getDate()) {
    totalMonth--;
}
  result.innerHTML = `<span class="age">${age}</span> Years Old`;
  months.textContent=totalMonth
  day.textContent=Math.floor(totalDays)
  weeks.textContent=Math.floor(totalweeks)

  lifeChapter.forEach(function(button){
  button.classList.remove("active")

})

  let status = "";

  if (age <= 2) {
    status = "infancy";
} else if (age <= 12) {
    status = "childhood";
} else if (age <= 19) {
    status = "teen";
} else if (age <= 29) {
    status = "twenties";
} else if (age <= 39) {
    status = "thirties";
} else if (age <= 49) {
    status = "forties";
} else if (age <= 59) {
    status = "fifties";
} else if (age <= 69) {
    status = "sixties";
} else if (age <= 79) {
    status = "seventies";
} else {
    status = "elder";
}

document.getElementById(status).classList.add("active");

const progressBar= document.querySelector(".progress-bar")
let nextBirth =new Date(today.getFullYear(),birthMonth,birthDay)

if (nextBirth < today){
  nextBirth.setFullYear(today.getFullYear() + 1);
}

let differ =nextBirth-today
let nextdays= differ/(1000*60*60*24)

let lastDays = 365-nextdays
let totalbar =Math.floor((lastDays/365)*100)

progressBar.style.width = `${totalbar}%`


const barText = document.getElementById("bartext")


barText.textContent=`${totalbar}%`


function birthCelebration() {

    interval = setInterval(function () {

        confetti({
            particleCount: 200,
            spread: 60,
            zIndex:2000,
            origin: {
                x: Math.random(),
                y: 0
            }
        });

    }, 100);

}

const positions =[]
const colors = [
    "#efe3bf",
    "#9B5DE5"
    
]
for (let i = 10; i <= 95; i += 5) {
    positions.push(i);
}
positions.sort(() => Math.random() - 0.5)


function ballonparty(){
    for (let i = 0; i < positions.length; i++) {
    
    const balloon = document.createElement("div")
    balloon.classList.add("balloon")
    balloon.style.left = `${positions[i]}%`
    balloon.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)]
    balloon.style.setProperty("--balloon-knot-color", balloon.style.backgroundColor)
    const size = Math.random()*30+50
    balloon.style.width =`${size}px`
    balloon.style.height=`${size *1.3}px`
    const duration =Math.random()*3+5
    const delay = Math.random()*5
    balloon.style.animation=`balloonMove ${duration}s linear ${delay}s infinite`
    balloons.appendChild(balloon)

    
}

}




function cakeBirthday(){
    cake.innerHTML=""
    lottie.loadAnimation({
        container:cake,
        renderer:"svg",
        loop:true,
        path:"cake.json",
        autopaly:true
    })
}





if(currentDay === birthDay && currentMonth===birthMonth){
    overlay.classList.add("display");
    cakeBirthday();
    birthCelebration()
    ballonparty()
    birthaudio.play()

}


});

overlay.addEventListener("click", function () {

    overlay.classList.remove("display");

    birthaudio.pause();
    birthaudio.currentTime = 0;

    clearInterval(interval);
    balloons.innerHTML = "";
});



