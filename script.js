// DOM Elements
const likeBtn = document.getElementById('likeBtn');
const saveBtn = document.getElementById('saveBtn');
const postImage = document.getElementById('postImage');
const doubleTapOverlay = document.getElementById('doubleTapOverlay');
const likesCount = document.getElementById('likesCount');
const commentInput = document.getElementById('commentInput');
const postCommentBtn = document.getElementById('postCommentBtn');
const commentsSection = document.getElementById('commentsSection');

// State
let isLiked = false;
let isSaved = false;
let likes = 1234;
let lastTap = 0;

// Like functionality
likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    const icon = likeBtn.querySelector('i');
    
    if (isLiked) {
        icon.className = 'fas fa-heart';
        likeBtn.classList.add('liked');
        likes++;
    } else {
        icon.className = 'far fa-heart';
        likeBtn.classList.remove('liked');
        likes--;
    }
    
    updateLikesCount();
});

// Save functionality
saveBtn.addEventListener('click', () => {
    isSaved = !isSaved;
    const icon = saveBtn.querySelector('i');
    
    if (isSaved) {
        icon.className = 'fas fa-bookmark';
        saveBtn.style.color = '#262626';
    } else {
        icon.className = 'far fa-bookmark';
    }
});

// Double tap to like
postImage.addEventListener('click', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        if (!isLiked) {
            isLiked = true;
            const icon = likeBtn.querySelector('i');
            icon.className = 'fas fa-heart';
            likeBtn.classList.add('liked');
            likes++;
            updateLikesCount();
        }
        
        showDoubleTapHeart();
    }
    
    lastTap = currentTime;
});

function showDoubleTapHeart() {
    doubleTapOverlay.classList.add('show');
    setTimeout(() => {
        doubleTapOverlay.classList.remove('show');
    }, 1000);
}

function updateLikesCount() {
    likesCount.textContent = `${likes.toLocaleString()} likes`;
}

// Comment functionality
commentInput.addEventListener('input', () => {
    const hasText = commentInput.value.trim().length > 0;
    postCommentBtn.classList.toggle('active', hasText);
});

postCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
        addComment('you', commentText);
        commentInput.value = '';
        postCommentBtn.classList.remove('active');
    }
});

commentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        postCommentBtn.click();
    }
});

function addComment(username, text) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <span class="username">${username}</span>
        <span class="comment-text">${text}</span>
    `;
    commentsSection.appendChild(commentDiv);
}

// Share functionality
document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this Instagram post!',
            text: 'Amazing sunset vibes! 🌅✨',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        alert('Sharing feature would open here!');
    }
});

// Comment button functionality
document.getElementById('commentBtn').addEventListener('click', () => {
    commentInput.focus();
});

// Add some initial interactions
setTimeout(() => {
    addComment('travel_lover', 'Beautiful shot! 📸');
}, 2000);

setTimeout(() => {
    addComment('nature_photography', 'Love the colors!');
}, 4000); 