// Funzione per caricare il file in AG1
function caricaFile() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (fileInput.files.length === 0) {
        status.textContent = "Seleziona un file per caricarlo.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        const lines = content.split("\n");
        const players = [];

        lines.forEach(line => {
            const parts = line.split(",");
            if (parts.length === 3) {
                const player = {
                    nome: parts[0].trim(),
                    cognome: parts[1].trim(),
                    ruolo: parts[2].trim()
                };
                players.push(player);
            }
        });

        // Salva i giocatori nel localStorage
        localStorage.setItem("fileData", JSON.stringify(players)); 
        status.textContent = "File caricato correttamente!";
    };

    reader.onerror = function() {
        status.textContent = "Errore nel caricamento del file.";
    };

    // Leggi il file come testo
    reader.readAsText(file);
}

// Funzione per mostrare i dati in AG2
function mostraDati() {
    const fileContent = localStorage.getItem("fileData");

    if (fileContent) {
        const players = JSON.parse(fileContent);

        const contentDiv = document.getElementById("fileContent");

        const table = document.createElement("table");
        const tableHeader = document.createElement("thead");
        tableHeader.innerHTML = "<tr><th>Nome</th><th>Cognome</th><th>Ruolo</th></tr>";
        table.appendChild(tableHeader);

        const tableBody = document.createElement("tbody");
        players.forEach(player => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${player.nome}</td><td>${player.cognome}</td><td>${player.ruolo}</td>`;
            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        contentDiv.appendChild(table);
    } else {
        document.getElementById("fileContent").innerHTML = "<p>Nessun dato caricato.</p>";
    }
}

// Funzione per andare a AG2
function goToAG2() {
    window.location.href = "ag2.html";
}

// Funzione per andare a AG3
function goToAG3() {
    window.location.href = "ag3.html";
}

// Funzione per andare a AG5
function goToAG5() {
    window.location.href = "ag5.html";
}

// Funzione per andare alla Home
function goHome() {
    window.location.href = "index.html";
}

// Funzione per navigare indietro
function goBack() {
    window.history.back();
}

// Funzione per salvare i dati in AG3
function salvaDati() {
    const squad = document.getElementById("squadra").value;
    const risultato = document.getElementById("risultato").value;
    const data = { squad, risultato };

    localStorage.setItem("partitaData", JSON.stringify(data));

    alert("Dati salvati!");
}

// Funzione per mostrare i dati in AG5
function mostraRiepilogo() {
    const partitaData = JSON.parse(localStorage.getItem("partitaData"));
    const riepilogoDiv = document.getElementById("riepilogo");

    const table = document.createElement("table");
    table.innerHTML = "<thead><tr><th>Squadra Avversaria</th><th>Risultato</th></tr></thead>";
    table.innerHTML += `<tr><td>${partitaData.squad}</td><td>${partitaData.risultato}</td></tr>`;

    riepilogoDiv.appendChild(table);
}

// Funzione per esportare in CSV
function exportCSV() {
    const presenze = document.getElementById("tabellaPresenze");
    const rows = presenze.querySelectorAll("tr");

    let csvContent = "";
    rows.forEach(row => {
        const cols = row.querySelectorAll("td");
        let rowData = "";
        cols.forEach(col => rowData += col.innerText + ",");
        csvContent += rowData.slice(0, -1) + "\n"; // Rimuove l'ultima virgola
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "presenze.csv";
    link.click();
}
