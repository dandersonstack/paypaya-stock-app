import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import SearchComponent from './SearchComponent.js'
import {withStyles} from 'material-ui/styles';
import SearchAndFilterTable from './SearchAndFilterTable'

const styles = theme => ({
  searchContainer: {

  },
  progress: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: '100px',
    zIndex: 30,
    transform: 'translate(0, 50%)'
  },
  titleContainer: {
    flexDirection: 'column-reverse',
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
        this.props.RootStore.initalize();
    }

    //this is global catch to catch an error anywhere in the app
    componentDidCatch(error, info) {
        console.log(`There was an error: ${error}`);
        console.log(`Error info: ${info}`);
        //TODO: Render a page that something broke the app...
    }

    render() {
        const {classes, RootStore} = this.props;
        return (
            <div>
                <div className={classes.titleContainer}>
                    {RootStore.username? `Welcome ${RootStore.username} to your `: ''}Papaya Stock App
                </div>
                <div className={classes.titleContainer}>
                    {RootStore.funds? 'Available Funds: ' + RootStore.funds: ''}
                </div>
                <div className={classes.searchContainer}>
                    <SearchComponent />
                    <SearchAndFilterTable/>
                </div>
            </div>

        );
    }
}

