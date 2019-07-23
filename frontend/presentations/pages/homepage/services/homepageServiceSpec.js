const homepageService = require("./homepageService");

describe("homepageService", () => {
	describe("prepareData", () => {
		it("should return correct data 1", () => {
			let title = "Hai Bui";
			let data = homepageService.prepareData();
			expect(title).toEqual(data.title);
		});
	});
});