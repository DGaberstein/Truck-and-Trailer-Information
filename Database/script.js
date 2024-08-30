document.getElementById('infoForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get values from the form fields
    const truckID = document.getElementById('truckID').value;
    const trailerID = document.getElementById('trailerID').value;
    const username = document.getElementById('username').value;

    // Format the information for email
    const emailContent = `
        Truck Information:
        ID: ${truckID}
        
        Trailer/Carriage Information:
        ID: ${trailerID}
        
        User Information:
        Username: ${username}
    `;
    
    // Display the information
    document.getElementById('infoOutput').textContent = emailContent;

    // Send the data to the server
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipient: 'gaberd@amazon.com',
            subject: 'Truck and Trailer Information',
            message: emailContent
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Information submitted successfully!');
        } else {
            alert('Failed to submit information.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });

    // Optionally, you can clear the form fields after submission
    document.getElementById('infoForm').reset();
});
