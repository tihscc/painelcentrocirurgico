// Função para avançar para o próximo slide
function nextSlide() {
    var currentSlide = document.querySelector('input[name="slider"]:checked');
    var nextSlide = currentSlide.nextElementSibling || document.querySelector('input[name="slider"]:first-child');
    currentSlide.checked = false;
    nextSlide.checked = true;
    
    // Se o próximo slide for o primeiro, reinicie o temporizador
    if (nextSlide === document.querySelector('input[name="slider"]:first-child')) {
        clearInterval(slideTimer);
        startSlideTimer();
    }
}

var slideTimer; // Variável para armazenar o temporizador

// Função para iniciar o temporizador para avançar automaticamente os slides
function startSlideTimer() {
    slideTimer = setInterval(nextSlide, 5000); // Altere 2000 para o intervalo de tempo desejado em milissegundos (por exemplo, 5000 para 5 segundos)
}

// Inicia o temporizador quando a janela carrega
window.onload = function() {
    startSlideTimer();
};