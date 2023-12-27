class Header extends React.Component {
    render() {
        return React.createElement('header', null, 
            React.createElement('h1', null, 'your boilerplate project')
        );
    }
}

ReactDOM.render(React.createElement(Header, null, null), document.getElementById('header-root'));