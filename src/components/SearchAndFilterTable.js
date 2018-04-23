import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {observer, inject} from 'mobx-react'
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
    flexGrow: .3,
  },
  input: {
    display: 'none',
  },
});

@withStyles(styles) @inject('RootStore') @observer
export default class SimpleTable extends Component {

    render() {
        const { classes, RootStore } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Stock</TableCell>
                            <TableCell>Symbol</TableCell>
                            <TableCell numeric>Start of Commerce</TableCell>
                            <TableCell numeric>Current Price</TableCell>
                            <TableCell>Follow</TableCell>
                            <TableCell numeric></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RootStore.formattedSuggestions.map((n,index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>{n.symbol}</TableCell>
                                    <TableCell numeric>{n.startOfCommerce}</TableCell>
                                    <TableCell numeric>${n.currentPrice}</TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                          checked={n.following}
                                        />
                                      </TableCell>
                                    <TableCell numeric>
                                        <Button onClick={(event)=>{console.log('I was clicked and shoudl call the buy stock method')}}
                                                disabled={!n.can_buy}
                                                variant="raised"
                                                color="primary"
                                                className={classes.button}>
                                            Buy
                                        </Button>
                                        <Button disabled={!n.can_sell} variant="raised" color="secondary" className={classes.button}>
                                            Sell
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
//
// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
