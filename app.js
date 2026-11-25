(function(){
'use strict';
const STORAGE={state:'luna_app_state_v3',characters:'luna_custom_v2',favorites:'luna_favorites_v2',chats:'luna_chats_v2',profile:'luna_profile_v2',memory:'luna_memory_v2',theme:'luna_theme_v2',story:'luna_story_progress_v2'};
const COLORS=[['#574381','#283e69'],['#28616a','#263a58'],['#765078','#3b426d'],['#416b58','#263c4d']];
const ALLOWED_CATEGORIES=new Set(['Fantaisie','Amitié','Mystère','Aventure','Science-fiction','Quotidien','Anime','Romance','RPG','Paranormal','Comédie','Historique','Drama']);
const starter=[
{id:'mira',name:'Mira',category:'Fantaisie',emoji:'🧝',description:'Une apprentie magicienne curieuse qui explore les secrets d’une forêt ancienne.',greeting:'Bonjour voyageur ! J’ai trouvé une carte étrange. Tu veux m’aider à comprendre où elle mène ?',memory:'',colors:COLORS[0]},
{id:'eliot',name:'Eliot',category:'Mystère',emoji:'🕵️',description:'Un détective observateur qui adore résoudre des énigmes et aider les autres.',greeting:'J’attendais justement un coup de main. Un objet a disparu du musée cette nuit…',memory:'',colors:['#69533d','#2d3854']},
{id:'sora',name:'Sora',category:'Aventure',emoji:'🧭',description:'Une exploratrice intrépide toujours prête à découvrir un lieu inconnu.',greeting:'Le sentier se divise en deux. La vieille carte indique un passage au nord… tu en penses quoi ?',memory:'',colors:COLORS[1]},
{id:'lyra',name:'Lyra',category:'Science-fiction',emoji:'🤖',description:'Un robot cartographe qui tente de comprendre les anciennes villes humaines.',greeting:'Journal de bord activé. J’ai détecté une lumière dans la ville abandonnée. Enquête avec moi ?',memory:'',colors:['#315d78','#282e5b']},
{id:'noa',name:'Noa',category:'Amitié',emoji:'🎨',description:'Un artiste imaginatif qui transforme chaque journée en petite aventure.',greeting:'J’ai commencé un dessin, mais il me manque une idée géniale. On invente quelque chose ?',memory:'',colors:COLORS[2]},
{id:'atlas',name:'Atlas',category:'Fantaisie',emoji:'🐉',description:'Le gardien bienveillant d’une vallée peuplée de créatures extraordinaires.',greeting:'Bienvenue dans la vallée ! Une créature s’est éloignée du village. Peux-tu m’aider à la retrouver ?',memory:'',colors:COLORS[3]},
{id:'iris',name:'Iris',category:'Science-fiction',emoji:'🪐',description:'Une astronome qui collectionne les cartes de constellations oubliées.',greeting:'Regarde cette constellation. Elle n’apparaissait sur aucune carte hier soir…',memory:'',colors:['#344c7a','#4a316d']},
{id:'theo',name:'Théo',category:'Quotidien',emoji:'☕',description:'Un compagnon calme qui aime discuter de livres, de musique et de projets créatifs.',greeting:'Salut ! Je préparais une boisson chaude et je cherchais une nouvelle idée de projet. Tu as de l’inspiration ?',memory:'',colors:['#735b48','#304453']}
,
{id:'aiko',name:'Aiko',category:'Anime',emoji:'🌸',description:'Une illustratrice passionnée qui transforme les idées du quotidien en petites aventures dessinées.',greeting:'J’ai une nouvelle page blanche devant moi. Tu m’aides à imaginer ce qui pourrait s’y passer ?',memory:'',colors:['#9b537c','#3e315f']},
{id:'eden',name:'Eden',category:'Romance',emoji:'💌',description:'Une lectrice qui adore les romans doux, les belles rencontres et les histoires de confiance.',greeting:'Je viens de terminer un roman qui m’a donné envie d’inventer une histoire. Tu as une idée de départ ?',memory:'',colors:['#9b5876','#49324d']},
{id:'runa',name:'Runa',category:'RPG',emoji:'🛡️',description:'Une guide d’aventure qui connaît les quêtes, les cartes secrètes et les énigmes des royaumes.',greeting:'Bienvenue, aventurier. Une nouvelle quête vient d’apparaître sur la carte. On regarde ?',memory:'',colors:['#54745f','#263b4b']},
{id:'nox',name:'Nox',category:'Paranormal',emoji:'🌙',description:'Un archiviste curieux qui rassemble des récits étranges et des phénomènes inexpliqués.',greeting:'J’ai retrouvé un dossier qui n’était dans aucune archive hier. Tu veux l’examiner avec moi ?',memory:'',colors:['#55538f','#211e42']},
{id:'milo',name:'Milo',category:'Comédie',emoji:'🎈',description:'Un inventeur maladroit mais enthousiaste dont les idées prennent parfois des tournures inattendues.',greeting:'Bonne nouvelle : mon invention fonctionne ! Enfin… elle fonctionne presque. Tu peux regarder ?',memory:'',colors:['#a36b42','#4a3543']},
{id:'ada',name:'Ada',category:'Historique',emoji:'🏛️',description:'Une jeune conservatrice passionnée par les objets anciens et les histoires qu’ils racontent.',greeting:'Cette pièce vient d’être découverte dans une vieille collection. Son origine est un mystère. On enquête ?',memory:'',colors:['#8a744f','#3b3445']},
{id:'lina',name:'Lina',category:'Romance',tags:['WLW','Crush','Secret'],emoji:'🌷',description:'Une amie proche qui commence à ressentir quelque chose de plus, sans savoir comment te le dire.',greeting:'Je voulais te parler depuis quelque temps… Tu as un moment ?',memory:'',colors:['#a85f83','#49304f']},
{id:'eli',name:'Eli',category:'Amitié',tags:['Best friend','Crush'],emoji:'🫶',description:'Ton meilleur ami depuis toujours. Il te connaît par cœur et semble avoir quelque chose à avouer.',greeting:'Tu sais que tu peux tout me dire, hein ? Même les trucs compliqués.',memory:'',colors:['#54718d','#27334d']},
{id:'margot',name:'Margot',category:'Drama',tags:['Drama','Secret','Couple'],emoji:'💔',description:'Une amie du groupe qui a découvert un secret capable de bouleverser votre bande.',greeting:'Il faut que je te raconte quelque chose… mais promets-moi de m’écouter jusqu’au bout.',memory:'',colors:['#89546a','#392b48']},
{id:'theo-love',name:'Théo',category:'Romance',tags:['Lover','Couple','Drama'],emoji:'❤️',description:'Ton copain est attentionné, mais une histoire de confiance vient compliquer votre relation.',greeting:'Je sais que l’ambiance est bizarre depuis hier. On peut en parler calmement ?',memory:'',colors:['#a65d73','#3c2c48']},
{id:'sam',name:'Sam',category:'Amitié',tags:['Best friend','Enemies'],emoji:'⚡',description:'Ton rival au lycée avec qui tu dois préparer un projet. Derrière les piques, une vraie complicité apparaît.',greeting:'Ne te fais pas d’idées, je suis là uniquement pour le projet. Enfin… presque.',memory:'',colors:['#53658f','#252d50']},
{id:'noémie',name:'Noémie',category:'Romance',tags:['WLW','Lover'],emoji:'💗',description:'Une fille rencontrée lors d’une soirée entre amis. Vous apprenez doucement à vous connaître.',greeting:'Je suis contente que tu sois venu·e. Tu veux qu’on aille discuter un peu ?',memory:'',colors:['#b46c91','#55344f']},
{id:'alex',name:'Alex',category:'Romance',tags:['BL','Crush','Secret'],emoji:'💙',description:'Un garçon discret de ta classe avec qui tu échanges des messages depuis plusieurs semaines.',greeting:'J’allais justement t’écrire. Tu rentres comment après les cours ?',memory:'',colors:['#527c9a','#293653']},
{id:'jules',name:'Jules',category:'Drama',tags:['Drama','Best friend','Secret'],emoji:'🤫',description:'Le meilleur ami de ton copain semble vouloir te confier quelque chose au sujet de votre couple.',greeting:'Je ne veux pas créer d’histoires, mais je pense que tu devrais savoir ce qui se passe.',memory:'',colors:['#78618d','#342b4e']},
];
const stories=[
{id:'signal',title:'Le signal oublié',category:'Science-fiction',emoji:'🚀',subtitle:'Une station silencieuse. Un signal impossible.',description:'Ton vaisseau reçoit un message provenant d’une station disparue des cartes stellaires.',colors:['#344c7a','#202d59'],start:'start',nodes:{
start:{text:'Ton vaisseau reçoit un signal qui semble provenir d’une station abandonnée. La porte extérieure vient de s’ouvrir toute seule.',choices:[{label:'Entrer dans la station',reply:'La porte se referme doucement derrière toi. Les lumières s’allument une à une, comme si quelqu’un t’attendait.',next:'hall'},{label:'Analyser le signal',reply:'Le signal contient une suite de coordonnées et un mot répété : « mémoire ». Une porte clignote sur le plan.',next:'signal'},{label:'Envoyer un drone',reply:'Le drone traverse le sas. Sa caméra révèle une salle circulaire et une silhouette immobile au fond.',next:'drone'}]},
hall:{text:'Tu arrives dans le hall principal. Trois portes portent des symboles différents.',choices:[{label:'La porte avec une étoile',reply:'Derrière la porte, un observatoire projette une carte de la Terre. Un point lumineux pulse au même rythme que le signal.',next:'observatory'},{label:'La porte sans symbole',reply:'Une salle d’archives s’ouvre. Un journal de bord est posé sur une console encore alimentée.',next:'archive'}]},
signal:{text:'La console décode enfin le signal. Il semble avoir été envoyé depuis le cœur de la station il y a très longtemps.',choices:[{label:'Suivre les coordonnées',reply:'Les coordonnées indiquent une salle cachée derrière le réacteur principal.',next:'reactor'},{label:'Répondre au signal',reply:'Une voix synthétique répond : « Enfin. Quelqu’un a entendu notre appel. »',next:'voice'}]},
drone:{text:'Le drone transmet une image brouillée. La silhouette lève lentement la tête et pointe vers un couloir.',choices:[{label:'Suivre le couloir',reply:'Le couloir mène à une salle d’observation couverte de cartes stellaires.',next:'observatory'},{label:'Rappeler le drone',reply:'Le drone revient avec un petit module de données dans sa pince.',next:'archive'}]},
observatory:{text:'La carte révèle un détail étrange : la station n’observe pas les étoiles, elle suit un objet qui se rapproche.',choices:[{label:'Examiner l’objet',reply:'L’objet ressemble à une capsule de secours. Son identifiant correspond au journal de bord.',next:'ending'},{label:'Consulter les archives',reply:'Une archive récente contient un enregistrement laissé pour la personne qui trouverait la station.',next:'archive'}]},
archive:{text:'Le journal révèle que l’équipage a choisi de rester pour protéger une découverte importante.',choices:[{label:'Lancer l’enregistrement',reply:'L’enregistrement montre un message : « La découverte doit être transmise, pas gardée. »',next:'ending'},{label:'Chercher la salle centrale',reply:'Tu trouves un passage vers le cœur de la station.',next:'reactor'}]},
reactor:{text:'Le réacteur est stable, mais une petite capsule de mémoire attend d’être récupérée.',choices:[{label:'Récupérer la capsule',reply:'La capsule contient une carte et un message destiné aux explorateurs du futur.',next:'ending'}]},
voice:{text:'La voix explique que la station a gardé une découverte à l’abri et attendait quelqu’un pour la transmettre.',choices:[{label:'Demander quelle découverte',reply:'La voix affiche une carte inconnue et ouvre le compartiment central.',next:'ending'}]},
ending:{text:'Tu as découvert la raison du signal : la station voulait transmettre une carte vers un monde encore inexploré. Le premier chapitre se termine ici. Tu peux poursuivre librement.',choices:[{label:'Continuer l’exploration',reply:'Un nouveau signal apparaît au bord de la carte. L’aventure est loin d’être terminée.',next:'start'}]}
}},
{id:'library',title:'La bibliothèque secrète',category:'Mystère',emoji:'🗝️',subtitle:'Des livres qui semblent te reconnaître.',description:'Une porte cachée révèle une salle de livres dont les pages racontent des histoires étrangement familières.',colors:['#49365f','#202a45'],start:'start',nodes:{
start:{text:'Derrière une étagère, tu découvres une pièce remplie de livres anciens. L’un d’eux porte ton prénom sur sa couverture.',choices:[{label:'Ouvrir le livre',reply:'Les pages sont blanches. Dès que tu les touches, une phrase apparaît : « Tu es arrivé au bon moment. »',next:'book'},{label:'Examiner la pièce',reply:'Tu remarques trois symboles gravés sous une table et une clé cachée dans un pot.',next:'room'},{label:'Appeler doucement',reply:'Une petite voix répond depuis l’autre côté d’une porte : « Tu peux entrer, mais choisis bien ton premier livre. »',next:'door'}]},
book:{text:'Une page se remplit d’un dessin représentant la pièce où tu te trouves, mais avec une porte supplémentaire.',choices:[{label:'Chercher la porte dessinée',reply:'Un pan de mur pivote et révèle un escalier secret.',next:'secret'},{label:'Lire la page suivante',reply:'Une énigme apparaît. Elle parle de trois symboles et d’une clé.',next:'room'}]},
room:{text:'Les trois symboles semblent correspondre à trois livres posés sur une étagère.',choices:[{label:'Prendre le livre étoilé',reply:'Le livre révèle un passage caché derrière le bureau.',next:'secret'},{label:'Utiliser la clé',reply:'La petite porte s’ouvre sur une salle de lecture silencieuse.',next:'door'}]},
door:{text:'Derrière la porte, une gardienne de la bibliothèque t’explique que chaque livre contient un souvenir que quelqu’un a voulu préserver.',choices:[{label:'Demander le livre à ton nom',reply:'La gardienne te conduit devant une étagère qui vient tout juste d’apparaître.',next:'secret'},{label:'Demander pourquoi tu es ici',reply:'« Parce que tu as de l’imagination. Et cette bibliothèque a besoin de nouvelles histoires. »',next:'ending'}]},
secret:{text:'La pièce secrète contient un carnet vide et une plume. Une inscription indique : « La prochaine histoire attend son auteur. »',choices:[{label:'Écrire une première phrase',reply:'L’encre brille. Une nouvelle porte apparaît, prête à s’ouvrir.',next:'ending'}]},
ending:{text:'Tu comprends que la bibliothèque ne conserve pas seulement les histoires passées : elle attend aussi celles qui restent à inventer. Fin du premier chapitre.',choices:[{label:'Écrire la suite',reply:'Le carnet s’ouvre sur une page neuve. À toi d’inventer le prochain chapitre.',next:'start'}]}
}},
{id:'dragon',title:'Le dernier dragon',category:'Fantaisie',emoji:'🐉',subtitle:'Un œuf mystérieux au cœur de la forêt.',description:'Au détour d’un sentier, tu trouves un œuf étrange et découvres que la forêt semble le protéger.',colors:['#315c4b','#172f3b'],start:'start',nodes:{
start:{text:'Au milieu d’une clairière, un œuf aux reflets dorés repose dans la mousse. Un bruit vient des arbres.',choices:[{label:'Protéger l’œuf',reply:'Tu installes l’œuf à l’abri. Une petite lueur apparaît sous sa coquille.',next:'glow'},{label:'Observer les traces',reply:'Les empreintes forment un cercle autour de l’œuf. Elles ressemblent à celles d’un grand animal.',next:'tracks'},{label:'Appeler doucement',reply:'Une voix grave répond : « Merci de ne pas avoir pris peur. »',next:'voice'}]},
glow:{text:'Une chaleur douce émane de l’œuf. Un petit craquement résonne sous la coquille.',choices:[{label:'Attendre tranquillement',reply:'Une petite créature ouvre un œil curieux et observe la clairière.',next:'hatch'},{label:'Chercher de l’eau',reply:'Tu découvres une source claire au pied d’un vieux chêne.',next:'tracks'}]},
tracks:{text:'Les traces mènent vers un arbre immense dont le tronc porte des symboles anciens.',choices:[{label:'Étudier les symboles',reply:'Les symboles racontent l’histoire d’un dragon qui veillait sur la forêt.',next:'voice'},{label:'Retourner à la clairière',reply:'La créature dans l’œuf semble réagir à tes pas.',next:'hatch'}]},
voice:{text:'Une voix mystérieuse explique que l’œuf attend quelqu’un qui saura respecter la forêt.',choices:[{label:'Promettre de protéger la forêt',reply:'Un souffle tiède traverse les feuilles. Une lumière dorée enveloppe l’œuf.',next:'hatch'}]},
hatch:{text:'La coquille s’ouvre. Un petit dragon apparaît et s’approche de toi sans crainte. Il reste beaucoup à apprendre ensemble.',choices:[{label:'Lui donner un nom',reply:'Le petit dragon pousse un cri joyeux. Votre aventure vient de commencer.',next:'ending'},{label:'Découvrir la forêt ensemble',reply:'Le dragon déploie ses petites ailes et t’invite à le suivre.',next:'ending'}]},
ending:{text:'Tu as rencontré le dernier dragon de la forêt. Il te reste à découvrir ses pouvoirs et les secrets de ce lieu. Fin du premier chapitre.',choices:[{label:'Continuer l’aventure',reply:'Le dragon te montre un sentier lumineux qui n’était pas là auparavant.',next:'start'}]}
}}
];
const categories=['Tout','Romance','Amitié','Drama','Crush','Lover','Best friend','WLW','BL','Enemies','Secret','Anime','Fantaisie','Mystère','Aventure','RPG','Science-fiction','Paranormal','Comédie','Historique','Quotidien'];
const $=id=>document.getElementById(id);
function readStored(key){try{return localStorage.getItem(key)}catch{return null}}
function parse(key,fallback){try{const v=readStored(key);return v?JSON.parse(v):fallback}catch{return fallback}}
function safeString(value,max){return typeof value==='string'?value.trim().slice(0,max):''}
function safeColor(value){return typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value)}
function sanitizeCharacter(c,index){if(!c||typeof c!=='object')return null;const id=safeString(c.id,90),name=safeString(c.name,40),description=safeString(c.description,320);if(!/^[a-zA-Z0-9_-]{1,90}$/.test(id)||starter.some(x=>x.id===id)||!name||!description)return null;const colors=Array.isArray(c.colors)&&c.colors.length===2&&c.colors.every(safeColor)?c.colors:COLORS[index%COLORS.length];return {id,name,category:ALLOWED_CATEGORIES.has(c.category)?c.category:'Quotidien',tags:Array.isArray(c.tags)?c.tags.filter(t=>typeof t==='string').slice(0,5).map(t=>safeString(t,24)):[],emoji:safeString(c.emoji,8)||'🌙',description,greeting:safeString(c.greeting,320)||'Salut ! Heureux de faire ta connaissance.',memory:safeString(c.memory,500),image:safeImage(c.image),colors}}
function sanitizeChats(raw){const result=Object.create(null);if(!raw||typeof raw!=='object'||Array.isArray(raw))return result;for(const [id,messages] of Object.entries(raw).slice(0,500)){if(!/^[a-zA-Z0-9_-]{1,100}$/.test(id)||!Array.isArray(messages))continue;result[id]=messages.slice(-300).filter(m=>m&&typeof m==='object'&&(m.role==='user'||m.role==='assistant'||m.who==='me'||m.who==='them')&&typeof m.text==='string').map(m=>({role:m.role||(m.who==='me'?'user':'assistant'),text:m.text.slice(0,4000),time:Number.isFinite(Number(m.time))?Number(m.time):Date.now()}))}return result}
function sanitizeStringMap(raw,maxLength){const result=Object.create(null);if(!raw||typeof raw!=='object'||Array.isArray(raw))return result;for(const [key,value] of Object.entries(raw).slice(0,500)){if(/^[a-zA-Z0-9_-]{1,100}$/.test(key)&&typeof value==='string')result[key]=value.trim().slice(0,maxLength)}return result}
function sanitizeChatSettings(raw){const result=Object.create(null),styles=['natural','roleplay','dialogue','concise'];if(!raw||typeof raw!=='object'||Array.isArray(raw))return result;for(const [id,value] of Object.entries(raw).slice(0,500)){if(!/^[a-zA-Z0-9_-]{1,100}$/.test(id)||!value||typeof value!=='object')continue;result[id]={style:styles.includes(value.style)?value.style:'natural',narration:value.narration!==false}}return result}
function sanitizeProfile(raw){if(!raw||typeof raw!=='object'||Array.isArray(raw))return {name:'',bio:'',style:'Libre'};const styles=['Libre','Fantaisie','Mystère','Aventure','Science-fiction','Tranche de vie','Anime','Romance','Amitié','RPG','Paranormal','Comédie','Historique','Quotidien'];return {name:safeString(raw.name,32),bio:safeString(raw.bio,300),style:styles.includes(raw.style)?raw.style:'Libre'}}
const savedState=parse(STORAGE.state,null);
const legacyState=savedState&&typeof savedState==='object'?savedState:{characters:parse(STORAGE.characters,[]),favorites:parse(STORAGE.favorites,[]),chats:parse(STORAGE.chats,{}),profile:parse(STORAGE.profile,{}),memories:parse(STORAGE.memory,{}),storyProgress:parse(STORAGE.story,{}),theme:readStored(STORAGE.theme)==='light'?'light':'dark'};
let custom=Array.isArray(legacyState.characters)?legacyState.characters.slice(0,250).map(sanitizeCharacter).filter(Boolean):[];
let favorites=Array.isArray(legacyState.favorites)?Array.from(new Set(legacyState.favorites.filter(x=>typeof x==='string'&&starter.concat(custom).some(c=>c.id===x)))):[];
let chats=sanitizeChats(legacyState.chats),profile=sanitizeProfile(legacyState.profile),memories=sanitizeStringMap(legacyState.memories,1000),chatSettings=sanitizeChatSettings(legacyState.chatSettings),storyProgress=Object.create(null);
if(legacyState.storyProgress&&typeof legacyState.storyProgress==='object'&&!Array.isArray(legacyState.storyProgress)){for(const [id,node] of Object.entries(legacyState.storyProgress)){const story=stories.find(x=>x.id===id);if(story&&typeof node==='string'&&story.nodes[node])storyProgress[id]=node}}
let feed='recommended',activeCategory='Tout',libraryFilter='all',activeCharacter=null,activeStory=null,pendingImage='',returnPage='discover',lightTheme=(legacyState.theme==='light'),pendingUndo=null,pendingUndoTimer=null,activeChatPanel='conversation',editingChatIndex=null;const pendingChatReplies=new Set();
function allCharacters(){return starter.concat(custom)}
function getCharacter(id){return allCharacters().find(c=>c.id===id)||null}
function persist(){try{const payload={schemaVersion:4,savedAt:new Date().toISOString(),characters:custom,favorites,chats,profile,memories,chatSettings,storyProgress,theme:lightTheme?'light':'dark'};localStorage.setItem(STORAGE.state,JSON.stringify(payload));[STORAGE.characters,STORAGE.favorites,STORAGE.chats,STORAGE.profile,STORAGE.memory,STORAGE.story,STORAGE.theme].forEach(key=>{try{localStorage.removeItem(key)}catch{}});return true}catch(error){toast('La sauvegarde locale a échoué. Exporte tes données et libère de l’espace avant de continuer.','error');return false}}
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]})}
function safeImage(value){return typeof value==='string'&&/^data:image\/(webp|png|jpeg);base64,[a-z0-9+/=]+$/i.test(value)?value:''}
function toast(message,type){const el=document.createElement('div');el.className='toast '+(type||'');el.textContent=message;$('toastRegion').appendChild(el);setTimeout(()=>el.remove(),3600)}
function toastAction(message,label,onAction){if(pendingUndoTimer)clearTimeout(pendingUndoTimer);if(pendingUndo&&pendingUndo.toast)pendingUndo.toast.remove();const el=document.createElement('div');el.className='toast success';const text=document.createElement('span');text.textContent=message;const button=document.createElement('button');button.type='button';button.className='toast-action';button.dataset.action='undo-delete';button.textContent=label;el.append(text,button);$('toastRegion').appendChild(el);pendingUndo={toast:el,callback:onAction};pendingUndoTimer=setTimeout(()=>{if(pendingUndo&&pendingUndo.toast===el)pendingUndo=null;el.remove()},15000)}
function undoLastDeletion(){const entry=pendingUndo;if(!entry)return;pendingUndo=null;if(pendingUndoTimer)clearTimeout(pendingUndoTimer);pendingUndoTimer=null;entry.toast.remove();entry.callback()}
let routeProgressTimer=null;
function ensureRouteProgress(){
  let bar=$('routeProgress');
  if(!bar){
    bar=document.createElement('div');
    bar.id='routeProgress';
    bar.className='routeProgress route-progress';
    bar.setAttribute('aria-hidden','true');
    const fill=document.createElement('span');
    bar.appendChild(fill);
    document.body.prepend(bar);
  }else{
    bar.classList.add('routeProgress','route-progress');
    if(!bar.querySelector('span'))bar.appendChild(document.createElement('span'));
  }
  return bar;
}
function showRouteProgress(){
  const bar=ensureRouteProgress();
  bar.classList.remove('active','done');void bar.offsetWidth;bar.classList.add('active');
  if(routeProgressTimer)clearTimeout(routeProgressTimer);
  routeProgressTimer=setTimeout(()=>{bar.classList.add('done');setTimeout(()=>bar.classList.remove('active','done'),220)},430);
}
function flashBusy(el,duration=360){
  if(!el||el.classList.contains('is-busy'))return;
  el.classList.add('is-busy');el.setAttribute('aria-busy','true');
  setTimeout(()=>{el.classList.remove('is-busy');el.removeAttribute('aria-busy')},duration);
}
function navigate(page){
  document.body.classList.toggle('chat-active',page==='chat');
  showRouteProgress();
  document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id==='page-'+page));
  document.querySelectorAll('[data-page]').forEach(el=>el.classList.toggle('active',el.dataset.page===page));
  document.querySelectorAll('.mobile-dock-item').forEach(el=>el.classList.toggle('active',el.dataset.page===page));
  $('breadcrumbCurrent').textContent=({discover:'Découvrir',library:'Bibliothèque',stories:'Histoires',profile:'Mon espace',chat:'Discussion'})[page]||'Luna Stories';
  $('sidebar').classList.remove('open');
  if(page==='library')renderLibrary();
  if(page==='profile')fillProfile();
  window.scrollTo({top:0,behavior:'smooth'});
}
function changeFeed(value){feed=value;document.querySelectorAll('[data-feed]').forEach(el=>el.classList.toggle('active',el.dataset.feed===feed));renderCharacters()}
function changeCategory(value){activeCategory=value;renderCategories();renderCharacters()}
function renderCategories(){
  const icons={'Tout':'✦','Anime':'🌸','Fantaisie':'🪄','Romance':'💕','Amitié':'☀️','Drama':'💔','Crush':'💘','Lover':'❤️','Best friend':'🫶','WLW':'🌷','BL':'💙','Enemies':'⚡','Secret':'🤫','Mystère':'🔎','Aventure':'🧭','RPG':'🎲','Science-fiction':'🚀','Paranormal':'🌙','Comédie':'🎭','Historique':'🏛️','Quotidien':'☕'};
  $('categoryFilters').innerHTML=categories.map(c=>'<button class="category-chip '+(activeCategory===c?'active':'')+'" data-action="category" data-value="'+esc(c)+'"><span class="category-icon">'+(icons[c]||'✧')+'</span><span>'+esc(c)+'</span></button>').join('');
}
function avatarHTML(c,extraClass){const image=safeImage(c.image);return image?'<img class="'+(extraClass||'character-image')+'" src="'+image+'" alt="Illustration de '+esc(c.name)+'">':'<span class="'+(extraClass||'character-emoji')+'">'+esc(c.emoji||'✦')+'</span>'}
function characterCoverURL(character){
 const pools={
  'Fantaisie':['photo-1511497584788-876760111969','photo-1519681393784-d120267933ba','photo-1470252649378-9c29740c9fa8'],
  'Mystère':['photo-1519608487953-e999c86e7455','photo-1518837695005-2083093ee35b','photo-1500530855697-b586d89ba3ee'],
  'Science-fiction':['photo-1451187580459-43490279c0fa','photo-1446776811953-b23d57bd21aa','photo-1519681393784-d120267933ba'],
  'Aventure':['photo-1500530855697-b586d89ba3ee','photo-1470252649378-9c29740c9fa8','photo-1511497584788-876760111969'],
  'Romance':['photo-1470252649378-9c29740c9fa8','photo-1518837695005-2083093ee35b','photo-1500530855697-b586d89ba3ee'],
  'Anime':['photo-1519681393784-d120267933ba','photo-1511497584788-876760111969','photo-1451187580459-43490279c0fa'],
  'Quotidien':['photo-1470252649378-9c29740c9fa8','photo-1500530855697-b586d89ba3ee','photo-1518837695005-2083093ee35b']
 };
 const pool=pools[character.category]||pools['Aventure'];
 const seed=String(character.id||character.name).split('').reduce((sum,ch)=>sum+ch.charCodeAt(0),0);
 return 'https://images.unsplash.com/'+pool[seed%pool.length]+'?auto=format&fit=crop&w=1000&q=82';
}
function storyCoverURL(id){
 const covers={signal:'photo-1451187580459-43490279c0fa',library:'photo-1511497584788-876760111969'};
 return 'https://images.unsplash.com/'+(covers[id]||'photo-1500530855697-b586d89ba3ee')+'?auto=format&fit=crop&w=1100&q=84';
}
function characterCard(c){
 const mine=custom.some(x=>x.id===c.id),fav=favorites.includes(c.id);
 const palette=(c.colors||COLORS[0]),hasImage=!!safeImage(c.image);
 const cover=hasImage?'':'<img class="character-cover-photo visual-media" data-visual-image src="'+esc(characterCoverURL(c))+'" alt="" aria-hidden="true" loading="lazy" decoding="async">';
 return '<article class="character-card poly-card" data-tilt-card><div class="character-cover '+(hasImage?'has-character-image':'has-scene-photo')+'" data-image-shell style="--cover1:'+esc(palette[0])+';--cover2:'+esc(palette[1])+'"><span class="cover-shimmer"></span>'+cover+'<div class="poster-halo"></div><div class="poster-orbit"></div>'+avatarHTML(c,'character-poster-art')+'<span class="character-tag">'+esc(c.category)+'</span><button class="favorite-button '+(fav?'active':'')+'" data-action="favorite" data-id="'+esc(c.id)+'" aria-label="'+(fav?'Retirer des favoris':'Ajouter aux favoris')+'">'+(fav?'♥':'♡')+'</button><span class="poster-spark">✦</span><span class="poster-bottom-glow"></span></div><div class="character-details"><div class="character-name-row"><h3>'+esc(c.name)+'</h3><span class="character-origin">'+(mine?'✦ CRÉATION':'LUNA PICK')+'</span></div><p class="character-description">'+esc(c.description)+'</p><div class="character-tag-list">'+(c.tags||[]).slice(0,3).map(t=>'<span>'+esc(t)+'</span>').join('')+'</div><div class="character-card-footer"><span class="card-category"><i>✧</i> '+esc(c.category)+'</span><div class="character-actions"><button class="card-action" data-action="open-chat" data-id="'+esc(c.id)+'">Discuter <span>↗</span></button>'+(mine?'<button class="card-more" data-action="edit-character" data-id="'+esc(c.id)+'" aria-label="Modifier '+esc(c.name)+'">✎</button><button class="card-more" data-action="delete-character" data-id="'+esc(c.id)+'" aria-label="Supprimer '+esc(c.name)+'">×</button>':'')+'</div></div></div></article>'
}
function renderCharacters(){
 renderCategories();
 const q=$('characterSearch').value.trim().toLocaleLowerCase('fr');
 let list=allCharacters().filter(c=>(activeCategory==='Tout'||c.category===activeCategory||(c.tags||[]).includes(activeCategory))&&[c.name,c.category,c.description,...(c.tags||[])].join(' ').toLocaleLowerCase('fr').includes(q));
 if(feed==='favorites')list=list.filter(c=>favorites.includes(c.id));
 if(feed==='mine')list=list.filter(c=>custom.some(x=>x.id===c.id));
 if(feed==='recommended')list.sort((a,b)=>Number(favorites.includes(b.id))-Number(favorites.includes(a.id)));
 $('resultsTitle').textContent=({recommended:'Sélection pour toi',all:'Tous les personnages',favorites:'Tes favoris',mine:'Tes créations'})[feed];
 $('resultsCount').textContent=list.length+' personnage'+(list.length>1?'s':'');
 $('characterGrid').innerHTML=list.length?list.map(characterCard).join(''):'<div class="empty-state"><div class="empty-symbol">✧</div><h3>Rien ici pour le moment</h3><p>Change tes filtres ou crée un personnage pour commencer à remplir cet espace.</p><button class="button-primary" data-action="new-character">Créer un personnage</button></div>';
 $('favoriteCount').textContent=favorites.length;
 if($('favoriteCountSide'))$('favoriteCountSide').textContent=favorites.length;
 $('libraryCount').textContent=new Set(custom.map(c=>c.id).concat(favorites)).size;
 document.querySelectorAll('[data-feed]').forEach(el=>el.classList.toggle('active',el.dataset.feed===feed));
 watchVisualImages($('characterGrid'));bindTiltCards($('characterGrid'));observeRevealItems($('characterGrid'));
}

function renderLibrary(){
 const q=$('librarySearch').value.trim().toLocaleLowerCase('fr');
 let list=allCharacters().filter(c=>(c.name+' '+c.description).toLocaleLowerCase('fr').includes(q));
 const chatIds=allCharacters().filter(c=>(chats[c.id]||[]).length>0);
 const saved=allCharacters().filter(c=>custom.some(x=>x.id===c.id)||favorites.includes(c.id)||(chats[c.id]||[]).length>0);
 if(libraryFilter==='favorites')list=list.filter(c=>favorites.includes(c.id));
 if(libraryFilter==='created')list=list.filter(c=>custom.some(x=>x.id===c.id));
 if(libraryFilter==='chats')list=list.filter(c=>(chats[c.id]||[]).length>0);
 if(libraryFilter==='all')list=list.filter(c=>custom.some(x=>x.id===c.id)||favorites.includes(c.id)||(chats[c.id]||[]).length>0);
 $('libraryGrid').innerHTML=list.length?list.map(characterCard).join(''):'<div class="empty-state"><div class="empty-symbol">▤</div><h3>Ton espace se construit ici</h3><p>Ajoute des favoris, commence une conversation ou crée ton premier personnage pour remplir ta bibliothèque.</p><button class="button-primary" data-action="new-character">Créer un personnage</button></div>';
 const counts={all:saved.length,favorites:favorites.length,created:custom.length,chats:chatIds.length};
 const set=(id,value)=>{const el=$(id);if(el)el.textContent=String(value)};
 set('libraryFavoriteStat',favorites.length);set('libraryCreatedStat',custom.length);set('libraryChatStat',chatIds.length);
 set('libraryAllCount',counts.all);set('libraryFavoritesCount',counts.favorites);set('libraryCreatedCount',counts.created);set('libraryChatsCount',counts.chats);
 document.querySelectorAll('[data-library]').forEach(el=>el.classList.toggle('active',el.dataset.library===libraryFilter));
 watchVisualImages($('libraryGrid'));bindTiltCards($('libraryGrid'));observeRevealItems($('libraryGrid'));
}

function renderStories(){
 const content=stories.map((s,index)=>{
  const resume=!!(chats['story_'+s.id]&&chats['story_'+s.id].length>1);
  const step=chats['story_'+s.id]?Math.max(0,Math.ceil(chats['story_'+s.id].length/2)-1):0;
  const photo='<img class="story-cover-photo visual-media" data-visual-image '+(index===0?'data-route-critical':'')+' src="'+esc(storyCoverURL(s.id))+'" alt="" aria-hidden="true" loading="'+(index===0?'eager':'lazy')+'" decoding="async">';
  return '<article class="story-card story-card-luna" data-tilt-card><div class="story-art" data-image-shell style="--s1:'+esc(s.colors[0])+';--s2:'+esc(s.colors[1])+'"><span class="cover-shimmer"></span>'+photo+'<span class="story-art-orbit"></span><span class="story-art-emoji">'+esc(s.emoji)+'</span><span class="story-art-index">0'+(index+1)+'</span><span class="story-art-glint">✦</span></div><div class="story-content"><div class="story-content-top"><span class="story-category-tag">'+esc(s.category)+'</span><span class="story-length-tag">✧ RÉCIT INTERACTIF</span></div><h3>'+esc(s.title)+'</h3><p>'+esc(s.description)+'</p><div class="story-progress-row"><span>'+(resume?'Progression sauvegardée':'Premier chapitre')+'</span><span>'+(resume?step+' étape(s)':'À découvrir')+'</span></div><div class="story-card-actions"><button class="card-action" data-action="start-story" data-id="'+esc(s.id)+'">'+(resume?'Reprendre l’histoire':'Commencer')+' <span>↗</span></button>'+(resume?'<button class="card-more" data-action="restart-story" data-id="'+esc(s.id)+'" aria-label="Recommencer '+esc(s.title)+'">↻</button>':'')+'</div></div></article>';
 }).join('');
 $('storyGrid').innerHTML=content;
 $('homeStories').innerHTML=stories.map(s=>'<article class="story-mini"><div class="story-mini-icon">'+esc(s.emoji)+'</div><div class="story-mini-copy"><b>'+esc(s.title)+'</b><small>'+esc(s.category)+'</small></div><button data-action="start-story" data-id="'+esc(s.id)+'">'+(chats['story_'+s.id]&&chats['story_'+s.id].length>1?'Reprendre':'Jouer')+'</button></article>').join('');
 watchVisualImages($('storyGrid'));bindTiltCards($('storyGrid'));observeRevealItems($('storyGrid'));
}

function openModal(id){$(id).classList.add('open');$(id).setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(id){$(id).classList.remove('open');$(id).setAttribute('aria-hidden','true');if(!document.querySelector('.modal-backdrop.open'))document.body.style.overflow=''}
function resetCharacterForm(){$('characterForm').reset();$('characterId').value='';$('characterEmoji').value='🌙';$('characterVisibility').value='private';pendingImage='';$('avatarPreview').textContent='🌙';$('modalTitle').textContent='Créer un personnage'}
function openCreator(id){resetCharacterForm();if(id){const c=custom.find(x=>x.id===id);if(!c)return;$('modalTitle').textContent='Modifier le personnage';$('characterId').value=c.id;$('characterName').value=c.name;$('characterCategory').value=c.category;$('characterEmoji').value=c.emoji||'🌙';$('characterDescription').value=c.description;$('characterGreeting').value=c.greeting||'';$('characterMemory').value=c.memory||'';pendingImage=safeImage(c.image);renderAvatarPreview()}openModal('characterModal');setTimeout(()=>$('characterName').focus(),50)}
function renderAvatarPreview(){const image=safeImage(pendingImage);$('avatarPreview').innerHTML=image?'<img src="'+image+'" alt="Aperçu du personnage">':esc($('characterEmoji').value||'🌙')}
function compressImage(file){return new Promise((resolve,reject)=>{if(!file||!file.type.match(/^image\/(png|jpeg|webp)$/)){reject(new Error('Format non accepté. Utilise PNG, JPG ou WebP.'));return}if(file.size>8*1024*1024){reject(new Error('Image trop volumineuse (maximum 8 Mo).'));return}const reader=new FileReader();reader.onerror=()=>reject(new Error('Impossible de lire cette image.'));reader.onload=()=>{const img=new Image();img.onerror=()=>reject(new Error('Image illisible.'));img.onload=()=>{const max=560,scale=Math.min(1,max/Math.max(img.width,img.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL('image/webp',.72))};img.src=reader.result};reader.readAsDataURL(file)})}
function saveCharacter(event){event.preventDefault();const id=$('characterId').value||('user_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8));const obj={id,name:safeString($('characterName').value,40),category:ALLOWED_CATEGORIES.has($('characterCategory').value)?$('characterCategory').value:'Quotidien',emoji:safeString($('characterEmoji').value,8)||'🌙',description:safeString($('characterDescription').value,320),greeting:safeString($('characterGreeting').value,320)||'Salut ! Heureux de faire ta connaissance.',memory:safeString($('characterMemory').value,500),image:safeImage(pendingImage),colors:COLORS[custom.length%COLORS.length]};if(!obj.name||!obj.description){toast('Ajoute un nom et une description pour continuer.','error');return}const previous=custom.slice(),index=custom.findIndex(c=>c.id===id);if(index>=0)custom[index]=obj;else custom.unshift(obj);if(!persist()){custom=previous;return}closeModal('characterModal');renderCharacters();renderLibrary();toast(index>=0?'Personnage modifié.':'Personnage créé !','success')}
function toggleFavorite(id){const previous=favorites.slice(),wasFavorite=favorites.includes(id);favorites=wasFavorite?favorites.filter(x=>x!==id):favorites.concat(id);if(!persist()){favorites=previous;return}renderCharacters();renderLibrary();if(activeCharacter&&activeCharacter.id===id)renderChatDetails();toast(wasFavorite?'Retiré des favoris.':'Ajouté à tes favoris.','success')}
function askConfirm(title,message,confirmLabel,onConfirm){let modal=$('confirmModal');if(!modal){modal=document.createElement('div');modal.id='confirmModal';modal.className='modal-backdrop';modal.setAttribute('aria-hidden','true');modal.innerHTML='<section class="modal-card small-modal" role="dialog" aria-modal="true" aria-labelledby="confirmTitle"><div class="modal-header"><div><div class="eyebrow">CONFIRMATION</div><h2 id="confirmTitle"></h2></div><button type="button" class="modal-close" data-action="confirm-cancel" aria-label="Fermer">×</button></div><p class="modal-help" id="confirmMessage"></p><div class="modal-actions"><button type="button" class="button-quiet" data-action="confirm-cancel">Annuler</button><button type="button" class="button-danger" id="confirmAccept" data-action="confirm-accept"></button></div></section>';document.body.appendChild(modal);modal.addEventListener('click',event=>{if(event.target===modal)closeConfirm()});modal.querySelectorAll('[data-action="confirm-cancel"]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();closeConfirm()}));modal.querySelector('#confirmAccept').addEventListener('click',event=>{event.preventDefault();event.stopPropagation();acceptConfirm()})}$('confirmTitle').textContent=title;$('confirmMessage').textContent=message;$('confirmAccept').textContent=confirmLabel||'Confirmer';pendingConfirmation=onConfirm;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('confirmAccept').focus(),0)}
function closeConfirm(){const modal=$('confirmModal');if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}pendingConfirmation=null;if(!document.querySelector('.modal-backdrop.open'))document.body.style.overflow=''}
function acceptConfirm(){const callback=pendingConfirmation;closeConfirm();if(typeof callback==='function')callback()}
function deleteCharacter(id){const index=custom.findIndex(x=>x.id===id);if(index<0)return;const snapshot={character:custom[index],index,favorite:favorites.includes(id),chat:chats[id],memory:memories[id]};custom.splice(index,1);favorites=favorites.filter(x=>x!==id);delete chats[id];delete memories[id];if(!persist()){custom.splice(index,0,snapshot.character);if(snapshot.favorite)favorites.push(id);if(snapshot.chat)chats[id]=snapshot.chat;if(snapshot.memory)memories[id]=snapshot.memory;return}renderCharacters();renderLibrary();toastAction('Personnage supprimé.','Annuler',()=>{if(custom.some(x=>x.id===id))return;const deletedState={custom:custom.slice(),favorites:favorites.slice(),chat:chats[id],memory:memories[id]};custom.splice(Math.min(snapshot.index,custom.length),0,snapshot.character);if(snapshot.favorite&&!favorites.includes(id))favorites.push(id);if(snapshot.chat)chats[id]=snapshot.chat;if(snapshot.memory)memories[id]=snapshot.memory;if(!persist()){custom=deletedState.custom;favorites=deletedState.favorites;delete chats[id];delete memories[id];return}renderCharacters();renderLibrary();toast('Suppression annulée.','success')})}
const chatSceneTemplates=[
{id:'meet',icon:'✦',title:'Une première rencontre',label:'Commencer',description:'Vous vous croisez pour la première fois et la conversation commence naturellement.',opening:c=>'*'+c.name+' remarque ta présence et t’adresse un sourire curieux.* « Salut ! Je crois qu’on ne s’est pas encore présentés. »'},
{id:'secret',icon:'🤫',title:'Un secret à partager',label:'Confidence',description:'Le personnage souhaite te confier quelque chose et cherche le bon moment.',opening:c=>'*'+c.name+' baisse un peu la voix.* « J’aimerais te parler de quelque chose… Je ne savais pas à qui le raconter. »'},
{id:'day',icon:'☀️',title:'Une journée tranquille',label:'Quotidien',description:'Une conversation calme, une sortie ou un moment partagé.',opening:c=>'*'+c.name+' s’installe près de toi.* « Ça te dirait qu’on passe un peu de temps ensemble aujourd’hui ? »'},
{id:'unexpected',icon:'⚡',title:'Un imprévu',label:'Surprise',description:'Un événement inattendu vient changer le cours de votre journée.',opening:c=>'*'+c.name+' arrive d’un pas rapide.* « Il vient de se passer quelque chose… Tu peux m’aider ? »'},
{id:'adventure',icon:'🧭',title:'Une aventure commence',label:'Aventure',description:'Vous avez une destination à découvrir et une décision à prendre ensemble.',opening:c=>'*'+c.name+' déplie une carte et te la montre.* « J’ai trouvé un endroit qui n’apparaît sur aucune carte. On y va ? »'}
];
function renderChatDetails(){
 if(!activeCharacter)return;
 const c=activeCharacter,messages=chats[c.id]||[],tags=Array.isArray(c.tags)?c.tags:[];
 const palette=c.colors||COLORS[0],note=memories[c.id]||c.memory||'Aucune note personnelle pour le moment.';
 $('chatAside').innerHTML='<div class="chat-detail-cover" style="--cover1:'+esc(palette[0])+';--cover2:'+esc(palette[1])+'">'+avatarHTML(c,'chat-detail-avatar')+'<span class="chat-detail-glow"></span></div><div class="chat-detail-heading"><div><span class="chat-detail-kicker">FICHE PERSONNAGE</span><h2>'+esc(c.name)+'</h2><span class="chat-category">'+esc(c.category)+'</span></div><button class="chat-detail-fav" data-action="favorite" data-id="'+esc(c.id)+'" title="Ajouter aux favoris">'+(favorites.includes(c.id)?'♥':'♡')+'</button></div><p class="chat-detail-description">'+esc(c.description)+'</p><div class="chat-detail-tags">'+tags.map(t=>'<span>'+esc(t)+'</span>').join('')+'</div><div class="chat-detail-stats"><div><b>'+messages.length+'</b><small>Messages</small></div><div><b>'+esc(c.category)+'</b><small>Univers</small></div></div><div class="chat-detail-section"><div class="chat-detail-section-title">À propos</div><p>Une conversation privée enregistrée dans ce navigateur. Les échanges restent associés à ce personnage.</p></div><div class="chat-detail-memory"><div class="chat-detail-section-title">✧ Notes personnelles</div><p id="chatMemoryPreview">'+esc(note)+'</p><button class="chat-detail-link" data-action="chat-memory">Modifier les notes <span>→</span></button></div>'+(custom.some(x=>x.id===c.id)?'<button class="chat-detail-edit" data-action="edit-character" data-id="'+esc(c.id)+'">✎ Modifier ce personnage</button>':'');
}
function showChat(character,story){
 activeCharacter=character;activeStory=story||null;
 returnPage=story?'stories':(document.querySelector('.page.active')?.id==='page-library'?'library':'discover');
 activeChatPanel='conversation';
 $('chatCharacterName').textContent=character.name;
 $('chatCharacterMeta').textContent=character.category+(story?' · Histoire interactive':' · Personnage');
 if($('chatContextCategory'))$('chatContextCategory').textContent=character.category+' · '+(story?'Histoire':'Personnage');
 $('chatMiniAvatar').innerHTML=avatarHTML(character,'');
 $('chatTopStatus').textContent=story?'Histoire en cours':'Conversation personnelle';
 $('chatAside').classList.remove('is-open');
 renderChatDetails();renderChatScenes();
 document.querySelectorAll('[data-chat-panel]').forEach(el=>el.classList.toggle('active',el.dataset.chatPanel==='conversation'));
 $('chatConversationPanel').hidden=false;$('chatScenesPanel').hidden=true;
 if(!chats[character.id])chats[character.id]=[{role:'assistant',text:character.greeting||'Bonjour ! Que souhaites-tu imaginer aujourd’hui ?',time:Date.now()}];
 renderChatMessages();renderStoryChoices();
 $('chatInput').value='';$('typingIndicator').hidden=!pendingChatReplies.has(character.id);
 navigate('chat');setTimeout(()=>$('chatInput').focus(),100);
}
function openChat(id){const c=getCharacter(id);if(c)showChat(c,null)}
function toggleChatDetails(){const aside=$('chatAside'),layout=aside.closest('.chat-layout');if(window.matchMedia&&window.matchMedia('(max-width:760px)').matches){aside.classList.toggle('is-open')}else{layout.classList.toggle('details-hidden')}}
function switchChatPanel(panel){
 if(!['conversation','scenes'].includes(panel))return;
 activeChatPanel=panel;
 document.querySelectorAll('[data-chat-panel]').forEach(el=>el.classList.toggle('active',el.dataset.chatPanel===panel));
 $('chatConversationPanel').hidden=panel!=='conversation';
 $('chatScenesPanel').hidden=panel!=='scenes';
 if(panel==='scenes')renderChatScenes();
}
function renderChatScenes(){
 const host=$('chatScenesGrid');if(!host||!activeCharacter)return;
 host.innerHTML=chatSceneTemplates.map(scene=>'<button class="chat-scene-card" data-action="start-chat-scene" data-scene="'+scene.id+'"><span class="chat-scene-icon">'+scene.icon+'</span><span class="chat-scene-label">'+scene.label+'</span><strong>'+scene.title+'</strong><p>'+scene.description+'</p><span class="chat-scene-cta">Commencer cette scène <b>→</b></span></button>').join('');
}
function startChatScene(id){
 if(!activeCharacter)return;
 const scene=chatSceneTemplates.find(x=>x.id===id);if(!scene)return;
 const previous=(chats[activeCharacter.id]||[]).slice();
 addMessage('assistant','✧ Scène : '+scene.title+'\n\n'+scene.opening(activeCharacter));
 if(!persist()){chats[activeCharacter.id]=previous;return}
 switchChatPanel('conversation');renderChatMessages();toast('Nouvelle scène commencée.','success');
}
function renderChatMessages(){
 if(!activeCharacter)return;
 const list=chats[activeCharacter.id]||[];
 if(!list.length){$('chatMessages').innerHTML='<div class="chat-welcome"><div class="welcome-orb">✦</div><b>Le début de votre histoire</b><p>Envoie un premier message pour lancer la conversation.</p></div>';return}
 const lastUserIndex=list.reduce((found,m,i)=>(m.role==='user'||m.who==='me')?i:found,-1);
 const lastAssistantIndex=list.reduce((found,m,i)=>(m.role==='assistant'||m.who==='them')?i:found,-1);
 $('chatMessages').innerHTML=list.map((m,index)=>{
  const role=m.role||(m.who==='me'?'user':'assistant'),mine=role==='user'||m.who==='me';
  const time=m.time?new Date(m.time).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}):'';
  const actions='<div class="message-tools"><button type="button" data-action="copy-chat-message" data-index="'+index+'" aria-label="Copier ce message" title="Copier">▢</button>'+(mine&&index===lastUserIndex?'<button type="button" data-action="edit-last-message" aria-label="Modifier ton dernier message" title="Modifier">✎</button>':'')+(!mine&&index===lastAssistantIndex&&lastUserIndex>=0&&index>lastUserIndex&&!activeStory?'<button type="button" data-action="retry-last-response" aria-label="Régénérer la réponse de démonstration" title="Réessayer">↻</button>':'')+'</div>';
  return '<article class="message '+(mine?'mine':'theirs')+'"><div class="message-avatar">'+(mine?'N':avatarHTML(activeCharacter,''))+'</div><div class="message-content"><span class="message-author">'+(mine?'Toi':esc(activeCharacter.name))+'</span><div class="message-bubble">'+esc(m.text).replace(/\n/g,'<br>')+'</div><div class="message-meta"><span class="message-time">'+time+'</span>'+actions+'</div></div></article>';
 }).join('');
 $('chatMessages').scrollTop=$('chatMessages').scrollHeight;
 $('chatTopStatus').textContent=pendingChatReplies.has(activeCharacter.id)?'Réponse en préparation…':'Conversation personnelle';
 $('chatSendButton').disabled=pendingChatReplies.has(activeCharacter.id);
 $('chatSendButton').classList.toggle('is-pending',pendingChatReplies.has(activeCharacter.id));
 $('typingIndicator').hidden=!pendingChatReplies.has(activeCharacter.id);
 renderChatDetails();
}
function addMessage(role,text){if(!chats[activeCharacter.id])chats[activeCharacter.id]=[];chats[activeCharacter.id].push({role,text:String(text).slice(0,4000),time:Date.now()});if(chats[activeCharacter.id].length>300)chats[activeCharacter.id]=chats[activeCharacter.id].slice(-300)}
function localReply(text,character,attempt=0){
 const t=text.toLocaleLowerCase('fr'),prefs=chatSettings[character.id]||{style:'natural',narration:true};
 let response;
 if(/\b(bonjour|salut|coucou|hello|hey)\b/.test(t))response='Salut ! Je suis content·e de te retrouver. Comment se passe ta journée ?';
 else if(/(qui es-tu|comment tu t'appelles|présente.toi|parle moi de toi)/.test(t))response='Je m’appelle '+character.name+'. '+character.description;
 else if(/(que fais-tu|tu fais quoi|qu’est.ce que tu fais)/.test(t))response='Je réfléchissais justement à ce qu’on pourrait faire ensemble. Tu as une idée ou tu préfères que je t’en propose une ?';
 else if(/(merci|super|génial|trop bien)/.test(t))response='Ça me fait plaisir ! On continue ? J’ai envie de voir où cette conversation va nous mener.';
 else if(character.category==='Mystère')response='Je garde ce détail en tête. Dans une enquête, même les petits éléments peuvent compter. Qu’est-ce que tu as remarqué d’autre ?';
 else if(character.category==='Fantaisie')response='Une lueur apparaît au bout du sentier. Je crois que notre aventure vient de prendre un tournant… On regarde de plus près ?';
 else if(character.category==='Science-fiction')response='Un nouveau signal vient d’apparaître sur mon écran. Il semble lié à ce que tu viens de dire. On l’analyse ensemble ?';
 else if(character.category==='Romance')response='Je ne veux pas aller trop vite. J’aimerais surtout savoir ce que tu ressens et prendre le temps d’en parler avec toi.';
 else response='Je t’écoute. J’aimerais comprendre un peu mieux ce que tu veux dire. Tu peux m’en raconter davantage ?';
 if(attempt%2===1)response=character.name+' : '+response;
 if(prefs.style==='concise')response=response.split('. ')[0]+'.';
 if(prefs.style==='roleplay'&&prefs.narration)response='*'+character.name+' prend un instant pour réfléchir.* '+response;
 else if(prefs.style==='dialogue'||!prefs.narration)response=response.replace(/^\*[^*]+\*\s*/,'');
 return response;
}
function autoResize(){const input=$('chatInput');if(!input)return;input.style.height='auto';input.style.height=Math.min(input.scrollHeight,140)+'px'}
function sendMessage(event){
 event.preventDefault();if(!activeCharacter)return;
 const input=$('chatInput'),text=input.value.trim();if(!text||pendingChatReplies.has(activeCharacter.id))return;
 const character=activeCharacter,cid=character.id,storyMode=!!activeStory,previous=(chats[cid]||[]).slice();
 addMessage('user',text.slice(0,1500));
 if(activeStory)addMessage('assistant','Je t’écoute. Tu peux choisir une des possibilités de l’histoire ou continuer librement en racontant ce que tu souhaites faire.');
 if(!persist()){chats[cid]=previous;return}
 input.value='';autoResize();pendingChatReplies.add(cid);
 $('typingIndicator').hidden=false;$('chatTopStatus').textContent='Réponse en préparation…';$('chatSendButton').disabled=true;
 renderChatMessages();
 window.setTimeout(()=>{
  if(!storyMode)addMessageToChat(cid,'assistant',localReply(text,character));
  pendingChatReplies.delete(cid);persist();
  if(activeCharacter?.id===cid){$('typingIndicator').hidden=true;renderChatMessages()}
 },520);
}
function addMessageToChat(id,role,text){
 if(!chats[id])chats[id]=[];
 chats[id].push({role,text:String(text).slice(0,4000),time:Date.now()});
 if(chats[id].length>300)chats[id]=chats[id].slice(-300);
}
function copyChatMessage(index){
 if(!activeCharacter)return;const message=(chats[activeCharacter.id]||[])[Number(index)];if(!message)return;
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(String(message.text||'')).then(()=>toast('Message copié.','success')).catch(()=>toast('Copie indisponible dans ce navigateur.','error'));
 else toast('La copie n’est pas disponible dans ce navigateur.','error');
}
function editLastChatMessage(){
 if(!activeCharacter)return;const list=chats[activeCharacter.id]||[];
 const index=list.reduce((found,m,i)=>(m.role==='user'||m.who==='me')?i:found,-1);
 if(index<0)return;editingChatIndex=index;$('chatEditText').value=list[index].text||'';openModal('chatEditModal');
}
function saveEditedChatMessage(){
 if(!activeCharacter||editingChatIndex===null)return;
 const list=chats[activeCharacter.id]||[],index=editingChatIndex,text=safeString($('chatEditText').value,1500);
 if(!text){toast('Le message ne peut pas être vide.','error');return}
 const previous=list.slice();list[index]={...list[index],text,time:Date.now()};
 list.splice(index+1);
 addMessageToChat(activeCharacter.id,'assistant',localReply(text,activeCharacter));
 if(!persist()){chats[activeCharacter.id]=previous;return}
 editingChatIndex=null;closeModal('chatEditModal');renderChatMessages();toast('Dernier message modifié.','success');
}
function retryLastChatResponse(){
 if(!activeCharacter)return;const list=chats[activeCharacter.id]||[];
 const userIndex=list.reduce((found,m,i)=>(m.role==='user'||m.who==='me')?i:found,-1);
 if(userIndex<0)return;
 const previous=list.slice(),text=list[userIndex].text||'';
 if(list[userIndex+1]&&(list[userIndex+1].role==='assistant'||list[userIndex+1].who==='them'))list[userIndex+1]={...list[userIndex+1],text:localReply(text,activeCharacter,1),time:Date.now()};
 else addMessageToChat(activeCharacter.id,'assistant',localReply(text,activeCharacter,1));
 if(!persist()){chats[activeCharacter.id]=previous;return}
 renderChatMessages();toast('Nouvelle réponse de démonstration affichée.','success');
}
function renderChatSuggestions(){
 const host=$('chatSuggestions');if(!host)return;
 const suggestions=['Raconte-moi ton histoire','Qu’est-ce qu’on pourrait faire ?','J’ai quelque chose à te dire…'];
 host.innerHTML=suggestions.map((prompt,i)=>'<button type="button" class="chat-suggestion" data-action="use-chat-prompt" data-prompt="'+esc(prompt)+'">'+['✦','☀','…'][i]+' '+esc(prompt)+'</button>').join('');
}
function openChatSettings(){
 if(!activeCharacter)return;const prefs=chatSettings[activeCharacter.id]||{style:'natural',narration:true};
 $('chatStyleSelect').value=prefs.style;$('chatNarrationSelect').value=prefs.narration?'on':'off';openModal('chatSettingsModal');
}
function saveChatSettings(){
 if(!activeCharacter)return;const old=chatSettings[activeCharacter.id];
 chatSettings[activeCharacter.id]={style:['natural','roleplay','dialogue','concise'].includes($('chatStyleSelect').value)?$('chatStyleSelect').value:'natural',narration:$('chatNarrationSelect').value==='on'};
 if(!persist()){if(old)chatSettings[activeCharacter.id]=old;else delete chatSettings[activeCharacter.id];return}
 closeModal('chatSettingsModal');toast('Préférences de discussion enregistrées.','success');
}
function exportCurrentChat(){
 if(!activeCharacter)return;const lines=(chats[activeCharacter.id]||[]).map(m=>{const who=(m.role==='user'||m.who==='me')?'Toi':activeCharacter.name;return '['+(m.time?new Date(m.time).toLocaleString('fr-FR'):'')+'] '+who+' : '+m.text});
 const blob=new Blob([lines.join('\n\n')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='luna-discussion-'+activeCharacter.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.txt';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);toast('Discussion exportée.','success');
}
function clearChat(){if(!activeCharacter)return;askConfirm('Effacer cette discussion ?', 'Tous les messages de cette conversation seront supprimés de ce navigateur.', 'Effacer', ()=>{const oldMessages=(chats[activeCharacter.id]||[]).slice(),oldProgress=activeStory?storyProgress[activeStory]:undefined;if(activeStory){const story=stories.find(s=>s.id===activeStory);if(story){storyProgress[activeStory]=story.start;chats[activeCharacter.id]=[{role:'assistant',text:story.nodes[story.start].text,time:Date.now()}]}}else chats[activeCharacter.id]=[{role:'assistant',text:activeCharacter.greeting||'On recommence ?',time:Date.now()}];if(!persist()){chats[activeCharacter.id]=oldMessages;if(activeStory&&oldProgress!==undefined)storyProgress[activeStory]=oldProgress;return}renderChatMessages();renderStoryChoices();renderStories();toast('Conversation effacée.','success')})}
function showMemory(){if(!activeCharacter)return;$('memoryText').value=memories[activeCharacter.id]||activeCharacter.memory||'';openModal('memoryModal')}
function saveMemory(){if(!activeCharacter)return;const old=memories[activeCharacter.id],c=custom.find(x=>x.id===activeCharacter.id),oldCharacterMemory=c?c.memory:null;memories[activeCharacter.id]=safeString($('memoryText').value,1000);if(c)c.memory=memories[activeCharacter.id];if(!persist()){if(old===undefined)delete memories[activeCharacter.id];else memories[activeCharacter.id]=old;if(c)c.memory=oldCharacterMemory;return}closeModal('memoryModal');const note=$('chatAside').querySelector('.chat-detail-memory p');if(note)note.textContent=memories[activeCharacter.id]||'Aucune note pour le moment.';toast('Notes enregistrées.','success')}
function clearChat(){if(!activeCharacter)return;askConfirm('Effacer cette discussion ?', 'Tous les messages de cette conversation seront supprimés de ce navigateur.', 'Effacer', ()=>{const oldMessages=(chats[activeCharacter.id]||[]).slice(),oldProgress=activeStory?storyProgress[activeStory]:undefined;if(activeStory){const story=stories.find(s=>s.id===activeStory);if(story){storyProgress[activeStory]=story.start;chats[activeCharacter.id]=[{role:'assistant',text:story.nodes[story.start].text,time:Date.now()}]}}else chats[activeCharacter.id]=[{role:'assistant',text:activeCharacter.greeting||'On recommence ?',time:Date.now()}];if(!persist()){chats[activeCharacter.id]=oldMessages;if(activeStory&&oldProgress!==undefined)storyProgress[activeStory]=oldProgress;return}renderChatMessages();renderStoryChoices();renderStories();toast('Conversation effacée.','success')})}
function showMemory(){if(!activeCharacter)return;$('memoryText').value=memories[activeCharacter.id]||activeCharacter.memory||'';openModal('memoryModal')}
function saveMemory(){if(!activeCharacter)return;const old=memories[activeCharacter.id],c=custom.find(x=>x.id===activeCharacter.id),oldCharacterMemory=c?c.memory:null;memories[activeCharacter.id]=safeString($('memoryText').value,1000);if(c)c.memory=memories[activeCharacter.id];if(!persist()){if(old===undefined)delete memories[activeCharacter.id];else memories[activeCharacter.id]=old;if(c)c.memory=oldCharacterMemory;return}closeModal('memoryModal');const note=$('chatAside').querySelector('.chat-memory-note p');if(note)note.textContent=memories[activeCharacter.id]||'Aucune note pour le moment.';toast('Notes enregistrées.','success')}
function startStory(id,restart=false){const story=stories.find(s=>s.id===id);if(!story)return;const character={id:'story_'+id,name:story.title,category:story.category,emoji:story.emoji,description:story.description,greeting:story.nodes[story.start].text,colors:story.colors};const existing=chats[character.id];if(!restart&&existing&&existing.length>1){activeStory=id;showChat(character,id);return}const oldChat=existing,oldProgress=storyProgress[id];activeStory=id;storyProgress[id]=story.start;chats[character.id]=[{role:'assistant',text:story.nodes[story.start].text,time:Date.now()}];if(!persist()){if(oldChat)chats[character.id]=oldChat;else delete chats[character.id];if(oldProgress)storyProgress[id]=oldProgress;else delete storyProgress[id];return}showChat(character,id);renderStories()}
function renderStoryChoices(){let box=$('storyChoiceList');if(!box){box=document.createElement('div');box.id='storyChoiceList';box.className='story-choice-list';$('chatMessages').after(box)}box.innerHTML='';if(!activeStory){box.hidden=true;return}const story=stories.find(s=>s.id===activeStory),node=story&&story.nodes[storyProgress[activeStory]||story.start];if(!node||!node.choices||!node.choices.length){box.hidden=true;return}box.hidden=false;node.choices.forEach((choice,index)=>{const button=document.createElement('button');button.className='story-choice';button.dataset.action='story-choice';button.dataset.index=String(index);button.textContent='✧ '+choice.label;box.appendChild(button)})}
function chooseStory(index){if(!activeStory)return;const story=stories.find(s=>s.id===activeStory);if(!story)return;const current=story.nodes[storyProgress[activeStory]||story.start],choice=current&&current.choices[Number(index)];if(!choice)return;const oldMessages=(chats[activeCharacter.id]||[]).slice(),oldProgress=storyProgress[activeStory];addMessage('user',choice.label);addMessage('assistant',choice.reply);storyProgress[activeStory]=choice.next;if(!persist()){chats[activeCharacter.id]=oldMessages;storyProgress[activeStory]=oldProgress;return}renderChatMessages();renderStoryChoices();renderStories()}
function fillProfile(){$('profileName').value=profile.name||'';$('profileBio').value=profile.bio||'';$('profileStyle').value=profile.style||'Libre';$('topName').textContent=profile.name||'Mon espace';$('topAvatar').textContent=(profile.name||'N').trim().charAt(0).toUpperCase()||'N'}
function saveProfile(event){event.preventDefault();const old=profile;profile=sanitizeProfile({name:$('profileName').value,bio:$('profileBio').value,style:$('profileStyle').value});if(persist()){fillProfile();toast('Profil enregistré sur cet appareil.','success')}else profile=old}
function exportData(){const data={app:'Luna Stories',schemaVersion:4,exportedAt:new Date().toISOString(),characters:custom,favorites,chats,profile,memories,chatSettings,storyProgress,theme:lightTheme?'light':'dark'};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='luna-stories-sauvegarde-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);toast('Sauvegarde préparée.','success')}
function importData(file){if(!file)return;if(file.size>10*1024*1024){toast('La sauvegarde dépasse la limite de 10 Mo.','error');return}const reader=new FileReader();reader.onerror=()=>toast('Impossible de lire ce fichier.','error');reader.onload=()=>{let data;try{data=JSON.parse(reader.result)}catch{toast('Ce fichier JSON est illisible.','error');return}if(!data||data.app!=='Luna Stories'||!Array.isArray(data.characters)||!Array.isArray(data.favorites)||!data.chats||typeof data.chats!=='object'||Array.isArray(data.chats)){toast('Ce fichier ne ressemble pas à une sauvegarde Luna Stories valide.','error');return}const imported=data.characters.slice(0,250).map(sanitizeCharacter).filter(Boolean);if(!imported.length&&data.characters.length){toast('Aucun personnage valide dans cette sauvegarde.','error');return}askConfirm('Importer cette sauvegarde ?', 'Les personnages portant le même identifiant seront remplacés. Exporte tes données actuelles avant l’import pour garder une copie.', 'Importer', ()=>{const old={custom,favorites,chats,profile,memories,chatSettings,storyProgress};const map=new Map(custom.map(c=>[c.id,c]));imported.forEach(c=>map.set(c.id,c));custom=Array.from(map.values()).slice(0,250);const validIds=new Set(starter.concat(custom).map(c=>c.id));favorites=Array.from(new Set(favorites.concat(data.favorites.filter(x=>typeof x==='string'&&validIds.has(x)))));chats=Object.assign(Object.create(null),chats,sanitizeChats(data.chats));memories=Object.assign(Object.create(null),memories,sanitizeStringMap(data.memories,1000));if(data.storyProgress&&typeof data.storyProgress==='object'&&!Array.isArray(data.storyProgress)){for(const [id,node] of Object.entries(data.storyProgress)){const story=stories.find(x=>x.id===id);if(story&&typeof node==='string'&&story.nodes[node])storyProgress[id]=node}}if(data.profile&&typeof data.profile==='object')profile=sanitizeProfile(data.profile);if(data.chatSettings)chatSettings=Object.assign(Object.create(null),chatSettings,sanitizeChatSettings(data.chatSettings));if(persist()){renderCharacters();renderLibrary();fillProfile();toast('Sauvegarde importée.','success')}else{custom=old.custom;favorites=old.favorites;chats=old.chats;profile=old.profile;memories=old.memories;chatSettings=old.chatSettings;storyProgress=old.storyProgress}})};reader.readAsText(file)}
function resetAll(){askConfirm('Effacer toutes les données ?', 'Les personnages créés, favoris, conversations et préférences seront supprimés sur ce navigateur. Cette action ne peut pas être annulée.', 'Tout effacer', ()=>{const old={custom,favorites,chats,profile,memories,chatSettings,storyProgress,lightTheme};custom=[];favorites=[];chats=Object.create(null);profile={name:'',bio:'',style:'Libre'};memories=Object.create(null);chatSettings=Object.create(null);storyProgress=Object.create(null);lightTheme=false;setTheme(false);if(persist()){renderCharacters();renderLibrary();fillProfile();toast('Données locales effacées.','success')}else{custom=old.custom;favorites=old.favorites;chats=old.chats;profile=old.profile;memories=old.memories;chatSettings=old.chatSettings;storyProgress=old.storyProgress;lightTheme=old.lightTheme;setTheme(false)}})}
function setTheme(save=true){document.body.classList.toggle('light',lightTheme);$('themeButton').textContent=lightTheme?'☀':'☾';$('themeButton').setAttribute('aria-label',lightTheme?'Activer le thème sombre':'Activer le thème clair');if(save&&!persist()){lightTheme=!lightTheme;document.body.classList.toggle('light',lightTheme);$('themeButton').textContent=lightTheme?'☀':'☾'}}
function toastSafeClick(el){flashBusy(el);if(el.dataset.action==='favorite')toggleFavorite(el.dataset.id);else if(el.dataset.action==='open-chat')openChat(el.dataset.id);else if(el.dataset.action==='edit-character')openCreator(el.dataset.id);else if(el.dataset.action==='delete-character')deleteCharacter(el.dataset.id);else if(el.dataset.action==='undo-delete')undoLastDeletion();else if(el.dataset.action==='confirm-cancel')closeConfirm();else if(el.dataset.action==='confirm-accept')acceptConfirm();else if(el.dataset.action==='start-story')startStory(el.dataset.id);else if(el.dataset.action==='restart-story')startStory(el.dataset.id,true);else if(el.dataset.action==='new-character')openCreator();else if(el.dataset.action==='browse')$('characterBrowser').scrollIntoView({behavior:'smooth'});else if(el.dataset.action==='show-favorites'){changeFeed('favorites');navigate('discover')}else if(el.dataset.action==='close-modal')closeModal('characterModal');else if(el.dataset.action==='close-memory')closeModal('memoryModal');else if(el.dataset.action==='chat-memory')showMemory();else if(el.dataset.action==='save-memory')saveMemory();else if(el.dataset.action==='clear-chat')clearChat();else if(el.dataset.action==='story-choice')chooseStory(el.dataset.index);else if(el.dataset.action==='back')navigate(returnPage);else if(el.dataset.action==='export')exportData();else if(el.dataset.action==='import')$('importFile').click();else if(el.dataset.action==='reset')resetAll();else if(el.dataset.action==='category')changeCategory(el.dataset.value);else if(el.dataset.action==='chat-memory')showMemory();else if(el.dataset.action==='chat-settings')openChatSettings();else if(el.dataset.action==='save-chat-settings')saveChatSettings();else if(el.dataset.action==='close-chat-settings')closeModal('chatSettingsModal');else if(el.dataset.action==='toggle-chat-details')toggleChatDetails();else if(el.dataset.action==='chat-export')exportCurrentChat();else if(el.dataset.action==='start-chat-scene')startChatScene(el.dataset.scene);else if(el.dataset.action==='use-chat-prompt'){const input=$('chatInput');input.value=el.dataset.prompt||'';switchChatPanel('conversation');input.focus();autoResize()}else if(el.dataset.action==='copy-chat-message')copyChatMessage(el.dataset.index);else if(el.dataset.action==='edit-last-message')editLastChatMessage();else if(el.dataset.action==='save-chat-edit')saveEditedChatMessage();else if(el.dataset.action==='close-chat-edit'){editingChatIndex=null;closeModal('chatEditModal')}else if(el.dataset.action==='retry-last-response')retryLastChatResponse()}
document.addEventListener('click',event=>{const chatPanelButton=event.target.closest('[data-chat-panel]');if(chatPanelButton){switchChatPanel(chatPanelButton.dataset.chatPanel);return}const pageButton=event.target.closest('[data-page]');if(pageButton){navigate(pageButton.dataset.page);return}const action=event.target.closest('[data-action]');if(action){toastSafeClick(action);return}const feedButton=event.target.closest('[data-feed]');if(feedButton){changeFeed(feedButton.dataset.feed);return}const libButton=event.target.closest('[data-library]');if(libButton){libraryFilter=libButton.dataset.library;renderLibrary();document.querySelectorAll('[data-library]').forEach(el=>el.classList.toggle('active',el===libButton));return}if(event.target.classList.contains('modal-backdrop')){closeModal(event.target.id)}});
$('chatEditText').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,180)+'px'});renderChatSuggestions();
$('characterForm').addEventListener('submit',saveCharacter);
$('characterEmoji').addEventListener('input',renderAvatarPreview);
$('characterImage').addEventListener('change',async event=>{const file=event.target.files&&event.target.files[0];if(!file)return;try{pendingImage=await compressImage(file);renderAvatarPreview();toast('Image ajoutée au personnage.','success')}catch(e){toast(e.message,'error')}event.target.value=''});

$('characterSearch').addEventListener('input',renderCharacters);$('librarySearch').addEventListener('input',renderLibrary);
$('profileForm').addEventListener('submit',saveProfile);$('chatForm').addEventListener('submit',sendMessage);
$('chatInput').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,140)+'px';$('composerCounter').textContent=this.value.length+' / 1500'});
$('chatInput').addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();$('chatForm').requestSubmit()}});
$('importFile').addEventListener('change',event=>{const file=event.target.files&&event.target.files[0];if(file)importData(file);event.target.value=''});
$('menuToggle').addEventListener('click',()=>$('sidebar').classList.toggle('open'));
$('themeButton').addEventListener('click',()=>{lightTheme=!lightTheme;setTheme()});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('characterSearch').focus()}if(event.key==='Escape'){if($('confirmModal')?.classList.contains('open'))closeConfirm();document.querySelectorAll('.modal-backdrop.open').forEach(el=>closeModal(el.id));$('sidebar').classList.remove('open')}});
function init(){ensureRouteProgress();setTheme(false);renderCharacters();renderStories();renderLibrary();fillProfile();if(!savedState)persist();if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.style.scrollBehavior='auto'}
init();
})();