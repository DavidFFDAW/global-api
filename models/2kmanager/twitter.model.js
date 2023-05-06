const { Connection } = require("./db.connection");

class Twitter extends Connection {
    fields = {
        ...this.parentFields,
        message: { name: "message", required: true, type: "STR" },
        likes: { name: "likes", required: true, type: "INT" },
        retweets: { name: "retweets", required: true, type: "INT" },
        device: { name: "device", required: true, type: "STR" },
        author_id: { name: "author_id", required: true, type: "INT" },
        comments: { name: "comments", required: true, type: "INT" },
        reply_to: { name: "reply_to", required: false, type: "INT" },
    };

    static tableName = "tweets";

    constructor() {
        super();
        this.table = Twitter.tableName;
    }

    getNoReplyTweets() {
        const sql =
            "SELECT t.*, w.twitter_name AS wrestler_name, w.twitter_image AS wrestler_image, w.twitter_acc AS twitter_account FROM tweets t INNER JOIN wrestler w ON t.author_id = w.id WHERE reply_to IS NULL ORDER BY t.created_at DESC";
        return this.query(sql);
    }

    getRepliesTweets() {
        const sql =
            "SELECT t.*, w.twitter_name AS wrestler_name, w.twitter_image AS wrestler_image, w.twitter_acc AS twitter_account FROM tweets t INNER JOIN wrestler w ON t.author_id = w.id WHERE reply_to IS NOT NULL ORDER BY t.created_at DESC";
        return this.query(sql);
    }

    assignRepliesToTweets(tweets, replies) {
        return tweets.map((tweet) => {
            const repliesToTweet = replies.filter(
                (reply) => reply.reply_to === tweet.id
            );
            return {
                ...tweet,
                parent: tweet.reply_to,
                replies: repliesToTweet,
            };
        });
    }

    async getAllTweetsWithReplies() {
        const tweets = await this.getNoReplyTweets();
        const replies = await this.getRepliesTweets();

        return this.assignRepliesToTweets(tweets, replies);
    }

    getSingleTweetById(id) {
        const sql = `SELECT t.*, w.twitter_name AS wrestler_name, w.twitter_image AS wrestler_image, w.twitter_acc AS twitter_account FROM tweets t INNER JOIN wrestler w ON t.author_id = w.id WHERE t.id =${id}`;
        return this.query(sql);
    }

    getRepliesToTweet(id) {
        const sql = `SELECT t.*, w.twitter_name AS wrestler_name, w.twitter_image AS wrestler_image, w.twitter_acc AS twitter_account FROM tweets t INNER JOIN wrestler w ON t.author_id = w.id WHERE t.reply_to = ${id} ORDER BY t.created_at DESC`;
        return this.query(sql);
    }

    async getSingleTweetWithReplies(id) {
        const tweet = await this.getSingleTweetById(id);
        const replies = await this.getRepliesToTweet(id);

        return this.assignRepliesToTweets(tweet, replies)[0];
    }
}

module.exports = {
    Twitter,
};
