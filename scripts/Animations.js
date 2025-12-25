class Animations {
    selectors = {
        cowFrame: '.welcome__image-child',
    };

    stateClass = {
        animate: 'animate',
    };

    constructor() {
        this.cowFrameElement = document.querySelector(this.selectors.cowFrame);
        if (this.cowFrameElement) {
            this.initIntersectionObserver();
        }
    }

    initIntersectionObserver = () => {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cowFrameElement.classList.add(this.stateClass.animate);
                    this.observer.unobserve(this.cowFrameElement);
                }
            });
        }, {
            threshold: 0.1,
        });

        this.observer.observe(this.cowFrameElement);
    };
}

export default Animations;