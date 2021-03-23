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

$(function () {

    //一定以上スクロールされたらナビゲーションを表示する
    $(window).scroll(function() {

        if (window.scrollY > 100){
            $('.btn_top').removeClass('btn_top_fadeout').addClass('btn_top_appear')
            $('.nav').removeClass('nav_fadeout').addClass('nav_appear')
        } else {
            $('.btn_top').removeClass('btn_top_appear').addClass('btn_top_fadeout')
            $('.nav').removeClass('nav_appear').addClass('nav_fadeout')
        }

        if (window.scrollY > $(window).height()){
            $('.nav_hamburger').removeClass('nav_hamburger_fadeout').addClass('nav_hamburger_appear')
        } else {
            $('.nav_hamburger').removeClass('nav_hamburger_appear').addClass('nav_hamburger_fadeout')
            $('.nav_sp').removeClass('nav_sp_appear')
        }

    });

    $('.btn_top').on('click',()=>{
        $('body, html').animate({ scrollTop: 0 }, 500);
    }) 

    $('.nav_btn').on('click',()=>{
        $('.nav_sp').toggleClass('nav_sp_appear')
    })


    //works カルーセル設定
    $('.works_preview').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade:true,
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