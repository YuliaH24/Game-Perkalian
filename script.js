let score = 0;
let lives = 3;
let correctAnswer = 0;

function generateQuestion() {
    if (lives <= 0) return;

    document.getElementById('feedback').innerText = "";
    
    // Peluang 30% muncul soal pengecoh (+8), 70% soal perkalian biasa
    let isTrickQuestion = Math.random() < 0.3; 
    let num1 = Math.floor(Math.random() * 9) + 2; // Angka 2 sampai 10
    let num2 = Math.floor(Math.random() * 9) + 2; 

    let questionText = "";

    if (isTrickQuestion) {
        // Soal Pengecoh: Penjumlahan 8
        questionText = `${num1} + 8`;
        correctAnswer = num1 + 8;
    } else {
        // Soal Utama: Perkalian
        questionText = `${num1} × ${num2}`;
        correctAnswer = num1 * num2;
    }

    document.getElementById('question').innerText = questionText;
    setupOptions(correctAnswer);
}

function setupOptions(correct) {
    let options = [correct];
    
    // Membuat 3 pilihan jawaban salah yang acak tapi masuk akal
    while (options.length < 4) {
        let wrong = correct + Math.floor(Math.random() * 10) - 5;
        if (wrong > 0 && !options.includes(wrong)) {
            options.push(wrong);
        }
    }

    // Mengacak posisi tombol agar jawaban benar tidak di situ-situ saja
    options.sort(() => Math.random() - 0.5);

    let buttons = document.getElementsByClassName('option-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = options[i];
    }
}

function checkAnswer(button) {
    let chosenAnswer = parseInt(button.innerText);
    let feedbackElement = document.getElementById('feedback');

    if (chosenAnswer === correctAnswer) {
        score += 10;
        document.getElementById('score').innerText = score;
        feedbackElement.innerText = "Benar! 🎉";
        feedbackElement.style.color = "#1dd1a1";
    } else {
        lives -= 1;
        document.getElementById('lives').innerText = lives;
        feedbackElement.innerText = `Salah! Jawaban benar: ${correctAnswer} ❌`;
        feedbackElement.style.color = "#ff6b6b";
    }

    if (lives <= 0) {
        setTimeout(gameOver, 1000);
    } else {
        setTimeout(generateQuestion, 1000);
    }
}

function gameOver() {
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-screen').classList.remove('hidden');
}

function restartGame() {
    score = 0;
    lives = 3;
    document.getElementById('score').innerText = score;
    document.getElementById('lives').innerText = lives;
    document.getElementById('game-over-screen').classList.add('hidden');
    generateQuestion();
}

// Memulai game pertama kali saat halaman dibuka
generateQuestion();
