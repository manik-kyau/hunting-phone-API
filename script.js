const phoneLoad = async (searchText, isShowAll) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json()
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // display show all button if there are more than 12 phones
    const showAllBtn = document.getElementById('show-all');
    if(phones.length >12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display only first 12 Phones if not show all
    if(!isShowAll){
        phones=phones.slice(0,12);
    }
    phones.forEach(phone =>{
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        <div class="card bg-base-100 p-5 lg:shadow-xl border">
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick"handleShowDetails('${phone.slug}')" class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    loadingSpinner(false);
};

// handle search option
const handleSearch = (isShowAll) =>{
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    phoneLoad(searchText, isShowAll);
};

// handle loading spinner
const loadingSpinner = (isShowAll) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    // console.log(loadingSpinner);
    if(isShowAll === true){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};
// handle show all button
const handleShowAll = () =>{
    handleSearch(true);
};

// handle show details button
const handleShowDetails = async(id) =>{ 
    console.log(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = response.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById("show-detail-phone-name");
    phoneName.innerText = phone.name;
    const showDetailContainer =document.getElementById('show-detail-container');
    showDetailContainer.innerHTML =`
        <img src="${phone.image}" alt="">
        
        <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span> DisplaySize: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span> memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span>ChipSet: </span>${phone?.mainFeatures?.slug}</p>
        <p><span>ReleaseDate: </span>${phone.releaseDate}</p>
        <p><span>Brand: </span>${phone.brand}</p>
    `

    // show Phone modal
    show_details_modal.showModal()
}
// phoneLoad();