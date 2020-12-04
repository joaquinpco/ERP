import { browser, element, by } from "protractor";

describe("Login", () => {
    
    beforeAll(()=>{
        browser.get('/login');
    });

    it("Input type username and password displayed are empties", () => {
        expect(element(by.name("email")).getText()).toBe('');
        expect(element(by.name("password")).getText()).toBe('');
    });

    it("Should Find the button", () => {
        let button = element(by.tagName("ion-button"));
        button.click();

        browser.wait(function() {
            return browser.isElementPresent(by.css(".alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md"));
        }, 5000);
    });

});


