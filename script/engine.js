let AudioEngine;
let MusicData;
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

    StartGame();
}

function EventLogger(title, content, err = false) {
    if (!err)   console.log(`${title}\t:\t${content}`);
    else        console.error(`${title}\t:\t${content}`);
}

function TopLeft() {
    EventLogger("InputEvent", "TopLeft");
    EventLogger("InputTimeStamp", TimeStamp);
    RecentEvents[0] = TimeStamp;
}

function TopRight() {
    EventLogger("InputEvent", "TopRight");
    EventLogger("InputTimeStamp", TimeStamp);
    RecentEvents[1] = TimeStamp;
}

function BottomLeft() {
    EventLogger("InputEvent", "BottomLeft");
    EventLogger("InputTimeStamp", TimeStamp);
    RecentEvents[2] = TimeStamp;
}

function BottomRight() {
    EventLogger("InputEvent", "BottomRight");
    EventLogger("InputTimeStamp", TimeStamp);
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
    if (pause)  StartGame();
    else        clearInterval(inGameTimeStamp);
}

function MISS() {
    EventLogger("CALL MISS", RecentEvents);
}

function GREAT() {
    EventLogger("CALL GREAT", RecentEvents);
}

function PERFECT() {
    EventLogger("CALL PERFECT", RecentEvents);
}

function ScanNote(index) {
    if(RecentNotes[index].length == 0) return 0;

    const NOTEINFO = RecentNotes[index][0];
    if (TimeStamp >= NOTEINFO[0] + 25) {
        const SCANVALUE = Math.abs(RecentEvents[index] - (NOTEINFO[0] + NOTEINFO[1]));

        if      (SCANVALUE > 25)    MISS();
        else if (SCANVALUE > 15)    GREAT();
        else if (SCANVALUE > 0)     PERFECT();
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
        }
    });
}

function NoteCreate(Position, CreateTime, DestroyTime, Type, Id) {
    EventLogger("NoteCreated", [Position, CreateTime, DestroyTime, Type, Id])
    RecentNotes[Position].push([CreateTime, DestroyTime, Id]);
}

function ClearNote(index, id) {
    EventLogger("ClearNote", `${index} -> ${id}`);
    try {
        RecentNotes[index].shift();
    } catch {
        RecentNotes[index][0] = [0, 0, ""];
    }
}