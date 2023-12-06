"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = ` 
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((string) => string[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  //Display summary
  calcDisplaySummary(currentAccount);
};

// Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  console.log(amount);
  console.log(recieverAcc);

  if (
    currentAccount.balance >= amount &&
    recieverAcc &&
    amount > 0 &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //Add the movement

    currentAccount.movements.push(amount);

    //Update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  );
  {
    const index = accounts.findIndex(
      (acc) => acc.username === inputCloseUsername.value
    );

    // Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
// SLICE creates a shallow copy of an array
console.log(arr.slice(2)); 
console.log(arr.slice(-2)); 
console.log(arr.slice(2, 4)); 
console.log(arr.slice(2, -2)); 
console.log(arr.slice()); 
console.log([...arr]);

// SPLICE mutates original array
arr.splice(1, 2);
console.log(arr);
arr.splice(2)
console.log(arr);

// REVERSE also mutates original array

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT doesn't mutate the original array

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN 
console.log(letters.join(' - '));


// AT method

const arr = [23, 11, 64];
 console.log(arr[0]);
 console.log(arr.at(0));

 // getting last array element with old method
 console.log(arr[arr.length -1]);
 console.log(arr.slice(-1)[0]);

 console.log(arr.at(-1));

 console.log('Daniel'.at(4));


// LOOPING ARRAYS forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('------FOREACH--------');
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
} })
;
// 0: function(200)
// 1: function(450)
// 2: function(400)


//Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
})

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
  
})

//Coding Challange #1

const checkDogs = function (dogsJulia, dogsKate) {
  const copyJuliasArray = dogsJulia.slice(1, -2);
  const fullArray = [...copyJuliasArray, ...dogsKate];
  console.log(fullArray);
  fullArray.forEach(function (dog, i) {
    const adultOrChild = dog <= 3 ? 'Puppy' : 'Adult';
    const string = `Dog number ${i + 1} is ${adultOrChild} and is ${dog} years old`;
    console.log(string);
  });
};
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


//----------Data Transformation: map, filter, reduce-----

//The Map Method


const eurToUsd = 1.1;
// Regular function
const movmentsUsd = movements.map(function (mov) {
  return Math.trunc(mov * eurToUsd);
});

// Arrow function
const movementUSD = movements.map(mov => mov * eurToUsd);

console.log(movementUSD);
// console.log(movmentsUsd);
// console.log(movements);

// For of loop
const movementsUSDfor = [];

for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementDescriptions = movements.map((mov, i, arr) => {
  {
    if (mov > 0) {
      return `Movement ${i + 1}: You deposited ${mov}`;
    } else {
      return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
    }
  }
});
console.log(movementDescriptions);

// #The filter method

const deposits = movements.filter(function(mov) {
  return mov > 0;
})

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if(mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawal = movements.filter(mov => mov < 
  0 )
console.log(withdrawal);


// The reduce Method
console.log(movements);
//accumulator is like a snowball
//  const balance = movements.reduce(function(acc, curr, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + curr;
//  }, 0)

const balance = movements.reduce((acc, curr) => acc + curr, 0);

console.log(balance);

let money = 0;
for (const mov of movements) {
  money += mov;
}
console.log(money);

// Maximum value
const max = movements.reduce(
  (acc, curr) => (acc > curr ? acc : curr) 
);

console.log(max);




  const adultDogs = dogsTohumanArr.filter(dogsAge => dogsAge >= 18);

  const avg =
    adultDogs.reduce(function (acc, dogsAge) {
      return acc + dogsAge;
    }) / adultDogs.length;

  return avg;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
// if(dogsAge <= 2) {
//   const humanAge = 2 * dogsAge;
// }
// else if (dogsAge > 2 && dogsAge < 18) {
//   const humanAge = 16 + dogsAge * 4;
// }


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// To see array in between the steps for example between filter and map method. You have to pass an array argument to map method an consol log it.

const totalDeposistsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov);
console.log(totalDeposistsUSD);

const calcAverageHumanAge = ages =>
  ages
    .map(dogsAge => (dogsAge <= 2 ? 2 * dogsAge : 16 + dogsAge * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => 
      acc + age/arr.length
    );

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));


//-------- THE FIND METHOD-------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const firstWithdrawal = movements.find( mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


for (const acc of accounts) {
  acc.owner === 'Jessica Davis' && console.log(acc);
}
*/
//-----------  SOME AND EVERY -----------
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
// Looks for EQUALITY IN ARRAY
console.log(movements.includes(-130));
// Looks for CONDITION in array
const anyDeposits = movements.some((mov) => mov > 5000);
console.log(anyDeposits);

//---- EVERY -----
console.log(movements.every(mov => mov >0));


//Seperate callback

const deposit = mov => mov>0;
console.log(account4.movements.every(deposit));
