document.addEventListener("DOMContentLoaded", function () {
    const addQuestionBtn = document.getElementById("addQuestionBtn");
    const removeQuestionBtn = document.getElementById("removeQuestionBtn");
    const questionList = document.querySelector(".qa-container");
    const questionSelect = document.getElementById("removeQuestionSelect");

    const params = new URLSearchParams(window.location.search);
    const title = decodeURIComponent(params.get("title"));
    const cardData = JSON.parse(localStorage.getItem(title)) || { description: "Descrição não fornecida", questions: [] };

    document.getElementById("cardTitle").textContent = title;
    document.getElementById("cardDescription").textContent = cardData.description;

    function updateRemoveQuestionSelect() {
        questionSelect.innerHTML = "";
        cardData.questions.forEach((_, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `Pergunta ${index + 1}`;
            questionSelect.appendChild(option);
        });
    }

    addQuestionBtn.addEventListener("click", function () {
        const questionText = prompt("Digite a pergunta:");
        if (questionText) {
            const answerText = prompt("Digite a resposta (ou deixe em branco):");
            cardData.questions.push({ question: questionText, answer: answerText || "Nenhuma resposta fornecida" });
            localStorage.setItem(title, JSON.stringify(cardData));

            const questionItem = document.createElement("div");
            questionItem.className = "qa-item";
            questionItem.innerHTML = `
                <p><strong>Pergunta ${cardData.questions.length}:</strong> ${questionText}</p>
                <button onclick="toggleAnswer(this)">Mostrar Resposta</button>
                <p class="answer" style="display: none;">Resposta: ${answerText || "Nenhuma resposta fornecida"}</p>
            `;
            questionList.appendChild(questionItem);

            updateRemoveQuestionSelect();
        }
    });

    removeQuestionBtn.addEventListener("click", function () {
        const selectedIndex = questionSelect.value;
        if (selectedIndex !== "") {
            cardData.questions.splice(selectedIndex, 1);
            localStorage.setItem(title, JSON.stringify(cardData));

            questionList.innerHTML = "";
            cardData.questions.forEach((item, index) => {
                const questionItem = document.createElement("div");
                questionItem.className = "qa-item";
                questionItem.innerHTML = `
                    <p><strong>Pergunta ${index + 1}:</strong> ${item.question}</p>
                    <button onclick="toggleAnswer(this)">Mostrar Resposta</button>
                    <p class="answer" style="display: none;">Resposta: ${item.answer}</p>
                `;
                questionList.appendChild(questionItem);
            });

            updateRemoveQuestionSelect();
        } else {
            alert("Selecione uma pergunta para remover.");
        }
    });

    window.toggleAnswer = function (button) {
        const answer = button.nextElementSibling;
        if (answer.style.display === "none") {
            answer.style.display = "block";
            button.textContent = "Ocultar Resposta";
        } else {
            answer.style.display = "none";
            button.textContent = "Mostrar Resposta";
        }
    };

    cardData.questions.forEach((item, index) => {
        const questionItem = document.createElement("div");
        questionItem.className = "qa-item";
        questionItem.innerHTML = `
            <p><strong>Pergunta ${index + 1}:</strong> ${item.question}</p>
            <button onclick="toggleAnswer(this)">Mostrar Resposta</button>
            <p class="answer" style="display: none;">Resposta: ${item.answer}</p>
        `;
        questionList.appendChild(questionItem);
    });

    updateRemoveQuestionSelect();
});
