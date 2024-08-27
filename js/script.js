const nameSelect = document.getElementById('name');
nameSelect.focus();

const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOption = color.children;

const activity = document.getElementById('activities');
const activityCost = document.getElementById('activities-cost');

const paymentSelect = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');

const eMail = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cVV = document.getElementById('cvv');
const formElement = document.getElementById('form');

const activitiesCheckbox = activities.querySelectorAll('input[type="checkbox"]');

//other job role will be hidden by default and show when 'other' is picked
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    if(e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//disable color option by default
color.disabled = true;

//selected design will show corresponding color of the shirt
design.addEventListener('change', () => {
    //design selecting will enable color option
    color.disabled = false;

    //loop through the color options, enable / disable corresponding design. data-theme and design value will be matched
    for(let i = 0; i < colorOption.length; i++) {
        const designSelected = design.value;
        const colorChoice = colorOption[i].getAttribute('data-theme');

        if(designSelected !== colorChoice) {
            colorOption[i].hidden = true;
            colorOption[i].disabled = true;
          } else {
            colorOption[i].hidden = false;
            colorOption[i].disabled = false;
          }

    }
});

//total will hold data-cost number value when checkbox is checked. Add or subtract from the toal value
let total = 0;
activity.addEventListener('change', (e) => {
    const dataCost = e.target.getAttribute('data-cost');
    if(e.target.checked) {
        total += +dataCost;
    } else {
        total -= +dataCost;
    }
    activityCost.innerHTML = `Total: $${total}`;
});

//hide paypal and bitcoin description by default
//when credit card is selected, hide paypal and bitcoin. When other is picked then it's the other way around by set to block and none
payPal.style.display = 'none';
bitCoin.style.display = 'none';
payment.children[1].setAttribute('selected', true);
paymentSelect.addEventListener('change', (e) => {
    if(e.target.value === 'credit-card') {
        creditCard.style.display = 'block';
        payPal.style.display = 'none';
        bitCoin.style.display = 'none';
    } else if(e.target.value === 'paypal') {
        payPal.style.display = 'block';
        creditCard.style.display = 'none';
        bitCoin.style.display = 'none';
    } else if(e.target.value === 'bitcoin') {
        bitCoin.style.display = 'block';
        creditCard.style.display = 'none';
        payPal.style.display = 'none';
    }
});

//trigger when the form is submitted.
formElement.addEventListener('submit', (e) => {
    //basic Regex value for testing 
    const isValidName = /./g.test(nameSelect.value);
    const isValidEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(eMail.value);
    const isValidCard = /^\d{13,16}$/.test(cardNum.value);
    const isValidZip = /^\d{5}$/.test(zipCode.value);
    const isValidCVV = /^\d{3}$/.test(cVV.value);

    //if regex value works, then display that it works. If not, show that input is not a valid input.
    let nameValidation = true;
    if (!isValidName) {
        nameSelect.parentElement.classList.add('not-valid');
        nameSelect.parentElement.classList.remove('valid');
        nameSelect.parentElement.lastElementChild.style.display = 'block';
        nameValidation = false;
    } else {
        nameSelect.parentElement.classList.add('valid');
        nameSelect.parentElement.classList.remove('not-valid');
        nameSelect.parentElement.lastElementChild.style.display = 'none';
    };

    if (!isValidEmail) {
        eMail.parentElement.classList.add('not-valid');
        eMail.parentElement.classList.remove('valid');
        eMail.parentElement.lastElementChild.style.display = 'block';
        nameValidation = false;
    } else {
        eMail.parentElement.classList.add('valid');
        eMail.parentElement.classList.remove('not-valid');
        eMail.parentElement.lastElementChild.style.display = 'none';
    };

    //To check if at least one checkbox is selected
    let activeValidation = false;
    for (let i of activitiesCheckbox) {
        if (i.checked) {
            activeValidation = true;
            break;
        };
    }

    if (!activeValidation) {
        activity.classList.add('not-valid');
        activity.classList.remove('valid');
        activity.lastElementChild.style.display = 'block';
    } else {
        activity.classList.add('valid');
        activity.classList.remove('not-valid');
        activity.lastElementChild.style.display = 'none';
    };

    //When credit card is selected, card values need input
    let creditValidation = true;
    if (payment.value === 'credit-card') {
        if (!isValidCard) {
            cardNum.parentElement.classList.add('not-valid');
            cardNum.parentElement.classList.remove('valid');
            cardNum.parentElement.lastElementChild.style.display = 'block';
            creditValidation = false;
        } else {
            cardNum.parentElement.classList.add('valid');
            cardNum.parentElement.classList.remove('not-valid');
            cardNum.parentElement.lastElementChild.style.display = 'none';
        };

        if (!isValidZip) {
            zipCode.parentElement.classList.add('not-valid');
            zipCode.parentElement.classList.remove('valid');
            zipCode.parentElement.lastElementChild.style.display = 'block';
            creditValidation = false;
        } else {
            zipCode.parentElement.classList.add('valid');
            zipCode.parentElement.classList.remove('not-valid');
            zipCode.parentElement.lastElementChild.style.display = 'none';
        };

        if (!isValidCVV) {
            cVV.parentElement.classList.add('not-valid');
            cVV.parentElement.classList.remove('valid');
            cVV.parentElement.lastElementChild.style.display = 'block';
            creditValidation = false;
        } else {
            cVV.parentElement.classList.add('valid');
            cVV.parentElement.classList.remove('not-valid');
            cVV.parentElement.lastElementChild.style.display = 'none';
        };
    };

    if (!(nameValidation && activeValidation && creditValidation)) {
        e.preventDefault();
    }

});

//decorate activity checkbox for better view
for (let i of activitiesCheckbox) {
    i.addEventListener('focus', (e) => {
        i.parentElement.classList.add('focus');
    })
    i.addEventListener('blur', (e) => {
        i.parentElement.classList.remove('focus');
    })
};
