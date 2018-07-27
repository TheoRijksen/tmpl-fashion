//import $ from 'jquery';

class Carousel {
    constructor(selector) {
        this.parent         = document.getElementsByClassName(selector)[0];
        this.gallery        = this.parent.getElementsByClassName("carousel__gallery")[0];
        this.galleryItems   = Array.from(this.gallery.getElementsByClassName("gallery__item"));
        this.prevButton     = this.parent.getElementsByClassName("gallery-prev-button")[0];
        this.nextButton     = this.parent .getElementsByClassName("gallery-next-button")[0];
        this.isAnimating    = false;
        this.viewPortwidth  = window.innerWidth;
        
        this.events();
        this.updateVisibility();
    }

    events() {
        // clicking the gallery navigation
        this.nextButton.onclick = this.showNextItem.bind(this);
        this.prevButton.onclick = this.showPreviousItem.bind(this);

        // resizing the window
        window.onresize = this.updateVisibility.bind(this);
    }

    updateVisibility() {
        this.galleryItems.forEach(function(element) {
            var leftOffset = element.getBoundingClientRect().left;
            var width = element.clientWidth;

            if(leftOffset < -width+40 || leftOffset > (this.viewPortwidth /* + (width + 40)*/ )) {
                element.classList.add('gallery__item--hidden');
            } else {
                element.classList.remove('gallery__item--hidden');
            }
        }, this);
    }

    showNextItem() {
        if(!this.isAnimating) {

            //Animate gallery to new position
            this.isAnimating = true;
            this.gallery.classList.add('carousel__gallery--animated');
            this.gallery.style.left= "-240px";

            //Move first item to end of line after finishing animation
            setTimeout(() => {
                this.gallery.classList.remove('carousel__gallery--animated');
                this.gallery.insertBefore(this.gallery.firstElementChild, this.gallery.lastElementChild.nextSibling);
                this.gallery.style.left= "0px";
                this.isAnimating = false;

                //Fade in items which has entered viewport
                this.updateVisibility();
            }, 200);
        }
        return false;
    }

    showPreviousItem() {
        if(!this.isAnimating) {

            //Animate gallery to new position
            this.isAnimating = true;
            this.gallery.classList.add('carousel__gallery--animated');
            this.gallery.style.left= "240px";

            //Move last item to start of line after finishing animation
            setTimeout(() => {
                this.gallery.classList.remove('carousel__gallery--animated');
                this.gallery.insertBefore(this.gallery.lastElementChild, this.gallery.firstElementChild);
                this.gallery.style.left= "0px";
                this.isAnimating = false;

                //Fade in items which has entered viewport
                this.updateVisibility();
            }, 200);
        }
        return false;
    }
}

export default Carousel;