const homepageService = require("./homepageService");

describe("homepageService", () => {
	describe("buildData", () => {
		it("should return correct data 1", () => {
			let title = "Hai Bui";
			let data = homepageService.buildData();
			expect(title).toEqual(data.title);
		});
	});
});