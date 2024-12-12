const burger = document.querySelector('.video-section__burger');
const sidebar = document.querySelector('.video-section__sidebar');
const initBurgerButton = () => {
    burger.addEventListener('click', () => {
        sidebar.classList.toggle('video-section__sidebar_visible');
        burger.classList.toggle('video-section__burger__active');
    })
}

initBurgerButton();


const launchAnimation = ({elementClass, animationClass, observerElement}) => {
    // Выбор элемента
    const elements = document.querySelectorAll(elementClass);
    const observers = document.querySelectorAll(observerElement);

    elements.forEach(elem => elem.classList.remove(animationClass));


// Создание наблюдателя
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Если элемент находится в видимой области
            if (entry.isIntersecting) {
                elements.forEach(elem => elem.classList.add(animationClass));
            } else {
                // Удаление класса, если элемент выходит из видимости
                elements.forEach(elem => elem.classList.remove(animationClass));
            }
        });
    }, {
        ///rootMargin: '0px 0px -300px 0px' // Элемент будет видим, когда он будет на 100px выше нижней границы окна
    })

// Наблюдение за элементом
    observers.forEach(element => observer.observe(element));
}

const elementsAnimation = [
    {
        observerElement: '.education',
        elementClass: '.education__article',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.environment__article',
        elementClass: '.environment__article',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.wants-to-club',
        elementClass: '.wants-to-club',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.education',
        elementClass: '.level-up_left',
        animationClass: 'level-up-animation_left'
    },
    {
        observerElement: '.education',
        elementClass: '.level-up_right',
        animationClass: 'level-up-animation_right'
    },
    {
        observerElement: '.wants-to-club',
        elementClass: '.level-up_right',
        animationClass: 'level-up-animation_right'
    },
    {
        observerElement: '.environment__article',
        elementClass: '.level-up_right.level_up_dark',
        animationClass: 'level-up-animation_right'
    },
    {
        observerElement: '.environment__article',
        elementClass: '.level-up_left.level_up_dark',
        animationClass: 'level-up-animation_left'
    },
    {
        observerElement: '.residents',
        elementClass: '.level-up_left',
        animationClass: 'level-up-animation_left'
    },
    {
        observerElement: '.life-state__block',
        elementClass: '.life-state__block',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.residents__title',
        elementClass: '.residents__title',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.residents__text',
        elementClass: '.residents__text',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.president__info',
        elementClass: '.president__info',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.president__info-second',
        elementClass: '.president__info-second',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.president__title',
        elementClass: '.president__title',
        animationClass: 'fadeInUp'
    },
    {
        observerElement: '.president__text',
        elementClass: '.president__text',
        animationClass: 'fadeInUp'
    },
]

elementsAnimation.forEach(launchAnimation);


const deleteActiveClass = (residents) => residents.forEach(el => el.classList.remove('residents__photo_active'));
const startSlider = () => {
    const residents = document.querySelectorAll('.residents__photo');
    const slider = document.querySelector('.residents__slider');
    const widthPhoto = residents[0].clientWidth;
    const activePhoto = 1;
    const rightEdge = residents[1].getBoundingClientRect().right;

    const getDistance = (element) => {
        return element.getBoundingClientRect().right - rightEdge;
    }

    // Начальная позиция
    let isTransitioning = false;

    // Клонируем карточки для бесконечного движения

    slider.appendChild(slider.firstElementChild.cloneNode(true));
    slider.style.transform = `translateX(0px)`;
    const moveNext = (distance) => {

        if (isTransitioning) return;
        isTransitioning = true;

        // Двигаем на одну карточку влево
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${distance || widthPhoto}px)`;

        const residents = document.querySelectorAll('.residents__photo');
        deleteActiveClass(residents);

        slider.addEventListener('transitionend', () => {
            slider.style.transition = 'none';
            slider.appendChild(slider.firstElementChild); // Переносим первый элемент в конец
            slider.style.transform = `translateX(0px)`;
            isTransitioning = false;
            const residents = document.querySelectorAll('.residents__photo');
            residents[activePhoto].classList.add('residents__photo_active');
        }, { once: true });
    };

    const movePrev = () => {
        if (isTransitioning) return;
        isTransitioning = true;

        slider.style.transition = 'none';
        slider.prepend(slider.lastElementChild); // Переносим последний элемент в начало
        slider.style.transform = `translateX(-${widthPhoto}px)`;

        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slider.style.transform = `translateX(0px)`;
        }, 0);

        slider.addEventListener('transitionend', () => {
            isTransitioning = false;
            const residents = document.querySelectorAll('.residents__photo');

            deleteActiveClass(residents);
            residents[activePhoto].classList.add('residents__photo_active');
        }, { once: true });
    };


const timer = setInterval(moveNext, 5000);

    const addActiveClassPhoto = () => {
        const residents = document.querySelectorAll('.residents__photo');
        residents.forEach((el) => {
            el.addEventListener('click', () => {
                const distance = getDistance(el);
                if (distance === 0) {
                    return;
                }
                if (distance > 0) {
                    moveNext(distance)
                }
                if (distance < 0) {
                    movePrev();
                }
            })
        })
    }

    addActiveClassPhoto();

    window.addEventListener('beforeunload', () => {
        clearInterval(timer); // Останавливаем таймер
        console.log("Таймер остановлен перед уходом с сайта");
    });
}

startSlider();


/* второй слайдер с президентом */

const initPresidentSlider = () => {
    const moveSlider = () => {
        const mainPhoto = document.querySelector('.president__main-photo img');
        const mainName = document.querySelector('.president__name');
        const mainDescription = document.querySelector('.president__description');

        const mainPhotoSrc = mainPhoto.src;
        const mainNameValue = mainName.innerHTML;
        const mainDescriptionValue = mainDescription.innerHTML;

        const mutedPhoto = document.querySelector('.president__photo_muted');
        const mainNameSecond = document.querySelector('.president__name-second');
        const mainDescriptionSecond = document.querySelector('.president__description-second');

        mainPhoto.src = mutedPhoto.src;
        mainName.innerHTML = mainNameSecond.innerHTML;
        mainDescription.innerHTML = mainDescriptionSecond.innerHTML;

        mutedPhoto.src = mainPhotoSrc;
        mainNameSecond.innerHTML = mainNameValue;
        mainDescriptionSecond.innerHTML = mainDescriptionValue;
    }

    const timer = setInterval(moveSlider, 5000);


    const button = document.querySelector('.president__button');

    button.addEventListener('click', moveSlider);

    window.addEventListener('beforeunload', () => {
        clearInterval(timer); // Останавливаем таймер
        console.log("Таймер остановлен перед уходом с сайта");

        button.removeEventListener('click', moveSlider);
    });

}

initPresidentSlider();








