document.getElementById('eror-msg').style.display='none';

const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const seacrhText =searchField.value;
    // console.log(seacrhText);
    searchField.value ='';
    document.getElementById('eror-msg').style.display='none';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seacrhText}`    
    // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data.meals))
    .catch(error=>displayEror(error));   
}
const displayEror = error =>{
    document.getElementById('eror-msg').style.display='block';
}


const displaySearchResult = meals =>{
    const searhResult =document.getElementById('search-result');
    searhResult.textContent = '';
  
    meals.forEach(meal=>{
       
       
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick = "loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strCategory}</p>
          <p class="card-text">${meal.idMeal}</p>
          <p class="card-text">${meal.strArea}</p>
        </div>
      </div>
    </div>
        `;
        searhResult.appendChild(div);

    
    })
}


const loadMealDetail =async mealId =>{
  
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    // fetch(url)
    // .then(response => response.json())
    // .then(data =>displayMealDetail(data.meals[0]))
    const response =await fetch(url);
    const data = await response.json();
    displayMealDetail(data.meals[0]);

}


const displayMealDetail = meal =>{
    
    const mealDetails = document.getElementById('meal-deatails');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0-110)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">See Tutorials</a>
    </div>
    `;

    mealDetails.appendChild(div);



}