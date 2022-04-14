import PaperBoxAlert from "../layout/PaperBoxAlert";

const HomePage = () => {
    return (
        <>
            <PaperBoxAlert
                title='About this Web App...'
            >
                <p>
                    I created this app to calculate my capital gains on trading between euros and crypto-currencies on
                    my revolut account.
                </p>

                <p>
                    The app requires to download the statements from revolut for ever since the first transaction,
                    and for all currencies accounts (one file per currency account).
                    The statements needs to be downloaded as a csv file and uploaded in the app on the Files page.
                </p>

                <p>
                    Once the files uploaded, the app will attempt to match all the transactions
                    and calculate the gains on each sale of non-euro currencies.
                    The gains are calculated on the basses of first in first out.
                </p>
            </PaperBoxAlert>
        </>
    )
}

export default HomePage;