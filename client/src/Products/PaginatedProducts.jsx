import React, { useEffect, useState } from 'react'
import Products from './index';
import ReactPaginate from 'react-paginate';
import { ENDPOINTS, axiosInstance } from '../apiUtils';
import Loader from '../Loader';

const PaginatedProducts = () => {
    const controller = new AbortController();
    const [page, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const limit = 5;
    const totalItems = 200;

    const pageCount = Math.ceil(totalItems / limit);


    useEffect(() => {
        (async () => {
            try {
                if (loading){
                    console.log('loading','cancel api')
                    controller.abort('cancel api');
                }
                setLoading(true);
                const { data } = await axiosInstance.get(ENDPOINTS.MERCHANT.GET_PRODUCTS, {
                    params: { limit, page },
                    signal: controller.signal
                });
                console.log("🚀 ~ PaginatedProducts ~ data:", data);

                setProducts(data.products);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [page])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newPage = event.selected + 1;
        console.log(
            `User requested page number ${event.selected}`
        );
        setCurrentPage(newPage)
    };

    return (
        <>
            <Loader isLoading={loading} />
            <Products products={products} setProducts={setProducts} />
            <ReactPaginate
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
            // forcePage={pageOffset}
            />
        </>
    );
}

export default PaginatedProducts