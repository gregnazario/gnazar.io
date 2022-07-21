script {
    use 0x1::coin;
    use 0x1::test_coin::TestCoin;

    fun main(sender: &signer, receiver: address, amount: u64) {
        coin::transfer<TestCoin>(sender, receiver, amount);
    }
}
