let start_button = document.querySelector('.btn-start');
// let stop_button = document.querySelector('.btn-stop');
let reset_button = document.querySelector('.btn-reset');
// let def_timer = document.querySelector('.def_timer');
let Remaining_time = document.querySelector('.Remaining_time');
// let def_timer_min = document.querySelector('.def_timer_min');
let def_timer_min;
let condition = document.getElementsByName('condition');

const audio = new Audio("チーン2.mp3");
let time_limit = 10;
let delta_time = 10;
let time_now = 0; //経過時間
let timer_id;
let alert1 = 60; //alert1 秒後に音による通知

//表示時間の初期化
// def_timer.innerHTML = add_zero(time_limit)+":00";
// def_timer_min.innerHTML = time_limit;

// stop_button.disabled = true;
//Stopボタンを無効化する

start_button.addEventListener('click',()=>{
    setCondition();
    start_button.disabled = true;
    // stop_button.disabled = false;
    time_now = 0;
    Remaining_time.innerHTML = "間もなく開始"
    setTimeout( 
      async () => {
        if(start_button.disabled==false) return;
        Remaining_time.innerHTML = "残り<p class=def_timer_min></p>分";
        def_timer_min = document.querySelector('.def_timer_min');
        def_timer_min.innerHTML = time_limit;
        audio.play();
        timer_id = setInterval(go_timer, delta_time);
    }, 5000);
    })


function stop(){
  start_button.disabled = false;
  // stop_button.disabled = true;
  clearInterval(timer_id);
}

// stop_button.addEventListener('click',()=>{
//   stop()
// })

reset_button.addEventListener('click',()=>{
    if(start_button.disabled == true){
      stop();
    }
    time_now = 0;
    // def_timer.innerHTML = String(time_limit)+":00";
    Remaining_time.innerHTML = "まだ議論は始まっていません";
})

//1桁のときに10の位に文字列の"0"を足す関数
function add_zero(value){
    if(value < 10){
        value = "0" + value;
    }
        return value;
}

function arrange_time(){
  //商の余りを使うことで60を超えたら自動的に0になる
    let sec = Math.floor(time_now % 60);
    let min = Math.floor(time_now / 60);
    console.log(sec);

    let sec_str = add_zero(String(sec));
    let min_str = add_zero(String(min));

    //html内にあるdef_timerを書き換える
    // def_timer.innerHTML = `${add_zero(Math.max(time_limit-min-1,0))}:${add_zero((60-sec)%60)}`;
    def_timer_min.innerHTML = `${time_limit-min}`;
}

// 毎秒呼び出され続ける関数
let go_timer = ()=>{
    time_now = time_now + 1;
    arrange_time();
    if(time_now%alert1==0){
      console.log(time_now%alert1);
      audio.play();
    }
    if(time_now == time_limit*60){
      Remaining_time.innerHTML = "終了";
      audio.play();
      stop();
    }
}

function setCondition(){
  for (let i = 0; i < condition.length; i++){
    if (condition.item(i).checked){
      delta_time = 1000*condition.item(i).value;
    }
  }
}