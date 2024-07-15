let transactions;
async function getCustomersData() {
  const api = await fetch("test.json");
  const response = await api.json();

  const customers = response.customers;
  transactions = response.transactions;

  displayData(customers, transactions);
}

getCustomersData();

function displayData(customers, transactions) {
  let content = ``;

  for (let i = 0; i < transactions.length; i++) {
    customers.map((e) => {
      if (e.id == transactions[i].customer_id) {
        transactions[i].name = e.name;
      }
    });
    content += `
                <tr>
                  <td>${transactions[i].customer_id}</td>
                  <td>${transactions[i].name}</td>
                  <td>${transactions[i].date}</td>
                  <td>${transactions[i].amount}</td>
                </tr>
  `;
  }

  document.getElementById("content").innerHTML = content;
}
let arr = [];
function searchName(name) {
  arr = [];
  let content = ``;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].name.toLowerCase().includes(name.toLowerCase())) {
      arr.push(transactions[i]);

      content += `
                <tr>
                  <td>${transactions[i].customer_id}</td>
                  <td>${transactions[i].name}</td>
                  <td>${transactions[i].date}</td>
                  <td>${transactions[i].amount}</td>
                </tr>

      `;
    } else if (name.toLowerCase() == "all") {
      content += `
                <tr>
                  <td>${transactions[i].customer_id}</td>
                  <td>${transactions[i].name}</td>
                  <td>${transactions[i].date}</td>
                  <td>${transactions[i].amount}</td>
                </tr>
      `;
    }
  }

  document.getElementById("content").innerHTML = content;

  chart(arr);
}

function chart(arr) {
  let chartStatus = Chart.getChart("myChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: arr.map((el) => el.date),
      datasets: [
        {
          label: "the Amount",
          data: arr.map((el) => el.amount),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

chart(arr);

function searchByAmount(amount) {
  let content = ``;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].amount == amount) {
      content += `
                <tr>
                  <td>${transactions[i].customer_id}</td>
                  <td>${transactions[i].name}</td>
                  <td>${transactions[i].date}</td>
                  <td>${transactions[i].amount}</td>
                </tr>

      `;
    } else if(amount == "") {
      content += `
      <tr>
        <td>${transactions[i].customer_id}</td>
        <td>${transactions[i].name}</td>
        <td>${transactions[i].date}</td>
        <td>${transactions[i].amount}</td>
      </tr>

`;
    }
  }
  document.getElementById("content").innerHTML = content;
}
