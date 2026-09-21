export interface TutorialStepData {
  number: string;
  text: string;
  image: string;
  imageAlt: string;
  fullWidth?: boolean;
  isSvg?: boolean;
  highlight?: boolean;
}

export const TUTORIAL_STEPS: readonly TutorialStepData[] = [
  {
    number: "1.",
    text: 'Fai click sul tasto "menu" in alto a destra sulla pagina del tuo profilo Instagram',
    image: "/assets/tutorial/1.jpg",
    imageAlt: "Step 1",
  },
  {
    number: "2.",
    text: 'Clicca su "Centro gestione account"',
    image: "/assets/tutorial/2.jpg",
    imageAlt: "Step 2",
  },
  {
    number: "3.",
    text: 'Seleziona "le tue informazioni e autorizzazioni"',
    image: "/assets/tutorial/3.jpg",
    imageAlt: "Step 3",
  },
  {
    number: "4.",
    text: 'Clicca su "Scarica le tue informazioni"',
    image: "/assets/tutorial/4.jpg",
    imageAlt: "Step 4",
  },
  {
    number: "🚀 Pro Tip!",
    text: 'Dallo step 1 puoi anche usare la ricerca per arrivare rapidamente a "Scarica le tue informazioni"!',
    image: "/assets/tutorial/3_5.jpg",
    imageAlt: "Pro Tip",
    fullWidth: true,
  },
  {
    number: "5.",
    text: 'Clicca su "Scarica sul dispositivo"',
    image: "/assets/tutorial/5.jpg",
    imageAlt: "Step 5",
  },
  {
    number: "6.",
    text: 'Seleziona "Scarica o trasferisci informazioni"',
    image: "/assets/tutorial/6.jpg",
    imageAlt: "Step 6",
  },
  {
    number: "7.",
    text: 'Seleziona "Alcune delle tue informazioni"',
    image: "/assets/tutorial/7.jpg",
    imageAlt: "Step 7",
  },
  {
    number: "8.",
    text: 'Trova "Follower e persone/Pagine seguite", selezionalo e fai click su "Avanti"',
    image: "/assets/tutorial/8.jpg",
    imageAlt: "Step 8",
  },
  {
    number: "9.",
    text: 'Verifica che la mail su "Notifica" sia corretta, dopo di che clicca su "Intervallo di date" per lo step 10 e su "Formato" per lo step 11',
    image: "/assets/tutorial/9.jpg",
    imageAlt: "Step 9",
  },
  {
    number: "10. (IMPORTANTE) - INTERVALLO DI DATE",
    text: 'Seleziona "Dall\'inizio" come "Intervallo di date"',
    image: "/assets/tutorial/10.jpg",
    imageAlt: "Step 10",
    highlight: true,
  },
  {
    number: "11. (IMPORTANTE) - FORMATO",
    text: 'Su "Formato" seleziona "JSON" e fai click su "X"',
    image: "/assets/tutorial/11.jpg",
    imageAlt: "Step 11",
    highlight: true,
  },
  {
    number: "12.",
    text: 'Opzionale ma può velocizzare il download: seleziona "Bassa" come "Qualità dei contenuti multimediali"',
    image: "/assets/tutorial/12.jpg",
    imageAlt: "Step 12",
  },
  {
    number: "13.",
    text: 'Verifica che sia tutto impostato come nello screen successivo, dopo di che clicca su "Crea file"',
    image: "/assets/tutorial/13.jpg",
    imageAlt: "Step 13",
  },
  {
    number: "14.",
    text: "Apparirà un messaggio di conferma della richiesta ed una box con la richiesta in corso: ora devi solo...",
    image: "/assets/tutorial/14.jpg",
    imageAlt: "Step 14",
  },
  {
    number: "ATTENDERE 🕑",
    text: "Esatto: attendere pazientemente che Meta elabori i dati. Potrebbe metterci un po', ma nel frattempo puoi sempre uscire per un aperitivo (o giocare con il gatto, che ne so).",
    image: "/assets/images/wait.svg",
    imageAlt: "Step 15",
    fullWidth: true,
    isSvg: true,
  },
  {
    number: "16.",
    text: "Appena arriva la mail di Meta (tipo questa)...",
    image: "/assets/tutorial/16.jpg",
    imageAlt: "Step 16",
  },
  {
    number: "17.",
    text: '...torna a "Scarica le tue informazioni" e clicca su "Scarica" per scaricare il file ZIP con i tuoi dati.',
    image: "/assets/tutorial/17.jpg",
    imageAlt: "Step 17",
  },
  {
    number: "TORNA QUI E DECOLLIAMO! 🚀",
    text: "...sei ancora qui? Dai, corri ad analizzare il file!",
    image: "/assets/images/launch.svg",
    imageAlt: "Final Step",
    fullWidth: true,
    isSvg: true,
  },
];
