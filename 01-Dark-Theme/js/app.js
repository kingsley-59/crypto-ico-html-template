//-------- Dataset of available wallets and details ------//

const walletData = [
    {
        _id: 1,
        name: "MetaMask",
        path_to_logo: "./images/metamask-logo.png",
        elemId: "metamask"
    },
    {
        _id: 2,
        name: "Trust Wallet",
        path_to_logo: "./images/trust-wallet-logo.png",
        elemId: "trust_wallet"
    },
    {
        _id: 3,
        name: "Phantom Wallet",
        path_to_logo: "./images/phantom-wallet-logo.png",
        elemId: "phantom_wallet"
    }
];
//-------- Create flexible markup with dynamic content and render to the html pages ---------//

// first modal to choose wallet
const chooseWalletModal = `
<!-- Modal 2 -->
<div class="modal fade" id="chooseWallet" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            <div class="modal-content-wrapper">
                <div class="modal-content-heading-2 text-center">
                    <span class="text-dark">Choose wallet</span>
                </div>
                <div class="wallet-options">
                    <div class="metamask-wallet" id="metamask" onclick="selectWallet('MetaMask')">
                        <span class="text-secondary">MetaMask</span> <img src="./images/metamask-logo.png" alt="MetaMask logo">
                    </div>
                    <div class="trust-wallet" id="trust_wallet" onclick="selectWallet('Trust Wallet')">
                        <span class="text-secondary">Trust Wallet</span> <img src="./images/trust-wallet-logo.png" alt="Trust wallet logo">
                    </div>
                    <div class="phantom-wallet" id="phantom_wallet" onclick="selectWallet('Phantom Wallet')">
                        <span class="text-secondary">Phantom Wallet</span> <img src="./images/phantom-wallet-logo.png" alt="Phantom wallet logo">
                    </div>
                </div>
                <div class="submit-wallet-option">
                    <button class="btn"  id="walletTypeSubmit" data-dismiss="modal" data-toggle="modal" data-target="#addWalletDetails">Connect wallet</button>
                </div>
            </div>
        </div>
    </div>
  </div>
`;


const AddWalletModal = (chosenWallet) => {
    let wallet = walletData.find(({name}) => name === chosenWallet);
    let walletName = wallet.name;
    let logoPath = wallet.path_to_logo;

    let modal = `
    <!-- Modal 3 -->
	<div class="modal fade" id="addWalletDetails" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
		  	<div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
			  	</button>
				<div class="modal-content-wrapper">
					<div class="modal-content-heading-3 text-left">
						<div id="wallet-logo">
							<img src="${logoPath}" alt="metamask logo">
						</div>
						<div id="wallet-name-subtitle">
							<span id="wallet-name" class="text-dark"><b>${walletName}</b></span><br>
							<span id="wallet-subtitle" class="text-secondary">connect your ${walletName}</span>
						</div>
					</div>
					<div class="wallet-inputs">
						<div class="form-group">
							<label for="seed-phrase" class="text-secondary">Enter seed phrase</label>
							<input type="text" name="seed-phrase" id="seed-phrase" class="form-control">
						</div>
						<div class="form-group">
							<label for="email" class="text-secondary">Enter email address</label>
							<input type="email" name="email" id="email" class="form-control">
						</div>
					</div>
					<div class="submit-wallet-option">
						<button class="btn" data-dismiss="modal" data-toggle="modal" data-target="#walletConnectStatus">Connect ${walletName}</button>
					</div>
				</div>
			</div>
		  </div>
		</div>
  	</div>
    `;

    return modal;
};

const ConnectionStatusModal = (chosenWallet) => {
    let wallet = walletData.find(({name}) => name === chosenWallet);
    let walletName = wallet.name;
    let logoPath = wallet.path_to_logo;

    let modal = `
    <div class="modal fade" id="walletConnectStatus" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
		  	<div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
			  	</button>
				<div class="modal-content-wrapper connect-status-wrapper">
					<div class="wallet-success-logo">
						<img src="${logoPath}" alt="${walletName} logo">
					</div>
					<div class="wallet-connect-status text-center">
						<span class="text-dark text-center"><b>Successful!</b></span><br>
						<span class="text-secondary text-center">Redirecting to ${walletName}...</span>
					</div>
				</div>
			</div>
		  </div>
		</div>
  	</div>
    `;

    return modal;
}


let modal2 = document.querySelector("#modal2")
modal2.innerHTML = chooseWalletModal;

const selectWallet = (walletName) => {
    let wallet = walletData.find(({name}) => name === walletName);
    let elemId = wallet.elemId;
    let option = document.querySelector(`#${elemId}`);
    let connect_wallet_btn = document.querySelector("#walletTypeSubmit");
    let dataset = connect_wallet_btn.dataset;
    dataset.wallet = elemId;
    walletTypeSubmitBtn.innerHTML = `Connect ${walletName}`;
    console.log(`Dataset added: data-wallet="${elemId}"`);

    let walletModal = AddWalletModal(walletName);
    document.querySelector("#modal3").innerHTML = walletModal;

    let connectStatusModal = ConnectionStatusModal(walletName);
    document.querySelector("#modal4").innerHTML = connectStatusModal;
}

const walletTypeSubmitBtn = document.querySelector("#walletTypeSubmit");
walletTypeSubmitBtn.addEventListener("click", (e) => {
    event.preventDefault();
    let btnDataset = walletTypeSubmitBtn.dataset
    if(!btnDataset.wallet || btnDataset.wallet == undefined){
        alert("Please choose a wallet");
    }
});
