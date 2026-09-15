export class CoverFlow {
    #cylinder;
    #coverFlow;
    #cards = [];
    #total;
    #angleStep;
    #radius;
    #cardWidth;
    #current = 0;

    #isDragging = false;
    #startX = 0;
    #currentRotation = 0;
    #dragRotation = 0;
    #dragDistance = 0;
    #sensitivity = 0.01;
    #clickThreshold = 6;
    #oldIndice;
    #cardsOffset = 3;
    #cardsRange;

    constructor(images, onCardClick) {
        this.images = images;
        this.onCardClick = onCardClick;
        this.#total = this.images.length;

        this.#coverFlow = document.querySelector('.cover-flow');
        this.#cylinder = document.getElementById("cylinder");

        this.#buildCards();
        this.#bindDragEvents();
        this.update(false);
    }

    #delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async #buildCards() {

        this.images.forEach((item, index) => {
            const img = document.createElement("img");
            img.alt = `Foto do gênero ${item["name"]}`;
            img.title = `Clique para escolher o gênero ${item["name"]}`;
            img.dataset.id = item["id"];
            img.draggable = false;
            img.className = "card";
            img.decoding = "async";
            img.fetchPriority = "high";
            img.dataset.src = `/storage/${item["path"]}`;
            img.sizes="17vw";

            this.#cylinder.appendChild(img);
            this.#cards.push(img);

            if (index == 0) {
                //  Pega a width presente no primeiro elemento de card e transforma em inteiro
                this.#cardWidth = parseFloat(window.getComputedStyle(img).getPropertyValue('width'));
                const circleCircunference = this.#cardWidth * this.#total;
                this.#radius = circleCircunference / (2 * Math.PI);
                // Angulo de um arco com o tamanho do card
                this.#angleStep = (this.#cardWidth * 360) / circleCircunference;
                const angle = this.#angleStep * index;
                img.style.transform = `rotateY(${angle}deg) translateZ(${(this.#radius / window.innerWidth) * 100}vw) translateY(-50%)`;
                this.#coverFlow.style.perspective = `${(this.#radius * 2 / innerWidth * 100)}vw`;
                const relCardWidth = img.getBoundingClientRect().width;
                const size = this.#coverFlow.getBoundingClientRect().width;
                const cards = size / relCardWidth;
                this.#cardsRange = Math.round(cards + this.#cardsOffset);
                console.log("Cards range: ", this.#cardsRange);
            }
            
            const angle = this.#angleStep * index;
            img.style.transform = `rotateY(${angle}deg) translateZ(${(this.#radius / window.innerWidth) * 100}vw) translateY(-50%)`;
        });

        this.#createObserver();
    }

    #createObserver() {
        const rotateRegex = RegExp(/rotateY\((-?\d+(?:\.\d+)?)/);
        const angleRange = this.#angleStep * this.#cardsRange;
        const minAngle = angleRange;
        const maxAngle = 360 - minAngle;
        let isBusy = false;
        let oldAngle = 0;
        let firstCard;
        let lastCard;

        // percorre cada direcao, partindo do comeco e do fim
        for (let index = 0; index < this.#total; index++) {
            const card = this.#cards[index];
            const cardAngle = this.#extractAngle(card.style.transform, rotateRegex, 0);
            const cylinderRotation = this.#extractAngle(this.#cylinder.style.transform, rotateRegex, 0);
            const finalAngle = Math.abs(cardAngle + cylinderRotation);
            const delta = Math.abs(360 - finalAngle);
            
            if (
                finalAngle <= minAngle && delta >= maxAngle 
                || delta <= minAngle && finalAngle >= maxAngle
            ) {
                lastCard = index;
            } else {
                break;
            }
        }

        for (let index = this.#total - 1; index >= 0; index--) {
            const card = this.#cards[index];
            const cardAngle = this.#extractAngle(card.style.transform, rotateRegex, 0);
            const cylinderRotation = this.#extractAngle(this.#cylinder.style.transform, rotateRegex, 0);
            const finalAngle = Math.abs(cardAngle + cylinderRotation);
            const delta = Math.abs(360 - finalAngle);
            
            if (
                finalAngle <= minAngle && delta >= maxAngle 
                || delta <= minAngle && finalAngle >= maxAngle
            ) {
                firstCard = index;
            } else {
                break;
            }
        }

        const observer = new MutationObserver(async (mutations) => {
            // concorrencia: apenas 1 observer usa de cada vez
            if (isBusy) return;

            mutations.forEach(async (mutation) => {
                // assegura a concorrencia
                if (isBusy) return;

                try {
                    isBusy = true;
                    
                    let newRotation = this.#extractAngle(mutation.target.style.transform, rotateRegex, 0);
                    const delta = (newRotation - oldAngle) / this.#angleStep;
                    
                    if (Math.abs(delta) < 0.7) return;
                    
                    // console.log('---------------------');
                    // console.log("Delta: ", delta);
                    // console.log("First card: ", firstCard);
                    // console.log("Last card: ", lastCard);

                    const dir = Math.abs(Math.round(delta));

                    if (delta < 0) {
                        // console.log("++++++++++++++++++++++++");
                        // console.log("Delta negativo: ", dir);

                        for (let i=0; i < dir; i++) {
                            this.#cards[(firstCard + i + this.#total) % this.#total].style.background = "#f00";
                            this.#cards[(lastCard + 1 + i + this.#total) % this.#total].style.background = '';
                        }

                        firstCard = (firstCard + dir + this.#total) % this.#total;
                        lastCard = (lastCard + dir + this.#total) % this.#total;
                        
                        // console.log("Novo first card: ", firstCard);
                        // console.log("Novo last card: ", lastCard);

                    } else {
                        // console.log("++++++++++++++++++++++++");
                        // console.log("Delta positivo: ", dir);

                        // remove os last card
                        for (let i = 0; i < dir; i++) {
                            this.#cards[(lastCard - i + this.#total) % this.#total].style.background = "#ff0";
                            this.#cards[(firstCard - 1 - i + this.#total) % this.#total].style.background = '';
                        }

                        lastCard = (lastCard - dir + this.#total) % this.#total;
                        firstCard = (firstCard - dir + this.#total) % this.#total

                        // console.log("Novo first card: ", firstCard);
                        // console.log("Novo last card: ", lastCard);
                    }
                    
                    oldAngle = newRotation;
                } finally {
                    // devo ajustar o delay se ficar extremamente rapido
                    // delay para limitar a quantidade de ocorrencias por segundo
                    await this.#delay(100);
                    isBusy = false;
                }
            });
        });

        observer.observe(this.#cylinder, { attributeOldValue: true, attributesFilter: "style" });
    }

    #extractAngle(str, regex, fallback = 0) {
        const match = str?.match(regex);
        return match ? parseFloat(match[1]) : fallback;
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
        // Limita a rotacao maxima do cilindro como 359, acima disso ele coloca como 0
        this.#dragRotation = Math.abs(this.#currentRotation + deltaX * this.#angleStep * this.#sensitivity) >= 360 ? 0 : this.#currentRotation + deltaX * this.#angleStep * this.#sensitivity;
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
            const cardRelDistance = centerDistance / (cardWidth);

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