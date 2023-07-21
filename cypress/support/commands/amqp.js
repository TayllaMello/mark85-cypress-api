Cypress.Commands.add('purgeQueueMessages', () => {
    cy.api({
        url: 'https://woodpecker.rmq.cloudamqp.com/api/queues/isirryhn/tasks/contents',
        method: 'DELETE',
        body: {
            vhost: "isirryhn",
            name: "tasks",
            mode: "purge"
        },
        headers: {
            Authorization: 'Basic aXNpcnJ5aG46ZVo3eXZxd0JqSXlTU2RrRElGSTVLMUxvZkc2NE5sbk0=',
        },
        failOnStatusCode: false
    }).then(response => { return })
})

Cypress.Commands.add('getMessageQueue', () => {
    cy.api({
        url: 'https://woodpecker.rmq.cloudamqp.com/api/queues/isirryhn/tasks/get',
        method: 'POST',
        body: {
            vhost: "isirryhn",
            name: "tasks",
            truncate: '50000',
            ackmode: 'ack_requeue_true',
            encoding: 'auto',
            count: '1'
        },
        headers: {
            Authorization: 'Basic aXNpcnJ5aG46ZVo3eXZxd0JqSXlTU2RrRElGSTVLMUxvZkc2NE5sbk0=',
        },
        failOnStatusCode: false
    }).then(response => { return })
})