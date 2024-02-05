export default function Paginator({
    params,
}: {
    params: {
        currentPage: number;
        lastPage: number;
        prevPageAction: Function;
        nextPageAction: Function;
    };
}) {
    const prevPage =
        params.currentPage === 1 ? (
            <div className="opacity-70 cursor-default p-2 rounded">⬅ Prev. Page</div>
        ) : (
            <div
                className="cursor-pointer hover:bg-slate-300 p-2 rounded"
                onClick={() => params.prevPageAction()}
            >
                ⬅ Prev. Page
            </div>
        );
    const nextPage =
        params.currentPage === params.lastPage ? (
            <div className="opacity-70 cursor-default p-2 rounded">Next Page ➡</div>
        ) : (
            <div
                className="cursor-pointer hover:bg-slate-300 p-2 rounded"
                onClick={() => params.nextPageAction()}
            >
                Next Page ➡
            </div>
        );
    return (
        <div className="flex justify-between w-full mt-2 px-4">
            {prevPage}
            <span className="p-2">{params.currentPage}</span>
            {nextPage}
        </div>
    );
}
