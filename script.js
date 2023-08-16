const bg = document.querySelector('.bg');
const girl = document.querySelector('.girl');
const rock = document.querySelector('.rock');
const heroTitle = document.querySelector('.hero-title');
const arrowDown = document.querySelector('.c-arrow-down');
const nav = document.querySelector('nav');
const cCardItems = document.querySelectorAll('.c-card-item');
const arrowDownInitialPosition = arrowDown.offsetTop;

window.addEventListener('scroll', parallaxScroll);

window.addEventListener('scroll', scrollAnimate);

function parallaxScroll() {
    let scrolledY = window.scrollY;
    let initialOffsetX = window.innerHeight * 0.3;
    let initialOffsetY = window.innerWidth / 2;
    let opacityHeroTitle = 0.002;
    let opacityArrow = 0.001;

    nav.style.top = scrolledY * 0.5 + 'px';
    bg.style.top = scrolledY * 0.25 + 'px';
    girl.style.top = scrolledY * 0.5 + 'px';
    arrowDown.style.top = (arrowDownInitialPosition + scrolledY * 0.5) + 'px';
    arrowDown.style.opacity = Math.max(0, 1 - (scrolledY * opacityArrow));
    rock.style.right = scrolledY * 0.25 + 'px';
    heroTitle.style.left = (initialOffsetY + scrolledY * 0.25) + 'px';
    heroTitle.style.top = (initialOffsetX + scrolledY * 0.25) + 'px';
    heroTitle.style.opacity = Math.max(0, 1 - (scrolledY * opacityHeroTitle));
}

function scrollAnimate() {
    cCardItems.forEach((card, index) => {
        const status = isInViewport(card);

        const isOdd = (index % 2) === 0;

        if (status.entered) {
            setTimeout(() => {
                if (isOdd) {
                    card.classList.add('animate-odd');
                } else {
                    card.classList.add('animate-even');
                }
            }, 100 * index);
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = (window.innerHeight || documentElement.clientHeight);
    const completelyOutOfView = (rect.bottom < 0) || (rect.top > windowHeight);
    return {
        inView: !completelyOutOfView,
        entered: rect.top <= windowHeight && rect.bottom >= 0
    };
}



