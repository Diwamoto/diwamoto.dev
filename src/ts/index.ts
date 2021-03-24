import '/src/scss/style.scss';
import '/src/img/apple-touch-icon.png';
import '/src/img/ogp.png';
import '/src/img/profile_icon.jpg';
import '/src/img/top.jpeg';
import '/src/img/links/facebook.png';
import '/src/img/links/github.png';
import '/src/img/links/mail.png';
import '/src/img/links/twitter.png';
import '/src/img/links/zenn.png';
import '/src/img/works/diwamoto.png';
import '/src/img/works/docker.png';
import '/src/img/works/yource.png';
import '/src/img/works/ownly.png';

declare var SLACK_URL: string;

$(function () {


    $(window).on('scroll', function () {

        //一定以上スクロールされたらナビゲーションを表示する
        if (window.scrollY > 100) {
            $('.btn_top').removeClass('btn_top_fadeout').addClass('btn_top_appear')
            $('.nav').removeClass('nav_fadeout').addClass('nav_appear')
        } else {
            $('.btn_top').removeClass('btn_top_appear').addClass('btn_top_fadeout')
            $('.nav').removeClass('nav_appear').addClass('nav_fadeout')
        }
        //スマホ用
        if (window.scrollY > $(window).height()) {
            $('.nav_hamburger').removeClass('nav_hamburger_fadeout').addClass('nav_hamburger_appear')
        } else {
            $('.nav_hamburger').removeClass('nav_hamburger_appear').addClass('nav_hamburger_fadeout')
            $('.nav_sp').removeClass('nav_sp_appear')
        }

        //history用 スクロールに合わせてタイムラインの棒を画面の真ん中と合わせる
        if ($(window).scrollTop() > $('.history_wrapper').offset().top - $(window).height()) {

            //画面中央までの長さにする
            // = 画面の大きさの半分 - (画面の上からタイムラインの先頭までの距離)
            $('.history_timeline').height($(window).height() / 2 - ($('.history_timeline').offset().top - $(window).scrollTop()));
            
            //長さは#history分
            //→#historyよりも下にスクロールしたら高さを#history分にして止める
            if($('.history_timeline').height() >= $('.history_wrapper').height()){

                // = #historyの高さからセクションタイトルを引いた分だけの長さにする。
                $('.history_timeline').height($('.history_wrapper').height());
            }
        }

        //historyのアイテムが

    });

    //topへ戻るボタン
    $('.btn_top').on('click', () => {
        $('body, html').animate({ scrollTop: 0 }, 500);
    })

    //スマホ用のナビゲーションを表示する
    $('.nav_btn').on('click', () => {
        $('.nav_sp').toggleClass('nav_sp_appear')
    })

    //formの送信をキャンセルしてslackに通知を飛ばし、成功のポップアップを出す
    $('.contact_form').on('submit', (e) => {
        e.preventDefault()
        const data = {
            name: $('.input_name').val(),
            email: $('.input_email').val(),
            content: $('.input_content').val()
        }
        $.ajax({
            type: 'POST',
            url: SLACK_URL,
            data: 'payload=' + JSON.stringify({
                text: "<@U013BDR327K>\n *お問い合わせを受信しました。* \n```\n氏名：" + data["name"] + "\nメールアドレス：" + data["email"] + "\nお問い合わせ内容：" + data["content"] + "\n```"
            }),
        }).done(() => {
            //通知メッセージを表示し、5秒後に非表示にする
            $('.contact_flash_msg').text("お問い合わせを送信しました。")
            $('.contact_flash_msg').removeClass("fadeout").addClass("fadein")
            setTimeout(function () {
                $('.contact_flash_msg').removeClass("fadein").addClass("fadeout")
            }, 3000)

            //お問い合わせを何度も送信しないように内容を削除する。
            $('.input_name').val("")
            $('.input_email').val("")
            $('.input_content').val("")


        });


    })

    //通知はクリックしたら消える
    $('.contact_flash_msg').on('click', function () {
        $('.contact_flash_msg').removeClass("fadein").addClass("fadeout")
    })


    //works カルーセル設定
    $('.works_preview').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.works_slide',
        zIndex: 1,
    });
    $('.works_slide').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipeToSlide: true,
        asNavFor: '.works_preview',
        centerMode: true,
        centerPadding: '60px',
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true,
        zIndex: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
})