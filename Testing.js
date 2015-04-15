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

    //mUser, mParent, mPostType, mHeading, mContent, mMimeType
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
/*,

    Test2: function(test){
        var myObject = new Thread(0, "Jason", 0, 0, "Question", "Test2", "Content Tester", "Yesterday", "Text");
        var returnedObject = myObject.getPost();
        test.equal(returnedObject.mPostHeading, "Test2", "This should pass.");
        test.equal(returnedObject.mContent, "Content Tester", "This should pass.");
        test.equal(returnedObject.mMimeType, "Text", "This should pass.");
        test.done();
    },**/
        //Test of moveThread()
exports.testMoveThreads = function(test){
    var object = require('./threads');
    var Thread1 = object(0, "Herman", 0, 0, "Question", "Test3.1", "Move test", "Today", "Text");
    var Thread2 = object(1, "Herman", 0, 0, "Question", "Test3.2", "New parent", "Today", "Text");
    Thread1.create();
    Thread2.create();

    Thread2.submitPost(2, "Herman", "Question", "Test3.3", "Thread to move", "Text");

    var childThread = (Thread2.getChildThreads())[0];
    childThread.moveThread(Thread1);

    var returnedObject1 = childThread.getParentThread().getPost();
    var returnedObject2 = (Thread1.getChildThreads())[0].getPost();

    test.equal(returnedObject1.mPostHeading, "Test3.1", "Move threads test fail 1.");
    test.equal(returnedObject2.mPostHeading, "Test3.3", "Move threads test fail 2.");

    test.done();
}
//Test of queryThread()
exports.testQueryThread = function(test){
    var object = require('./threads');
    var date1 = new Date();
    var date2 = new Date();
    var date3 = new Date();
    //"Root" thread to be tested
    var Thread1 = object(0, "Herman", 0, 2, "Question", "Test4.1", "Query test 1", date2, "Text");
    Thread1.create();

    //Child  of "root" thread
    Thread1.submitPost(1, "Pete", "Question", "Test4.2", "Query test 2", "Text");
    //Child  of child of "root" thread
    Thread1.getChildThreads()[0].submitPost(2, "Joe", "Question", "Test4.3", "Query test 3", "Text");
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
        var Thread = new object(0, "Martha", 0, 2, "Question", "Test5", "Query test 1", 2, "Text");

         Thread.create();

        Thread.submitPost(32, "Jason", "Answer", "Closing of Children", "Testing the closing of child threads.", "Text");
        Thread.submitPost(32, "Herman", "Answer", "Closing of Children", "Testing the closing of child threads.", "Text");
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
        var Thread = new object(0, "Martha", 0, 0, "Question", "Test6", "Query test 1", 2, "Text");

        Thread.create();
        Thread.closeThread(); //Closing only to test reopening functionality
        test.equal(mStatus, "Closed", "Failed to close the thread to reopen.");
        Thread.reopenThread();
        test.equal(mStatus, "Open", "Failed to reopen the thread.");
        test.done();
    }
   /* Test7: function(test){
        var dateT = new Date();
        var Obj = new Thread(8394, "Jason", 0, 0, "Answer", "Testing Children", "Testing the child", dateT, "Text");
        Obj.submitPost(8395, "Jason", PostType.Question, "Is it a child?", "This should be a child of object 8394", "Text");
        var child = Obj.mChildren[0].getPost();
        test.equal(child.mID, "8395", "This post is not the child of 8394");
        test.equal(child, Obj.mChildren[0].getPost(), "Not the actual child");
        test.done();
    },
*/
//Test8:



exports.testHideThread = function(test)
{
    //var dateT = new Date();
    var object = require('./threads');
    var Thread = object(0, 'Sboniso', null, 0, 'Question', 'Test8', "This is a Hiding thread test", new Date(), 'Text');



    Thread.create();
    Thread.submitPost(8001, "Sboniso", "Question", "Is it a child?", "This should be a child of object 8000:1", "Text");
    Thread.submitPost(8002, "Sboniso", "Question", "Is it a child1?", "This should be a child of object 8000:2", "Text");
    Thread.hideThread();

    test.equal(mStatus, Status.Hidden, "Could not hide the root object.");
    test.equal(Thread.mChildren[0].mStatus, Status.Hidden, "Could not hide the first child of Thread.");
    test.equal(Thread.mChildren[1].mStatus, Status.Hidden, "Could not hide the second child of Thread.");
    test.done();
}

exports.testUnhideThread = function(test)
{
    //var dateT = new Date();
    var object = require('./threads');
    var Thread = object(0, 'Sboniso', null, 0, 'Question', 'Test8', "This is a Hiding thread test", new Date(), 'Text');



    Thread.create();
    Thread.submitPost(8001, "Sboniso", "Question", "Is it a child?", "This should be a child of object 8000:1", "Text");
    Thread.submitPost(8002, "Sboniso", "Question", "Is it a child1?", "This should be a child of object 8000:2", "Text");
    Thread.unhideThread();

    test.equal(mStatus, Status.Open, "Could not hide the root object.");
    test.equal(Thread.mChildren[0].mStatus, Status.Open, "Could not hide the first child of Thread.");
    test.equal(Thread.mChildren[1].mStatus, Status.Open, "Could not hide the second child of Thread.");
    test.done();
}

