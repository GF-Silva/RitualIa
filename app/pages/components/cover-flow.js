export class CoverFlow {
    #cylinder;
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
    #sensitivity = 0.6;
    #clickThreshold = 6;

    constructor(images, onCardClick) {
        this.images = images;
        this.onCardClick = onCardClick;

        this.#cylinder  = document.getElementById("cylinder");

        this.#buildCards();

        this.#total     = this.#cards.length;
        this.#angleStep = 360 / this.#total;
        this.#radius    = Math.round(220 / (2 * Math.tan(Math.PI / this.#total)));

        this.#positionCards();
        this.#bindDragEvents();
        this.update(false);
    }

    #buildCards() {
        this.images.forEach((item) => {
            const img = document.createElement("img");
            img.draggable = false;
            img.className = "card";
            img.src = item[1];
            this.#cylinder.appendChild(img);
            this.#cards.push(img);
        });
    }

    #positionCards() {
        this.#cards.forEach((card, i) => {
            const angle = this.#angleStep * i;
            card.style.transform = `rotateY(${angle}deg) translateZ(${this.#radius}px)`;
        });
    }

    async #handleCardClick(card) {
        const index = this.#cards.indexOf(card);
        if (index === -1) return;

        if (index != this.#current) {
            let diff = index - this.#current;
            if (diff >  this.#total / 2) diff -= this.#total;
            if (diff < -this.#total / 2) diff += this.#total;

            this.#current = (this.#current + diff + this.#total) % this.#total;
            this.#currentRotation += -diff * this.#angleStep;
            this.update();
            return;
        }

        await this.onCardClick(card, index);
    }

    #bindDragEvents() {
        this.#cylinder.addEventListener("pointerdown", this.#onPointerDown);
        this.#cylinder.addEventListener("pointermove", this.#onPointerMove);
        this.#cylinder.addEventListener("pointerup", this.#onPointerUp);
        this.#cylinder.addEventListener("pointercancel", this.#onPointerCancel);

        this.#cylinder.addEventListener("dragstart", (e) => e.preventDefault());
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

            // IMPORTANTE: com pointer capture ativo, e.target sempre aponta para o
            // elemento que chamou setPointerCapture (o #cylinder), nunca para o card
            // que está visualmente sob o cursor. Por isso usamos elementFromPoint,
            // que consulta a posição real na tela e ignora a captura.
            const realTarget = document.elementFromPoint(e.clientX, e.clientY);

            if (realTarget && realTarget.classList.contains("card")) {
                this.#handleCardClick(realTarget);
            }
            return;
        }

        const steps = Math.round((this.#dragRotation - this.#currentRotation) / -this.#angleStep);

        this.#current = ((this.#current + steps) % this.#total + this.#total) % this.#total;
        this.#currentRotation = this.#currentRotation - steps * this.#angleStep;

        this.update();
    };

    #onPointerCancel = (e) => {
        this.#isDragging = false;
        this.#cylinder.style.cursor = "grab";
        this.#cylinder.releasePointerCapture(e.pointerId);
        this.update();
    };

    update(animate = true) {
        this.#cylinder.style.transition = animate
            ? "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)"
            : "none";

        this.#cylinder.style.transform = `rotateY(${this.#currentRotation}deg)`;

        this.#cards.forEach((card, i) =>
            card.classList.toggle("is-front", i === this.#current)
        );

        if (!animate) {
            requestAnimationFrame(() => {
                this.#cylinder.style.transition =
                    "transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1)";
            });
        }
    }

    move(dir) {
        this.#current = (this.#current + dir + this.#total) % this.#total;
        this.#currentRotation -= dir * this.#angleStep;
        this.update();
    }

    get currentGenre() {
        return this.images[this.#current][0];
    }
}