function backstory(store, prefetchActions) {
    const actionPromises = [];

    prefetchActions.forEach(action => {
        const createdAction = action();

        if (typeof createdAction == 'function') {
            actionPromises.push(createdAction(store.dispatch));
        } else if (typeof createdAction == 'object') {
            store.dispatch(createdAction);
        }
    });

    return Promise.all(actionPromises);

}

export default backstory;