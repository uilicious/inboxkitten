//
// This is a https://uilicious.com/ test case
//
// See : https://test.uilicious.com/test/public/DRupiHvXGspN9wVUYNv3Re
// for an example of using this test script
//
// Alternatively signup to schedule a background task, or use their CLI =)
// #selfpromotion
//

//
// Testing for empty inbox
//

// Lets goto inbox kitten
I.goTo("https://inboxkitten.com");
I.see("Open-Source Disposable Email");

// Go to a random inbox inbox
I.fill("email", SAMPLE.id(22));
I.click("Get Mail Nyow!");

// Check that its empty
I.see("There for no messages for this kitten :(");

//
// Testing for regular email
// (sent using a jenkins perodic build)
//

// Lets go back inbox kitten mailbox
I.goTo("https://inboxkitten.com");
I.see("Open-Source Disposable Email");
I.fill("email", "ik-reciever-f7s1g28");
I.click("Get Mail Nyow!");

// See an email we expect, and click it
I.click("Testing inboxkitten subject");

// And validate the content
I.see("Testing inboxkitten text content");
