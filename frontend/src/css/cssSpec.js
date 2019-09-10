const css = require("./css");

describe("css", () => {
	describe("getFileContent", () => {
		it("should return correct __data 1", () => {
			let output = css.getFileContent("./assets/css/ifarmer-homepage.css");
			expect(15).toEqual(output.length);
		});
	});
});