// https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`

import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";
export class Home{
    constructor(){
        this.getData("mmorpg")
        document.querySelectorAll(".navbar-nav .nav-link").forEach((link)=>{
            link.addEventListener("click" , async ()=>{
                document.querySelector(".navbar-nav .active").classList.remove('active');
                link.classList.add("active")
                const category = link.innerHTML
                await this.getData(category)
                
            })
        })
        this.ui = new Ui();
        this.details = document.getElementById("details");
        this.games = document.getElementById("games");
    }      
    async getData(category){
        document.getElementById("loading").classList.remove('d-none')
        const options = {
            method: "GET",
            headers: {
               "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
               "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
               Accept: "application/json",
               "Content-Type": "application/json",
            },
         };


        var data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,options)
        var response = await data.json();
        console.log(response);
        document.getElementById("loading").classList.add('d-none')
        this.ui.displayGames(response);
        document.querySelectorAll('.card').forEach(card=>{   
            card.addEventListener("click"  , ()=>{
                this.details.classList.remove('d-none');
                this.games.classList.add('d-none')
 
                new Details(card.dataset.id);
            })
        })
    }
}