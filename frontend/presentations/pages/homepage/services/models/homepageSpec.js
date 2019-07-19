const homepageModel = require("./homepageModel");

describe("homepage", () => {
	fit("should return correct data 1", () => {
		let output = "Hai Bui";
		expect(output).toEqual(homepageModel.title);
	});
});