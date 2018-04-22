import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import SearchComponent from './SearchComponent.js'
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  searchContainer: {
      width:  '600px',
      height: '100px'
  },
  progress: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: '100px',
    zIndex: 30,
    transform: 'translate(0, 50%)'
  },
  titleContainer: {
    flexGrow: 0.2,
    fontSize: "44",
    flexBasis: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
);

@withStyles(styles) @inject('RootStore') @observer
export default class App extends Component {

    componentWillMount() {
        //TODO: load your the current users stalks
    }

    //this is global catch to catch an error anywhere in the app
    componentDidCatch(error, info) {
        console.log(`There was an error: ${error}`);
        console.log(`Error info: ${info}`);
        //TODO: Render a page that something broke the app...
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.titleContainer}>
                    Papaya Stock App
                </div>
                <div className={classes.searchContainer}>
                    <SearchComponent />
                </div>
            </div>

        );
    }
}

