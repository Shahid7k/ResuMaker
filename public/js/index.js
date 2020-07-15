const navHomeButton = document.getElementById('nav-home')
const navNewFormButton = document.getElementById('nav-addNew')
const homeContents = document.querySelector('#homeContents')
let userArr = []


const card = (user) => {
    // console.log('NameCard',user._id)
    const image = user.gender==="male" ? "https://image.shutterstock.com/image-vector/management-avatar-user-profile-vector-600w-288186182.jpg" : user.gender==="female" ? "https://en.pimg.jp/041/811/938/1/41811938.jpg" : "https://previews.123rf.com/images/ronnarid/ronnarid1507/ronnarid150700051/42829771-lgbt-avatar-user-profile-vector-illustration-white-background.jpg"
    return `
    <div class="card card-bg m-3"  style="width: 18rem;">
        <img class="card-img-top display-pic p-3 rounded-circle" 
        src=${image} 
        alt="user-pic">
        <div class="card-body">
          <h5 class="card-title">${user.fname+" "+user.lname}</h5>
          <div class=' font11 m-0 p-0'>${user.about.substring(0,50)+"..."}<br class="m-0 p-0" ><div class="font15">Skills:${user.skillset}</div></div>
         <button onclick="goToSingleCV('${user._id.$oid}')" class="btn btn-primary">View Profile </button>
        
          </div>
    </div>
    `
}
function goToSingleCV(id){
    navHomeButton.style.background='';
    document.querySelector('#onlyHomeContents').hidden = true;
    fetch('http://localhost:8000/singleUser/'+id).then(resp=>resp.json())
    .then((user)=>{
        console.log('USERBYID',user)
        let tempModel = '';
        console.log("TEMPNO",typeof user.user.tempNumber)
        if(user.user.tempNumber==1) tempModel = template1((user.user))  
        else if(user.user.tempNumber==2) tempModel = template2((user.user))  
        homeContents.innerHTML = tempModel
    })

}

function onPageLoad(){
    showHomeOnly()
    getUsers()
    // showNewFormOnly()
}

function showHomeOnly(){
    const arr = ["home","addNew"];
    document.querySelector('#addNew').hidden=true;
    document.querySelector('#home').hidden=false;
    console.log('HOME PAGE DISPLAYED')
    document.querySelector('#onlyHomeContents').hidden = false;

    navHomeButton.style.background="rgba(00,00,00,0.7)";
    navNewFormButton.style.background=''
    displayUsers()
}
function showNewFormOnly(){
    document.querySelector('#home').hidden=true;
    document.querySelector('#addNew').hidden=false;
    document.querySelector('#cv-experience-years').disabled=true;
    document.querySelector('#cv-experience-years').style.background="rgba(0,0,0,0.2)";
    
    navHomeButton.style.background='';
    navNewFormButton.style.background='rgba(00,00,00,0.7)'
}
function toggleExpYears(flag){
    if( flag ){
        document.querySelector('#cv-experience-years').disabled=false;
        document.querySelector('#cv-experience-years').style.background="rgba(0,0,0,0)";
    }
    else {
        document.querySelector('#cv-experience-years').disabled=true;
        document.querySelector('#cv-experience-years').style.background="rgba(0,0,0,0.1)";
    }
}

function navigatePage(pageName){
    if(pageName === 'home' ){
        showHomeOnly()
    }
    else if(pageName === 'addNew') {
        showNewFormOnly()
    }
}

function getUsers () {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    fetch('http://localhost:8000/all').then(resp=>resp.json())
    .then(resp=>{
        userArr = resp.users;
        displayUsers()
    })
}
const displayUsers = ( ) =>{
    homeContents.innerHTML = userArr.length===0? 'No Users Found' :  `<div class='d-flex flex-wrap' >
            ${userArr.map((user)=> card(user) )}
        </div>
        `
}
const filterUsers = ( ) => {
    console.log('filter')
    const str = ''
    console.log('OldLen:',userArr.length)

    const searchValue = document.querySelector('#search-input').value;
    const filterArr = userArr.filter((user )=> (user.fname.trim().toLowerCase().includes(searchValue.trim().toLowerCase()) || user.lname.trim().toLowerCase().includes(searchValue.trim().toLowerCase()) || user.skillset.trim().toLowerCase().includes(searchValue.trim().toLowerCase())) )
    console.log('Len:',filterArr.length)
    homeContents.innerHTML = filterArr.length===0? 'No Users Found' : `<div class='d-flex flex-wrap' >
            ${filterArr.map((user)=> card(user) )}
        </div>
        `
}

function getEducationObj(){
    const grade10_score = document.querySelector('#cv-ed-10').value
    const grade10_max = document.querySelector('#cv-ed-max-10').value
    const grade10_yr = document.querySelector('#cv-yr-10').value
    const grade12_score = document.querySelector('#cv-ed-12').value
    const grade12_max = document.querySelector('#cv-ed-max-12').value
    const grade12_yr = document.querySelector('#cv-yr-12').value
    const deg_score = document.querySelector('#cv-ed-deg').value
    const deg_max = document.querySelector('#cv-ed-max-deg').value
    const deg_yr = document.querySelector('#cv-yr-deg').value
    return {grade10_score,grade10_max,grade10_yr,grade12_score,grade12_max,grade12_yr,deg_score,deg_max,deg_yr}
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function submitFormData(){
    // event.preventDefault();
    const fname = document.querySelector('#cv-fname').value;
    const lname = document.querySelector('#cv-lname').value;
    const email = document.querySelector('#cv-email').value;
    const dob = document.querySelector('#cv-dob').value;
    const phone = document.querySelector('#cv-phone').value;
    const emailCheck = validateEmail(email)
    if(fname==="" || lname==="" || email==="" || dob==="" || phone==="" || !emailCheck) return; 
    const about = document.querySelector('#cv-about').value;
    const hobbies = document.querySelector('#cv-hobbies').value;
    const strengths = document.querySelector('#cv-strengths').value;
    const weaknesses = document.querySelector('#cv-weaknesses').value;
    let rbs = document.querySelectorAll('input[name="gender"]');
    let gender;
    for (const rb of rbs) {
        // console.log('check',rb.value,rb.checked)
        if (rb.checked) {
            gender = rb.value;
            break;            
        }
    }
    const education = getEducationObj();



    rbs = document.querySelectorAll('input[name="experience-flag"]');
    let experienceFlag ;
    for (const rb of rbs) {
        // console.log('check',rb.value,rb.checked)
        if (rb.checked) {
            experienceFlag = rb.value;
            break;            
        }
    }
    // console.log('gender',typeof experienceFlag)
    experienceFlag = experienceFlag==='yes'
    let experienceYears = document.querySelector('#cv-experience-years').value;
    experienceYears = experienceYears===""? 0 : Number.parseInt(experienceYears)
    const languages = document.querySelector('#cv-languages').value;
    const skillset = document.querySelector('#cv-skillset').value;
    const tempNumber = getTemplateID();
    let bodyObj = {fname,lname,email,phone,dob,gender,education,experienceFlag,about,hobbies,skillset,languages,strengths,weaknesses,tempNumber}
    if(experienceFlag) bodyObj = {...bodyObj,experienceYears}
    fetch('http://localhost:8000/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({...bodyObj})
    })
    .then(resp=>resp.json())
    .then((item)=>{
        console.log('ITEM:',item)
        document.querySelector('#addNew').reset();
    })
    console.log('SUBMIT')
}

const getTemplateID = () => {
    const rbs = document.querySelectorAll('input[name="template"]');
    let tempNumber ;
    for (const rb of rbs) 
        if (rb.checked) {
            tempNumber = rb.value;
            break;            
        }
    return Number.parseInt(tempNumber);
}



// const enlargePic = (tempNo) => {
//     document.querySelector(`#${tempNo}`).style.height="1000px"
// }


// .......---------------------------------------........TEMPLATES...........-------------------------................



const template1 = (user) =>{
    console.log("TEMP1 USER",user)
    const {fname,lname,email,phone,dob,gender,education,experienceFlag,about,hobbies,skillset,languages,strengths,weaknesses} = user
    return `
    <div class="d-inline-flex cv-container " >
    <div class="bg-temp-1l pl-5 pr-2 text-right  w-25" >
       <div class="margin-y-bar">
           <hr>
           ${email}  <img class="rounded-circle my-1 py-1 icon-logo" src="https://wendycturgeon.org/wp-content/uploads/2017/10/ios9-mail-app-icon-left-wrap.png"  alt="">
            <br>
            ${phone} <img class="rounded-circle my-1 py-1 icon-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4Aa7Ov4fUO_xcdTXn40xyn4GVDluysDSR8w&usqp=CAU"  alt="">
            <hr>
       </div>
    </div>
    <div class="bg-temp-1r w-75">
       <div class="display-3 temp1-head">${fname+" "+lname}</div>
       <hr>
       <div>
           <h3 class="cv-headings"> About </h3>
           <div class="cv-content">
               ${about}
            </div>   
        </div>
       <hr>
       <div>
            <h3 class="cv-headings"> Education :</h3>
            <div class="d-flex">
                <div class="px-3 h6">
                    <div class="p-1 h5">Study:</div>
                    <hr class="m-0 p-0">
                    <div class="p-1">Degree (or equivalent):</div>
                    <div class="p-1">12th Grade(or equivalent):</div>
                    <div class="p-1">10th Grade(or equivalent):</div>
                </div>
                <div class="px-3 h6">
                    <div class="p-1 h5"> Marks/Max </div>
                    <hr class="m-0 p-0">
                    <div class="p-1"> ${education.grade10_score+" / "+education.grade10_max} </div>
                    <div class="p-1"> ${education.grade12_score+" / "+education.grade12_max}</div>
                    <div class="p-1"> ${education.deg_score+" / "+education.deg_max}:</div>
                </div>
                <div class="px-3 h6">
                    <div class="p-1 h5"> Year Completed </div>
                    <hr class="m-0 p-0">
                    <div class="p-1"> ${education.grade10_yr}</div>
                    <div class="p-1"> ${education.grade10_yr}</div>
                    <div class="p-1"> ${education.grade10_yr}</div>
                </div>
            </div>
        </div>
       <hr>
       <div>
            <h3 class="cv-headings"> Details :</h3>
            <div class="p-3 cv-content">
                <div class="p-2"> <span class="font-weight-bold"> Gender  : </span>   ${gender.substring(0,1).toUpperCase()+gender.substring(1)} </div>
                <div class="p-2"> <span class="font-weight-bold"> D.O.B  : </span>  ${dob}</div>
                <div class="p-2"> <span class="font-weight-bold"> Experience  : </span>  ${experienceFlag==0?"Fresher":`${user.experienceYears} years`}</div>
                <div class="p-2"> <span class="font-weight-bold"> Technical Skills  : </span>  ${skillset}</div>
                <div class="p-2"> <span class="font-weight-bold"> Languages known  : </span> ${languages} </div>
                <div class="p-2"> <span class="font-weight-bold">  Strengths : </span> ${strengths}  </div>
                <div class="p-2"> <span class="font-weight-bold">  Weaknesses : </span> ${weaknesses} </div>
                <div class="p-2"> <span class="font-weight-bold"> Hobbies  : </span> ${hobbies} </div>
       </div>
       <br>
       <hr>
       <br>
       <div class="p-4">
          <span class="font11 font-weight-bold">Declaration :</span>  <div class="text-left dancing-script font16" >  I  hereby declare that all the information furnished above is true to the best of my belief.” “I do hereby declare that the above particulars of facts and information stated are true, correct and complete to the best of my belief and knowledge.</div> 
       <br> <div class="text-right p-4">____________________________________</div>
        </div>

    </div>
</div>
    `

}


const template2 = ( user ) => {
    console.log("TEMP2 USER",user);
    const {fname,lname,email,phone,dob,gender,education,experienceFlag,about,hobbies,skillset,languages,strengths,weaknesses} = user
    return `
     <div class="d-inline-flex cv-container " >
        <div class="bg-temp-2l pl-5 pr-2 text-right  w-25" >
            <div class="margin-y-bar">
                <hr>
                ${email}  <img class="rounded-circle my-1 py-1 icon-logo" src="https://wendycturgeon.org/wp-content/uploads/2017/10/ios9-mail-app-icon-left-wrap.png"  alt="">
                <br>
                ${phone} <img class="rounded-circle my-1 py-1 icon-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4Aa7Ov4fUO_xcdTXn40xyn4GVDluysDSR8w&usqp=CAU"  alt="">
                <hr>
            </div>
        </div>
        <div class="bg-temp-2r w-75">
            <div class="display-3 ">${fname+" "+lname}</div>
            <hr>
            <div>
                <h3 class="cv-headings"> About </h3>
                <div class="cv-content">
                   ${about}
                 </div>   
            </div>
            <hr>
            <div>
                <h3 class="cv-headings"> Education :</h3>
                <div class="d-flex">
                    <div class="px-3 h6">
                        <div class="p-1 h5">Study:</div>
                        <hr class="m-0 p-0">
                        <div class="p-1">Degree (or equivalent):</div>
                        <div class="p-1">12th Grade(or equivalent):</div>
                        <div class="p-1">10th Grade(or equivalent):</div>
                    </div>
                    <div class="px-3 h6">
                        <div class="p-1 h5"> Marks/Max </div>
                        <hr class="m-0 p-0">
                        <div class="p-1"> ${education.grade10_score+" / "+education.grade10_max} </div>
                        <div class="p-1"> ${education.grade12_score+" / "+education.grade12_max}</div>
                        <div class="p-1"> ${education.deg_score+" / "+education.deg_max}:</div>
                    </div>
                    <div class="px-3 h6">
                        <div class="p-1 h5"> Year Completed </div>
                        <hr class="m-0 p-0">
                        <div class="p-1"> ${education.grade10_yr}</div>
                        <div class="p-1"> ${education.grade10_yr}</div>
                        <div class="p-1"> ${education.grade10_yr}</div>
                    </div>
                </div>
            </div>
            <hr>
            <div>
                <h3 class="cv-headings"> Details :</h3>
                <div class="p-3 cv-content">
                    <div class="border border-secondary p-1"> <span class="font-weight-bold"> Gender  : </span>   ${gender.substring(0,1).toUpperCase()+gender.substring(1)} </div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold"> D.O.B  : </span>  ${dob} </div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold"> Experience  : </span>  ${experienceFlag==0?"Fresher":`${user.experienceYears} years`}</div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold"> Technical Skills  : </span>  ${skillset} </div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold"> Languages known  : </span> ${languages} </div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold">  Strengths : </span> ${strengths}  </div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold">  Weaknesses : </span>  ${weaknesses} </div>
                    <div class="border border-secondary p-1"> <span class="font-weight-bold"> Hobbies  : </span> ${hobbies} </div>
            </div>
            <br>
            <hr>
            <br>
            <div class="p-4">
               <span class="font11 font-weight-bold ">Declaration :</span>  <div class="text-left dancing-script font16" >  I  hereby declare that all the information furnished above is true to the best of my belief.” “I do hereby declare that the above particulars of facts and information stated are true, correct and complete to the best of my belief and knowledge.</div> 
                <br><div class="text-right p-4">____________________________________</div>
            </div>
        </div>
    </div>`
}


// .......---------------------------------------........TEMPLATES...........-------------------------................