document.getElementById('social-links').style.height = document.getElementById('form').style.height;

if(!warningText){
    const warningText = document.getElementById('warningText');
}
// (function () {
emailjs.init({ publicKey: "5URnjRTaqY-Z-GN0P" });  // Replace with your EmailJS user ID
// })();

function sendEnquiry(){
    const studentName = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const parentName = document.getElementById('parent-name').value;
    const phoneNumber = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const enquiry = document.getElementById('enquiry').value;

    // Check if any field is empty
    if (!studentName || !age || !parentName || !phoneNumber || !email || !enquiry) {
        warningText.innerHTML = "*Please fill all fields before submitting.";
        return;
    } 
    else {
        warningText.innerHTML = "&nbsp;";
    }

    // Prepare email content
    const templateParams = {
        studentName,
        age,
        parentName,
        phoneNumber,
        email,
        enquiry
    };

    emailjs.send("service_oojrdwi", "template_4jx2our", templateParams)
        .then(response => {
            alert('Email sent successfully!');
        }, error => {
            alert('Error sending email');
        });

    // Clear form after submission
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('parent-name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('enquiry').value = '';
}

document.getElementById('form').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        sendEnquiry();
    }
});

// Detect if it's mobile/tablet
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Handle click
try{
    document.getElementById('social-links').addEventListener('click', (event) => {
        const clickedElement = event.target.closest('.social-links');
        if (clickedElement) {
            const id = clickedElement.id;
            let url = links[id];
            if (id === 'whatsapp') {
                // url = isMobileDevice() ? links.whatsappMobile : links.whatsappDesktop;
                url = links.whatsappMobile;
            }
            window.open(url, '_blank');
        }
    });
}
catch(error){
    console.log(error);
}