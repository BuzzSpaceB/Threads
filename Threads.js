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
            //Hides post inside this thread
            this.getPost().style.visibility = "hidden";

            //checks if this thread has childThreads and prevent them from modification and adding other properties
            if(this.mChildren.length >= 1)
            {
                for(var i = 0; i < this.mChildren.length;i++) {
                    Object.freeze(this.mChildren[i]); //prevents modification
                }
            }
            Object.freeze(this); //prevents modification of the current thread
            this.mStatus = Status.Closed;

            //creates summary of thread and returns it
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
                    
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                alert('You are not authorized to move this thread');
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
            var temp = this;
            var count = -1;
            var answer = [];
            return queryThreadRecursive(answer, temp, count, startDateTime, endDateTime, maxLevel, minLevel,userGroup, phraseSet);
	},
        
        queryThreadRecursive: function (answer, temp, count, startDateTime, endDateTime, maxLevel, minLevel,userGroup, phraseSet)
	{
		//Herman
            if (temp !== null)
            {
                for (var i = 0;i < temp.mChildren.length; i++)
                {
                    if ((temp.mDateTime > startDateTime) && (temp.mDateTime < endDateTime) && (++count >= minLevel) && (++count <= maxLevel) && userGroup.hasData(temp.mUser))
                    {
                        answer.push(temp);
                    }
                    queryThreadRecursive(temp.mChildren[i], count, startDateTime, endDateTime, maxLevel, minLevel,userGroup, phraseSet);
                }
            }
            else
            {
                return answer;
            }
	},

	hideThread: function ()
	{
		//Sbo
        this.getPost().style.visibility = 'hidden';

        if(this.getChildThreads().length >= 1)
        {
            for(var i = 0; i < this.mChildren.length ; i++)
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
        if(isAdministrator === true) {

            //Closes the thread summary
            ThreadSummary.close();

            //checks if the thread is still inaccessible
            if(Object.isFrozen(this.mThread) === true) {
                //reopens the current thread
                var thread = {};
                for (var j in this.mThread) {
                    thread[j] = this.mThread[j];
                }
                this.mThread = thread;

                //reopens the children of this thread
                var tempChildren = {};
                for (var i in this.mChildren) {
                    tempChildren[i] = this.mChildren[i];
                }
                this.mChildren = tempChildren;

                //unhides the post inside this thread
                this.getPost().style.visibility = "visible";
            }
            this.mStatus = Status.Open;
        }
        else
        {
            alert("You are not authorized to open this thread");
        }
	}
};
