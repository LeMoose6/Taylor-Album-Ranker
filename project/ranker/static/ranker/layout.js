window.onscroll = () => {
    if (document.body.scrollTop > 320 || document.documentElement.scrollTop > 320) {
        document.querySelector('#header').style.height = '20%';
    } else {
        document.querySelector('#header').style.height = '80%';
    }
}