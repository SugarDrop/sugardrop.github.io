(function() {
    var canvas;
    var ctx;
    var cellSize = 40;
    var board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,1,2,2,0],
      [0,0,0,1,1,2,0],  
    ];
    
    function drawPieces() {
        ctx.lineWidth = 1;
        for (var r = 0; r < board.length; r++) {
            for (var c = 0; c < board[0].length; c++) {
                var stone = board[r][c];
                if (stone === 0) {
                    continue;
                }
                var gradientStart;
                var color;
                switch(stone) {
                    case 1:
                    gradientStart = "#faef55";
                    color = "Red";
                    break;
                    case 2:
                    gradientStart = "#73faec";
                    color = "Blue";
                    break;
                }
                var xCenter = cellSize * c + cellSize / 2;
                var yCenter = cellSize * r + cellSize / 2;
                var radius = cellSize * 0.4;
                var gradientX = xCenter + cellSize * 0.1;
                var gradientY = yCenter - cellSize * 0.1;
                var gradient = ctx.createRadialGradient(
                    gradientX, gradientY, cellSize * 0.1,
                    xCenter, yCenter, radius * 1.2);
                gradient.addColorStop(0, gradientStart);
                gradient.addColorStop(1, color);
                ctx.fillStyle = gradient;
                
                ctx.beginPath();
                ctx.arc(cellSize * c + cellSize / 2,
                        cellSize * r + cellSize / 2,
                        cellSize / 2 - 5,
                        0, 2 * Math.PI, false);
                ctx.fill();
            }
        }
    }
    
    function drawBoardLine() {
        // The surrounding square
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        
        // The grid lines
        ctx.beginPath();
        for (var i = 0; i < 8; i++) {
            // Vertical lines -> 7 columns
            ctx.moveTo(i * cellSize + 0.5, 0);
            ctx.lineTo(i * cellSize + 0.5, cellSize * 6);
        }
        for (var i = 0; i < 7; i++) {
            // Horizontal lines - 6 rows
            ctx.moveTo(0, i * cellSize + 0.5);
            ctx.lineTo(cellSize * 7, i * cellSize + 0.5);
        }
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    function repaint() {
        if (!ctx) {
            return;
        }
        
    }
    
    function resizeCanvas() {
        canvas.width = document.width || document.clientWidth;
        canvas.height = document.height || document.clientHeight;
        
    }
    
    function initFullScreenCanvas(canvasId) {
        var canvas = document.getElementById(canvasId);
        resizeCanvas(canvas);
        window.addEventListener("resize", function() {
            resizeCanvas(canvas);
        });
        return canvas;
    }
    
    $(document).ready(function() {
        canvas = document.getElementById("mainCanvas");
        ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,300,300);
        ctx.fillStyle = "#b69b4c";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        drawBoardLine(canvas, ctx);
        drawPieces(ctx);
    });
})();