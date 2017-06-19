function calculatePrice(weight, type){
	var prices;
	switch (type) {
		case 'stamp':
			prices = {
				1: 0.49,
				2: 0.70,
				3: 0.91,
				3.5: 1.12
			}
		break;
		case 'meter':
			prices = {
				1:   0.46,
				2:   0.67,
				3:   0.88,
				3.5: 1.09
			}
		break;
		case 'flat':
			prices = {
				1: 0.98,
				2: 1.19,
				3: 1.40,
				4: 1.61,
				5: 1.82,
				6: 2.03,
				7:  2.24,
				8:  2.45,
				9:  2.66,
				10: 2.87,
				11: 3.08,
				12: 3.29,
				13: 3.50
			}
		break;
		case 'parcel':
			prices = {
				4:  2.67,
				5:  2.85,
				6:  3.03,
				7:  3.21,
				8:  3.39,
				9:  3.57,
				10: 3.75,
				11: 3.93,
				12: 4.11,
				13: 4.29
			}
		break;
	}
	console.log(weight);
	for (var key in prices){
		if (weight < parseFloat(key))
			return prices[key];
	}
	return "This item is too heavy for this category";
}

module.exports.calculatePrice = calculatePrice;