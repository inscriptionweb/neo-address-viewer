import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { ADD_WALLET, UPDATE_FIELD_ADDRESS } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onChangeAddress: (value) =>
        dispatch({ type: UPDATE_FIELD_ADDRESS, key: 'address', value }),
    onChangeName: (value) =>
        dispatch({ type: UPDATE_FIELD_ADDRESS, key: 'name', value }),
    onAddWallet: (addresses, address, name, wallets) =>
        dispatch({ type: ADD_WALLET, addresses, address, name, wallets })
})

const styles = {
    "wrapper": {
        width: "33%",
        margin: "0 auto",
        
    },
    "inputField": {
        display: "block",
    },
    "button": {
        margin: 12,
    }
  };

class AddressForm extends Component {
    constructor() {
        super();
        this.changeAddress = ev => this.props.onChangeAddress(ev.target.value);
        this.changeName = ev => this.props.onChangeName(ev.target.value);
        this.addWallet = (address, name) => ev => {
            ev.preventDefault();
            const wallets = {
                ...this.props.wallets,
                [address]: { name }
            };
            let addresses = [...this.props.wallet.addresses];
            if (!addresses.includes(address)) {
                addresses = [...this.props.wallet.addresses, address];
            }
            this.props.onAddWallet(addresses, address, name, wallets);
        };
    }
    render() {
        const address = this.props.common.address;
        const name = this.props.common.name;
        return (
            <div style={styles.wrapper}>
                <TextField
                    style={styles.inputField}
                    hintText=""
                    floatingLabelText="type wallet name"
                    onChange={this.changeName}
                />
                <TextField
                    style={styles.inputField}
                    hintText=""
                    floatingLabelText="type wallet address"
                    onChange={this.changeAddress}
                />
                <RaisedButton
                    label="Add"
                    primary={true}
                    style={styles.button}
                    onClick={this.addWallet(address, name)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);