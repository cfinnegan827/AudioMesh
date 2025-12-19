import { note, samples, stack } from '@strudel/web';

initStrudel({
  prebake: async () => {
        samples("github:tidalcycles/dirt-samples");
        samples("https://raw.githubusercontent.com/felixroos/dough-samples/main/piano.json");
        samples("https://raw.githubusercontent.com/felixroos/dough-samples/main/vcsl.json")
  }
});
var notes_dict= [
    "A0","C1","Ds1","Fs1","A1","C2","Ds2","Fs2","A2","C3","Ds3",
    "Fs3","A3","C4","Ds4","Fs4","A4","C5","Fs5","A5",
    "C6","Ds6","Fs6","A6","C7","Ds7","Fs7","A7","C8"
];
var drums = [" bd ", " hh ", " sd ", " cp ", " ht ", " mt ", " lt ", " cr", " cr ", " oh "];
var bass = [" bass ", " bass0 ", " bass1 ", " bass2 ", " bass3 ", " bassdm ", " bassfoo "];
var pipe_organ = ["A1", "C1", "D#1", "F#1","A2", "C2", "D#2", "F#2","A3", "C3", 
            "D#3", "F#3","A4", "C4", "D#4", "F#4","A5", "C5", "D#5", "F#5","C6"];

export function genOrgan(num, curr_seq){
    var tokens = curr_seq.trim().split(/\s+/);
    if (tokens.length > 10) {
        tokens.shift();
    }
    var singleNum = num % 10;
    var rand = Math.floor(Math.random()*singleNum);
    tokens.push(pipe_organ[rand].trim());
    return tokens.join(" ");
}

export function genBass(num, curr_seq){
    var tokens = curr_seq.trim().split(/\s+/);
    if (tokens.length > 10) {
        tokens.shift();
    }
    var offset = Math.floor(Math.random() * 9 + 2);
    var singleNum = num % 10;
    var rand = Math.floor(Math.random()*singleNum);
    if (rand > 6) { rand = rand - offset;}
    tokens.push(bass[rand].trim());
    return tokens.join(" ");
}

export function genDrumSound(num, curr_seq){
    var tokens = curr_seq.trim().split(/\s+/);
    if (tokens.length > 10) {
        tokens.shift();
    }
    var singleNum = Math.max(1, num % drums.length);
    var rand = Math.floor(Math.random() * singleNum);
    tokens.push(drums[rand].trim());
    return tokens.join(" ");
}

export function genSound(num, curr_seq){
    var tokens = curr_seq.trim().split(/\s+/);
    if (tokens.length > 10) {
        tokens.shift();
    }
    var singleNum = Math.max(1, num % notes_dict.length);
    var rand = Math.floor(Math.random() * singleNum);
    
    tokens.push(notes_dict[rand].trim());
    return tokens.join(" ");
}

function randHex(){return Math.floor(Math.random()*256).toString(16).padStart(2, '0')}
export function randColor(){return '0x' + randHex() + randHex() + randHex()};
export function createNotes(note_seq){return note(note_seq).s("piano").lpf(200).slow(2);}
export function createDrums(drum_seq){return s(drum_seq).lpf(400).slow(2);}
export function createBass(bass_seq){return s(bass_seq).lpf(200).slow(2);}
export function createOrgan(organ_seq){return s(organ_seq).s("pipeorgan_loud").lpf(200).slow(2);}
export function playSounds(...sounds){stack(...sounds).play();}
