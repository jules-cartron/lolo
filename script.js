document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 767) {
        document.body.classList.add('mobile');
    }
    let gameInterval;
    let obstacleInterval;
    let obstacles = [];
    let currentObstacleIndex = 0;
    let isJumping = false;
    let staticJump = null;
    let score = 0;
    let isGameOver = false;
    let obstacleDelay = 1000; // Temps d'attente en millisecondes
    let bestScore = 0; // Initialisez la meilleure score à zéro

    

    let cocostarte = 2;
    let ricostarte =5;
    let zarmastarte =2
    

    // Éléments HTML
    const dino = document.getElementById('dino');
    const dino1 = document.getElementById('dino1');
    const dino2 = document.getElementById('dino2');
    const dino3 = document.getElementById('dino3');

    const rico = document.getElementById('rico');
    const rico1 = document.getElementById('rico1');
    const rico2 = document.getElementById('rico2');
    const rico3 = document.getElementById('rico3');



    

    
    const obstacle1a = document.querySelector('.obstacle.obstacle1 img:nth-child(1)');
    const obstacle1b = document.querySelector('.obstacle.obstacle1 img:nth-child(2)');



    function startAnimation() {
        const movingImage = document.getElementById('moving-image1'); // Utilisation d'un ID unique (moving-image1)
        let currentPosition = window.innerWidth; // Commence à droite de l'écran
    
        // Cacher l'image au début
        movingImage.style.display = 'none';
    
        function moveImage() {
            if (currentPosition > 0) {
                currentPosition -= 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(moveImage);
            }
        }
    
        function reverseMoveImage() {
            if (currentPosition < window.innerWidth * 0.9) {
                currentPosition += 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(reverseMoveImage);
            }
        }
    
        moveImage();
    
        // Révéler l'image lorsque l'animation commence
        movingImage.style.display = 'block';
    
        var imageSources = ['coco1.PNG', 'coco2.PNG', 'coco3.PNG', 'coco4.PNG', 'coco5.PNG', 'coco6.PNG', 'coco5.PNG', 'coco4.PNG', 'coco3.PNG', 'coco2.PNG',];
        var currentIndex = 0;
        
        setInterval(function() {
            movingImage.src = imageSources[currentIndex];
            currentIndex = (currentIndex + 1) % imageSources.length;
        }, 150);
        
    }
    
    function startAnimation2() {
        const movingImage = document.getElementById('moving-image2'); // Utilisation d'un ID unique (moving-image2)
        let currentPosition = -movingImage.width; // Commence à gauche de l'écran
    
        // Cacher l'image au début
        movingImage.style.display = 'none';
    
        function moveImage() {
            if (currentPosition < window.innerWidth * 0) {
                currentPosition += 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(moveImage);
            }
        }
    
        function reverseMoveImage() {
            if (currentPosition > -movingImage.width) {
                currentPosition -= 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(reverseMoveImage);
            }
        }
    
        moveImage();
        // Révéler l'image lorsque l'animation commence
        movingImage.style.display = 'block';
    
        let isRico1 = true;

        setInterval(function() {
            movingImage.src = isRico1 ? 'rico1.PNG' : 'rico2.PNG';
            isRico1 = !isRico1; // Inverse la valeur
        }, 200);
        
    }
    function startAnimation3() {
        const movingImage = document.getElementById('moving-image3'); // Utilisation d'un ID unique (moving-image1)
        let currentPosition = window.innerWidth; // Commence à droite de l'écran
    
        // Cacher l'image au début
        movingImage.style.display = 'none';
        const stopezarma = window.innerWidth <= 767 ? 150 : 300; 
        function moveImage() {
            if (currentPosition > stopezarma) {
                currentPosition -= 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(moveImage);
            }
        }
    
        function reverseMoveImage() {
            if (currentPosition < window.innerWidth * 0.9) {
                currentPosition += 2;
                movingImage.style.left = currentPosition + 'px';
                requestAnimationFrame(reverseMoveImage);
            }
        }
    
        moveImage();
    
        // Révéler l'image lorsque l'animation commence
        movingImage.style.display = 'block';
    
        var imageSources = ['zarma1.PNG', 'zarma2.PNG']; // Changement des noms de fichiers
        var currentIndex = 0;
    
        setInterval(function() {
            movingImage.src = imageSources[currentIndex];
            currentIndex = (currentIndex + 1) % imageSources.length;
        }, 200);
    }
    
    
    
    const toggleObstacleImages = function() {
        setInterval(function() {
            if (!isGameOver) {
                if (obstacle1a.style.display === 'block') {
                    obstacle1a.style.display = 'none';
                    obstacle1b.style.display = 'block';
                } else {
                    obstacle1b.style.display = 'none';
                    obstacle1a.style.display = 'block';
                }
            }
        }, 200); // Changez la valeur à 200 pour un clignotement toutes les 0.2 secondes
    };
    

    const startDinoAnimation = function() {
        setInterval(function() {
            if (!isJumping) {
                if (dino1.style.display === 'block') {
                    dino1.style.display = 'none';
                    dino2.style.display = 'block';
                } else if (dino2.style.display === 'block') {
                    dino2.style.display = 'none';
                    dino3.style.display = 'block';
                } else if (dino3.style.display === 'block') {
                    dino3.style.display = 'none';
                    dino1.style.display = 'block';
                }
            }
        }, 200);
    };


    function jump() {
        if (!isJumping && gameInterval) {
            isJumping = true;
            let position = 0;
            const jumpInterval = setInterval(function() {
                const jumpHeight = window.innerWidth <= 767 ? 150 : 250; // Nouvelle variable pour la hauteur de saut
                if (position >= jumpHeight) {
                    clearInterval(jumpInterval);
                    staticJump = window.innerWidth <= 767 ? 150 : 300;
                    setTimeout(() => {
                        const fallInterval = setInterval(function() {
                            if (position >= 3) {
                                position -= 3;
                                dino.style.bottom = position + 'px';
                                dino1.style.display = 'none';
                                dino2.style.display = 'none';
                                dino3.style.display = 'block';
                            } else {
                                clearInterval(fallInterval);
                                isJumping = false;
                                staticJump = null;
                                dino1.style.display = 'block';
                                dino2.style.display = 'none';
                                dino3.style.display = 'none';
                            }
                        }, 10);
                    }, staticJump);
                } else {
                    position += window.innerWidth <= 767 ? 3 : 5;
                    dino.style.bottom = position + 'px';
                    dino1.style.display = 'none';
                    dino2.style.display = 'none';
                    dino3.style.display = 'block';
                }
            }, 10);
        }
    }
    function jump2() {
        if (!isJumping && gameInterval) {
            isJumping = true;
            let position = 0;
            const jumpInterval = setInterval(function() {
                const jumpHeight = window.innerWidth <= 767 ? 150 : 250;
                if (position >= jumpHeight) {
                    clearInterval(jumpInterval);
                    staticJump = window.innerWidth <= 767 ? 150 : 300;
                    setTimeout(() => {
                        const fallInterval = setInterval(function() {
                            if (position >= 3) {
                                position -= 3;
                                rico.style.bottom = position + 'px';
                                rico1.style.display = 'none';
                                rico2.style.display = 'none';
                                rico3.style.display = 'block';
                            } else {
                                clearInterval(fallInterval);
                                isJumping = false;
                                staticJump = null;
                                rico1.style.display = 'block';
                                rico2.style.display = 'none';
                                rico3.style.display = 'none';
                            }
                        }, 10);
                    }, staticJump);
                } else {
                    position += window.innerWidth <= 767 ? 3 : 5;
                    rico.style.bottom = position + 'px';
                    rico1.style.display = 'none';
                    rico2.style.display = 'none';
                    rico3.style.display = 'block';
                }
            }, 10);
        }
    }
    
    
    
    

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowUp') {
            if (!staticJump) {
                jump();
                jump2();
            }
        }
    });
    

    
    document.addEventListener('touchstart', function(event) {
        if (!isGameOver) {  // Vérifier si la partie n'est pas déjà perdue
            event.preventDefault(); // Empêcher le comportement par défaut
            if (!staticJump) {
                jump();
                jump2();
            }
        }
    }, { passive: false });
     // Spécifier que l'écouteur n'est pas passif
    

    function moveObstacle(obstacle) {
        const obstacleWidth = obstacle.offsetWidth;
        let obstacleLeft = window.innerWidth;
    
        let obstacleInterval = setInterval(function() {
            obstacleLeft -= window.innerWidth <= 767 ? 3 : 5;
            obstacle.style.left = obstacleLeft + 'px';
    
            if (obstacleLeft < -obstacleWidth) {
                obstacleLeft = window.innerWidth;
                clearInterval(obstacleInterval);
    
                setTimeout(function() {
                    obstacleInterval = moveObstacle(obstacle);
                }, obstacleDelay);
            }
        }, 10);
    
        return obstacleInterval;
    }
    

    const obstacle1 = document.querySelector('.obstacle.obstacle1');
    obstacles.push(obstacle1);

    function checkCollision() {
        const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    
        obstacles.forEach(function(obstacle) {
            if (!obstacle) return; // Vérifie si l'obstacle est défini
    
            const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    
            if (obstacleLeft < 90 && obstacleLeft > 72 && dinoBottom <= 30) {
                clearInterval(gameInterval);
                clearInterval(obstacleInterval);
                isGameOver = true;
                displayGameOverScreen();
                sauvegarderMeilleurScore(score);
            }
        });
    }
    function sauvegarderMeilleurScore(score) {
        var meilleurScoreActuel = recupererMeilleurScore();
    
        if (meilleurScoreActuel === null || score > meilleurScoreActuel) {
            // Enregistrez le nouveau meilleur score
            var expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            document.cookie = "meilleurScore=" + score + "; expires=" + expirationDate.toUTCString();
            
            console.log("Nouveau meilleur score enregistré : " + score);
        } else {
            console.log("Le meilleur score reste : " + meilleurScoreActuel);
        }
    }
    
    
    function recupererMeilleurScore() {
        var cookieValeur = getCookie("meilleurScore");
        return cookieValeur ? parseInt(cookieValeur) : null;
    }
    
    function getCookie(nom) {
        var nomEQ = nom + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nomEQ) == 0) return c.substring(nomEQ.length,c.length);
        }
        return null;
    }
    





    
    function recupererMeilleurScore() {
        var cookieValeur = getCookie("meilleurScore");
        return cookieValeur ? parseInt(cookieValeur) : null;
    }      

    
    
    // Afficher le meilleur score dans l'écran de Game Over
    function displayGameOverScreen() {
        const gameContainer = document.getElementById('game-container');
        const meilleurScore = recupererMeilleurScore();
        gameContainer.innerHTML = `
            <div class="game-over-screen">
                <h1>Game Over</h1>
                <div id="score">Score: ${score}</div>
                <div id="best-score">Best Score: ${meilleurScore !== null ? meilleurScore : 0}</div>
                <button id="restart-button">Restart</button>
            </div>
        `;
    
        const restartButton = document.getElementById('restart-button');
        restartButton.addEventListener('click', resetGame);
    }
    
    

    function resetGame() {
        location.reload();
        clearInterval(obstacleInterval);
        obstacles = [];
        currentObstacleIndex = 0;
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = `
            <!-- ... (votre code HTML) ... -->
        `;
    
        obstacles = [document.querySelector('.obstacle.obstacle1')];
        moveNextObstacle();
    
        dino.style.bottom = '0';
    
        gameInterval = setInterval(checkCollision, 10);
    
        isJumping = false;
        isGameOver = false;
    
        const restartButton = document.getElementById('restart-button');
        restartButton.disabled = true;
    
        startDinoAnimation();
    }
    

    function moveNextObstacle() {
        if (currentObstacleIndex < obstacles.length) {
            const obstacleType = currentObstacleIndex % 2 === 0 ? 'obstacle1' : 'obstacle2';
            const obstacle = document.querySelector(`.${obstacleType}`);
            obstacleInterval = moveObstacle(obstacle);
            currentObstacleIndex++;
            if (currentObstacleIndex >= obstacles.length) {
                currentObstacleIndex = 0;
            }
        }
    }

    moveNextObstacle();





    gameInterval = setInterval(function() {
        if (!isGameOver) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            if (score === cocostarte) {
                console.log("coco");
                startAnimation();
            }
            if (score === ricostarte) {
                console.log("rico");
                startAnimation2();
            }
            if (score === zarmastarte){
                console.log("zarma")
                startAnimation3();
            }
    
            // Mettez à jour le meilleur score si nécessaire
            if (score > bestScore) {
                bestScore = score;
            }
        }
    }, 2000);
    

    // ... (votre code existant) ...



    gameInterval = setInterval(checkCollision, 10);
    toggleObstacleImages();
    startDinoAnimation();
});
