// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let saveButton = $('.saveBtn');
let timeBlock = $('.time-block');
let description = $('.description');
let currentHour = moment().hour();
let currentDay = moment().format('dddd, MMMM Do YYYY');
let currentDayClass = $('#currentDay')
let workHours = [];
let container = $('.container');
let pText;

currentDayClass.text(currentDay);




function createWorkHours() {
  $(document).ready(function() {

// Set times from 6 AM to 5 PM in a for loop, and create a new row, new Div, new Paragraph, and new Button for each section, and add appropriate classes.
for (i = 6; i <= 17; i++) {
 //workHours += dayjs(i).format('h A')


  workHours = [moment().hour(i).format('h A')];


  newRow = $('<section>').attr('class', 'row time-block').attr({id: (i)});

  newDiv = $('<div>').attr('class', 'col-2 col-md-1 hour text-center py-3').attr({id: 'div-' + i})

  newParagraph = $('<textarea>').attr('class', 'col-8 col-md-10 description border border-dark').attr('rows', '3').attr({id: 'pgraph-' + (i)}).text('');

  newButton = $('<button>').attr('class', 'btn saveBtn col-2 col-md-1').attr('aria-label', 'save').attr({id: 'button-' + i});

  newI = $('<i>').attr('class', 'fas fa-upload fa-2x').attr({id: 'icon-' + (i)});

  // Add all of those elements to the DOM

  container.append(newRow);
  newRow.append(newDiv)
  newRow.append(newParagraph);
  newRow.append(newButton);
  newDiv.append(workHours)
  newButton.append(newI)

  // Get the RowID to use for if statements

  const rowID = parseInt($(newRow).attr('id'));

  //Determine if the current hour is in the past, present, or future, and apply correct Div.

  if (currentHour > rowID) {
    newParagraph.addClass('past')
} else if (currentHour < rowID) {
    newParagraph.addClass('future') 
} else {
    newParagraph.addClass('present')
  
}

// Retrieve the user input from local storage, and place it in the textarea field.

const inputVal = localStorage.getItem('button-' + i);
newParagraph.val(inputVal)

}

})
}


createWorkHours(); 

//Listen for button click on any .saveBtn on the page, and save it to storage.

container.on('click', ".saveBtn", function (e) {

  // Stores the unique ID and text into storage
  let buttonId = $(this).attr('id')
  pText = $(this).prev().val()
  localStorage.setItem(buttonId, (pText))
  e.preventDefault();
})
