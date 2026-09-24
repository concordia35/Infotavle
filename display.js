const fallbackImages = ["./slideshow/01.png", "./slideshow/02.png", "./slideshow/03.jpg", "./slideshow/04.jpg", "./slideshow/05.jpg", "./slideshow/06.jpg", "./slideshow/07.jpg", "./slideshow/08.jpg", "./slideshow/ChatGPT Image 23. sep. 2026, 08.07.37.png"];

const captions = [
  "Mennesker mødes bedst ansigt til ansigt",
  "Fællesskab begynder med et møde",
  "Et fællesskab midt i Slagelse",
  "Tid til samtaler, samvær og nye perspektiver"
];


const stories = [
  {
    label:"NYSGERRIG?",
    title:"Har du tænkt<br>over, hvad der<br>foregår i en loge?",
    text:"Nysgerrig? Så spørg os.<br>Vi fortæller gerne om Odd Fellow og livet i logen.",
    factTitle:"Venskab · Kærlighed · Udvikling",
    factText:"Ord får først værdi, når de bliver brugt i virkeligheden."
  },
  {
    label:"TRE LOGER · ÉT FÆLLESSKAB",
    title:"Odd Fellow<br>i Slagelse.",
    text:"Sct. Gertrud, Concordia og Hellig Anders har alle hjemme i Frederiksgade 15.",
    factTitle:"Forskellige loger. Samme hus.",
    factText:"Scan QR-koden og find den loge, du vil vide mere om."
  },
  {
    label:"ANSIGT TIL ANSIGT",
    title:"Der skal være<br>plads til rigtige<br>samtaler.",
    text:"Et fast holdepunkt i hverdagen med fællesskab, refleksion og samvær.",
    factTitle:"Du behøver ikke kende nogen.",
    factText:"Nysgerrighed er et ganske fint sted at begynde."
  },
  {
    label:"KOM INDENFOR · 30. SEPTEMBER",
    title:"Nysgerrig på<br>Odd Fellow?",
    text:"Kom og spis med os og hør, hvad fællesskabet handler om.<br><strong>Vi giver middagen.</strong>",
    factTitle:"Du behøver ikke komme alene.",
    factText:"Tag gerne en ven med · Gratis og helt uforpligtende."
  }
];

const myths = [
  ["“Odd Fellow er kun for ældre.”","Nej. Fællesskabet er for voksne i forskellige aldre, og nye medlemmer er velkomne."],
  ["“Det er en hemmelig orden.”","Nej. Vi fortæller gerne, hvem vi er, og hvad vi står for. Enkelte traditioner hører til i logen."],
  ["“Man skal kende nogen for at komme ind.”","Nej. Du kan selv tage kontakt – og du er selvfølgelig velkommen til at tage en ven med."],
  ["“Det handler om religion.”","Odd Fellow bygger på etiske værdier og menneskeligt fællesskab – ikke på en bestemt religion."],
  ["“Det er bare højtidelige møder.”","Nej. Traditioner er en del af det, men samvær, samtaler og fællesskab fylder mindst lige så meget."]
];

async function loadImages(){
  try{
    const r = await fetch("./slideshow/billeder.json", {cache:"no-store"});
    if(!r.ok) throw new Error("billeder.json");
    const names = await r.json();
    return names.map(name => "./slideshow/" + name);
  }catch(e){
    return fallbackImages;
  }
}

const photo=document.querySelector(".photo");
const img=document.getElementById("slideImage");
const prog=document.getElementById("progress");
const cap=document.getElementById("slideCaption");
let si=0,sti=0,mi=0;
const DUR=8500;

function progress(){
  prog.style.transition="none";
  prog.style.width="0";
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    prog.style.transition=`width ${DUR}ms linear`;
    prog.style.width="100%";
  }));
}

loadImages().then(images=>{
  if(!images.length) return;
  img.src=images[0];
  if(cap) cap.textContent=captions[0];
  progress();
  if(images.length>1){
    setInterval(()=>{
      si=(si+1)%images.length;
      photo.classList.add("changing");
      setTimeout(()=>{
        img.src=images[si];
        if(cap) cap.textContent=captions[si%captions.length];
        photo.classList.remove("changing");
        progress();
      },550);
    },DUR);
  }
});

setInterval(()=>{
  sti=(sti+1)%stories.length;
  const s=stories[sti];
  const box=document.getElementById("story");
  box.classList.add("changing");
  setTimeout(()=>{
    document.getElementById("storyLabel").textContent=s.label;
    document.getElementById("storyTitle").innerHTML=s.title;
    document.getElementById("storyText").innerHTML=s.text;
    document.querySelector("#storyFact strong").textContent=s.factTitle;
    document.querySelector("#storyFact span").textContent=s.factText;
    box.classList.remove("changing");
  },450);
},12000);

setInterval(()=>{
  mi=(mi+1)%myths.length;
  document.getElementById("mythTitle").textContent=myths[mi][0];
  document.getElementById("mythTruth").textContent=myths[mi][1];
  document.getElementById("mythCount").textContent=`${mi+1} / ${myths.length}`;
},9500);

document.addEventListener("dblclick",async()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){}
});


window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(() => {
      console.log("Odd Fellow infotavle er klar til offline brug.");
    });
  }
});

// While the projector is online, check occasionally whether GitHub has published
// a new slideshow list. If it changes, reload once so the new images enter rotation.
let slideshowSignature = "";
async function checkForSlideshowUpdate(){
  if(!navigator.onLine) return;
  try{
    const r = await fetch("./slideshow/billeder.json?ts="+Date.now(), {cache:"no-store"});
    if(!r.ok) return;
    const names = await r.json();
    const sig = JSON.stringify(names);
    if(!slideshowSignature){
      slideshowSignature = sig;
      return;
    }
    if(sig !== slideshowSignature){
      location.reload();
    }
  }catch(e){}
}
setInterval(checkForSlideshowUpdate, 60000);
setTimeout(checkForSlideshowUpdate, 5000);
