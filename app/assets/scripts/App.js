import Carousel from './modules/Carousel';
import Tabs from './modules/Tabs';
import Slideshow from './modules/Slideshow';
import Menu from './modules/Menu';

var carouselActions = new Carousel('carousel--actions');
var carouselNew = new Carousel('carousel--new');
var carouselFeatured = new Carousel('carousel--featured');

var carousels = new Array(carouselActions, carouselNew, carouselFeatured);
var tabs = new Tabs(carousels);
var slideshow = new Slideshow();
var menu = new Menu();
