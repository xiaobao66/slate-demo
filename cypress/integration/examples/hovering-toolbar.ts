describe('hovering toolbar example', () => {
  beforeEach(() => {
    cy.visit('examples/hovering-toolbar')
  })

  it('hovering toolbar appears', () => {
    cy.get('div')
      .eq(12)
      .should('not.exist')

    cy.get('span[data-slate-string="true"]')
      .eq(0)
      .type(`{selectall}`)
      .get('div')
      .eq(12)
      .should('exist')
      .should('have.css', 'opacity', '1')
      .find('span.material-icons')
      .should('have.length', 3)
  })
  it('hovering toolbar disappears', () => {
    cy.get('span[data-slate-string="true"]')
      .eq(0)
      .type(`{selectall}`)
      .get('div')
      .eq(12)
      .should('exist')
      .get('span[data-slate-string="true"]')
      .eq(0)
      .type(`{selectall}`)
      .get('div')
      .eq(0)
      .click({ force: true })
      .get('div')
      .eq(12)
      .should('have.css', 'opacity', '0')
  })
})
