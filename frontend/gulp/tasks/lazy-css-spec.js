const lazyCSS = require("./lazy-css");
const simpleInput =  `<div 
        style="    position: relative;
    border-radius: 50px" class="relative bg-white h50 b-mercury pr55"></div>`;
const complexInput = `<div
        style="    position: relative;
    background-color: #ffffff;
    height: 50px;
    border: 1px solid #e4e4e4;
    padding-right: 55px;
    border-radius: 50px" class="relative bg-white h50 b-mercury pr55">
    <form action="#">
        <input style="    border: none;
    width: 95%;
    line-height: 20px;
    margin-top: 15px;
    margin-left: 24px;
    color: #a4a4a4;"
               type="text" placeholder="Search your product">
        <button style="position: absolute;
    right: 5px;
    top: 5px;
    background: none;
    border: none;
    background-color: #80bb01;
    color: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;">
            <amp-img src="/assets/images/icon-phone.png" width="20" height="20"></amp-img></button>
    </form>
</div>`;
describe("lazyCSS", () => {
    describe("getStyles", () => {
        it("should return single style in str", async () => {
            let input = simpleInput;
            let output = await lazyCSS.getStyles(input);
            expect(1).toEqual(output.length);
            expect(6).toEqual(output[0].length);
        });
        it("should return multi styles in str", async () => {

            let input = complexInput;
            let output = await lazyCSS.getStyles(input);
            console.log(output);
            expect(3).toEqual(output.length);
            expect(6).toEqual(output[0].length);
        });
    });

    describe("createBaseClasses", () => {
        it("should return correct data", async () => {
            let input = [
                'padding: 2rem;'
            ];

            let output = lazyCSS.createBaseClasses(input);
            console.log(output);
            expect('padding-2rem').toEqual(output['padding-2rem'].className);
            expect('padding: 2rem;').toEqual(output['padding-2rem'].property);
        });
        it("should return correct data", async () => {
            let input = complexInput;

            let output = await lazyCSS.getStyles(input);
            output = lazyCSS.createBaseClasses(output[0]);
            expect('position-relative').toEqual(output['position-relative'].className);
            expect('position: relative').toEqual(output['position-relative'].property);
        });
    });
    describe("parseStyles", () => {
        it("should return correct data", async () => {
            let input = simpleInput;
            let output = await lazyCSS.parseStyles(input);
            console.log(output);
            expect('padding-right-55px').toEqual(output['padding-right-55px'].className);
        });
    });
    describe("generateClasses", () => {
        it("should return correct data", async () => {
            let input = complexInput;
            let output = await lazyCSS.generateClasses(input);
            console.log(output);
            console.log(output['padding']);
            expect(3).toEqual(output['padding'].length);
        });
        it("should return correct data", async () => {
            let input = `<div class="relative bg-white h50 b-mercury pr55 "
        style="    position: relative;
    background-color: #ffffff;
    height: 50px;
    border: 1px solid #e4e4e4;
    padding-right: 55px;
    padding-left: 55px;
    border-radius: 50px">
</div>`;
            let output = await lazyCSS.generateClasses(input);
            // console.log(output);
            expect('position-relative').toEqual(output['position'][0].className);
        });
    });
    describe("generateCSSFiles", () => {
        it("should return correct data", async () => {
            let input =complexInput;
            let generate = lazyCSS.generateCSSFiles("./resources/styles/base-css/custom-css/");
            await generate(input);

        });
        it("should return correct data", async () => {
            let input =simpleInput;
            let generate = lazyCSS.generateCSSFiles("./resources/styles/base-css/custom-css/");
            const data = await generate(input);
            console.log(data);

        });
    });
    describe("processView", () => {
        it("should return correct data", async () => {
            let input =simpleInput;
            // console.log(input);
            // const data = await lazyCSS.processView(input);
            // console.log(data);
        });
    });
});
