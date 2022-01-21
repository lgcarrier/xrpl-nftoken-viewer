const xrpl = require('xrpl');

const config = require('../../config/config');

const IPFSGatewayTools = require('@pinata/ipfs-gateway-tools/dist/node');
const gatewayTools = new IPFSGatewayTools();

function formatConvertedGatewayUrl(nftoken) {
	const uri = xrpl.convertHexToString(nftoken.URI);
	const uriCID = gatewayTools.containsCID(uri);
	if (uriCID.containsCid) {
		const sourceUrl = uri;
		const desiredGatewayPrefix = config.ipfs.desiredGatewayPrefix;
		nftoken.convertedGatewayUrl = gatewayTools.convertToDesiredGateway(sourceUrl, desiredGatewayPrefix);
	}

	return nftoken;
}

//***************************
//** Get Tokens *************
//***************************
module.exports = {
	getTokens: async function (walletClassicAddress) {
		if (xrpl.isValidClassicAddress(walletClassicAddress)) {
			const client = new xrpl.Client(config.server.address)
			await client.connect()
			console.log("Connected to Sandbox")
			var nftokens = await client.request({
				method: "account_nfts",
				account: walletClassicAddress
			})
			console.log(nftokens);

			nftokens.result.account_nfts = nftokens.result.account_nfts.map(formatConvertedGatewayUrl);

			// for (const nft of nfts.result.account_nfts) {
			// 	const uri = xrpl.convertHexToString(nft.URI);
			// 	console.log(uri);

			// 	const uriCID = gatewayTools.containsCID(uri);
			// 	if (uriCID.containsCid) {
			// 		const sourceUrl = uri;
			// 		const desiredGatewayPrefix = config.ipfs.desiredGatewayPrefix;
			// 		const convertedGatewayUrl = gatewayTools.convertToDesiredGateway(sourceUrl, desiredGatewayPrefix);
			// 		console.log(`IPFS Gateway: ${convertedGatewayUrl}`);
			// 	}
			// }

			client.disconnect();

			return nftokens;

		} else {
			return null;
		}

	} //End of getTokens
}