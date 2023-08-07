/* <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small>
                </p>
            </div>
        </div>
    </div>
</div> */
const loadProduct = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProduct(data.meals))
}
const displayProduct = (product) => {
    const productShow = document.getElementById('product-container');
    productShow.innerHTML = '';
    product.forEach(meal => {
        const mealDiv = document.createElement('div')
        console.log(meal)
        mealDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${meal.strMealThumb}" class="img-fluid rounded-start h-100" alt="">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                          <a href="" class="text-warning" onclick="LoadDetailsMeal(${meal.idMeal})" type="button" data-bs-toggle="modal" data-bs-target="#mealsDeteils">View Details</a>
                            </div >
                        </div >
                    </div >
                </div >
    `;
        productShow.appendChild(mealDiv)
    })
}
const searchProduct = () => {
    const searchField = document.getElementById('search-meals').value;
    console.log(searchField)
    loadProduct(searchField);
}
const LoadDetailsMeal = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetailsMeal(data.meals[0]))
}
const displayDetailsMeal = meals => {
    document.getElementById('mealsDeteilsLabel').innerText = meals.strMeal;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img class="img-fluid rounded mb-5" src="${meals.strMealThumb}">
    <p><span class="fw-bold mb-1">Category:</span> ${meals.strCategory}</p >
    <p><span class="fw-bold mb-1">Area:</span> ${meals.strArea}</p >
    <p><span class="fw-bold mb-2">Introduction:</span> ${meals.strInstructions}</p >
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <a target="_blank" href="${meals.strYoutube
        }" class="btn btn-warning fw-medium"><i
    class="bi bi-play-circle"></i>
    <span>Watch</span></a>
    </div>`
}
loadProduct('fish');
