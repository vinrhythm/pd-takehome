/**
 * Author: Vinit Patel
 * Title: PD Challange
 * Description: Add T-Shirts to cart and complete the purchase
 */

/// <reference types="cypress" />
const BASE_URL = "https://www.saucedemo.com/";

context("Checkout Test", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("Buy Tshirts", () => {
    /**
     * STEP 1 - LOGIN
     */
    // Fill the credentials
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");

    // Click the Login Button
    cy.get('[data-test="login-button"]').click();

    //Wait for Redirection
    cy.url().should("contain", "/inventory.html");

    const inventoryItems = cy.get(".inventory_item").each((inventoryItem) => {
      const description = inventoryItem.find(".inventory_item_desc").text();
      if (description.toLowerCase().includes("t-shirt")) {
        inventoryItem.find(".btn_primary").click();
      }
    });

    // Go to the cart
    cy.get(".shopping_cart_link").click();

    // Wait for Cart to Load
    cy.url().should("contain", "/cart.html");

    // Click Checkout
    cy.get('[data-test="checkout"]').click();

    // Fill in the details
    cy.get('[data-test="firstName"]').type("FirstName");
    cy.get('[data-test="lastName"]').type("LastName");
    cy.get('[data-test="postalCode"]').type("10022");

    cy.get('[data-test="continue"]').click();

    cy.url().should("contain", "/checkout-step-two.html");

    // Click Finish
    cy.get('[data-test="finish"]').click();

    // redirect to success page
    cy.url().should("contain", "/checkout-complete.html");

    // Wait added to view success page for Demo. Should be removed for final script
    cy.wait(5000);
  });
});
