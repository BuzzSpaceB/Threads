/**
 * Enumeration type for Statuses.
 * @type {{Open: string, Closed: string, Hidden: string}}
 */
Status =
{
	Open: "Open",
	Closed: "Closed",
	Hidden: "Hidden"
};

/**
 * Enumeration type for PostTypes.
 * @type {{Question: string, Answer: string, Comment: string, Information: string}}
 */
PostType = 
{
	Question: "Question",
	Answer: "Answer",
	Comment: "Comment",
	Information: "Information"
};

/**
 * Creates a Post object.
 * @param _PostType - An enum value to describe what the content of the current thread refers to.
 * @param _Heading - A small text string that will be used as a heading for the post.
 * @param _Content - Text that contains the content of the post.
 * @param _DateTime - A field to show when a post was created.
 * @param _MimeType - Describes what type of content the post consist of.
 * @constructor
 */
function Post (_PostType, _Heading, _Content, _DateTime, _MimeType)
{
    /*
        A post will have its own heading for the content it contains.
        This is in addition to the thread heading/description.

       |Thread              |
       ||=================| |
       ||Post Heading     | |
       ||=================| |
       ||                 | |
       ||  text content   | |
       ||                 | |
       ||_________________| |
     */
    this.mPostHeading = _Heading;
	this.mPostType = _PostType;
	this.mContent = _Content;
	this.mDateTime = _DateTime;
	this.mMimeType = _MimeType;
}

/**
    All functions that are permitted within the scope of a post.
 */
Post.prototype =
{
	constructor: Post
};

/**
 * The Constructor for a Thread object. It initializes a thread and a post within that thread. There exist a one-to-one relationship between a thread and a post.
 * @param _User - Identifies who created/initiated the thread.
 * @param _Parent - To build the thread tree. Describes which thread is the parent of the new thread. If it is the root thread, then parent is simply null.
 * @param _Level - To build the thread tree. Describes in what depth level in the tree this current thread is located.
 * @param _PostType - An enum value to describe what the content of the current thread refers to.
 * @param _Heading - A small text string that will be used as a heading for the post in this thread.
 * @param _Content - Text that contains the content of the post in this thread.
 * @param _DateTime - A field to show when a post was created.
 * @param _MimeType - Describes what type of content the post consist of.
 * @constructor
 */
function Thread (_User, _Parent, _Level, _PostType, _Heading, _Content, _DateTime, _MimeType)
{
	this.mUser = _User;
	this.mParent = _Parent;
	this.mPost = new Post(_PostType, _Heading, _Content, _DateTime, _MimeType);
	this.mChildren = [];
	this.mStatus = Status.Open;
        this.mLevel = _Level;
}

/**
    All functions that are permitted within the scope of Threads.
 */
Thread.prototype =
{
	constructor: Thread,

	getChildThreads: function ()
	{
		return this.mChildren;
	},

	getPost: function ()
	{
		return this.mPost;
	},

	getParentThread: function ()
	{
		return this.mParent;
	},

	closeThread: function ()
	{
		//Martha
        if(isAdministrator() === true)
        {
            this.getPost().style.visibility = "hidden";
            if(this.mChildren.length >= 1)
            {
                for(var i = 0; i < mChildren.length;i++) {
                    this.seal(mChildren[i]);
                }
            }
            this.seal(this);
            this.mStatus = Status.Closed;
            var summary = new ThreadSummary();
            return summary.toString();
        }
        else
        {
            alert('You are not authorized to close the thread');
        }
	},

        /**
        * @param newParent - Describes which thread will be the current thread's new parent (i.e. the thread the current thread will attach to). If it is null the thread will not move.
        **/
	moveThread: function (newParent)
	{
		//Herman
            //Make use of the isAdministrator function as provided by the Authorization team
            if(isAdministrator() === true)
            {
                if(newParent !== null)
                {
                    //Remove this thread from its current parent's children array
                    var index = this.mParent.mChildren.indexOf(this);
                    if(index !== -1) {
                            this.mParent.mChildren.splice(index, 1);
                    }
                    
                    //Add this thread to its new parent's children array
                    newParent.mChildren.push(this);
                    
                    //Assign newParent as this thread's parent
                    this.mParent = newParent;
                    
                    //Assign newParent's status to this thread (e.g. current thread is open, if it is moved to be the child of a thread which is closed then the current thread will also become closed
                    this.mStatus = newParent.mStatus;
                    
                    //The thread was successfully moved
                    return true;
                }
                else
                {
                    //The thread was not successfully moved
                    return false;
                }
            }
            else
            {
                //The thread was not successfully moved
                alert('You are not authorized to move this thread');
                return false;
            }
	},

        /**
        * @param startDateTime -  Restrict returned posts to be after this time stamp. Default is the time stamp of the root post in the Buzz space.
        * @param endDateTime -  Restrict returned posts to be before this time stamp. If unspecified all posts are returned.
        * @param maxLevel - Restrict returned posts to be at most at the specified depth relative to the post. If this value is 0, minLevel will also be 0 only the specified post is returned.
        * @param minLevel - Restrict returned posts to be at least at the specified depth relative to the post. Obviously it has to be less or equal to maxLevel. If both minLevel and maxLevel is 1, only the immediate children are retirieved.
        * @param userGroup - Restricts returned posts to be limited to a specific user group.
        * @param phraseSet - Restrict returned posts to be only posts that contains all the strings specified in the phrase set. The default is an empty set. If the set is empty all posts are returned.
        **/
	queryThread: function (startDateTime, endDateTime, maxLevel, minLevel,userGroup, phraseSet)
	{
		//Herman
                
            //Variable to keep track of the current thread being checked as it traverses the tree
            var temp = this;
             //Variable to keep track of the depth of the temp thread in relation to the starting thread
            var count = -1;
            //Array of queryInfo objects to be returned as the search results for this query
            var answer = [];
            
            //Check to see if default values for maxLevel and minLevel must be set and if they should then set them
            if (maxLevel === 0 || maxLevel === null)
                minLevel = 0;
            if (minLevel > maxLevel || minLevel === null)
                minLevel = maxLevel;
            
            //Call the recursive extension of this function to traverse the children of this thread
            return queryThreadRecursive(answer, temp, count, startDateTime, endDateTime, maxLevel, minLevel, userGroup, phraseSet);
	},
        
        queryThreadRecursive: function (answer, temp, count, startDateTime, endDateTime, maxLevel, minLevel, userGroup, phraseSet)
	{
		//Herman
            //If temp is null we have reached the end of the tree
            if (temp !== null)
            {
                //variables which will be used to check if the default values for endDateTime, userGroup and phraseSet should be set
                var allPostsTime = false;
                var allPostsUsers = false;
                var allPostsPhrases = false;
                       
                //If no startDateTime value is supplied the default value is set to the root thread's DateTime
                if (startDateTime === null)
                    //Make use of the getRoot function as provided by the Spaces team (as it is a variable of the BuzzSpace)
                    startDateTime = getRoot().mDateTime;
                
                //If either endDateTime, userGroup or phraseSet is not supplied then set its relevant flag to true (this will mean that instead of checking against these values all releveant posts will be returned)
                if (endDateTime === null)
                    allPostsTime = true;
                if (userGroup === null)
                    allPostsUsers = true;
                if (phraseSet === null)
                    allPostsPhrases = true;

                //For each of temp threads children
                for (var i = 0;i < temp.getChildThreads().length; i++)
                {
                    //Check the startDateTime, minLevel and maxLevel query fileds
                    if ((temp.mDateTime > startDateTime) && (++count >= minLevel) && (++count <= maxLevel))
                    {
                        //Is there no limit from the endDateTime field?
                        if (allPostsTime)
                        {
                            /**
                            *Example of how a userGroup data set looks
                            *
                            *  userGroup = [
                            *     {user: 'John'},
                            *     {user: 'Susan'}
                            *  ];
                            **/
                            
                            //Is there no limit from the userGroup field?
                            if (allPostsUsers)
                            {
                                //Calls the function which adds the current thread's info to the answer array.
                                addToQueryAnswer(answer, temp, phraseSet, allPostsPhrases);
                            }
                            else if (userGroup.hasData(temp.mUser))//Else check the userGroup field.
                            {
                                    //Calls the function which adds the current thread's info to the answer array.
                                   addToQueryAnswer(answer, temp, phraseSet, allPostsPhrases); 
                            }
                        }
                        else if(temp.mDateTime < endDateTime) //Else check the endDateTime field.
                        {
                            //Is there no limit from the userGroup field?
                             if (allPostsUsers)
                            {
                                //Calls the function which adds the current thread's info to the answer array.
                                addToQueryAnswer(answer, temp, phraseSet, allPostsPhrases);
                            }
                            else if (userGroup.hasData(temp.mUser))//Else check the userGroup field.
                            {
                                //Calls the function which adds the current thread's info to the answer array.
                                addToQueryAnswer(answer, temp, phraseSet, allPostsPhrases);
                            }
                        }
                    }
                    //Call queryThreadRecursive again for each of the current thread's children
                    queryThreadRecursive(temp.getChildThreads()[i], count, startDateTime, endDateTime, maxLevel, minLevel,userGroup, phraseSet);
                }
            }
            else
            {
                //Once the entire tree has been traversed we return the array of queryInfo objects as an answer.
                return answer;
            }
	},
        
        addToQueryAnswer: function (answer, temp, phraseSet, allPostsPhrases)
        {
             //Variable to help check if the phrases contained in phraseSet all appear in the current thread's content
             var flag = true;
                        
             /**
              *Example of how a phraseSet data set looks
              *
              *  phraseSet = [
              *     {phrase: 'example phrase'},
              *     {phrase: 'second example phrase'}
              *  ];
              **/
                     
             //If no phraseSet was supplied then just return all relevant posts
             if (!allPostsPhrases)
             {
                //For loop that traverses all the phrases in the phraseSet
                for(var i in phraseSet)
                {
                    //Compare each phrase in the phraseSet to the current thread's content
                    if((temp.getPost().mContent.indexOf(phraseSet[i]) > -1))
                    {
                        //If a phrase is not found in the current thread's content then set the flag to false.
                        flag = false;
                    }
                }
             }
             //If all phrases were found we can then proceed to add this thread's info to the answer array
             if (flag)
             {
                 /**
                  * queryInfo - an object of all the information about a post the query will return.
                  * 
                  * ParentID - The ID of the current thread's parent.
                  *  Author - The user who posted the current thread.
                  * TimeStamp - The date and time the current threads was made.
                  * Content - The content of the post of the current thread;
                  * Status - The status of the current thread.
                  * Level - The depth level of the current thread in the main tree.
                  **/
                  var queryInfo = 
                      {ParentID:  temp.mParent.mID,
                      Author:  temp.mUser,
                      TimeStamp:  temp.getPost().mDateTime,
                      Content:  temp.getPost().mContent,
                      Status:  temp.mStatus,
                      Level:  temp.mLevel};

                  //Add this thread's queryInfo object to the array of answers
                  answer.push(queryInfo);
              }
        },

	hideThread: function ()
	{
		//Sbo
        this.getPost().style.visibility = 'hidden';

        if(this.getChildThreads().length >= 1)
        {
            for(var i = 0; i < this.mChildren.length ; i += 1)
            {
                this.mChildren[i].style.visibility = 'hidden';
            }
        }
        this.mStatus = Status.Hidden;

	},

	unhideThread: function ()
	{
		//Sbo
        this.getPost().style.visibility = 'visible';

        if(this.getChildThreads().length >= 1)
        {
            for(var i = 0; i < this.mChildren.length ; i++)
            {
                this.mChildren[i].style.visibility = 'visible';
            }
        }
        this.mStatus = Status.Open;
	},

	markPostAsRead: function ()
	{
		//Sbo
	},

	countDescendants: function ()
	{
		//Jason
	}
};

/**
    The constructor for a thread summarizer.
    @constructor
 */
function ThreadSummary (_MimeType, _Content, _DateTime, _Thread)
{
	this.mMimeType = _MimeType;
	this.mContent = _Content;
	this.mDateTime = _DateTime;
	this.mThread = _Thread;
};

/**
    All functions permitted to create a thread summary.
 */
ThreadSummary.prototype =
{
	constructor: ThreadSummary,

	reopenThread: function ()
	{
		//Martha
        //not finished yet
        Thread.prototype = Thread;
        if(Thread.close())
        {
            Thread.open();
            Thread.getChildThreads.open();



        }
        this.mStatus = Status.Open;
        alert(mStatus.toString());
	}
};
