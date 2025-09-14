export const CheckSubscription = (SubscriptionsArray, userId) => {
    return SubscriptionsArray?.some(subscription => subscription.userId.toString() === userId.toString());
}