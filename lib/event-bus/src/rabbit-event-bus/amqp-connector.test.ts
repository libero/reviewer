// Tests for the amqp connector
// - publishes to the right exchange
// - subscribes to the right queue
// - runs the handler
// - acknowledges the message when it handles the event correctly
// - unacknowledges the message when it handles the event incorrectly
// - when the connection fails it initialises a state change event

// Tests for integration of amqp connector and index

// Test against running amqp instance - this will be when it's it's own repository
