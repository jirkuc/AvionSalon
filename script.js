'use strict';

let totalPrice = 0;
let ticketPrice = 0;
let ticketBudget = 0;

let ticketClassPriceIncrease = 1.0;

let ticketBudgetFilledIn = false;

const asDestination = document.getElementById('as-destination');
const asPieces = document.getElementById('as-pcs');
const asWayBackChb = document.getElementById('as-way-back-checkbox');
let WayBackBackChbValue = 1;

const asPriceCalculationBtn = document.getElementById(
  'as-price-calculation-btn'
);
const asPriceCalculationResult = document.getElementById(
  'as-price-calculation-result'
);

const ticketClass = document.querySelector('.as-class');

const asTicketBudgetValue = document.getElementById('as-ticket-budget');
const asTicketBudgetValidationResult = document.getElementById(
  'as-price-validation-result'
);
const asTicketBudgetBtn = document.getElementById('as-ticket-budget-btn');

const asNote = document.getElementById('as-note');
const asNoteValidationResult = document.getElementById(
  'as-note-validation-result'
);

const calculateTotalPrice = () => {
  let asMessage = '';
  totalPrice =
    parseInt(asDestination.value) *
    parseInt(asPieces.value) *
    ticketClassPriceIncrease;
  if (asWayBackChb.checked) {
    totalPrice *= 2;
  }
  asMessage = `Výsledná částka: ${totalPrice} Kč`;
  asPriceCalculationResult.textContent = asMessage;
  asTicketBudgetValidationResult.textContent = '';
};

calculateTotalPrice();

const calculateTicketBudget = () => {
  ticketBudget = parseInt(asTicketBudgetValue.value);
  let asBudgetMessage = '';

  let asBudgetMessageClass = '';

  let asPriceDifference = totalPrice - ticketBudget;
  if (asPriceDifference > 0) {
    asBudgetMessage = `Rozpočet na letenku není dostatečný, chybí ${Math.abs(
      asPriceDifference
    )} Kč.`;
    asBudgetMessageClass = 'text-danger fw-bolder px-1';
  } else if (asPriceDifference < 0) {
    asBudgetMessage = `Rozpočet na letenku je dostatečný, zbude ${Math.abs(
      asPriceDifference
    )} Kč.`;
    asBudgetMessageClass = 'text-success fw-medium px-1';
  } else {
    asBudgetMessage = 'Máte to tak akorát, nezbude nic.';
    asBudgetMessageClass = 'text-warning fw-semibold px-1';
  }
  asTicketBudgetValidationResult.textContent = asBudgetMessage;
  asTicketBudgetValidationResult.setAttribute('class', asBudgetMessageClass);
};

const verifyTicketBudget = () => {
  if (asTicketBudgetValue.value && totalPrice > 0) {
    ticketBudgetFilledIn = true;
    asTicketBudgetBtn.removeAttribute('disabled');
  } else {
    ticketBudgetFilledIn = false;
    asTicketBudgetBtn.setAttribute('disabled', true);
  }
  if (asTicketBudgetValue.value === '') {
    asTicketBudgetValidationResult.textContent = '';
  }
};

asDestination.addEventListener('change', function () {
  calculateTotalPrice();
  verifyTicketBudget();
});

asPieces.addEventListener('change', function () {
  calculateTotalPrice();
  verifyTicketBudget();
});

asWayBackChb.addEventListener('change', function () {
  calculateTotalPrice();
  verifyTicketBudget();
});

ticketClass.addEventListener('change', function (event) {
  ticketClassPriceIncrease = parseFloat(event.target.value);
  calculateTotalPrice();
  verifyTicketBudget();
});

asTicketBudgetValue.addEventListener('input', function () {
  verifyTicketBudget();
});

asTicketBudgetBtn.addEventListener('click', function () {
  calculateTicketBudget();
});

asNote.addEventListener('input', function () {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
  let validationMessage = '';
  let validationMessageClass = '';
  let validationFieldValue = asNote.value;

  if (!asNote.value) {
    asNoteValidationResult.textContent = '';
  } else if (specialCharPattern.test(validationFieldValue)) {
    validationMessage = 'Pole není v pořádku';
    validationMessageClass = 'text-danger fw-bolder px-1';
  } else {
    validationMessage = 'Pole je v pořádku';
    validationMessageClass = 'text-success fw-medium px-1';
  }
  asNoteValidationResult.textContent = validationMessage;
  asNoteValidationResult.setAttribute('class', validationMessageClass);
});
