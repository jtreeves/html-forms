const init = function() {
    document.getElementById('button-cancel').addEventListener('click', reset)
    document.getElementById('button-send').addEventListener('click', send)
};

const reset = function(ev) {
    // HTML will automatically return to original state, unless we do this:
    ev.preventDefault();
    // We can reset it programatically:
    document.getElementById('form-user').reset();
    // If you want it to do anything else, you could put that here as well
    location.reload();
    return false;
};

const validate = function() {
    // Create validation variables:
    let valid = false; // We didn't end up using this Boolean, although we could have implemented it somehow
    let failures = [];
    
    // Create elements from the DOM:
    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const age = document.getElementById('input-age'); // .selectedIndex, .options
    const checkbox = document.getElementById('input-alive'); // .checked, .value

    // Logic for first:
    if (!first.value) {
        failures.push({input: 'input-first', msg: 'Required field'})
    }
    // Logic for password:
    if (!password.value || password.value.length < 8) {
        failures.push({input: 'input-password', msg: 'Must be at least 8 characters'})
    }
    // Logic for email:
    if (!email.value || !email.value.includes('@')) {
        failures.push({input: 'input-email', msg: 'Required field'})
    }
    // Logic for age:
    if (age.selectedIndex === 0) {
        failures.push({input: 'input-age', msg: 'Too young...'})
    }
    // Logic for checkbox:
    if (!checkbox.checked) {
        failures.push({input: 'input-alive', msg: 'Must be alive to submit form'});
    }

    // Output the created array:
    return failures;
};

const send = function(ev) {
    ev.preventDefault();
    ev.stopPropagation(); // Stops it from bubbling up to any parents, when it comes to the effect of the click

    // Create variable to access previous function:
    let fails = validate();

    // Logic for error messages:
    if (fails.length === 0) {
        // No failures, so good to go, so submit it:
        document.getElementById('form-user').submit();
    } else {
        // There were failures, so bad user, and need to display the failures in messages:
        fails.forEach(obj => {
            const field = document.getElementById(obj.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg);
        })
    }
};

document.addEventListener('DOMContentLoaded', init);