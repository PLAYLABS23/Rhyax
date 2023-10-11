let fps = 0;
let lastTime = performance.now();
let frameCount = 0;
let frameList = [];

function Debugger() {
    requestAnimationFrame(calculateFPS);
    setInterval(() => {
        document.getElementById("d0").innerHTML = TimeStamp;

        document.getElementById("d1").innerHTML = RecentEvents[0];
        document.getElementById("d2").innerHTML = RecentEvents[1];
        document.getElementById("d3").innerHTML = RecentEvents[2];
        document.getElementById("d4").innerHTML = RecentEvents[3];

        document.getElementById("d5").innerHTML = RecentNotes[0];
        document.getElementById("d6").innerHTML = RecentNotes[1];
        document.getElementById("d7").innerHTML = RecentNotes[2];
        document.getElementById("d8").innerHTML = RecentNotes[3];

        document.getElementById("d12").innerHTML = PERFECTcounter;
        document.getElementById("d13").innerHTML = GREATcounter;
        document.getElementById("d14").innerHTML = MISScounter;

        document.getElementById("d20").innerHTML = AudioEngine.currentTime;
        
    }, 1);
}

function calculateFPS() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    frameCount++;

    if (deltaTime >= 100) {
        fps = Math.round((frameCount * 1000) / deltaTime);
        frameCount = 0;
        lastTime = currentTime;

        frameList.push(fps);
        if (frameList.length % 12 == 0) {
            frameList.shift();
        }

        frameChart(frameList);
    }

    requestAnimationFrame(calculateFPS);
}

function frameChart(arr) {
    const canvas = document.getElementById("stat-chart");
    const ctx = canvas.getContext("2d");

    const maxValue = Math.max(...arr);
    const dataPoints = arr.map((value, index) => {
        const x = (index / (arr.length - 1)) * canvas.width;
        const y = canvas.height - (value / maxValue) * canvas.height;
        return { x, y, value };
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(dataPoints[0].x, dataPoints[0].y);

    dataPoints.slice(1).forEach((point, index) => {
        ctx.lineTo(point.x, point.y);

        if(dataPoints.length == index + 2) {
            if (point.value < 60) {
                ctx.fillStyle = "#FF0000";
            } else {
                ctx.fillStyle = "#00FF00";
            }
            ctx.font = "bold 13px monospace";
            ctx.fillText(point.value, point.x - 25, point.y + 15);
        } else {
            if (point.value < 60) {
                ctx.fillStyle = "#FF0000A0";
            } else {
                ctx.fillStyle = "#FFFFFFA0";
            }
            ctx.font = "8px monospace";
            ctx.fillText(point.value, point.x - 13, point.y + 10);
        }

    });
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
}