/**
 * Created by JASON on 15/03/24.
 */

/*function startTests(){
    console.log("This actually worked");
    theThreadModule.CreationOfThreads.Test1;
    startTests().done();
}*/

exports.testCreation = function(test){
//function Test1(test){
	var object = require('./threads');
    var Thread = object(0, 'Jason', null, 0, 'Question', 'Test1', "This is a test", new Date(), 'Text');//mID, mUser, mParent, mLevel, mPostType, mHeading, mContent, mDateTime, mMimeType
    
    Thread.create();
    /**
     * The following line of code is called an Assertion. It is the "TEST" being performed.
     */
    test.equal(Thread.getHeading(), "Test1", "This should pass.");
    test.done();
}

exports.testChildThreads = function(test){
    var object = require('./threads');
    var Thread = object(0, 'Jason', null, 0, 'Question', 'Test1', "This is a test", new Date(), 'Text');//mID, mUser, mParent, mLevel, mPostType, mHeading, mContent, mDateTime, mMimeType
    //var newThread = object(223, 'Pietie', Thread.getParentThread(), 0, 'Answer', 'Test2', "This is a test 2", new Date(), 'Text');
    
    Thread.create();
    //submitPost: function (_ID, _User, _PostType, _Heading, _Content, _MimeType)
    Thread.submitPost();
    /**
     * The following line of code is called an Assertion. It is the "TEST" being performed.
     */
    test.equal(Thread.getHeading(), "Test1", "This should pass.");
    test.equal(Thread.getChildThreads[0].getContent(), "Answering your question.", "Child thread is not created.");
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
    },
    //Test of moveThread()
    Test3: function(test){
        var myObject1 = new Thread(0, "Herman", 0, 0, "Question", "Test3.1", "Move test", "Today", "Text");
        var myObject2 = new Thread(1, "Herman", 0, 0, "Question", "Test3.2", "New parent", "Today", "Text");
        myObject2.submitPost(2, "Herman", "Question", "Test3.3", "Thread to move", "Text");
        var childObject = myObject2.mChildren[0];
        childObject.moveThread(myObject1);
        var returnedObject1 = childObject.getParentThread().getPost();
        var returnedObject2 = myObject1.mChildren[0].getPost();
        test.equal(returnedObject1.mPostHeading, "Test3.1", "Move threads test 1.");
        test.equal(returnedObject2.mPostHeading, "Test3.3", "Move threads test 2.");
        test.done();
    },
    //Test of queryThread()
    Test4: function(test){
        var date1 = new Date();
        var date2 = new Date();
        var date3 = new Date();

        //"Root" thread to be tested
        var myObject1 = new Thread(0, "Herman", 0, 2, "Question", "Test4.1", "Query test 1", date2, "Text");

        //Child  of "root" thread
        myObject1.submitPost(1, "Pete", "Question", "Test4.2", "Query test 2", "Text");
        //Child  of child of "root" thread
        myObject1.getChildThreads()[0].submitPost(2, "Joe", "Question", "Test4.3", "Query test 3", "Text");

        //userGroup to test with
        var userGroup = ["Herman", "Pete"];
        //PhraseGroups to test with
        var phraseSet1 = ["Query"];
        var phraseSet2 = ["Query", "1"];

        var returnedObject1 = myObject1.queryThread(0,0,0,0,0,0);
        var returnedObject2 = myObject1.queryThread(date1,date3,0,0,0,0);
        var returnedObject3 = myObject1.queryThread(0,0,4,1,0,0);
        var returnedObject4 = myObject1.queryThread(0,0,4,0,userGroup,0);
        var returnedObject5 = myObject1.queryThread(0,0,4,0,0,phraseSet1);
        var returnedObject6 = myObject1.queryThread(0,0,4,0,0,phraseSet2);

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
    },

    //test of closeThread()

    Test5: function(test)
    {
        var Obj = new Thread(0, "Martha", 0, 2, "Question", "Test5", "Query test 1", 2, "Text");*/
        /**
         * The Equal test function.
         * equal(currentValue, expectedValue, AssertionMessage);
         */
       /* Obj.submitPost(32, "Jason", "Answer", "Closing of Children", "Testing the closing of child threads.", "Text");
        Obj.closeThread();
        test.equal(Obj.mStatus, "Closed", "Failure to close a thread.");
        test.equal(Obj.mChildren[0].mStatus, "Closed", "Failure to close child threads.");
        test.done();

    },
    //test of reopenThread()
    Test6: function(test)
    {
        var Obj = new Thread(0, "Martha", 0, 0, "Question", "Test6", "Query test 1", 2, "Text");
        Obj.closeThread(); //Closing only to test reopening functionality
        test.equal(Obj.mStatus, "Closed", "Failed to close the thread to reopen.");
        Obj.reopenThread();
        test.equal(Obj.mStatus, "Open", "Failed to reopen the thread.");
        test.done();
    },
    Test7: function(test){
        var dateT = new Date();
        var Obj = new Thread(8394, "Jason", 0, 0, "Answer", "Testing Children", "Testing the child", dateT, "Text");
        Obj.submitPost(8395, "Jason", PostType.Question, "Is it a child?", "This should be a child of object 8394", "Text");
        var child = Obj.mChildren[0].getPost();
        test.equal(child.mID, "8395", "This post is not the child of 8394");
        test.equal(child, Obj.mChildren[0].getPost(), "Not the actual child");
        test.done();
    },

    Test8: function(test){
        var dateT = new Date();
        var Obj = new Thread(8000, "Jason", 0, 0, "Answer", "Testing Children", "Testing the child", dateT, "Text");
        Obj.submitPost(8001, "Jason", PostType.Question, "Is it a child?", "This should be a child of object 8000:1", "Text");
        Obj.submitPost(8002, "Jason", PostType.Question, "Is it a child1?", "This should be a child of object 8000:2", "Text");
        Obj.hideThread();
        test.equal(Obj.mStatus, Status.Hidden, "Could not hide the root object.");
        test.equal(Obj.mChildren[0].mStatus, Status.Hidden, "Could not hide the first child of Obj.");
        test.equal(Obj.mChildren[1].mStatus, Status.Hidden, "Could not hide the second child of Obj.");
        test.done();
    }
}*/