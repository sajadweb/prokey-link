const { EventEmitter } = require('events')
const ethUtil = require('ethereumjs-util')
const Transaction = require('ethereumjs-tx')
const HDKey = require('hdkey')
const { ProkeyLink } = require('../library/lib')
const { TransactionFactory } = require('@ethereumjs/tx');
// const ProkeyDevice = require('@prokey-io/webcore')

const hdPathString = `m/44'/60'/0'/0`
// const hdPathString = `m/44'/60'/0'/0/0`
const keyringType = 'Prokey Hardware'
const pathBase = 'm'
const MAX_INDEX = 1000
const Ethereum = "Ethereum"
const LOG = "-------------PROKEY----------------"
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class ProkeyKeyring extends EventEmitter {

  constructor(opts = {}) {
    super();
    this.type = keyringType
    this.accounts = []
    this.hdk = new HDKey()
    this.page = 0
    this.perPage = 5
    this.isDeviceRebooted = false
    this.unlockedAccount = 0
    this.paths = {}
    this.prokey = new ProkeyLink();
    this.deserialize(opts)
  }

  // **********************************
  // ProKey Events
  // **********************************
  OnProkeyButtonRequest(buttonRequestType) {
    console.log(LOG, 'OnProkeyButtonRequest')

    console.debug('Please check your device and continue, the request is -> ', buttonRequestType)
    return true
  }

  OnProkeyFailure(failureType) {
    console.log(LOG, 'OnProkeyFailure')
    console.error(' Command failed, the failureType is -> ')
    console.error(failureType)
    // this.device.RebootDevice()
    // this.isDeviceRebooted = true
  }

  OnProkeyDisconnect() {
    console.log(LOG, 'OnProkeyDisconnect')
    console.debug('Prokey Disconnected')
  }

  OnProkeyPassPhrase() {
    console.log(LOG, 'OnProkeyPassPhrase')

    console.debug('Passphrase')
  }

  //TODO ...
  serialize() {
    console.log(LOG, 'serialize')
    return Promise.resolve({
      hdPath: this.hdPath,
      accounts: this.accounts,
      page: this.page,
      paths: this.paths,
      perPage: this.perPage,
      unlockedAccount: this.unlockedAccount,
    })
  }

  deserialize(opts = {}) {
    console.log(LOG, "deserialize")
    console.log(LOG, "opts")
    console.log(LOG, opts)
    //TODO change
    //this.hdPath = opts.hdPath || hdPathString
    this.hdPath = hdPathString
    this.accounts = opts.accounts || []
    this.page = opts.page || 0
    this.perPage = opts.perPage || 5
    return Promise.resolve()
  }

  isUnlocked() {
    return Boolean(this.hdk && this.hdk.publicKey)
  }

  connect() {
    console.log(LOG, "connect")
    return this.prokey.Connect();
  }

  unlock() {
    console.log(LOG, "unlock")
    if (this.isUnlocked()) {
      return Promise.resolve('already unlocked')
    }
    return new Promise((resolve, reject) => {
      console.log(LOG, 'connect call')
      this.connect().then(() => {
        //now prokey is connected
        this.getPublickKey()
          .then(({ response }) => {
            console.log(LOG, response.message.node.public_key)
            //get public key
            this.hdk.publicKey = Buffer.from(response.message.node.public_key);
            this.hdk.chainCode = Buffer.from(response.message.node.chain_code);
            console.log(LOG, this.hdk.publicKey)
            resolve('just unlocked')
          }).catch((e) => {
            reject(new Error((e && e.toString()) || 'Unknown error'))
          })
      }).catch((e) => {
        reject(new Error((e && e.toString()) || 'Unknown error'))
      })
    })
  }
  getPublickKey() {
    return this.prokey.GetPublickKey(Ethereum, hdPathString, false);
  };
  setAccountToUnlock(index) {
    console.log(LOG, "setAccountToUnlock")
    this.unlockedAccount = parseInt(index, 10)
  }

  //TODO add
  addAccounts(n = 1) {
    console.log(LOG, 'addAccounts')
    return new Promise((resolve, reject) => {
      this.unlock()
        .then((_) => {
          const from = this.unlockedAccount
          const to = from + n

          for (let i = from; i < to; i++) {
            console.log(LOG, pathBase)
            const address = this._addressFromIndex(pathBase, i)
            console.log(LOG, address)
            if (!this.accounts.includes(address)) {
              this.accounts.push(address)
            }
            this.page = 0
          }
          resolve(this.accounts)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  getFirstPage() {
    console.log(LOG, "getFirstPage")
    this.page = 0
    return this.__getPage(1)
  }

  getNextPage() {
    console.log(LOG, "getNextPage")
    return this.__getPage(1)
  }

  getPreviousPage() {
    console.log(LOG, "getPreviousPage")
    return this.__getPage(-1)
  }

  __getPage(increment) {
    console.log(LOG, "__getPage")
    this.page += increment

    if (this.page <= 0) {
      this.page = 1
    }

    return new Promise((resolve, reject) => {
      this.unlock()
        .then((_) => {

          const from = (this.page - 1) * this.perPage
          const to = from + this.perPage

          const accounts = []

          for (let i = from; i < to; i++) {
            const address = this._addressFromIndex(pathBase, i)
            accounts.push({
              address,
              balance: null,
              index: i,
            })
            console.log(LOG, '188')
            console.log(LOG, address)
            this.paths[ethUtil.toChecksumAddress(address)] = i

          }
          resolve(accounts)
        })
        .catch((e) => {
          console.log(LOG, '196')
          console.log(LOG, e)
          reject(e)
        })
    })
  }

  getAccounts() {
    console.log(LOG, "getAccounts")
    return Promise.resolve(this.accounts.slice())
  }

  //TODO
  removeAccount(address) {
    console.log(LOG, 'removeAccount')
    if (!this.accounts.map((a) => a.toLowerCase()).includes(address.toLowerCase())) {
      throw new Error(`Address ${address} not found in this keyring`)
    }
    this.accounts = this.accounts.filter((a) => a.toLowerCase() !== address.toLowerCase())
  }
  // tx is an instance of the ethereumjs-transaction class.
  signTransaction(address, tx) {
    let rawTxHex
    //TODO #prokey tx
    debugger;
    // transactions built with older versions of ethereumjs-tx have a
    // getChainId method that newer versions do not. Older versions are mutable
    // while newer versions default to being immutable. Expected shape and type
    // of data for v, r and s differ (Buffer (old) vs BN (new))
    if (typeof tx.getChainId === 'function') {
      // In this version of ethereumjs-tx we must add the chainId in hex format
      // to the initial v value. The chainId must be included in the serialized
      // transaction which is only communicated to ethereumjs-tx in this
      // value. In newer versions the chainId is communicated via the 'Common'
      // object.
      tx.v = ethUtil.bufferToHex(tx.getChainId())
      tx.r = '0x00'
      tx.s = '0x00'

      rawTxHex = tx.serialize().toString('hex')

      return this._signTransaction(address, rawTxHex, (payload) => {
        tx.v = Buffer.from(payload.v, 'hex');
        tx.r = Buffer.from(payload.r, 'hex');
        tx.s = Buffer.from(payload.s, 'hex');
        return tx;
      });
    }
    // For transactions created by newer versions of @ethereumjs/tx
    // Note: https://github.com/ethereumjs/ethereumjs-monorepo/issues/1188
    // It is not strictly necessary to do this additional setting of the v
    // value. We should be able to get the correct v value in serialization
    // if the above issue is resolved. Until then this must be set before
    // calling .serialize(). Note we are creating a temporarily mutable object
    // forfeiting the benefit of immutability until this happens. We do still
    // return a Transaction that is frozen if the originally provided
    // transaction was also frozen.
    const messageToSign = tx.getMessageToSign(false)
debugger;
    rawTxHex = Buffer.isBuffer(messageToSign)
      ? messageToSign
      : ethUtil.rlp.encode(messageToSign)
    debugger
    return this._signTransaction(
      address, rawTxHex,
      (payload) => {
        //TODO #prokey r,v,s
        debugger
        // Because tx will be immutable, first get a plain javascript object that
        // represents the transaction. Using txData here as it aligns with the
        // nomenclature of ethereumjs/tx.
        const txData = tx.toJSON();
        // The fromTxData utility expects v,r and s to be hex prefixed
        txData.v = ethUtil.addHexPrefix(payload.v);
        txData.r = ethUtil.addHexPrefix(payload.r);
        txData.s = ethUtil.addHexPrefix(payload.s);
        // Adopt the 'common' option from the original transaction and set the
        // returned object to be frozen if the original is frozen.
        return TransactionFactory.fromTxData(txData, {
          common: tx.common,
          freeze: Object.isFrozen(tx),
        });
      },
    );
  }
  // tx is an instance of the ethereumjs-transaction class.
  async _signTransaction(address, tx, handleSigning) {
    try {

      debugger
      const status = await this.unlock();
      await wait(status === 'just unlocked' ? DELAY_BETWEEN_POPUPS : 0);
      const transaction = {
        to: this._normalize(tx.to),
        value: this._normalize(tx.value),
        data: this._normalize(tx.data),
        chainId,
        nonce: this._normalize(tx.nonce),
        gasLimit: this._normalize(tx.gasLimit),
        // gasPrice: this._normalize(tx.gasPrice),
        gasPrice: this._normalize("0x69682f00")
      }
      const EthereumTx = {
        address_n: this._getHDPath(this._pathFromAddress(address)),
        ...transaction
      };
      //TODO #prokey Ethereum transaction
      debugger;
      console.log("EthereumTx", EthereumTx)
      const response = (await this.prokey.SignTransaction(
        Ethereum,
        EthereumTx,
      ))?.response;
      if (!response?.error) {
        const payload = response?.message;
        const newOrMutatedTx = handleSigning(payload);
        const addressSignedWith = ethUtil.toChecksumAddress(
          ethUtil.addHexPrefix(
            newOrMutatedTx.getSenderAddress().toString('hex'),
          ),
        );
        const correctAddress = ethUtil.toChecksumAddress(address);
        // if (addressSignedWith !== correctAddress) {
        //   throw new Error("signature doesn't match the right address");
        // }
        return newOrMutatedTx;
      }

      console.log(LOG, 'End _signTransaction')
      throw new Error(
        response?.message || 'Unknown error',
      );
    } catch (e) {
      debugger;
      console.log(LOG, 'error in signTransaction')
      console.log(LOG, e)
      console.log(LOG, 'End _signTransaction')
    }
  }
  signMessage(withAccount, data) {
    console.log(LOG, "signMessage")
    return this.signPersonalMessage(withAccount, data)
  }
  //TODO  .....
  // For personal_sign, we need to prefix the message:
  signPersonalMessage(withAccount, message) {
    console.log(LOG, 'signPersonalMessage')
    // return new Promise((resolve, reject) => {
    //   this.unlock()
    //     .then((_) => {
    //       this.ethDevice.SignMessage(
    //         this.device,
    //         this._pathFromAddress(withAccount),
    //         ethUtil.stripHexPrefix(message), // TODO: hex to Uint8Array
    //       ).then((response) => {
    //         if (response.address !== ethUtil.toChecksumAddress(withAccount)) {
    //           reject(new Error('signature doesnt match the right address'))
    //         }
    //         const signature = `0x${response.signature}`
    //         resolve(signature)
    //       }).catch((e) => {
    //         console.log('Error while trying to sign a message ', e)
    //         reject(new Error((e && e.toString()) || 'Unknown error'))
    //       })
    //       // This is necessary to avoid popup collision
    //       // between the unlock & sign trezor popups
    //     }).catch((e) => {
    //       console.log('Error while trying to sign a message ', e)
    //       reject(new Error((e && e.toString()) || 'Unknown error'))
    //     })
    // })
  }

  signTypedData() {
    // Waiting on prokey to enable this
    return Promise.reject(new Error('Not supported on this device'))
  }

  exportAccount() {
    return Promise.reject(new Error('Not supported on this device'))
  }

  forgetDevice() {
    console.log(LOG, "forgetDevice")
    this.accounts = []
    this.hdk = new HDKey()
    this.page = 0
    this.unlockedAccount = 0
    this.paths = {}
  }

  _normalize(buf) {
    return ethUtil.bufferToHex(buf).toString()
  }

  // eslint-disable-next-line no-shadow
  _addressFromIndex(pathBase, i) {
    const dkey = this.hdk.derive(`${pathBase}/${i}`)
    const address = ethUtil
      .publicToAddress(dkey.publicKey, true)
      .toString('hex')
    return ethUtil.toChecksumAddress(`0x${address}`)
  }
  _getHDPath(path) {
    const parts = path.toLowerCase().split('/');
    const HD_HARDENED = 0x80000000;
    const toHardened = (n) => (n | HD_HARDENED) >>> 0;
    if (parts[0] !== 'm') {
      throw new Error('PATH_NOT_VALID');
    }
    return parts.filter((p) => p !== 'm' && p !== '')
      .map((p) => {
        let hardened = false;
        if (p.substr(p.length - 1) === "'") {
          hardened = true;
          p = p.substr(0, p.length - 1);
        }
        let n = parseInt(p, 10);
        if (isNaN(n)) {
          throw new Error('PATH_NOT_VALID');
        } else if (n < 0) {
          throw new Error('PATH_NEGATIVE_VALUES');
        }
        if (hardened) { // hardened index
          n = toHardened(n);
        }
        return n;
      });
  }
  //TODO ...
  _pathFromAddress(address) {
    const checksummedAddress = ethUtil.toChecksumAddress(address)
    let index = this.paths[checksummedAddress]
    if (typeof index === 'undefined') {
      for (let i = 0; i < MAX_INDEX; i++) {
        if (checksummedAddress === this._addressFromIndex(pathBase, i)) {
          index = i
          break
        }
      }
    }

    if (typeof index === 'undefined') {
      throw new Error('Unknown address')
    }
    return `${this.hdPath}/${index}`
  }
}

ProkeyKeyring.type = keyringType
module.exports = ProkeyKeyring
