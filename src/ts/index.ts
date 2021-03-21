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
    $('.works_preview').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade:true,
        asNavFor: '.works_slide'
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