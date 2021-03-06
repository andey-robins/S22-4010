const PayFor = artifacts.require("PayFor");

/*
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PayFor", function (accounts) {
	let payfor;

	beforeEach(async () => {
		payfor = await PayFor.new();
	});

	it("should be able to create a product SKU #8 and #10, selling for 2 and 4 WEI", async function() {
		// await payfor.setProductPrice( 8, 2 );
		let ok = await payfor.setProductPrice( 8, 2 ).then((result) => {
			// Look for event in transaction receipt
			console.log ( "result=", result );
			for (var i = 0; i < result.logs.length; i++) {
				var log = result.logs[i];
				if (log.event == "SetProductPrice") {
					let sku = log.args.product.toNumber();
					let minPrice = log.args.minPrice.toNumber();
					console.log('Product SKU=', sku);
					assert.equal(sku, 8, "Expected SKU == 8.");
					console.log('Product Price=', minPrice);
					assert.equal(minPrice, 2, "Expected Price == 2.")
					return ( sku == 8 && minPrice == 2 );
				}
			}
		});
		assert.equal(ok, true, "Expected to create SKU #8.");
		await payfor.setProductPrice( 10, 4 );
		assert.equal(await payfor.getNSKU(), 2, "Expected to have 2 products setup.");
		return assert.isTrue(true);
	});
	//it("should be have 2 products setup", async function() {
		// assert.equal((await payfor.getNSKU()).toNumber(), 2, "Expected to have 2 products setup.");
		// assert.equal(await payfor.getNSKU(), 2, "Expected to have 2 products setup.");
	//	return assert.isTrue(true);
	//});

});
