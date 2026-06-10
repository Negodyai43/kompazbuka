// ==================== УПРАВЛЕНИЕ ШРИФТОМ ====================

// Функция для применения размера шрифта
function setFontSize(size) {
    document.body.style.fontSize = size + 'px';
    localStorage.setItem('kompazbuka_fontSize', size);
}

// Функция для загрузки сохранённого размера шрифта
function loadFontSize() {
    const savedSize = localStorage.getItem('kompazbuka_fontSize');
    if (savedSize) {
        let size = parseInt(savedSize);
        // Ограничиваем размер в допустимых пределах
        if (size < 18) size = 18;
        if (size > 32) size = 32;
        document.body.style.fontSize = size + 'px';
        return size;
    } else {
        // Значение по умолчанию (20px, как в CSS)
        document.body.style.fontSize = '20px';
        return 20;
    }
}

// ==================== УПРАВЛЕНИЕ КОНТРАСТОМ ====================

// Функция для применения контрастного режима
function setContrastMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('kompazbuka_darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('kompazbuka_darkMode', 'false');
    }
}

// Функция для загрузки сохранённого режима контраста
function loadContrastMode() {
    const savedMode = localStorage.getItem('kompazbuka_darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        return true;
    } else {
        document.body.classList.remove('dark-mode');
        return false;
    }
}

// ==================== ОБНОВЛЕНИЕ ТЕКСТА КНОПОК ====================

function updateButtonText() {
    const contrastToggle = document.getElementById('contrastToggle');
    if (contrastToggle) {
        const isDark = document.body.classList.contains('dark-mode');
        contrastToggle.innerHTML = isDark ? '☀️ Светлая' : '🌙 Контраст';
    }
}

// ==================== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ====================

// Загружаем сохранённые настройки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Загружаем размер шрифта
    let currentFontSize = loadFontSize();
    
    // Загружаем контрастный режим
    loadContrastMode();
    
    // Обновляем текст кнопки контраста
    updateButtonText();
    
    // ==================== НАЗНАЧАЕМ ОБРАБОТЧИКИ КНОПОК ====================
    
    // Кнопка увеличения шрифта
    const fontPlus = document.getElementById('fontPlus');
    if (fontPlus) {
        fontPlus.addEventListener('click', function() {
            let currentSize = parseInt(document.body.style.fontSize);
            if (isNaN(currentSize)) currentSize = 20;
            if (currentSize < 32) {
                let newSize = currentSize + 2;
                if (newSize > 32) newSize = 32;
                setFontSize(newSize);
            }
        });
    }
    
    // Кнопка уменьшения шрифта
    const fontMinus = document.getElementById('fontMinus');
    if (fontMinus) {
        fontMinus.addEventListener('click', function() {
            let currentSize = parseInt(document.body.style.fontSize);
            if (isNaN(currentSize)) currentSize = 20;
            if (currentSize > 18) {
                let newSize = currentSize - 2;
                if (newSize < 18) newSize = 18;
                setFontSize(newSize);
            }
        });
    }
    
    // Кнопка переключения контраста
    const contrastToggle = document.getElementById('contrastToggle');
    if (contrastToggle) {
        contrastToggle.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            setContrastMode(!isDark);
            updateButtonText();
        });
    }
    
});