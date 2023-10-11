let AudioEngine;
let MusicData;
let canvas;
let MISScounter = 0;
let GREATcounter = 0;
let PERFECTcounter = 0;
let TimeStamp = 0;
let RecentEvents = [0, 0, 0, 0];
let RecentNotes = [
    [], [], [], []
];

window.onload = () => {
    AudioEngine = document.getElementById("audio");
    
    window.addEventListener("keydown", (e) => {
        if      (e.keyCode === 68) TopLeft();
        else if (e.keyCode === 70) TopRight();
        else if (e.keyCode === 74) BottomLeft();
        else if (e.keyCode === 75) BottomRight();
    });

    // DEBUGGER
    if (document.querySelector("IKUYO-ENGINE").id.includes("enable-debugger")) {
        document.querySelector("body").innerHTML += `
        <IKUYO-DEBUGGER>
            <layer id="column" class="monospace">
                <layer id="row" class="debug-top">
                    <debug-item>
                        <debug-label>TimeStamp</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentEvents[0]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentEvents[1]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentEvents[2]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentEvents[3]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentNotes[0]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentNotes[1]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentNotes[2]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>RecentNotes[3]</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>NOTEINFO</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>SCANVALUE</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>ClearNote ID</debug-label>
                    </debug-item>
                </layer>
                <layer id="row" class="debug-bottom color-white">
                    <debug-item>
                        <debug-label id="d0"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d1"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d2"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d3"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d4"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d5"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d6"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d7"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d8"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d9"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d10"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d11"></debug-label>
                    </debug-item>
                </layer>
                <layer id="row" class="debug-top">
                    <debug-item>
                        <debug-label>PERFECT</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>GREAT</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>MISS</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>NoteCreateTime</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>NoteDestroyTime</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>IsCreated</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>Position</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>Type</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>AudioEngine</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>StartGame</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>PasueGameT</debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label>PauseGameF</debug-label>
                    </debug-item>
                </layer>
                <layer id="row" class="debug-bottom color-white">
                    <debug-item>
                        <debug-label id="d12"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d13"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d14"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d15"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d16"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d17"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d18"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d19"></debug-label>
                    </debug-item>
                    <debug-item>
                        <debug-label id="d20"></debug-label>
                    </debug-item>
                    <debug-item onclick="StartGame()">
                        <debug-label>EVENT</debug-label>
                    </debug-item>
                    <debug-item onclick="PauseGame(true)">
                        <debug-label>EVENT</debug-label>
                    </debug-item>
                    <debug-item onclick="PauseGame(false)">
                        <debug-label>EVENT</debug-label>
                    </debug-item>
                </layer>
            </layer>
            <canvas id="stat-chart" width="200" height="50"></canvas>
        </IKUYO-DEBUGGER>
        `
        Debugger();
    }
}

function TopLeft() {
    RecentEvents[0] = TimeStamp;
}

function TopRight() {
    RecentEvents[1] = TimeStamp;
}

function BottomLeft() {
    RecentEvents[2] = TimeStamp;
}

function BottomRight() {
    RecentEvents[3] = TimeStamp;
}

function StartGame() {
    AudioEngine.src = MusicData['MusicPath'];
    AudioEngine.play();

    inGameTimeStamp = setInterval(() => {
        TimeStamp++;
        ScanNote(0);
        ScanNote(1);
        ScanNote(2);
        ScanNote(3);
        NoteParser(MusicData['Note']);
    }, 10);
}

function PauseGame(pause) {
    if (!pause) {
        StartGame();
    }
    else {
        clearInterval(inGameTimeStamp);
        AudioEngine.pause();
    }
}

function MISS() {
    MISScounter++;
}

function GREAT() {
    GREATcounter++;
}

function PERFECT() {
    PERFECTcounter++;
}

function ScanNote(index) {
    if(RecentNotes[index].length == 0) return 0;

    const NOTEINFO = RecentNotes[index][0];
    if (TimeStamp >= NOTEINFO[0] + 25) {
        const SCANVALUE = Math.abs(RecentEvents[index] - (NOTEINFO[0] + NOTEINFO[1]));

        if      (SCANVALUE > 25)    MISS();
        else if (SCANVALUE > 15)    GREAT();
        else if (SCANVALUE > 0)     PERFECT();

        // DEBUGGER
        document.getElementById("d9").innerHTML = NOTEINFO;
        document.getElementById("d10").innerHTML = SCANVALUE;
        document.getElementById("d11").innerHTML = NOTEINFO[2];

        ClearNote(index, NOTEINFO[2]);
    }
}

function NoteParser(NoteData) {
    NoteData.forEach((item, index) => {
        const NoteCreateTime    = item["TimeStamp"];
        const NoteDestroyTime   = item["DestroyTime"];
        const NoteCreated       = item["IsCreated"];
        const Position          = item["Position"];
        const Type              = item["Type"];

        if(TimeStamp >= NoteCreateTime) {
            if(!NoteCreated) {
                NoteCreate(Position, NoteCreateTime, NoteDestroyTime, Type, index);
                NoteData[index]["IsCreated"] = true;
            }

        // DEBUGGER
        document.getElementById("d15").innerHTML = NoteCreateTime;
        document.getElementById("d16").innerHTML = NoteDestroyTime;
        document.getElementById("d17").innerHTML = NoteCreated;
        document.getElementById("d18").innerHTML = Position;
        document.getElementById("d19").innerHTML = Type;
        }
    });
}

function NoteCreate(Position, CreateTime, DestroyTime, Type, Id) {
    RecentNotes[Position].push([CreateTime, DestroyTime, Id]);
}

function ClearNote(index, id) {
    try {
        RecentNotes[index].shift();
    } catch {
        RecentNotes[index][0] = [0, 0, ""];
    }
}