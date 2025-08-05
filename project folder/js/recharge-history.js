 const history = JSON.parse(localStorage.getItem("rechargeHistory")) || [];
      const container = document.getElementById("historyContainer");

      if (history.length === 0) {
        container.innerHTML = `<p class="text-center">No recharge records found.</p>`;
      } else {
        history.reverse().forEach((entry, index) => {
          const card = document.createElement("div");
          card.className = "col-md-6";
          card.innerHTML = `
          <div class="card border-info">
            <div class="card-body">
              <h5> ${entry.number}</h5>
              <p> Amount: Rs ${entry.amount}</p>
              <p> Time: ${entry.time}</p>
              <p> Txn ID: ${entry.txnId}</p>
            </div>
          </div>
        `;
          container.appendChild(card);
        });
      }