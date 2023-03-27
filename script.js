const firstImg = document.querySelector('#firstImg');
const secImg = document.querySelector('#secImg');
const thirdImg = document.querySelector('#thirdImg');
const fourthImg = document.querySelector('#fourthImg');
const fifthImg = document.querySelector('#fifthImg');
const firstTitle = document.querySelector('#firstTitle');
const secTitle = document.querySelector('#secTitle');
const thirdTitle = document.querySelector('#thirdTitle');
const fourthTitle = document.querySelector('#fourthTitle');
const fifthTitle = document.querySelector('#fifthTitle');
const firstDes = document.querySelector('#firstDes');
const secDes = document.querySelector('#secDes');
const thirdDes = document.querySelector('#thirdDes');
const fourthDes = document.querySelector('#thirdDes');
const fifthDes = document.querySelector('#thirdDes');
const firstSystem = document.querySelector('#firstSystem');
const secSystem = document.querySelector('#secSystem');
const thirdSystem = document.querySelector('#thirdSystem');
const fourthSystem = document.querySelector('#thirdSystem');
const fifthSystem = document.querySelector('#thirdSystem');


async function cardDetails(){
    try{
        const response = await fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=89cf756f80b344b4b86793092bb3a028');
        const data = await response.json();
        const arr = data.results
        console.log(arr)
        firstImg.src = arr[0].background_image;
        secImg.src = arr[1].background_image;
        thirdImg.src = arr[2].background_image;
        fourthImg.src = arr[3].background_image;
        fifthImg.src = arr[5].background_image;
        // firstTitle.innerText = arr[0].name;
        // secTitle.innerText = arr[1].name;
        // thirdTitle.innerText = arr[4].name;
        // firstDes.innerText = 'Rating: ' + arr[0].rating +  ' / Genre: ' + arr[0].genres[0].name;
        // secDes.innerText = 'Rating: ' + arr[1].rating +  ' / Genre: ' + arr[1].genres[0].name;
        // thirdDes.innerText = 'Rating: ' + arr[2].rating +  ' / Genre: ' + arr[2].genres[0].name;

    }
    catch{
        console.log('failed')
    }
}

cardDetails()