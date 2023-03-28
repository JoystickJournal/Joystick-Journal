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
const fourthDes = document.querySelector('#fourthDes');
const fifthDes = document.querySelector('#fifthDes');
// const firstSystem = document.querySelector('#firstSystem');
// const secSystem = document.querySelector('#secSystem');
// const thirdSystem = document.querySelector('#thirdSystem');
// const fourthSystem = document.querySelector('#thirdSystem');
// const fifthSystem = document.querySelector('#thirdSystem');


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
        firstTitle.innerText = arr[0].name;
        secTitle.innerText = arr[1].name;
        thirdTitle.innerText = arr[2].name;
        fourthTitle.innerText = arr[3].name;
        fifthTitle.innerText = arr[5].name;
        // firstDes.innerText = 'Rating: ' + arr[0].rating +  ' / Genre: ' + arr[0].genres[0].name;
        // secDes.innerText = 'Rating: ' + arr[1].rating +  ' / Genre: ' + arr[1].genres[0].name;
        // thirdDes.innerText = 'Rating: ' + arr[2].rating +  ' / Genre: ' + arr[2].genres[0].name;
        
    }
    catch{
        console.log('failed')
    }
}

cardDetails()

// async function firstDescription(){
//     try{
//         const response = await fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=89cf756f80b344b4b86793092bb3a028');
//         const data = await response.json();
//         const id = data.results[0].id;
//         const response2 = await fetch(`https://api.rawg.io/api/games/${id}?key=89cf756f80b344b4b86793092bb3a028`);
//         const data2 = await response2.json();
//         firstDes.innerText = data2.description_raw
//     }
//     catch{
//           console.log('failed')
//     }
// }

// firstDescription();

// async function secDescription(){
//     try{
//         const response = await fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=89cf756f80b344b4b86793092bb3a028');
//         const data = await response.json();
//         const id = data.results[1].id;
//         const response2 = await fetch(`https://api.rawg.io/api/games/${id}?key=89cf756f80b344b4b86793092bb3a028`);
//         const data2 = await response2.json();
//         secDes.innerText = data2.description_raw
//     }
//     catch{
//           console.log('failed')
//     }
// }

// secDescription();

// async function thirdDescription(){
//     try{
//         const response = await fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=89cf756f80b344b4b86793092bb3a028');
//         const data = await response.json();
//         const id = data.results[2].id;
//         const response2 = await fetch(`https://api.rawg.io/api/games/${id}?key=89cf756f80b344b4b86793092bb3a028`);
//         const data2 = await response2.json();
//         thirdDes.innerText = data2.description_raw
//     }
//     catch{
//           console.log('failed')
//     }
// }

// thirdDescription();

// async function fourthDescription(){
//     try{
//         const response = await fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=89cf756f80b344b4b86793092bb3a028');
//         const data = await response.json();
//         const id = data.results[3].id;
//         const response2 = await fetch(`https://api.rawg.io/api/games/${id}?key=89cf756f80b344b4b86793092bb3a028`);
//         const data2 = await response2.json();
//         let paragraph = data2.description_raw
//         let thirdPeriodIndex = paragraph.indexOf(".", paragraph.indexOf(".") + 1);
//         let newParagraph = paragraph.slice(0, thirdPeriodIndex + 1);
//         fourthDes.innerText = newParagraph;
//     }
//     catch{
//           console.log('failed')
//     }
// }

// fourthDescription();

// async function fifthDescription(){
//     try{
//         const response = await fetch('https://api.rawg.io/api/games/lists/main?ordering=-rating&key=89cf756f80b344b4b86793092bb3a028');
//         const data = await response.json();
//         const id = data.results[5].id;
//         const response2 = await fetch(`https://api.rawg.io/api/games/${id}?key=89cf756f80b344b4b86793092bb3a028`);
//         const data2 = await response2.json();
//         let paragraph = data2.description_raw
//         let thirdPeriodIndex = paragraph.indexOf(".", paragraph.indexOf(".") + 1);
//         let newParagraph = paragraph.slice(0, thirdPeriodIndex + 1);
//         fifthDes.innerText = newParagraph;
//     }
//     catch{
//           console.log('failed')
//     }
// }

// fifthDescription();