document.getElementById("profile-pic").addEventListener("click", function() {
    var details = document.getElementById("details");
    if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
    } else {
        details.classList.add("hidden");
    }
});

function toggleHobbyDetails(hobbyId) {
    var details = document.getElementById(hobbyId);
    if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
    } else {
        details.classList.add("hidden");
    }
}

// 팝업창 닫기
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// AI Chat 모달 열기
function openChat() {
    document.getElementById('chatModal').style.display = 'block';
}

// AI Chat 모달 닫기
function closeChat() {
    document.getElementById('chatModal').style.display = 'none';
}

// 메시지 전송
async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    addMessage('You', userInput);
    document.getElementById('userInput').value = '';

    try {
        console.log("Sending message:", userInput);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer (Your api key)' // API 키 추가
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' }, // 시스템 메시지 추가
                    { role: 'user', content: userInput }
                ]
            })
        });

        console.log("Response status:", response.status); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data); 
        const assistantMessage = data.choices[0].message.content;
        addMessage('Chat twobean', assistantMessage);
    } catch (error) {
        console.error('Error:', error);
        addMessage('Chat twobean', '현재 사용할 수 없는 상태입니다.');
    }
}

// 메시지 추가
function addMessage(sender, text) {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

// 페이지 로드 시 팝업창 표시
window.onload = function() {
    document.getElementById('popup').style.display = 'block';
};

// 상세 정보 토글
function toggleDetails(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
}
