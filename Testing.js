/**
 * Created by JASON on 15/03/24.
 */

/*function startTests(){
    console.log("This actually worked");
    theThreadModule.CreationOfThreads.Test1;
    startTests().done();
}*/

exports.testCreation = function(test){
	var object = require('./threads');
    var Thread = object();

    Thread.create("u13032608", null, "Question", "Creation", "Hello. This is testing of my module.", "Text");
    /**
     * The following line of code is called an Assertion. It is the "TEST" being performed.
     */
    test.equal(Thread.getHeading(), "Creation", "Failed in creating new thread.");
    test.equal(Thread.getContent(), "Hello. This is testing of my module.", "Failed to set Content in Post");
    test.done();
}

exports.testChildThreads = function(test){
    var object = require('./threads');
    var Thread = object();
    
    Thread.create("u13032608", null, "Question", "Creation1", "\<h1\>Hello.\</h1\> This is testing of my module1.", "HTML");
    Thread.submitPost('Pietie', 'Answer', "An Answer", "This is the answer to your question.", "Text");
    /**
     * The following line of code is called an Assertion. It is the "TEST" being performed.
     */
    test.equal(Thread.getHeading(), "Creation1", "Creation of parent thread failed.");
    var currentChild = Thread.getChildren();
    test.equal((currentChild[0]).getContent(), "This is the answer to your question.", "Child thread is not created.");
    test.done();
}

//Test of moveThread()
exports.testMoveThreads = function(test){
    var object = require('./threads');
    var Thread1 = object();
    var Thread2 = object();
    //mUser, mParent, mPostType, mHeading, mContent, mMimeType
    Thread1.create("Herman", null, "Question", "Test3.1", "Move test", "Text");
    Thread2.create("Herman", null, "Question", "Test3.2", "New parent", "Text");

    Thread2.submitPost("Herman", "Question", "Test3.3", "Thread to move", "Text");

    var childThread = (Thread2.getChildren());
    childThread[0].moveThread(Thread1);

    var returnedObject1 = childThread.getParentThread().getPost();
    var returnedObject2 = (Thread1.getChildren())[0].getPost();

    test.equal(returnedObject1.mPostHeading, "Test3.1", "Move threads test fail 1.");
    test.equal(returnedObject2.mPostHeading, "Test3.3", "Move threads test fail 2.");

    test.done();
}
//Test of queryThread()
exports.testQueryThread = function(test){
    var object = require('./threads');

    var date1 = new Date();
    var date3 = new Date();
    //"Root" thread to be tested
    var Thread1 = object();
    Thread1.create("Herman", null, "Question", "Test4.1", "Query test 1", "Text");

    //Child  of "root" thread
    Thread1.submitPost("Pete", "Question", "Test4.2", "Query test 2", "Text");
    //Child  of child of "root" thread
    Thread1.getChildren()[0].submitPost("Joe", "Question", "Test4.3", "Query test 3", "Text");
    //userGroup to test with
    var userGroup = ["Herman", "Pete"];
    //PhraseGroups to test with
    var phraseSet1 = ["Query"];
    var phraseSet2 = ["Query", "1"];
    var returnedObject1 = Thread1.queryThread(0,0,0,0,0,0);
    var returnedObject2 = Thread1.queryThread(date1,date3,0,0,0,0);
    var returnedObject3 = Thread1.queryThread(0,0,4,1,0,0);
    var returnedObject4 = Thread1.queryThread(0,0,4,0,userGroup,0);
    var returnedObject5 = Thread1.queryThread(0,0,4,0,0,phraseSet1);
    var returnedObject6 = Thread1.queryThread(0,0,4,0,0,phraseSet2);
    test.equal(returnedObject1[0]["Content"], "Query test 1", "Query threads test 1");
    test.equal(returnedObject2[0]["Content"], "Query test 1", "Query threads test 2");
    test.equal(returnedObject3[0]["Content"], "Query test 2", "Query threads test 3.1");
    test.equal(returnedObject3[1]["Content"], "Query test 3", "Query threads test 3.2");
    test.equal(returnedObject4[0]["Content"], "Query test 1", "Query threads test 4.1");
    test.equal(returnedObject4[1]["Content"], "Query test 2", "Query threads test 4.2");
    test.equal(returnedObject5[0]["Content"], "Query test 1", "Query threads test 5.1");
    test.equal(returnedObject5[1]["Content"], "Query test 2", "Query threads test 5.2");
    test.equal(returnedObject5[2]["Content"], "Query test 3", "Query threads test 5.3");
    test.equal(returnedObject6[0]["Content"], "Query test 1", "Query threads test 6");
    test.done();
}

    //test of closeThread()

 exports.testCloseThread = function(test)
    {
        var object = require('./threads');
        var Thread = new object();

         Thread.create("Martha", null, "Question", "Test5", "Query test 1", "Text");

        Thread.submitPost("Jason", "Answer", "Closing of Children", "Testing the closing of child threads.", "Text");
        Thread.submitPost("Herman", "Answer", "Closing of Children", "Testing the closing of child threads.", "Text");
        Thread.closeThread();
        test.equal(mStatus, "Closed", "Failure to close a thread.");
        test.equal(Thread.mChildren[0].mStatus, "Closed", "Failure to close child threads.");
        test.equal(Thread.mChildren[1].mStatus, "Closed", "Failure to close child threads.");
        test.done();

    }
    //test of reopenThread()
     exports.testReopenThread = function(test)
    {
        var object = require('./threads');
        var Thread = new object();

        Thread.create("Martha", null, "Question", "Test6", "Query test 1", "Text");
        Thread.closeThread(); //Closing only to test reopening functionality
        test.equal(mStatus, "Closed", "Failed to close the thread to reopen.");
        Thread.reopenThread();
        test.equal(mStatus, "Open", "Failed to reopen the thread.");
        test.done();
    }

exports.testHideThread = function(test)
{
    //var dateT = new Date();
    var object = require('./threads');
    var Thread = object();



    Thread.create('Sboniso', null, 'Question', 'Test8', "This is a Hiding thread test", 'Text');
    Thread.submitPost("Sboniso", "Question", "Is it a child?", "This should be a child of object 8000:1", "Text");
    Thread.submitPost("Sboniso", "Question", "Is it a child1?", "This should be a child of object 8000:2", "Text");
    Thread.hideThread();

    test.equal(mStatus, Status.Hidden, "Could not hide the root object.");
    test.equal(Thread.mChildren[0].mStatus, Status.Hidden, "Could not hide the first child of Thread.");
    test.equal(Thread.mChildren[1].mStatus, Status.Hidden, "Could not hide the second child of Thread.");
    test.done();
}

exports.testUnhideThread = function(test)
{
    var object = require('./threads');
    var Thread = object();



    Thread.create('Sboniso', null, 'Question', 'Test8', "This is a Hiding thread test", 'Text');
    Thread.submitPost("Sboniso", "Question", "Is it a child?", "This should be a child of object 8000:1", "Text");
    Thread.submitPost("Sboniso", "Question", "Is it a child1?", "This should be a child of object 8000:2", "Text");
    Thread.unhideThread();

    test.equal(mStatus, Status.Open, "Could not hide the root object.");
    test.equal(Thread.mChildren[0].mStatus, Status.Open, "Could not hide the first child of Thread.");
    test.equal(Thread.mChildren[1].mStatus, Status.Open, "Could not hide the second child of Thread.");
    test.done();
}

