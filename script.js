let money = 100;        
let goalItem = { name: "貯金箱", price: 300 };
let statusElement;
let controlsElement;
let correctStreak = 0;  

const quizQuestions = [
    { question: "お金は銀行に預けると安全に保管してもらえる", answer: true },
    { question: "お金を貯めると後で欲しいものが買いやすくなる", answer: true },
    { question: "1円玉は100円玉よりも高い価値がある", answer: false },
    { question: "貯金をすると時々お金が増える『利息』がつくことがある", answer: true },
    { question: "お金をむだづかいすると、貯金は増えやすくなる", answer: false },
    { question: "お店の人は、お客さんがお金を払うことで収入を得ている", answer: true },
    { question: "お金は放っておくと自然に増える", answer: false },
    { question: "買い物をするときに、値段をくらべるとお金を節約しやすい", answer: true },
    { question: "毎日おかしを買うと、お金はたまりやすくなる", answer: false },
    { question: "お金は仕事をして給料をもらったり、物を売ったりして手に入れることができる", answer: true }
];

window.onload = () => {
    statusElement = document.getElementById("status");
    controlsElement = document.getElementById("controls");
    // ここで最初からゲームスタート状態に設定
    showStatus("ゲームスタート！おこづかいをためて " + goalItem.name + " (" + goalItem.price + "円) を買おう。");
    showMainMenu();
};

function showStatus(msg) {
    let streakMessage = "";
    if (correctStreak > 1) {
        streakMessage = ` | ${correctStreak}問連続正解中！`;
    }
    statusElement.textContent = `所持金: ${money}円 | ${msg}${streakMessage}`;
}

function showMainMenu() {
    controlsElement.innerHTML = "";
    const btnEarn = createButton("おこづかいを増やす(クイズ)", () => {
        startQuiz();
    });
    const btnSpend = createButton("買い物イベント", () => {
        showSpendEvent();
    });
    const btnBuyGoal = createButton(goalItem.name + "を買う", () => {
        attemptPurchaseGoal();
    });

    controlsElement.appendChild(btnEarn);
    controlsElement.appendChild(btnSpend);
    controlsElement.appendChild(btnBuyGoal);
}

function startQuiz() {
    controlsElement.innerHTML = "";
    const q = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    showStatus("クイズに答えておこづかいゲット！（○か×）");

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
        showStatus(`正解！${reward}円ゲット！`);
    } else {
        showStatus("残念！不正解でした");
        correctStreak = 0; 
    }
    showMainMenu();
}

function showSpendEvent() {
    controlsElement.innerHTML = "";
    const items = [
        {name:"キャンディ", price:20},
        {name:"ジュース", price:50},
        {name:"本", price:120}
    ];
    const chosen = items[Math.floor(Math.random()*items.length)];
    showStatus(chosen.name + "が欲しい？ (" + chosen.price + "円)");

    const btnBuy = createButton(chosen.name + "を買う", () => {
        if(money >= chosen.price) {
            money -= chosen.price;
            showStatus(chosen.name + "を買った！");
        } else {
            showStatus("お金が足りない！買えないよ！");
        }
        showMainMenu();
    });
    const btnSkip = createButton("買わない", () => {
        showStatus("何も買わなかった");
        showMainMenu();
    });

    controlsElement.appendChild(btnBuy);
    controlsElement.appendChild(btnSkip);
}

function attemptPurchaseGoal() {
    controlsElement.innerHTML = "";
    if(money >= goalItem.price) {
        money -= goalItem.price;
        showStatus(goalItem.name + "をゲット！おめでとう！");
        const msg = document.createElement("p");
        msg.textContent = "ゲームクリア！";
        controlsElement.appendChild(msg);
    } else {
        showStatus(goalItem.name + "を買うにはあと" + (goalItem.price - money) + "円必要です");
        showMainMenu();
    }
}

function createButton(label, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = onClick;
    return btn;
}
