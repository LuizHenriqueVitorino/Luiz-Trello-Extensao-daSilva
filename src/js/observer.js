function startDomObserver(callback) {
    let observer;

    observer = new MutationObserver(() => {
        observer.disconnect();

        setTimeout(() => {
            callback();
            startDomObserver(callback);
        }, 300);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}