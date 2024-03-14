//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./Token.sol";
pragma solidity ^0.8.9;

contract Bridge {
    using ECDSA for bytes32;
    address public immutable validator;
    uint256 public immutable chainID;
    address public immutable token;
    bool public immutable canMint;
    mapping(bytes32 => bool) redemeed;
    //from: string, to: string, value: number, chainId: number, symbol: string
    event SwapInitialized(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        uint256 chainId,
        string symbol
    );
    event RedeemInitialized(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        uint256 chainId,
        string symbol
    );

    constructor(
        address _validator,
        address _token,
        uint256 _chainID,
        bool _canMint
    ) {
        validator = _validator;
        chainID = _chainID;
        token = _token;
        canMint = _canMint;
    }

    mapping(address => bytes) public signatures;

    modifier checkValidERC20(string memory symbol) {
        require(
            keccak256(abi.encodePacked(Token(token).symbol())) ==
                keccak256(abi.encodePacked(symbol)),
            "non supported erc20 token"
        );
        _;
    }

    modifier chainIdIsSupported(uint256 _chainId) {
        require(chainID == _chainId, "non supported chain");
        _;
    }

    //Swap(): transfers tokens from sender to the contract
    function swap(
        address to,
        uint256 amount,
        uint256 nonce,
        uint256 chainId,
        string memory symbol,
        string memory toSymbol,
        uint256 toChainId
    ) public checkValidERC20(symbol) chainIdIsSupported(chainId) {
        Token(token).burn(msg.sender, amount);
        emit SwapInitialized(
            msg.sender,
            to,
            amount,
            nonce,
            toChainId,
            toSymbol
        );
    }

    // takes hashed message and a signature, calls ecrecover to recover the signer and verifies
    //if the recovered address is the validator address; if yes, transfers tokens to the receiver.
    function redeem(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        uint256 _chainId,
        string memory symbol,
        bytes calldata signature
    ) public checkValidERC20(symbol) chainIdIsSupported(_chainId) {
        bytes32 message = keccak256(
            abi.encodePacked(from, to, amount, nonce, _chainId, symbol)
        );
        require(!redemeed[message], "re-entrance");
        require(_verify(message, signature), "invalid signature");
        redemeed[message] = true;

        // check current contract token balance
        if (!canMint) {
            require(
                Token(token).balanceOf(address(this)) >= amount,
                "insufficient balance"
            );
            // transfer token to user
            Token(token).transfer(to, amount);
        } else {
            // mint token to user
            Token(token).mint(to, amount);
        }
        emit RedeemInitialized(from, to, amount, nonce, _chainId, symbol);
    }

    function _verify(
        bytes32 message,
        bytes calldata signature
    ) internal view returns (bool) {
        return message.toEthSignedMessageHash().recover(signature) == validator;
    }

    // approve token to this contract
    function receiveToken(uint256 amount) public {
        Token(token).transferFrom(msg.sender, address(this), amount);
    }

    function withdrawToken(uint256 amount) public {
        require(msg.sender == validator, "only validator");
        Token(token).transfer(msg.sender, amount);
    }
}
