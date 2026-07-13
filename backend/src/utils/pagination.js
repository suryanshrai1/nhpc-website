const buildPagination = ({

    page,

    limit,

    total,

    count

}) => {

    const pages = total === 0
        ? 0
        : Math.ceil(total / limit);

    return {

        page,

        limit,

        count,

        total,

        pages,

        hasNext: page < pages,

        hasPrevious: page > 1,

        nextPage: page < pages
            ? page + 1
            : null,

        previousPage: page > 1
            ? page - 1
            : null

    };

};

export default buildPagination;