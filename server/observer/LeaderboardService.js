const LeaderboardObserver = require("./LeaderboardObserver");

class LeaderboardService {
  constructor(db) {
    this.db = db; // Pass the database instance during initialization
  }

  // Fetch all users from the database
  async getAllUsers() {
    const users = await this.db.collection("users").find().toArray();
    return users;
  }

  // Update rewards for users and notify observers
  async updateLeaderboard(rewardUpdates) {
    const users = await this.getAllUsers();

    // Subscribe all users to the observer
    users.forEach((user) => LeaderboardObserver.subscribe(user));

    // Notify observers of updates
    LeaderboardObserver.notify(rewardUpdates);

    // Update the database with new rewards
    for (const [email, reward] of Object.entries(rewardUpdates)) {
      console.log(email, reward);
      const result = await this.db
        .collection("users")
        .updateOne({ email }, { $inc: { reward } });
      console.log(result);
    }

    // Clear subscribers to avoid duplicate notifications
    LeaderboardObserver.clearSubscribers();
  }

  // Fetch leaderboard sorted by rewards
  async getLeaderboard() {
    let users = await this.getAllUsers();
    users = users.filter(user => user.role === "student");
    return users.sort((a, b) => b.reward - a.reward);
  }
}

module.exports = LeaderboardService;
