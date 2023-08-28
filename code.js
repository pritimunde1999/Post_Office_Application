let ip;

//getting IP Address of client
$.getJSON("https://api.ipify.org?format=json", function(data) {
         ip = data.ip;
        // Setting text of element P with id gfg
        $("#ip").html(data.ip);
    })

const button = document.getElementById("btn");
const firstWebPage = document.getElementById("container");

button.addEventListener("click",()=>{
   fetchData();
});

async function fetchData(){
    const url = `https://ipinfo.io/${ip}?token=b822e772a5cb07`;
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    dataOnUI(result);
}

const secondWebPage = document.getElementById("container2");

async function dataOnUI(data){
    firstWebPage.style.display = "none";
    secondWebPage.style.display ="block";

    const city = data.city;
    const region = data.region;
    const loc = data.loc;
    const[latitude, longitude] = loc.split(",")
    const pincode = data.postal;
    const org = data.org;
    const timezone = data.timezone;

    let dateAndTime = new Date().toLocaleString("en-US", { timeZone: timezone });
    const array = await fetchPostalData(pincode);
    const msg = array[0].Message;
    const colonIndex = msg.indexOf(":");
    let resultString;
    if(colonIndex !== -1)
    {
        resultString = msg.slice(colonIndex + 1).trim();
    }

    
    secondWebPage.innerHTML=
    `<p>IP Address : <b class="val">${ip}</b></p>

    <div id="info">
        <p>Lat : <b class="val">${latitude}</b></p>
        <p>City : <b class="val">${city}</b></p>
        <p>Organisation : <b class="val">${org}</b></p>
        <p>Long : <b class="val">${longitude}</b></p>
        <p>Region : <b class="val">${region}</b></p>
        <p>Hostname : <b class="val">Random</b></p>
    </div>

    <div id="map">
        <h3>Your Current Location</h3>
        <iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&output=embed" frameborder="0" style="border:0"></iframe>
    </div>


    <div id="more-info">
        <h3>More Information About You</h3>
        <p>Time Zone : <b class="val">${timezone}</b></p>
        <p>Date And Time : <b class="val">${dateAndTime}</b></p>
        <p>Pincode : <b class="val">${pincode}</b></p>
        <p>Message :<span style="font-family: 'Inter', sans-serif; font-weight: 100;">Number of pincode(s) found:</span> <b class="val">${resultString}</b></p>
    </div>

    <div id="post-offices">
        <h3>Post Offices Near You</h3>
        <div id="search">
            <span class="material-symbols-outlined">search</span>
            <input id="inp" type="text" placeholder="Search By Name">
        </div>
    </div>`

   const postOffices = array[0].PostOffice;
   const cardContainer = document.createElement("div")
   cardContainer.id= "card-container";
   const input = document.getElementById("inp");
   

   postOffices.forEach(element => {

       const name = element.Name;
       const branchType = element.BranchType;
       const deliveryStatus = element.DeliveryStatus;
       const district = element.District;
       const division = element.Division;

       const card = document.createElement("div");
       card.id = "card";
       
       
        card.innerHTML=
        `<p>Name : <span>${name}</span></p>
        <p>Branch Type : <span>${branchType}<span></p>
        <p>Delivery Status : <span>${deliveryStatus}</span></p>
        <p>District : <span>${district}</span></p>
        <p>Division : <span>${division}</span></p>`;

         cardContainer.appendChild(card);
       

        
   });


   input.addEventListener('input',(e)=>{
    const searched_name = e.target.value.toLowerCase();
    console.log(input);
    const postOfficesList = document.getElementById("card-container").children;
    console.log(postOfficesList);

    Array.from(postOfficesList).forEach(item=>{
        const postOfficeName = item.children[0].textContent.split(": ")[1].toLowerCase();
        
        if(!postOfficeName.includes(searched_name))
        {
            item.style.display ="none";
        }
        else{
            item.style.display ="block";
        }
    })
})


   
   const postOfficeContainer = document.getElementById("post-offices");
   postOfficeContainer.appendChild(cardContainer);
}





async function fetchPostalData(pincode)
{
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await fetch(url,{method:"GET"});
    const result = await response.json();
    return result;
}



