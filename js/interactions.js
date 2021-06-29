    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    //autoLogin();
    //controlla se l'autologin è disponibile
    async function autoLogin() {
        let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
        if (isAutoLoginAvailable) {
            let userAccount = wax.userAccount;
            let pubKeys = wax.pubKeys;
            getNFTsInventoryFromWallet(userAccount);
            let str = 'AutoLogin enabled for account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
            document.getElementById('login').style.visibility="hidden";
            document.getElementById('autologin').insertAdjacentHTML('beforeend', str);
        }
        else {
            document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in');
        }
    }

    //login, fa apparire un popup per effettuare l'autenticazione
    async function login() {
        try {
            //se è stato attivato l'autologin appare direttamente il nome account
            let userAccount = await wax.login();
            let pubKeys = wax.pubKeys;
            getNFTsInventoryFromWallet(userAccount);
            let str = 'Account: ' + userAccount;
            document.getElementById('responsetitlevx').style.visibility="visible";
            document.getElementById('responsetitleinv').style.visibility="visible";
            document.getElementById('login').style.visibility="hidden";
            document.getElementById('loginresponse').insertAdjacentHTML('beforeend', str);
        } catch (e) {
            document.getElementById('loginresponse').append(e.message);
        }
    }

    async function sign() {
        if(!wax.api) {
          return document.getElementById('response').append('* Login first *');
        }

        try {
          const result = await wax.api.transact({
            actions: [{
              account: 'eosio',
              name: 'delegatebw',
              authorization: [{
                actor: wax.userAccount, // user autenticato
                permission: 'active',
              }],
              data: {
                from: wax.userAccount,
                receiver: '2pyba.wam',
                stake_net_quantity: '0.00000002 WAX',
                stake_cpu_quantity: '12.000000 WAX',
                transfer: false,
                memo: 'CyberGems Init Fee '
              },
            }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
              });
              //document.getElementById('response').append(JSON.stringify(result, null, 2))
            } catch(e) {
              //document.getElementById('response').append(e.message);
            }
          }
    // ricavo dal primo endpoint l'elenco degli NFTs di tutte le collezioni presenti su quel wallet in input
    function getNFTsInventoryFromWallet(wallet){
        fetch("https://wax.api.atomicassets.io/atomicassets/v1/accounts/"+wallet)
      .then(function (response) {
          return response.json();
        })
      .then(function (myJson) {
          console.log(myJson.data.templates);
          const obj = myJson.data.templates;
          Object.keys(obj).forEach(key => {
            // per ogni template di una determinata collection svolgo delle operazioni
            if (obj[key].collection_name === "alien.worlds"){
              console.log(key,"asset numbers:",obj[key].assets,obj[key].collection_name,obj[key].template_id)
              let i = obj[key].assets;
              while (i!=0){
                getNFTTemplateId(obj[key].collection_name,obj[key].template_id);
                i--;
              }
            }
          });
        })
        .catch(function (error) {
           console.log("Error: " + error);
        });
    }
    function getNFTTemplateId(collectioname,templateid){
      fetch("https://wax.api.atomicassets.io/atomicassets/v1/templates/"+collectioname+"/"+templateid)
      .then(function (response) {
          return response.json();
      }).then(function (myJson) {
        // lista di tutti gli NFTs di quella collection con quel templateid
        if (myJson.data.template_id === "19649"){
          console.log(myJson);
          document.getElementById('responseinvx').append(JSON.stringify(myJson.data.immutable_data, null, 2))
        } else {
          console.log(myJson);
          document.getElementById('responseinv').append(JSON.stringify(myJson.data.immutable_data, null, 2))
        }
      }).catch(function (error) {
          console.log("Error: " + error);
      });
    }
    function getImgFromIpfs(ipfsstring){

    }
    function getTokenBalanceFromWallet(wallet){

    }
