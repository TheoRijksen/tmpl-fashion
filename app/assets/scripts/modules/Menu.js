
class Menu {
    constructor() {
        console.log("const")
        this.navBar = document.getElementsByClassName("nav-bar")[0];
        this.menuIcon = this.navBar.getElementsByClassName("nav-bar__icon")[0];
        this.menu = this.navBar.getElementsByClassName("primary-nav")[0];
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        console.log(this.menuIcon);
    }

    toggleTheMenu() {
        console.log("iets");

        this.menu.toggleClass("primary-nav--visible");
        this.menuIcon.classList.toggle("nav-bar__icon--close-x");
    }
}

export default Menu;