import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
    page: string;
    totalPages: number
}
 
const Pagination: FC<PaginationProps> = (props) => {
    const { page = 1, totalPages } = props
    const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

    let pageRange = 3;

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - pageRange && i <= currentPage + pageRange)
            ) {
                pageNumbers.push(i);
            } else if (
                (currentPage - i === pageRange + 1 && i > 2) ||
                (i - currentPage === pageRange + 1 && i < totalPages - 1)
            ) {
                pageNumbers.push('...'); // Ellipses for gaps in pagination
            }
        }
        return pageNumbers;
    };

    const pages = getPageNumbers()
    
    return (
		<div className="flex items-center justify-end gap-2 text-black">
			<Link
				className={clsx(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:border-orange-500',
					currentPage === 1 ? 'pointer-events-none bg-gray-100' : 'border-orange-500',
				)}
				href={`?page=${currentPage - 1}`}
			>
				<MdArrowBackIosNew/>
			</Link>

			<nav
				aria-label="Pagination"
				className="relative z-0 -space-x-px rounded-md flex items-center gap-2"
			>
				{pages.map((p) => (
					<Link
						key={p}
						className={clsx(
							p === currentPage
								? 'pointer-events-none text-orange-500 bg-custom-blue relative inline-flex items-center border rounded-[8px] px-4 py-2 text-sm font-medium hover:bg-custom-blue hover:text-orange'
								: 'relative inline-flex items-center border rounded-[8px] text-black bg-white px-4 py-2 text-sm font-medium hover:bg-custom-blue hover:text-orange-400'
						)}
						href={`?page=${p}`}
					>
						{p}
					</Link>
				))}
			</nav>

			<Link
				className={clsx(
					'rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:border-orange-500',
					// !hasNextPage ? 'pointer-events-none bg-gray-100' : '',
				)}
				href={`?page=${currentPage + 1}`}
			>
                <MdArrowForwardIos/>
			</Link>
		</div>
	);
}
 
export default Pagination;