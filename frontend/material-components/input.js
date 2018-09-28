import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
        fontSize: "1.5rem"
    },
});

function InputField(props) {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Input
                placeholder="What needs to be done"
                className={classes.input}
                inputProps={{
                    'aria-label': 'Description',
                }}
            />
        </div>
    );
}

InputField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputField);
