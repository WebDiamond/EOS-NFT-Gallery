Struttura del progetto:

PWA (progressive web application) che comunica attraverso la blockchain wax/eos in base
ad una determinata collezione di NFTs, attraverso cui è possibile implementare un'interfaccia
che permette il concetto di gamification dove al di sotto nel backend lavora uno smart contract
legato ad un token.

In questa parte del progetto sono esclusi i seguenti aspetti in quanto riguardano il backend:

1 - WAX Node
2 - Token eos
3 - Ricardian Smart contract

Andremo inizialmente a dialogare tramite il frotend ed una volta effettuato il login attraverso il wallet
tramite l'interfaccia di waxjs dialogheremo con alcuni endpoints relativi alla blockchain di wax per farci tornare
dati come NFTs del wallet e quantità di produzione oraria
Librerie utilizzate:

1 - Fontawesome
2 - Bootstrap
4 - WAXio


REST-API Endpoints Utilizzati:
1 - https://wax.api.atomicassets.io/atomicassets/v1/
2 - https://wax.eosphere.io/v2/

================================================================================================
Urls:

1 - https://wax.api.atomicassets.io/atomicassets/v1/accounts/2pyba.wam

mi ritorna tutti gli nft posseduti da quell'account di tutte le collezioni whitelisted o no
da concatenare con i templates id per ogni quantità di NFTs di una determinata collezione
posseduta da un determinato account per ricavare dati come stats e immagini dell'NFT con il secondo link



2 - https://wax.api.atomicassets.io/atomicassets/v1/templates/alien.worlds/19553

alien.worlds è il nome del template
mentre il template id è quello che ne ricaviamo dal wallet loggato con wax.js


3 - https://wax.eosphere.io/v2/state/get_account?account=2pyba.wam

tramite questo sommario di un account wax possiamo ricavare alcuni dati fondamentali:

le risorse come cpu e ram impegnate
il bilancio di ogni token posseduto
uno storico filtrabile di ogni transazione come preferiamo


===========================================================================================================


Considerazioni sulla libreria waxjs:



ogni sua funziona durante la sua implementazione e consequenziale richiamo all'interno del flusso di operazioni
necessita di comunicare con la blockchain wax tramite un action (via explorer) mentre per alcune operazioni
ci basta utilizzare gli endpoint, nel primo caso le funzioni devono essere per forza asynch nel secondo caso no
ma in entrambi i casi, dopo aver ricevuto i dati in formato json, vanno filtrati con quelli di nostro interesse
e stampati all'interno della pagina web.




Considerazioni sulla PWA:

utilizzando questa implementazione come struttura di un applicativo abbiamo una compatibilità universale ed al
tempo stesso una reperibilità dell'applicativo immediata tramite pagina web o tramite gli store.



=================================================================================================================
Delucidazioni sul protocollo IPFS/HTTP , le immagini della collezione nft inserite su pinata.cloud e collegate
su atomichub per essere ricavate e successivamente stampate sulla pagina della dapp necessitano di una delle due possibili soluzioni

1) array associativo dove facendo risiedere nella cartella delle images tutte le immagini possibili tutti gli NFTs
dove in base alle stringa ipfs abbiamo il percorso di un immagine che verrà utilizzata solo per indicizzare tramitee
la stampa sulla pagina html il contenuto del tuo wallet wax

2) creare una funzione che esegue la decodifica base32 una volta ottenuta la decodifica dalla stringa ipfs presa in input
comporre un link che tramite quella stringa ci porterà  a stampare l'immagine nella pagina web successivamente ad
una richiesta fetch su quel link generato e facendo append dei dati ottenuti nella dom
===================================================================================================================
