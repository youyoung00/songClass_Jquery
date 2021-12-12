

        var jump = false;
        var killer = false;

        // var killscore = 0;
        var killscore = 0;
        var jumpscore = 0;
        var totalscore = 0;

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
                // killscore = 0;
                // jumpscore = 0;
                // killscore = 0; jumpscore = 0;
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

        $(function () {

            $('#join').click(function(){
                $('.input-form').show();
            })

            killscore = 0;
            jumpscore = 0;
            $('.input-form').hide();
            $('table').hide();
            $('.playing_scores').hide();
            $('#main').css("background-image", "none");
            $('#movingIcons').hide();
            $('#reusltView').hide();
            $('#scores').hide();
            $('#movingIcons').hide();

            $('#play_game').click(function () {
                $('.playing_scores').show();
                $('#main').css(
                    "background-image",
                    `url('bg.jpeg')`
                );
                $('table').hide();
                $('#movingIcons').show();
                $('#firstView').hide();
                $('#scores').show();
                $('#reusltView').hide();
                $(".set_scores").show();
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
                location.reload();
            })

            setTimeout(gumba_start, 1000);
            setInterval(mario_down, 10);
            setInterval(gumba_down, 10);
            setInterval(set_score, 10);

        });
    