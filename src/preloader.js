let setState = () => {
    const STATE = 'state';
    let state = localStorage.getItem(STATE);
    if (state) {
        state = state.trim();
        document.querySelector('#observed_area').innerHTML = state;
    }
};

document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        setState();
    }
};