class Slideshow {
    constructor() {
        this.slideshow        = document.getElementsByClassName("slideshow")[0];
        this.sliders          = Array.from(this.slideshow.getElementsByClassName("slider__slide"));
        this.bulletNavigation = this.slideshow.getElementsByClassName("bullet-navigation")[0];
        this.bullets          = Array.from(this.slideshow.getElementsByClassName("bullet-navigation__btn"));
        this.loader           = this.slideshow.getElementsByClassName("slideshow__loader")[0];
        this.nextButton       = this.slideshow.getElementsByClassName("arrow-navigation--right")[0];
        this.prevButton       = this.slideshow.getElementsByClassName("arrow-navigation--left")[0];
        this.animateSlider    = true;
        this.animateTimer     = null;

        this.events();
        this.startAnimating();
    }

    events() {
        var that = this;

        //Clicking the bullet navigation
        this.bullets.forEach((element, index) => {
            element.onclick = that.showSlide.bind(that, index);
        });

        //Clicking the "next" button
        this.nextButton.onclick = this.showNextSlide.bind(this);

        //Clicking the "prev" button
        this.prevButton.onclick = this.showPreviousSlide.bind(this);

        //Hovering over the slideshow
        this.slideshow.addEventListener("mouseenter", function() {
            that.stopAnimating();
        });

        //Stop hovering over the slideshow
        this.slideshow.addEventListener("mouseleave", function() {
            that.startAnimating();
        });

        //Touching the slideshow
        this.slideshow.addEventListener("touchstart", function() {
            that.stopAnimating();
        });

        //Stop touching the slideshow
        this.slideshow.addEventListener("touchend", function() {
            that.startAnimating();
        });
    }

    showSlide(slideNumber) {
        //Show the slide
        this.sliders[slideNumber].classList.add('slider__slide--active');

        //Hide other slides
        this.sliders.forEach((slide, index) => {
            if(index !== slideNumber) {
                slide.classList.remove('slider__slide--active');
            }
        });

        //Update bullet navigation
        this.updateBullets();

        return false;
    }

    showNextSlide() {
        for (let i = 0; i < this.sliders.length ; i++) {
            if(this.sliders[i].classList.contains('slider__slide--active')) {
                
                //Hide current slide
                this.sliders[i].classList.remove('slider__slide--active');

                //If there is a next item, make active
                if((i + 1) < this.sliders.length) {
                   this.sliders[i+1].classList.add('slider__slide--active'); 

                //Else make first slide active
                } else {
                    this.sliders[0].classList.add('slider__slide--active'); 
                }
                //Update bullet navigation
                this.updateBullets();
                break;
            }
        }
        return false;
    }

    showPreviousSlide() {
        for (let i = 0; i < this.sliders.length ; i++) {
            if(this.sliders[i].classList.contains('slider__slide--active')) {
                //Hide current slide
                this.sliders[i].classList.remove('slider__slide--active');

                //If there is a previous item, make active
                if((i - 1) >= 0) {
                   this.sliders[i-1].classList.add('slider__slide--active'); 

                //Else make last slide active
                } else {
                    this.sliders[this.sliders.length-1].classList.add('slider__slide--active'); 
                }
                //Update bullet navigation
                this.updateBullets();
                break;
            }
        }
        return false;
    }

    updateBullets() {
        this.sliders.forEach((slide, index) => {
            if(slide.classList.contains('slider__slide--active')) {
                this.bullets[index].classList.add('bullet-navigation__btn--active'); 
            } else {
                this.bullets[index].classList.remove('bullet-navigation__btn--active'); 
            }
        });
    }

    startAnimating() {
        this.animateSlider = true;

        this.animateTimer = setInterval(() => {
            if(this.animateSlider) {
                this.showNextSlide();
            } else {
                clearInterval(this.animateTimer);
            }
        }, 7500);
    }

    stopAnimating() {
        this.animateSlider = false;
        clearInterval(this.animateTimer);
    }
}

export default Slideshow;