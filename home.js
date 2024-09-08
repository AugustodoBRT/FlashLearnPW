document.addEventListener("DOMContentLoaded", function () {
    const cardModal = document.getElementById("cardModal");
    const editModal = document.getElementById("editModal");
    const addBtn = document.getElementById("add-btn");
    const editBtn = document.getElementById("edit-btn");
    const saveCardBtn = document.getElementById("saveCardBtn");
    const saveEditBtn = document.getElementById("saveEditBtn");
    const closeModalBtn = document.querySelector(".close");
    const closeEditModalBtn = document.querySelector(".close-edit");
    const cardContainer = document.querySelector(".main");

    // Função para abrir o modal de adicionar card
    addBtn.addEventListener("click", function () {
        cardModal.style.display = "block";
    });

    // Função para fechar o modal de adicionar card
    closeModalBtn.addEventListener("click", function () {
        cardModal.style.display = "none";
    });

    // Função para fechar o modal de editar card
    closeEditModalBtn.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    // Função para criar um novo card
    saveCardBtn.addEventListener("click", function () {
        const title = document.getElementById("cardTitle").value;
        const description = document.getElementById("cardDescription").value;
        const imageFile = document.getElementById("cardImage").files[0];
        const color = document.getElementById("cardColor").value;

        if (title && description) {
            const newCard = createCard(title, description, imageFile, color);
            cardContainer.appendChild(newCard);
            cardModal.style.display = "none"; // Fecha o modal após salvar
        } else {
            alert("Preencha todos os campos.");
        }
    });

    // Função para criar um novo elemento de card
    function createCard(title, description, imageFile, color) {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-title", title);
        card.style.backgroundColor = color;

        // Adiciona imagem se existir
        const imageDiv = document.createElement("div");
        imageDiv.className = "image";
        const img = document.createElement("img");
        img.alt = title;
        img.src = imageFile ? URL.createObjectURL(imageFile) : "default.png"; // Use uma imagem padrão se não houver
        imageDiv.appendChild(img);

        const titleDiv = document.createElement("div");
        titleDiv.className = "title";
        const h1 = document.createElement("h1");
        h1.textContent = title;
        titleDiv.appendChild(h1);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "des";
        const p = document.createElement("p");
        p.textContent = description;
        const verMaisBtn = document.createElement("button");
        verMaisBtn.textContent = "Ver mais";
        verMaisBtn.className = "ver-mais-btn";
        const excluirBtn = document.createElement("button");
        excluirBtn.textContent = "Excluir";
        excluirBtn.className = "excluir-btn";

        descriptionDiv.appendChild(p);
        descriptionDiv.appendChild(verMaisBtn);
        descriptionDiv.appendChild(excluirBtn);

        card.appendChild(imageDiv);
        card.appendChild(titleDiv);
        card.appendChild(descriptionDiv);

        // Evento de clique para "Ver mais"
        verMaisBtn.addEventListener("click", function () {
            const pageTitle = encodeURIComponent(title);
            window.location.href = `card_page.html?title=${pageTitle}`;
        });

        // Evento de clique para "Excluir"
        excluirBtn.addEventListener("click", function () {
            card.remove();
        });

        return card;
    }

    // Evento de clique para editar card
    editBtn.addEventListener("click", function () {
        const cards = document.querySelectorAll(".card");
        const editCardSelect = document.getElementById("editCardSelect");
        editCardSelect.innerHTML = "";

        cards.forEach(card => {
            const title = card.getAttribute("data-title");
            const option = document.createElement("option");
            option.value = title;
            option.textContent = title;
            editCardSelect.appendChild(option);
        });

        editModal.style.display = "block";
    });

    // Função para salvar edições no card
    saveEditBtn.addEventListener("click", function () {
        const selectedTitle = document.getElementById("editCardSelect").value;
        const newTitle = document.getElementById("editCardTitle").value;
        const newDescription = document.getElementById("editCardDescription").value;
        const newImageFile = document.getElementById("editCardImage").files[0];
        const newColor = document.getElementById("editCardColor").value;

        const cardToEdit = document.querySelector(`.card[data-title="${selectedTitle}"]`);

        if (newTitle && newDescription) {
            // Atualiza título, descrição, imagem e cor do card
            cardToEdit.querySelector(".title h1").textContent = newTitle;
            cardToEdit.querySelector(".des p").textContent = newDescription;
            cardToEdit.style.backgroundColor = newColor;
            cardToEdit.setAttribute("data-title", newTitle);

            // Atualiza imagem se houver uma nova
            if (newImageFile) {
                const img = cardToEdit.querySelector(".image img");
                img.src = URL.createObjectURL(newImageFile);
            }

            editModal.style.display = "none";
        } else {
            alert("Preencha todos os campos.");
        }
    });

    // Função para adicionar eventos de clique no botão "Ver mais" e "Excluir" para cards já existentes
    function initializeCardEvents() {
        const verMaisButtons = document.querySelectorAll(".ver-mais-btn");
        const excluirButtons = document.querySelectorAll(".excluir-btn");

        verMaisButtons.forEach(button => {
            button.addEventListener("click", function () {
                const cardElement = this.closest(".card");
                const title = cardElement.getAttribute("data-title");
                const pageTitle = encodeURIComponent(title);
                window.location.href = `card_page.html?title=${pageTitle}`;
            });
        });

        excluirButtons.forEach(button => {
            button.addEventListener("click", function () {
                const cardElement = this.closest(".card");
                cardElement.remove();
            });
        });
    }

    // Inicializa eventos para os cards que já estão no HTML
    initializeCardEvents();
});
