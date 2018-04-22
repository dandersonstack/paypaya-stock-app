import React, {Component, PropTypes} from 'react';
import Downshift from 'downshift';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {observer, inject} from 'mobx-react'
import {
    renderSuggestion,
    renderInput
} from './SearchComponentHelpers';

const searchRootStyles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

@withStyles(searchRootStyles) @inject('RootStore')
export default class IntegrationDownshift extends Component {

  getSuggestions(inputValue='') {
    let count = 0;
    return this.props.RootStore.filteredSuggestions.filter(suggestion => {
      const keep =
        (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
        count < 5;

      if (keep) {
        count += 1;
      }

      return keep;
    });
  }

  render () {
      const {classes, RootStore} = this.props;
      return (
          <div className={classes.root}>
            <Downshift
                onInputValueChange = {(inputValue) => {RootStore.updateCurrentText(inputValue) }}
            >
                {({getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex}) => (

                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,

                            InputProps: getInputProps({
                                placeholder: 'Search a for a stock by full name',
                                id: 'integration-downshift-simple',
                            }),
                        })}
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {this.getSuggestions(inputValue).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({item: suggestion.name}),
                                        highlightedIndex,
                                        selectedItem,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
          </div>
      )
  }
}
