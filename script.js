let money = 100;        
let goalItem = { name: "貯金箱", price: 300 };
let statusElement;
let instructionElement;
let controlsElement;
let correctStreak = 0;  

const quizQuestions = [
    { question: "お金は銀行に預けると安全に保管してもらえるよ。", answer: true },
    { question: "お金を貯めると後で欲しいものが買いやすくなるよ。", answer: true },
    { question: "1円玉は100円玉よりも高い価値がある。", answer: false },
    { question: "貯金をすると時々お金が増える『利息』がつくことがあるよ。", answer: true },
    { question: "お金をむだづかいすると、貯金は増えやすくなる。", answer: false },
    { question: "お店の人は、お客さんがお金を払うことで収入を得ているよ。", answer: true },
    { question: "お金は放っておくと自然に増える。", answer: false },
    { question: "買い物をするときに、値段をくらべるとお金を節約しやすいよ。", answer: true },
    { question: "毎日おかしを買うと、お金はたまりやすくなる。", answer: false },
    { question: "お金は仕事をして給料をもらったり、物を売ったりして手に入れることができるよ。", answer: true }
];

window.onload = () => {
    statusElement = document.getElementById("status");
    instructionElement = document.getElementById("instruction");
    controlsElement = document.getElementById("controls");
    showInitialInstruction();
    showMainMenu();
};

function showInitialInstruction() {
    instructionElement.textContent = 
        "【ゲームの目的】\n" +
        "1. クイズに答えておこづかいをふやそう！正解するとお金がもらえるよ。\n" +
        "2. 買い物イベントでは、お金を使って物を買えるよ。\n" +
        "3. 最終的に" + goalItem.price + "円ためて「" + goalItem.name + "」を買おう！\n" +
        "お金をうまく使ってゴールを目指してね！";
}

function showStatus(msg, showStreak = false) {
    let streakMessage = "";
    if (showStreak && correctStreak > 1) {
        streakMessage = ` | ${correctStreak}問連続正解中！`;
    }

    statusElement.textContent = `💰所持金: ${money}円 | ${msg}${streakMessage}`;
}

function showMainMenu() {
    controlsElement.innerHTML = "";
    let remaining = goalItem.price - money;
    let goalMessage = (remaining > 0) ? 
        `ゴール(🐷${goalItem.name})まであと${remaining}円` : 
        `もう${goalItem.name}が買えるよ！下のボタンを押してね！`;

    showStatus(goalMessage);

    const btnEarn = createButton("💡おこづかいを増やす(クイズ)", () => {
        startQuiz();
    });
    const btnSpend = createButton("🛍 買い物イベント", () => {
        showSpendEvent();
    });
    const btnBuyGoal = createButton("🎁" + goalItem.name + "を買う", () => {
        attemptPurchaseGoal();
    });

    controlsElement.appendChild(btnEarn);
    controlsElement.appendChild(btnSpend);
    controlsElement.appendChild(btnBuyGoal);
}

function startQuiz() {
    controlsElement.innerHTML = "";
    const q = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    showStatus("クイズに答えておこづかいゲット！(○か×)", true);

    const questionP = document.createElement("p");
    questionP.textContent = q.question + "：正しいと思ったら「○」！ちがうと思ったら「×」！";
    controlsElement.appendChild(questionP);

    const btnMaru = createButton("○", () => {
        checkQuizAnswer(q, true);
    });
    const btnBatsu = createButton("×", () => {
        checkQuizAnswer(q, false);
    });

    controlsElement.appendChild(btnMaru);
    controlsElement.appendChild(btnBatsu);
}

function checkQuizAnswer(quiz, playerAnswer) {
    if (quiz.answer === playerAnswer) {
        correctStreak += 1; 
        const reward = 50 + (correctStreak - 1) * 10;
        money += reward;
        showStatus(`正解！${reward}円ゲット！`, true);
    } else {
        showStatus("残念！不正解だったよ…また挑戦してね！");
        correctStreak = 0; 
    }
    showMainMenu();
}

function showSpendEvent() {
    controlsElement.innerHTML = "";
    const items = [
        {name:"🍬キャンディ", price:20},
        {name:"🥤ジュース", price:50},
        {name:"📖本", price:120}
    ];
    const chosen = items[Math.floor(Math.random()*items.length)];
    showStatus(`${chosen.name}がほしい？ (${chosen.price}円)`);

    const btnBuy = createButton(chosen.name + "を買う", () => {
        if(money >= chosen.price) {
            money -= chosen.price;
            showStatus(`${chosen.name}を買ったよ！`);
        } else {
            showStatus("お金が足りないみたい！もう少しおこづかいを増やそう！");
        }
        showMainMenu();
    });
    const btnSkip = createButton("買わない", () => {
        showStatus("何も買わなかったよ。");
        showMainMenu();
    });

    controlsElement.appendChild(btnBuy);
    controlsElement.appendChild(btnSkip);
}

function attemptPurchaseGoal() {
    controlsElement.innerHTML = "";
    if(money >= goalItem.price) {
        money -= goalItem.price;
        showStatus(goalItem.name + "をゲット！おめでとう🎉");
        const msg = document.createElement("p");
        msg.textContent = "ゲームクリア！お金を計画的に使えるようになったね！";
        controlsElement.appendChild(msg);
    } else {
        showStatus(goalItem.name + "を買うにはあと" + (goalItem.price - money) + "円必要だよ。クイズでがんばろう！");
        showMainMenu();
    }
}

function createButton(label, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = onClick;
    return btn;
}
