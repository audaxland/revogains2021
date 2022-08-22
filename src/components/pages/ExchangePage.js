import ExchangeGrid from "../grids/ExchangeGrid";
import PaperBoxAlert from "../layout/PaperBoxAlert";

const ExchangePage = ({files}) => {
    const { exchanges} = files;
    return (
        <PaperBoxAlert
            info={exchanges.length ? '' : 'No files yet!'}
        >
            {(!!exchanges.length) && <ExchangeGrid exchanges={exchanges} />}
        </PaperBoxAlert>
    );
};

export default ExchangePage;