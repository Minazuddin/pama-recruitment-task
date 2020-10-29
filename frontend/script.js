const submitHandler = (e) => {
    e.preventDefault();

    //fetch the form data values
    const formData = {
        first_name: document.getElementById("name").value,
        last_name: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        contact_number: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        interested_in: interestedIn(),
        qualification: document.getElementById("edu").value,
        company: document.getElementById("com").value,
        designation: document.getElementById("des").value,
        from: document.getElementById("fro").value,
        to: document.getElementById("to").value,
        last_month_sal: document.getElementById("sal1").value,
        expected_monthly_sal: document.getElementById("sal2").value,
        possible_month_of_joining: document.getElementById("jon").value,
        additional_info: document.getElementById("inf").value,
        resume: document.getElementById("exampleFormControlFile1").files[0],
        photo: document.getElementById("exampleFormControlFile2").files[0]
    } 

    //fetch the checked radio button
    function interestedIn() {
        var radios = document.getElementsByClassName("form-check-input");
        for(let radio of radios) {
            if(radio.checked) {
                return document.getElementById(radio.id).value;
            }
        }
    }

     //create an instance of form data object
      var myFormData = new FormData();

      //append the form data name and values
      myFormData.append('first_name', formData.first_name);
      myFormData.append('last_name', formData.last_name);
      myFormData.append('email', formData.email);
      myFormData.append('contact_number', formData.contact_number);
      myFormData.append('dob', formData.dob);
      myFormData.append('interested_in', formData.interested_in);
      myFormData.append('qualification', formData.qualification);
      myFormData.append('company', formData.company);
      myFormData.append('designation', formData.designation);
      myFormData.append('from', formData.from);
      myFormData.append('to', formData.to);
      myFormData.append('last_month_sal', formData.last_month_sal);
      myFormData.append('expected_monthly_sal', formData.expected_monthly_sal);
      myFormData.append('possible_month_of_joining', formData.possible_month_of_joining);
      myFormData.append('additional_info', formData.additional_info);
      myFormData.append('resume', formData.resume);
      myFormData.append('photo', formData.photo);
    
      //fetch api with post method---form submission
      fetch("http://localhost:5000/contact-us", {
          method: "POST",
          headers: {
          },
          body: myFormData
      })
      .then(response => response.json())
      .then(data => {
        alert(`${data.message}`);
        location.reload();
      })
}