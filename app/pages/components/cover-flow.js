export class CoverFlow {
    #cylinder;
    #coverFlow;
    #cards = [];
    #total;
    #angleStep;
    #radius;
    #current = 0;

    #isDragging = false;
    #startX = 0;
    #currentRotation = 0;
    #dragRotation = 0;
    #dragDistance = 0;
    #sensitivity = 0.15;
    #clickThreshold = 6;
    #oldIndice;

    constructor(images, onCardClick) {
        this.images = images;
        this.onCardClick = onCardClick;
        this.#total     = this.images.length;

        this.#coverFlow = document.querySelector('.cover-flow');
        this.#cylinder  = document.getElementById("cylinder");

        this.#buildCards();
        this.#bindDragEvents();
        this.update(false);
    }

    async #buildCards() {
        this.images.forEach((item, index) => {
            const img = document.createElement("img");
            img.dataset.id = item["id"];
            img.draggable = false;
            img.className = "card";

            img.src = `/storage/${item["path"]}/320.avif`;
            img.srcset=`
                /storage/${item['path']}/320.avif 320w,
                /storage/${item['path']}/480.avif 480w,
                /storage/${item['path']}/640.avif 640w,
                /storage/${item['path']}/960.avif 960w,
                /storage/${item['path']}/1280.avif 1280w
            `;
            img.sizes="17vw";
            
            this.#cylinder.appendChild(img);
            this.#cards.push(img);

            if (index == 0) {
                img.fetchPriority = "high";
                //  Pega a width presente no primeiro elemento de card e transforma em inteiro
                const cardWidth = parseInt(window.getComputedStyle(img).getPropertyValue('width'));

                const circleCircunference = cardWidth * this.#total;

                this.#radius    = circleCircunference / (2 * Math.PI);

                // Angulo de um arco com o tamanho do card
                this.#angleStep = (cardWidth * 360) / circleCircunference;
                
                const angle = this.#angleStep * index;
                img.style.transform = `rotateY(${angle}deg) translateZ(${this.#radius / innerWidth * 100}vw) translateY(-50%)`;
            }

            const angle = this.#angleStep * index;
            img.style.transform = `rotateY(${angle}deg) translateZ(${(this.#radius / window.innerWidth) * 100}vw) translateY(-50%)`;
        });

        this.#coverFlow.style.perspective = `${(this.#radius * 2 / innerWidth * 100)}vw`;
    }

    async #handleCardClick(card, diff, newIndex) {
        const index = this.#cards.indexOf(card);
        if (index === -1) return;

        if (index != this.#current) {
            // Movimenta ate o card
            this.#updateIndice(newIndex);
            this.#currentRotation += -diff * this.#angleStep;
            this.update();
            return;
        }

        await this.onCardClick(card);
    }

    #bindDragEvents() {
        this.#coverFlow.addEventListener("pointerdown", this.#onPointerDown);
        this.#coverFlow.addEventListener("pointermove", this.#onPointerMove);
        this.#coverFlow.addEventListener("pointerup", this.#onPointerUp);
        this.#coverFlow.addEventListener("pointercancel", this.#onPointerCancel);

        this.#coverFlow.addEventListener("dragstart", (e) => e.preventDefault());
    }

    #onPointerDown = (e) => {
        this.#isDragging = true;
        this.#startX = e.clientX;
        this.#dragDistance = 0;
        this.#dragRotation = this.#currentRotation;

        this.#cylinder.style.transition = "none";
        this.#cylinder.style.cursor = "grabbing";
        this.#cylinder.setPointerCapture(e.pointerId);
    };

    #onPointerMove = (e) => {
        if (!this.#isDragging) return;

        const deltaX = e.clientX - this.#startX;
        this.#dragDistance = Math.abs(deltaX);
        this.#dragRotation = this.#currentRotation + deltaX * this.#sensitivity;
        this.#cylinder.style.transform = `rotateY(${this.#dragRotation}deg)`;
    };

    #onPointerUp = (e) => {
        if (!this.#isDragging) return;
        this.#isDragging = false;
        this.#cylinder.style.cursor = "grab";
        this.#cylinder.releasePointerCapture(e.pointerId);

        if (this.#dragDistance <= this.#clickThreshold) {
            this.#cylinder.style.transition =
                "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)";
            this.#cylinder.style.transform = `rotateY(${this.#currentRotation}deg)`;

            const cardWidth = this.#cards[this.#current].getBoundingClientRect().width;
            const windowCenter = window.innerWidth / 2;
            const centerDistance = e.clientX - windowCenter;
            const cardRelDistance = centerDistance / (cardWidth );

            const diff = Math.round(cardRelDistance);
            const newIndex = (this.#current + diff + this.#total) % this.#total;
            this.#handleCardClick(this.#cards[newIndex], diff, newIndex);
            
            return;
        }

        const steps = Math.round((this.#dragRotation - this.#currentRotation) / -this.#angleStep);

        this.#updateIndice(((this.#current + steps) % this.#total + this.#total) % this.#total)
        this.#currentRotation = this.#currentRotation - steps * this.#angleStep;

        this.update();
    };

    #onPointerCancel = (e) => {
        this.#isDragging = false;
        this.#cylinder.style.cursor = "grab";
        this.#cylinder.releasePointerCapture(e.pointerId);
        this.update();
    };

    #updateIndice(indice) {
        this.#oldIndice = this.#current;
        this.#current = indice;
    }

    update(animate = true) {
        this.#cylinder.style.transition = animate
            ? "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none";

        this.#cylinder.style.transform = `rotateY(${this.#currentRotation}deg)`;

        if (this.#oldIndice != null) this.#cards[this.#oldIndice].classList.remove("is-front");
        this.#cards[this.#current].classList.add("is-front");

        if (!animate) {
            requestAnimationFrame(() => {
                this.#cylinder.style.transition =
                    "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)";
            });
        }
    }

    get currentCard() {
        return this.images[this.#current];
    }
}