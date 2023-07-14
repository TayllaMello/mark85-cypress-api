describe('POST /users', () => {

  it('Register a new user', () => {

    const user = {
      name: 'Dani',
      email: 'dani@yahoo.com',
      password: 'teste123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })

  })

  it('Duplicate email', () => {

    const user = {
      name: 'Taylla',
      email: 'taylla@yahoo.com',
      password: 'teste123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {

        const { message } = response.body

        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })

  })

  context('required fields', () => {

    let user;

    beforeEach(() => {
      user = {
        name: 'Taylla',
        email: 'taylla@yahoo.com',
        password: 'teste123'
      }
    })

    it('name is required ', () => {

      delete user.name

      cy.postUser(user)
        .then(response => {

          const { message } = response.body
          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('email is required ', () => {

      delete user.email

      cy.postUser(user)
        .then(response => {

          const { message } = response.body
          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('password is required ', () => {

      delete user.password

      cy.postUser(user)
        .then(response => {

          const { message } = response.body
          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"password\" is required')
        })
    })

  })
})