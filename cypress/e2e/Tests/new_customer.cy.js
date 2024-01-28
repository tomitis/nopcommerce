describe('adding a new customer', () => {

    beforeEach(() => {
        cy.login();
    })

    // it.skip('loging in to the website', () => {
    //   cy.login();
    // })
    

    it('adding a new user', () => {

        // cy.login();
        // cy.fixture('dropdown_ele').then((data) => {
        //     const expectedOptions = data.options;

        //     cy.get('a.nav-link').contains('Customer').click().then((options) => {
        //         // const actualOptions = options.map(option => option.text().trim());
        //         console.log(options);
        //     })


        cy.get('a.nav-link').contains('Customer').click({ force: true }).contains('Customers').click({ force: true });
        cy.get('.fa').click();
        cy.get('a.nav-link').contains('Customer').click();
        cy.get('.menu-is-opening > .nav > :nth-child(1) > .nav-link > p').click();
        cy.get('a.btn-primary').contains('Add new').click();
        cy.fixture('new_customer').then((data) => {
            cy.get('#Email').type(data.email);
            cy.get('#Password').type(data.email);
            cy.get('#FirstName').type(data.firstName);
            cy.get('#LastName').type(data.lastName);
            cy.get('input[type="radio"]').check(data.gender).should('be.checked');
            cy.get('#DateOfBirth').type(data.dob);
            cy.get('input[type="checkbox"]').check();
            cy.get('#SelectedCustomerRoleIds_listbox>li').each(($el, index, $list) => {
                    // $el is a wrapped jQuery element
                    if ($el.text() === data.role) {
                      // wrap this element so we can
                      // use cypress commands on it
                      cy.wrap($el).click({force: true})
                    }})

            cy.get('button[name="save"]').click();

        })

    }) 
        

    it('searching the added user', () => {
            // cy.login();
            cy.get('a.nav-link').contains('Customer').click({ force: true }).contains('Customers').click({ force: true });
            cy.get('.fa').click();
            cy.get('a.nav-link').contains('Customer').click();
            cy.get('.menu-is-opening > .nav > :nth-child(1) > .nav-link > p').click();
            cy.get('#search-customers').should('be.visible');
            cy.fixture('search_customer').then((data) => {
                if(data.search_by == "email"){
                    cy.get('#SearchEmail').type(data.email);
                    cy.get('#search-customers').click();
                }else{
                    cy.get('#SearchFirstName').type(data.first_name);
                    cy.get('#search-customers').click();
                }

                cy.get('.odd>td').should('contain',data.email);
           })

    })

})