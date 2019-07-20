const homepageModel = require("./homepageModel");
describe("homepage", () => {
	it("should return correct data 1", () => {
		let output = "Hai Bui";
		expect(output).toEqual(homepageModel.title);
	});
});