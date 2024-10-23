let stopSimulation = false; // Added to control stopping the simulation

document.getElementById("startSimulation").addEventListener("click", function () {
    const password = document.getElementById("passwordInput").value;
    const speed = parseInt(document.getElementById("speedSlider").value);
    const useLowercase = document.getElementById("lowercase").checked;
    const useUppercase = document.getElementById("uppercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSpecial = document.getElementById("special").checked;

    if (!password) {
        alert("Please enter a password!");
        return;
    }

    // Build the charset
    let charset = '';
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSpecial) charset += '!@#$%^&*';

    if (charset === '') {
        alert("Please select at least one character set!");
        return;
    }

    let attempts = 0;
    let currentAttempt = '';
    let startTime = Date.now();
    stopSimulation = false; // Reset stop flag

    const bruteForce = () => {
        if (stopSimulation) {
            document.getElementById("results").innerHTML = `<p style="color: yellow;">Simulation stopped after ${attempts} attempts</p>`;
            return;
        }

        if (currentAttempt === password) {
            const timeTaken = (Date.now() - startTime) / 1000;
            document.getElementById("results").innerHTML = `
                <p>Password found: <strong style="color: green;">${currentAttempt}</strong></p>
                <p>Attempts: <strong style="color: green;">${attempts}</strong></p>
                <p>Time taken: <strong style="color: green;">${timeTaken} seconds</strong></p>
            `;

            // Pop up an alert when the password is found
            alert(`Password found: ${currentAttempt} in ${timeTaken} seconds!`);
            return;
        }

        attempts++;
        currentAttempt = generateNextAttempt(charset, currentAttempt);

        // Update results for real-time feedback
        document.getElementById("results").innerHTML = `
            <p>Trying: ${currentAttempt}</p>
            <p>Attempts: ${attempts}</p>
        `;

        // Slow down the simulation based on speed
        setTimeout(bruteForce, 1000 / speed);
    };

    const generateNextAttempt = (charset, currentAttempt) => {
        if (currentAttempt === '') {
            return charset[0];
        }

        let attemptArray = currentAttempt.split('');
        for (let i = attemptArray.length - 1; i >= 0; i--) {
            let charIndex = charset.indexOf(attemptArray[i]);
            if (charIndex < charset.length - 1) {
                attemptArray[i] = charset[charIndex + 1];
                return attemptArray.join('');
            }
            attemptArray[i] = charset[0];
        }

        return charset[0].repeat(currentAttempt.length + 1);
    };

    // Start the brute force process
    bruteForce();
});

// Stop Simulation button event listener
document.getElementById("stopSimulation").addEventListener("click", function () {
    stopSimulation = true;
});
