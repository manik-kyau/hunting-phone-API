const loadPhone = async(searchText,isShowAll) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const allPhones = data.data;
    // console.log(allPhones);
    displayPhones(allPhones, isShowAll);
    
};

const displayPhones = (allPhones, isShowAll) =>{
  // console.log(allPhones.length);
  const showAllBtn = document.getElementById('show-all');
  const errorElement = document.getElementById('error-element');
  console.log(errorElement)
  
  if(allPhones.length >12 && !isShowAll){
    showAllBtn.classList.remove('hidden');
  }
  else{
    showAllBtn.classList.add('hidden');
  }
  if(allPhones.length=== 0){
    errorElement.classList.remove('hidden')
  }
  else{
    errorElement.classList.add('hidden')
  }
  // console.log('is show all is ',isShowAll);
  if(!isShowAll){
    allPhones = allPhones.slice(0,12);
  }
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  allPhones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.innerHTML =`
    <div class="card w-full bg-base-100 shadow-xl">
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.brand}</p>
        <div class="card-actions justify-center">
          <button onclick="showPhoneHandler('${phone.slug}')" class="btn btn-primary">Show All</button>
        </div>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  loadSpinner(false);
};

const handleSearch = (isShowAll) =>{
  loadSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};
const handleShowAll = () =>{
  handleSearch(true);
};

const loadSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  // console.log(loadingSpinner);
  if(isLoading === true){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
};

const showPhoneHandler = async(phoneId) =>{
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
  const data = await response.json();
  const phone = data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
  // console.log(singlePhoneDetails);

  const phoneDetailsContainer = document.getElementById('show-detail-container');
  // console.log(phoneDetailsContainer);

  phoneDetailsContainer.innerHTML =`
        <img src="${phone.image}" alt="">
        <h1>${phone.name}</h1>
        <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span> DisplaySize: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span> memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span>ChipSet: </span>${phone?.mainFeatures?.slug}</p>
        <p><span>ReleaseDate: </span>${phone.releaseDate}</p>
        <p><span>Brand: </span>${phone.brand}</p>
    `
  show_details_modal.showModal();
};

// showPhoneDetails();
loadPhone('13');