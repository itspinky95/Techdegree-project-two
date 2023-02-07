/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
console.log(data);


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   // create two variables which will represent the index for the first and last student on the page
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   // select the element with a class of `student-list` and assign it to a variable
   const studentList = document.querySelector('.student-list');

   // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = '';

   // loop over the length of the `list` parameter
   for (let i = 0; i < list.length; i++) {
      // inside the loop create a conditional to display the proper students
      // inside the conditional:
      if (i >= startIndex && i < endIndex) {

         // create the elements needed to display the student information
         // insert the above elements
         const student = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;
         // insert the above elements
         studentList.insertAdjacentHTML('beforeend', student);
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / 9);
   // select the element with a class of `link-list` and assign it to a variable
   const linkList = document.querySelector('.link-list');
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = '';
   // loop over the number of pages needed
   for (let i = 1; i <= numOfPages; i++) {
     // create the elements needed to display the pagination button
     // insert the above elements
       const button = `
         <li>
            <button type="button">${i}</button>
         </li>
         `;
         linkList.insertAdjacentHTML('beforeend', button);
   }
   // select the first pagination button
   const firstButton = document.querySelector('button');
   firstButton.className = 'active';
   // set the `active` class on the first pagination button
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const activeButton = document.querySelector('.active');
         activeButton.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
}

// Call functions

showPage(data, 1);
addPagination(data);
search(data);

/*
Create the `search` function
This function will take user input and search the elements in the list
*/

function search(list) {
   const header = document.querySelector('.header');
   const search = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   header.insertAdjacentHTML('beforeend', search);
   const searchInput = document.querySelector('#search');
   const searchButton = document.querySelector('button');
   searchButton.addEventListener('click', () => {
      const searchValue = searchInput.value.toLowerCase();
      const searchList = [];
      for (let i = 0; i < list.length; i++) {
         const name = `${list[i].name.first} ${list[i].name.last}`;
         if (name.toLowerCase().includes(searchValue)) {
            searchList.push(list[i]);
         }
      }
      showPage(searchList, 1);
      addPagination(searchList);
   });
}


