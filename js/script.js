window.onload = function(){
    listItems();
}

//Function para realizar get do JSON, mapear e listar as informações
function listItems(){
    fetch('https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json',
    ).then(function (response){
        return response.json();
    }).then(function (data){

        data.sort(function(a, b){
            if(a.fantasyName < b.fantasyName) {
                return -1;
            }else
            {
                return true;
            }
        })

        var listarParceiros = document.getElementById('main-content')
        listarParceiros.innerHTML = data.slice(0, count).map((dt)=>{
        return `<a id="cards" href="" class="main-item">
                <div class="main-img">
                    <img src=https://clube-static.clubegazetadopovo.com.br/` + dt.cover +` alt="">
                </div>
                <div id="info" class="main-info">
                    <h2 id="nome">`+ dt.fantasyName +`</h2>
                    <h3>`+ dt.discountAmount +`% <i class="fas fa-tags"></i></h3>
                </div>
            </a>`
        }).join('') 

        //Function para realizar o get do valor do input e filtrar as informações
        $('#pesquisa').on("keypress", function(){
            var value = $(this).val().toLowerCase();
            $('#main-content').children('#cards').filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            })
            
            var filteredList = document.getElementById("main-content");
            filteredList.innerHTML = data.map((filterData)=>{
                const filterItems = (query) => {
                    return filterData.fantasyName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                }
                
                if(filterItems(value) == true){
                    return `<a id="cards" href="" class="main-item">
                        <div class="main-img">
                            <img src=https://clube-static.clubegazetadopovo.com.br/` + filterData.cover +` alt="">
                        </div>
                        <div id="info" class="main-info">
                            <h2 id="nome">`+ filterData.fantasyName +`</h2>
                            <h3>`+ filterData.discountAmount +`% <i class="fas fa-tags"></i></h3>
                        </div>
                    </a>`
                }
            }).join('') 
        })
    })
}

//Function para realizar o carregamento de mais 8 cards
var count = 8;
function countIncrement(){
   count += 8;
   listItems();
}

// Function para abrir e fecchar menu mobile
$(document).ready(function(){
    if(window.screen.width < 601){
        $('.menu-hamburguer').click(function(){
            $('.menu ul').css('display' , 'flex');
        })
    
        $('.close-menu').click(function(){
            $('.menu ul').css('display' , 'none');
        })
    
        $('.menu ul li a').click(function(){
            $('.menu ul').css('display' , 'none');
        })
    }

})