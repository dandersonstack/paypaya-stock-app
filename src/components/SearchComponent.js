import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import {observer, inject} from 'mobx-react'
import TextField from 'material-ui/TextField';

const searchRootStyles = theme => ({
  containerRoot: {
    flexGrow: .7,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  }

});

@withStyles(searchRootStyles) @inject('RootStore')
export default class IntegrationDownshift extends Component {

  render () {
      const {classes, RootStore} = this.props;
      return (
          <div>
              <TextField
                onChange = {(event) => {RootStore.updateCurrentText(event.target.value) }}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="TextField"
                autoComplete={RootStore.autoCompleteText}
              />
        </div>
      )
  }
}