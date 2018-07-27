//import $ from 'jquery';

class Tabs {
    constructor(children) {
        this.navigation         = document.getElementsByClassName("tabs__navigation")[0];
        this.navigationItems    = Array.from(document.getElementsByClassName("tabs__navigation-item"));
        this.contentItems       = Array.from(document.getElementsByClassName("tabs__content-item"));
        this.activeTab          = Array.from(document.getElementsByClassName("tabs__content-item"))[0];
        this.children           = children;

        this.events();
    }

    events() {
        var that = this;
        this.navigationItems.forEach((element, index) => {
            element.onclick = that.showTab.bind(that,element,index);
        });
    }

    showTab(clickedElement, indexClickedElement) {
        //Make the clicked tab navigation item active
        this.navigationItems.forEach((element, index) => {
            if(index === indexClickedElement) {
                element.classList.add('tabs__navigation-item--active');
            } else {
                element.classList.remove('tabs__navigation-item--active');
            }

            
        });

        //Show the content from choosen tab
        this.contentItems.forEach((contentItem, index) => {
            if(index === indexClickedElement) {
                //Add small delay to let animation finish
                 setTimeout(() => {
                    contentItem.classList.add('tabs__content-item--active');
                 }, 200);
            } else {
                contentItem.classList.remove('tabs__content-item--active');
            }

            this.children[index].updateVisibility();
        });

        return false;
    }
}

export default Tabs;