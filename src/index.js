const init = () => {

    //set an array to push the breed data into
    let breeds = [];

    //declaring variables
    const dogBreedList = document.querySelector('#dog-breeds');

    //challenge 1: fetch images and append each image to the DOM
    //I added styling that keeps the images in a consistent size

    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json =>{
        let data = json;
        let array = data.message;
        array.forEach((element) => {
            let newDog = document.createElement('img');
            const dogImages = document.querySelector('#dog-image-container');
            newDog.setAttribute('src', element);
            newDog.setAttribute('style', 'display:in-line;width:auto;height:100%;max-height:30vh;')
            dogImages.appendChild(newDog);
        });
    });

    //challenge 2: fetch the breeds and load into the <ul> as a list
   

    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(data =>{
        breeds = Object.keys(data.message);
        breedsList(breeds);
    });

    /*function for updating breed list. I had this all in the above fetch call but realized that I would need it again for
    challenge 4 so I split it out*/
    function breedsList(breeds){
        clearBreeds(dogBreedList)
        breeds.forEach(breed => addBreeds(breed)); 
    };
    

    //function that adds breeds to list
    function addBreeds(breed){
        let newBreed = document.createElement('li');
        let newBreedName = document.createTextNode(breed)
        newBreed.appendChild(newBreedName);
        dogBreedList.appendChild(newBreed);
    }

    //function with a while loop that removes all breeds from list
    function clearBreeds(list){
        while(list.firstChild){
            list.removeChild(list.firstChild)
        }
    }


    //challenge 3: change the clicked <li> element's font color on click
    document.querySelector("#dog-breeds").addEventListener('click', breedClickHandler)

    function breedClickHandler(e){
        let clicked = e.target
        if(clicked.style.color === 'blue'){
            clicked.style.color = 'black';
        }else{
            clicked.style.color = 'blue';
        }
    }

    //challenge 4: add functionality to filter breeds w/ dropdown

    let dropdown = document.querySelector('#breed-dropdown');
    dropdown.addEventListener('change', dropdownHandler);
    
    //I had to modify everything in challenge 2 because of this challenge! Needed to be able to have more versitile functions
    //this function now calls breeds list, with this filter of the breeds array that takes only values that match variable 'letter' as the argument
    //this means that when user selects 'b', first the breeds array filters for breeds that start with 'b', THEN those values are passed to breedsList()
    
    function dropdownHandler(e){
        let letter = e.target.value;
        breedsList(breeds.filter(breed => breed.startsWith(letter)));
    }

}

document.addEventListener('DOMContentLoaded', init);