
function processTableContent() {

    let thead = document.querySelector('.dashbrd-grid-widget-content table thead tr')
    let tbody = document.querySelector('.dashbrd-grid-widget-content table tbody')

    //  kolumny do ukrycia z thead
    let columns = [1, 2, 3, 4, 5]
    for (let i of columns)
        thead.childNodes[i].style.display = "none"

    let rows = tbody.children

    //  usuwa wiersze z datą
    for (let i = 0; i < tbody.childElementCount; i++)
        if (rows[i].className === "hover-nobg")
            rows[i].remove()

    //  ukrywa komorki w wierszach 
    for (let i = 0; i < tbody.childElementCount; i++)
        for (let j of columns)
            rows[i].children[j].style.display = "none"

    //  dodaje kolumnę Graph do thead
    let th = document.createElement('th');
    th.innerHTML = " Graph ";
    let actions = thead.children[10];
    actions.parentNode.insertBefore(th, actions)

    //  dodaje kolumnę Graph do tbody
    for (let i = 0; i < rows.length; i++) {

        // element przed którym ma być wstawiony link "Graph"
        duration = rows[i].children[10];
        createElement(duration, "td", "Graph")
        //triggerId = tbody[i].children[0].children[0].href.split("=")[1].split("&")[0];
        //createGraphLinkElement(duration, triggerId);

        //tbody[i].children[6].classList.add(tbody[i].children[6].innerText);			
    }
}

function createElement(sibling, name, text) {
    let elem = document.createElement(name);
    elem.innerHTML = text;
    sibling.parentNode.insertBefore(elem, sibling);
}

async function createRequest(request) {

    let options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    const response = await fetch("http://zabbix-sp.biksa.bik.pl/api_jsonrpc.php", options)
        .then(result => result.json())
        .then(result => result.result)
    
    token = response
    console.log(token)

    /*
    const data = await fetch("http://zabbix-sp.biksa.bik.pl/api_jsonrpc.php", options)
        .then(response => response.json())
            .then( response => token = response.result )
    //let a = data.json()
    console.log(token)
    */
    //return xxx.result
    //        .then( response => console.log(response.result) )
    //.then(response => auth = response.result)
    //.then(() => console.log("xxx " + auth))
}

function authenticate() {

    let request = {
        "jsonrpc": "2.0",
        "method": "user.login",
        "params": {
            "user": "mk",
            "password": ""
        },
        "id": 1,
        "auth": null
    }
    //return fetch("http://zabbix-sp.biksa.bik.pl/api_jsonrpc.php")
    //createRequest(request).then( (response) => {console.log(response.result); token = response.result})
    createRequest(request);

    // .then( r => console.log(r))
    //token = createRequest( request ).then( r => token=r.result)
    //console.log(token.result)
}

/*
(async function() {
    let token = await authenticate()
    console.log("token " + token)
})()
*/
let token
authenticate()
var target = document.querySelector('.dashbrd-grid-widget-content');
var config = { attributes: false, childList: true, characterData: false };

callback = function (mutationsList, observer) {

    //  for (let mutation of mutationsList)   // przy odkomentowaniu pojawia się kolumna "Graph" dwa razy
    //    if (mutation.type === 'childList')
    processTableContent();
}

if (typeof observer === 'undefined') {
    //var temp = 0;
    let observer = new MutationObserver(processTableContent)
    observer.observe(target, config)

}
/*
if ( temp === 0 ) {
	getAuthentication ( function(data) {
		auth = data.result;
		observer.observe(target,config);
		processColumns("none");
		temp = 1;
	});

}
else {
	observer.disconnect();
	processColumns("");
	temp = 0;
	console.log("2");
}
*/