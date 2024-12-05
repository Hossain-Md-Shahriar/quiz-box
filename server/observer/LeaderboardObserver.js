class LeaderboardObserver {
  constructor() {
    this.subscribers = [];
  }

  // Subscribe a user to the leaderboard updates
  subscribe(user) {
    this.subscribers.push(user);
  }

  // Notify all subscribed users about reward updates
  notify(rewardUpdates) {
    this.subscribers.forEach((user) => {
      if (rewardUpdates[user.email]) {
        user.reward += rewardUpdates[user.email];
        console.log(`Updated reward for ${user.name}: ${user.reward}`);
      }
    });
  }

  // Clear subscribers after notification to prevent duplicate subscriptions
  clearSubscribers() {
    this.subscribers = [];
  }
}

module.exports = new LeaderboardObserver();
