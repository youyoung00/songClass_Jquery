var jump = false;
var killer = false;

// var killscore = 0;
var killscore = 0;
var jumpscore = 0;
var totalscore = 0;
var ranking = 0;

var final_killscore = [];
var final_jumpscore = [];
var final_totalscore = [];

var score_List = [];
var score_database;

var addhtml = `<tr>
<td class="ranking"></td>
<td class="nicname"></td>
<td id="final_killscore"></td>

<td class="ranking"></td>
<td class="nicname"></td>
<td id="final_jumpscore"></td>

<td class="ranking"></td>
<td class="nicname"></td>
<td id="final_totalscore"></td>
</tr>`;

function gumba_start() {

    $('#mario_block').show(100);
    jump = false;

    var random_speed = Math.floor(Math.random() * 1000 + 2000);
    $('#gumba_block').show();

    $('#gumba_block').animate({
        'left': '0px'
    }, random_speed, function () {

        let alive = $("#mario_block").css("display"); //block 이면 생존 none 이면 사망

        if (alive == "block") {
            jumpscore = jumpscore + 100;
        }

        $('#gumba_block').css('left', "");
        $('#gumba_block').css('right', "10px");
        $('#gumba_block').hide();
        setTimeout(gumba_start, random_speed - 1000);
    })
}

// function mario_start() {     $('#mario_block').show();
// $('#mario_block').css('bottom', '10px'); }

function killer_start() {
    $("#killer_block").show(30);
    killer = true;
    $("#killer_block").animate({
        "left": "950px"
    }, 1000, function () {
        killer = false;
        $("#killer_block").hide();
        $("#killer_block").css("left", "50px");
    })

}
function set_score() {
    $('.kill_score').text(" 공격 점수 : " + killscore);
    $('.jump_score').text(" 방어 점수 : " + jumpscore);
    totalscore = killscore + jumpscore;
    $('.total_score').text("합계 점수 : " + totalscore);
}

function mario_down() {
    var beat = Number($("#gumba_block").css("left").replace("px", ""));
    if (beat <= 110 && jump == false) {
        $('#mario_block').hide();
        $('#reusltView').show();
        $('table').show();
        $('#main').css("background-image", "none");
        $('#movingIcons').hide();
        $('.playing_scores').hide();
        jump = true;
        $('#attack_score').text(" 공격 점수 : " + killscore);
        $('#defense_score').text(" 방어 점수 : " + jumpscore);
        totalscore = killscore + jumpscore;
        $('#total_score').text("합계 점수 : " + totalscore);
    }
}

function gumba_down() {
    // killscore = killscore + 150;
    var beat1 = Number($("#gumba_block").css("left").replace("px", ""));
    var beat2 = Number($("#killer_block").css("left").replace("px", ""));
    let random_speed = Math.floor(Math.random() * 1000);

    // console.log(beat1 - beat2);

    if (beat1 - beat2 < 50 && killer == true) {
        // killscore = killscore + 150;
        killscore = killscore + 150;
        killer = false;
        $("#killer_block").hide();
        $("#killer_block").css("left", "50px");

        $("#gumba_block").stop();

        $("#gumba_block").css("left", "");
        $("#gumba_block").css("right", "10px");
        $("#gumba_block").hide();
        setTimeout(gumba_start, random_speed - 1000);
    }
}

function firstView() {
    $('#main').css("background-image", "none");
    $('#movingIcons').hide();
    $('#join_container').hide();
    $('#reusltView').hide();
    $('.playing_scores').hide();
    $('.table').hide();
    $('#scores').hide();
    $('#play_mario').hide();
    $("#join_mario").hide();
    $('.table-success').hide();
}

function play_game_open() {

    $('#play_game').click(function () {
        $('.playing_scores').show();
        $('#main').css("background-image", `url('bg.jpeg')`);
        $('.input-form').hide();
        $('#login_container').hide();
        $('.table').hide();

        $('#movingIcons').show();
        $('#firstView').hide();
        $('#scores').show();
        $('#reusltView').hide();
        $(".set_scores").show();
    })
}

$(function () {

    firstView();

    killscore = 0;
    jumpscore = 0;

    // $('table').hide(); $('.playing_scores').hide();
    // $('#main').css("background-image", "none"); $('#movingIcons').hide();
    // $('#reusltView').hide(); $('#scores').hide(); $('#movingIcons').hide();  게임시작
    // 버튼 비활성화 $('#play_game').hide(); $('.input-form').show();
    // $('#login_container').show(); $('#join_container').hide();
    // $('#login_mario').show(); $('#join_mario').hide(); $('#play_mario').hide();

    $("#login_btn").click(function () {
        $("#play_mario").show();
        $("#join_mario").hide();
        $("#login_mario").hide();
        play_game_open();
    });

    $('#join').click(function () {
        $('.input-form').show();
        $('#join_mario').show();
        $('#login_mario').hide();
        $('#play_mario').hide();

        $('#join_container').show();
        $('#login_container').hide();
    })

    $('#login').click(function () {
        $('#join_mario').hide();
        $('#login_mario').show();
        // $('#play_mario').hide();

        $('#join_container').hide();
        $('#login_container').show();
    })

    $("body").keydown(function (event) {
        // console.log(event.keyCode); if(event.keyCode == '37' ){
        // $('#gb_block').css('left', '-=10px') console.log($('#gb_block').css('left'));
        // }
        if (event.keyCode == "32" && jump == false) {
            jump = true;
            // alert(jumpscore);
            $("#mario_block")
                .animate({
                    "bottom": "200px"
                }, 500)
                .animate({
                    "bottom": "10px"
                }, 500, function () {
                    jump = false;
                });
        }
        if (event.keyCode == "13" && killer == false) {
            killer_start();
        }

    })

    $('#replay').click(function () {

        killscore = 0;
        jumpscore = 0;
        totalscore = 0;

        $('.playing_scores').show();
        $('#main').css("background-image", `url('bg.jpeg')`);
        $('.input-form').hide();
        $('#login_container').hide();
        $('table').hide();
        $('#movingIcons').show();
        $('#firstView').hide();
        $('#scores').show();
        $('#reusltView').hide();
        $(".set_scores").show();
    });

    $('#result_score_upload').click(function () {

        upload = confirm('점수를 등록하시겠습니까?');

        if (upload) {

            $('.score_table').append(addhtml);

            var upload;
            var nicname = '';
            ranking = ranking + 1;

            nicname = prompt('등록할 닉네임 세글자를 입력해주세요');
            final_killscore.push(killscore);
            final_jumpscore.push(jumpscore);
            final_totalscore.push(totalscore);

            let obj = {
                'nicname': nicname,
                'final_totalscore': final_totalscore,
                'final_killscore': final_killscore,
                'final_jumpscore': final_jumpscore
            };

            // $('.score_table').html(
            //     `            <tr>
            //     <td class="ranking"></td>
            //     <td class="nicname"></td>
            //     <td id="final_killscore"></td>

            //     <td class="ranking"></td>
            //     <td class="nicname"></td>
            //     <td id="final_jumpscore"></td>

            //     <td class="ranking"></td>
            //     <td class="nicname"></td>
            //     <td id="final_totalscore"></td>
            // </tr>`
            // );

            $('.ranking').text(ranking + '위');
            $('.nicname').text(nicname);
            $('#final_totalscore').text(final_totalscore);

            // $('#ranking').text(ranking + '위');
            $('#final_killscore').text(final_killscore);
            // $('#nicname').text(nicname); $('#ranking').text(ranking + '위');
            $('#final_jumpscore').text(final_jumpscore);
            // $('#nicname').text(nicname);

            score_List.push(obj);
            score_database = score_List[0];
            score_List = [];

            console.log(score_database);
            console.log(score_List);

        } else {
            return;
        }

        return score_database;
    });

    setTimeout(gumba_start, 1000);
    setInterval(mario_down, 10);
    setInterval(gumba_down, 10);
    setInterval(set_score, 10);

});
