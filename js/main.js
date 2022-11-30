let url = `https://nice-rose-hare.cyclic.app/produtos`;
const main = document.querySelector('main');

window.addEventListener('load', e => {
    postNews();
    "use strict";//restrito a funcionar em navegadores comES6 >
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
}); 

async function postNews() {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.map(createArticle).join('\n');

    function createArticle(article){
        return `
               <div class="article">
                     <div class="d-flex row">
                         <div class="card me-4 col-4 mt-4" id="card" style="width: 18rem;">
                            <img src="${article.img}" class="card-img-top">
                            <div class="card-body">
                            <h5 class="card-title">${article.titulo}</h5>
                            <p class="card-text">${article.descricao}</p>
                            <p class="card-text">Preço: R$ ${article.preco}</p>
                            <a href="#" class="btn" style="background-color: #ffeaf2;"> Visualizar</a>
                         </div>
                      </div>
                 </div>
        `
    } 
}