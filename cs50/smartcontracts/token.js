let web3 = new Web3(
  "https://speedy-nodes-nyc.moralis.io/3434030b45c0d0a0f25a80cf/bsc/testnet"
);

async function blocknumber() {
  let blcknmbr = await web3.eth.getBlockNumber();
}
blocknumber();

let metacheck = false;

function walletcheck() {
  if (window.ethereum) {
  } else if (window.ethereum == undefined) {
    window.location.assign("/metamask");
  }
}

async function walletCheck() {
  window.ethereum.enable();
}

async function load() {
  if (metacheck != true) {
    await loadweb3();
    window.contract = await loadContract();
  }
}

async function loadweb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    const acc = await tokencheck();
    window.ethereum
      .enable()
      .then((accpt) => {
        function getAccounts() {
          setTimeout(async function () {
            const accounts = await window.web3.eth.getAccounts();
            console.log(accounts);
            const balanceOf = await window.contract.methods
              .balanceOf(accounts[0])
              .call();
            console.log(balanceOf);
            if (balanceOf < window.web3.utils.toWei("10")) {
              metacheck = true;
              window.location.assign("/");
            } else if (balanceOf >= window.web3.utils.toWei("10")) {
              metacheck = true;
              window.location.assign("/mood");
            }
          }, 200);
        }
        getAccounts();
      })
      .catch((error) => {
        window.location.assign("/metamask"); // avaz shod az 404/metamask.html
      });
  } else if (window.ethereum == undefined) {
    window.location.assign("/metamask");
  }
}

async function loadContract() {
  return await new window.web3.eth.Contract(
    [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "Bought",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Received",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "Sold",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_remAdmin",
            type: "address",
          },
        ],
        name: "remAdmin",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_newAdmin",
            type: "address",
          },
        ],
        name: "setAdmin",
        type: "event",
      },
      {
        inputs: [],
        name: "BNBbalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "_balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "admin",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_add",
            type: "address",
          },
        ],
        name: "adminCheck",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_add",
            type: "address",
          },
          {
            internalType: "bool",
            name: "_value",
            type: "bool",
          },
        ],
        name: "adminsMan",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "remaining",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "allowed",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "sell",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address payable",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "sendBNB",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenbal",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
    "0xD4a15e68e31DF3295b253884133FeD8f1Fe5b7F0"
  );
}

function tokencheck() {
  var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(window.ethereum._state.accounts);
    }, 100);
  });
  return promise;
}

async function checkkonm() {
  const acc = await tokencheck();
  async function getAccounts() {
    window.web3 = new Web3(window.ethereum);
    window.contract = await loadContract();
    setTimeout(async function () {
      const accounts = await window.web3.eth.getAccounts();
      console.log(accounts[0]);
      const balanceOf = await window.contract.methods
        .balanceOf(accounts[0])
        .call();
      console.log(balanceOf);
    }, 100);
  }
  getAccounts();
  console.log(acc[0]);
  if (acc[0] != undefined) {
    document.getElementById("walt-btn").innerText = "اتصال برقرار است";
  }
}

async function checkkon() {
  if (window.ethereum == undefined) {
    window.location.assign("/metamask");
  }
  const acc = await tokencheck();
  if (acc.length == 0) {
    window.location.assign("/metamask");
  } else if (acc.length != 0) {
    async function getAccounts() {
      window.web3 = new Web3(window.ethereum);
      window.contract = await loadContract();
      setTimeout(async function () {
        const accounts = await window.web3.eth.getAccounts();
        const balanceOf = await window.contract.methods
          .balanceOf(accounts[0])
          .call();
        if (balanceOf < web3.utils.toWei("10")) {
          metacheck = true;
          window.location.assign("/");
        }

        // document.getElementById("walt-btn").innerText =
        //   web3.utils.fromWei(balanceOf);

        document.getElementById("walt-btn").innerText =
          web3.utils.fromWei(balanceOf);
        document.querySelector(".logo").style.opacity = "1";
        document.getElementById("walt-btn").addEventListener("mouseout", () => {
          document.getElementById("walt-btn").style.opacity = "0";
          document.querySelector(".logo").style.opacity = "1";
          setTimeout(() => {
            document.getElementById("walt-btn").innerText =
              web3.utils.fromWei(balanceOf);
            document.getElementById("walt-btn").style.opacity = "1";
          }, 500);
        });
        document
          .getElementById("walt-btn")
          .addEventListener("mouseover", () => {
            document.getElementById("walt-btn").style.opacity = "0";
            document.querySelector(".logo").style.opacity = "0";
            setTimeout(() => {
              document.getElementById("walt-btn").innerText = acc[0];
              document.getElementById("walt-btn").style.opacity = "1";
            }, 500);
          });
      }, 100);
    }
    getAccounts();
    //document.getElementById('walt-btn').innerText = acc[0] ; in addreso mizare
  }
}

async function setAdmin() {
  let addrs = document.querySelector("#address-add").value;
  console.log(addrs);
  window.web3 = new Web3(window.ethereum);
  const accounts = await window.web3.eth.getAccounts();
  console.log(accounts);
  window.contract = await loadContract();
  let txid = await window.contract.methods
    .adminsMan(addrs, true)
    .send({ from: accounts[0] })
    .then(function (res) {
      console.log(res);
      document.getElementById("resualt-add").innerHTML =
        "Success: " +
        res.transactionHash +
        ", blockHash: " +
        res.blockHash +
        ", blockNumber: " +
        res.blockNumber;
    });
}

async function remAdmin() {
  let addrs = document.querySelector("#address-rem").value;
  console.log(addrs);
  window.web3 = new Web3(window.ethereum);
  const accounts = await window.web3.eth.getAccounts();
  window.contract = await loadContract();
  let txid = await window.contract.methods
    .adminsMan(addrs, false)
    .send({ from: accounts[0] })
    .then(function (res) {
      document.getElementById("resualt-rem").innerHTML =
        "Success: " +
        res.transactionHash +
        ", blockHash: " +
        res.blockHash +
        ", blockNumber: " +
        res.blockNumber;
    });
}

async function _adminCheck() {
  let addrs = document.querySelector("#adminCheck").value;
  window.web3 = new Web3(window.ethereum);
  window.contract = await loadContract();
  setTimeout(async function () {
    const adminStatus = await window.contract.methods.adminCheck(addrs).call();
    document.getElementById("resualt-admin").innerHTML =
      "Resualt: " + adminStatus;
  }, 100);
}

async function bnbBalance() {
  window.web3 = new Web3(window.ethereum);
  window.contract = await loadContract();
  const accounts = await window.web3.eth.getAccounts();
  setTimeout(async function () {
    const balance = await window.contract.methods
      .BNBbalance()
      .call({ from: accounts[0] });
    const balanCe = await window.web3.utils.fromWei(balance);
    document.getElementById("resualt-bnbBal").innerHTML =
      "Resualt: " + balanCe + " BNB";
  }, 100);
}

async function sendbnb() {
  window.web3 = new Web3(window.ethereum);
  let addr = document.querySelector("#toAddrss").value;
  let value = document.querySelector("#value").value;
  let vaLue = window.web3.utils.toWei(value);
  window.contract = await loadContract();
  const accounts = await window.web3.eth.getAccounts();
  const bnbsend = await window.contract.methods
    .sendBNB(addr, vaLue)
    .send({ from: accounts[0] })
    .then(function (res) {
      document.getElementById("resualt-sendbnb").innerHTML =
        "Success: " +
        res.transactionHash +
        ", blockHash: " +
        res.blockHash +
        ", blockNumber: " +
        res.blockNumber;
    });
}

async function adminCheck() {
  if (window.ethereum == undefined) {
    window.location.assign("/metamask");
  } else {
    const acc = await tokencheck();
    if (acc.length == 0) {
      window.location.assign("/metamask");
    } else if (acc.length != 0) {
      async function getAccounts() {
        window.web3 = new Web3(window.ethereum);
        window.contract = await loadContract();
        setTimeout(async function () {
          const accounts = await window.web3.eth.getAccounts();
          const adminStatus = await window.contract.methods
            .adminCheck(accounts[0])
            .call();
          if (adminStatus == true) {
          } else if (adminStatus == false) {
            window.location.assign("/nopermision");
          }
        }, 100);
      }
      getAccounts();
    }
  }
}