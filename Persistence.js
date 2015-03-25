/**
 * This module will persist the post in the MongoDB using Mongoose API
 * @author Jason Richard Evans
 * @param Schema
 * @param mongoose
 */

/*
    Sources used to help compile this document:
    1. http://stackoverflow.com/questions/5625569/include-external-js-file-in-node-js-app
    2. http://mongoosejs.com/docs/
 */
function doPersistence(Schema, mongoose, _PostType, _Heading, _Content, _MimeType){
    //Connecting to the database...
    mongoose.connect('mongodb://localhost/test');

    var database = mongoose.connection;
    database.on('error', console.error.bind(console, 'connection error:'));
    database.once('open', function (callback) {

        //Database connected successfully: Continue
        PostSchema = new Schema({
            //_ID, _PostType, _Heading, _Content, _DateTime, _MimeType
            ID: [Schema.Types.ObjectId],
            PostType: String,
            Heading: String,
            Content: String,
            DateCreated: [Date],
            MimeType: String
        });
        var dbPost = mongoose.model('Post', PostSchema); //Creates the model that we are going to save data to.

        var thisDay = new Date();
        var postToSave = new dbPost({
            ID: Schema.ObjectID,
            PostType:   _PostType,
            Heading:    _Heading,
            Content:    _Content,
            DateCreated:   thisDay,
            MimeType:   _MimeType
        });

        postToSave.save(function (err, postToSave){
            if (err) return console.error(err);
            console.log("Successfully saved to database.");
        });
    });
}

module.exports.doPersistence = doPersistence;