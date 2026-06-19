export class CoverFlow {
    #cylinder;
    #slider;
    #playerText;
    #cards = [];
    #total;
    #angleStep;
    #radius;
    #current = 0;

    constructor(images, onCardClick) {
        this.images = images;
        this.onCardClick = onCardClick;
        
        this.#cylinder  = document.getElementById("cylinder");
        this.#slider    = document.getElementById("slider");
        this.#playerText = document.getElementById("playerText");

        this.#buildCards();

        this.#total     = this.#cards.length;
        this.#angleStep = 360 / this.#total;
        this.#radius    = Math.round(220 / (2 * Math.tan(Math.PI / this.#total)));

        this.#positionCards();
        this.#bindEvents();
        this.update(false);
    }

    #buildCards() {
        this.images.forEach((item) => {
            const div = document.createElement("div");
            div.className = "card";
            const imagePath = `pages/home/img/${item[1]}`;
            div.dataset.image = imagePath;
            div.style.backgroundImage = `url("${encodeURI(imagePath)}")`;
            this.#cylinder.appendChild(div);
            this.#cards.push(div);
        });
    }

    #positionCards() {
        this.#cards.forEach((card, i) => {
            const angle = this.#angleStep * i;
            card.style.transform = `rotateY(${angle}deg) translateZ(${this.#radius}px)`;
        });
    }

    #bindEvents() {
        this.#cards.forEach((card, index) => {
            card.addEventListener("click", () => {
                // Se o card clicado for diferente do atual, se move até ele
                if (index != this.#current) {
                    let diff = index - this.#current;
                    if (diff >  this.#total / 2) diff -= this.#total;
                    if (diff < -this.#total / 2) diff += this.#total;
                    this.#current = (this.#current + diff + this.#total) % this.#total;
                    this.update();
                    return;
                }

                this.onCardClick(card, index);
            });
        });

        this.#slider.addEventListener("input", (e) => {
            this.#current = parseInt(e.target.value);
            this.update();
        });
    }

    update(animate = true) {
        this.#cylinder.style.transition = animate
            ? "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none";

        this.#cylinder.style.transform = `rotateY(${-this.#angleStep * this.#current}deg)`;

        this.#cards.forEach((card, i) =>
            card.classList.toggle("is-front", i === this.#current)
        );

        this.#slider.value       = this.#current;
        this.#playerText.innerText = this.images[this.#current][0];

        if (!animate) {
            requestAnimationFrame(() => {
                this.#cylinder.style.transition =
                    "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)";
            });
        }
    }

    move(dir) {
        this.#current = (this.#current + dir + this.#total) % this.#total;
        this.update();
    }

    get currentGenre() {
        return this.images[this.#current][0];
    }
}