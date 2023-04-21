window.onbeforeunload = function () {
  document.getElementById("code").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("number").value = "";
  document.getElementById("email").value = "";
  document.getElementById("code-es").value = "";
  document.getElementById("fname-es").value = "";
  document.getElementById("number-es").value = "";
  document.getElementById("email-es").value = "";

  // const test1 = document.getElementsByClassName("area-lang-es");
  // test1.style.display = "none";
};

// function onPageLoad() {
//   document.getElementById("card-sucess").style.display = "block";

//   const test = document.getElementsByClassName("area-lang-es");
//   test.style.display = "none";
// }

async function onSubmit(event) {
  event.preventDefault();
  var codecheck = document.getElementById("code").value;
  if (codecheck != "") {
    var code = document.getElementById("code").value;
    var name = document.getElementById("fname").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
  } else if (codecheck == "") {
    var code = document.getElementById("code-es").value;
    var name = document.getElementById("fname-es").value;
    var number = document.getElementById("number-es").value;
    var email = document.getElementById("email-es").value;
  }
  console.log("code", code);

  const mailData = {
    code: code,
    name: name,
    number: number,
    email: email
  };

  await fetch('/.netlify/functions/mail-log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mailData)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

  if (code !== "") {
    var url = "https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/";

    fetch(url + code).then((response) => {
      console.log(response.status);
      if (response.status === 404) {
        var errorElement = document.getElementById("card-errors3");
        errorElement.textContent = "Invalid Code";
        errorElement.style.display = "block";
        document.getElementById("code").focus();
        document.getElementById("code-es").focus();
      } else if (response.status === 200) {
        response.json().then((data) => {
          // var { fistName, middleName, lastName, fullName } = getNames(name);
          localStorage.setItem("data", JSON.stringify(data));
          window.location.href = "form.html";
        });
      }
    });
  } else {
    var fnamecheck = document.getElementById("fname").value;
    if (fnamecheck != "") {
      var fname = document.getElementById("fname").value;
      var { fistName, middleName, lastName, fullName } = getNames(fname);
      var phone = document.getElementById("number").value;
      var email = document.getElementById("email").value;
    } else if (fnamecheck == "") {
      var fname = document.getElementById("fname-es").value;
      var { fistName, middleName, lastName, fullName } = getNames(fname);
      var phone = document.getElementById("number-es").value;
      var email = document.getElementById("email-es").value;
    }

    //var postid = generateRandomString(5);
    if (email == "") {
      var errorElement = document.getElementById("card-errors");
      errorElement.textContent = "email is required*";
      errorElement.style.display = "block";
      return;
    }
    else {
      var user = {
        first_name: fistName,
        middle_name: middleName,
        last_name: lastName,
        combined_name_field: fullName,
        user_email: email,
        user_phone: phone,
      };
    }
    // alert(JSON.stringify(user))
    //console.log(JSON.stringify(user));

    var url =
      "https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/createLeads";

    if (url) {
      fetch(url, {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      })

        .then((res) => {
          if (res.status === 201) {
            return res.json();
          } else if (res.status === 200) {
            window.location.href = "form.html";
          }
        })
        .then((data) => {
          localStorage.setItem("userDataNew", JSON.stringify(data));
          //console.log("This saved in>>", data)
          setTimeout(() => {
            const box = document.getElementById("form-submit-after");
            const boxes = document.getElementById("form-submit-after-es");
            const selectedlan = document.getElementById("lnname").value;
            const selectedlansm = document.getElementById("lnsmname").value;
            //console.log("This valeu", selectedlan)

            // 👇️ removes element from DOM
            if (selectedlan == "es" || selectedlansm == "es") {
              boxes.style.display = "block";
            } else {
              box.style.display = "block";
            }


            const dissapermesg = document.getElementById(
              "form-submit-getstatred"
            );
            dissapermesg.style.display = "none";
            const myTimeout = setTimeout(msgDisplay, 4000);
            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
          }, 5000); // 👈️ time in milliseconds

        });
    }
  }
}

function msgDisplay() {
  const disbox = document.getElementById("form-submit-after");
  disbox.style.display = "none";
  const disboxes = document.getElementById("form-submit-after-es");
  disboxes.style.display = "none";

  //Form Area
  const dissapermesgshow = document.getElementById("form-submit-getstatred");
  dissapermesgshow.style.display = "block";
  const mailerromsg = document.getElementById("card-errors");
  mailerromsg.style.display = "none";
  document.getElementById("code").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("number").value = "";
  document.getElementById("email").value = "";
  document.getElementById("code-es").value = "";
  document.getElementById("fname-es").value = "";
  document.getElementById("number-es").value = "";
  document.getElementById("email-es").value = "";
  window.location.href = "index.html";
}

function generateRandomString(length) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function getNames(fullName) {
  var fistName = "";
  var middleName = "";
  var lastName = "";
  var names = fullName.split(" ");
  console.log(names);
  if (names.length === 1) {
    fistName = names[0];
    middleName = "";
    lastName = "";
  }
  if (names.length === 2) {
    fistName = names[0];
    middleName = "";
    lastName = names[1];
  }
  if (names.length > 2) {
    fistName = names[0];
    middleName = names[1];
    lastName = names[names.length - 1];
  }
  return { fistName, middleName, lastName, fullName };
}

function showMe() {
  console.log("test");
}
