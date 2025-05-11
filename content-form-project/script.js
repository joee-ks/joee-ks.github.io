function calculate() {
    // Grab input values
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100; // convert % to decimal
    const years = parseFloat(document.getElementById("years").value);
    const interestType = document.querySelector('input[name="interestType"]:checked').value;
  
    // Validate inputs
    if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
      document.getElementById("result").textContent = "Please enter valid numbers in all fields.";
      return;
    }
  
    let finalAmount;
  
    if (interestType === "simple") {
      // Simple Interest formula
      finalAmount = amount + (amount * rate * years);
    } else {
      // Compound Interest formula
      finalAmount = amount * Math.pow((1 + rate), years);
    }
  
    // Format as currency
    finalAmount = finalAmount.toFixed(2);
  
    // Display result
    document.getElementById("result").textContent = `After ${years} year(s), you'll have $${finalAmount}`;
  }
  