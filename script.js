function getAllCustomers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers",
        success: function (customers) {
            console.log(customers);
            let content = "";
            for (let i = 0; i < customers.length; i++) {
                content += `
                <tr>
                    <td>${customers[i].id}</td>
                    <td>${customers[i].firstName}</td>
                    <td>${customers[i].lastName}</td>
                    <td><button onclick="deleteCustomerByID(${customers[i].id})">Del</button></td>
                </tr>
                `
            }
            document.getElementById("content").innerHTML = content;
        }
    })
}

getAllCustomers();

function addNewCustomer() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("last").value;
    let newCustomer = {
        "firstName": firstName,
        "lastName": lastName
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data: JSON.stringify(newCustomer),
        type: "POST",
        url: "http://localhost:8080/customers/create",
        success: function () {
            alert("Customer created");
            getAllCustomers();
        }
    })
    event.preventDefault();
}

function deleteCustomerByID(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/customers/delete/" + id,
        success: function() {
            alert("Customer deleted successfully");
            getAllCustomers();
        }
    })

}