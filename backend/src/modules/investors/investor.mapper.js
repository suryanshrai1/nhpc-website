const mapFinancialYear = (year) => ({

    id: Number(year.id),

    label: year.label,

    startYear: year.start_year,

    endYear: year.end_year

});

const mapInvestorHighlight = (item) => ({

    id: Number(item.id),

    metric: item.metric_name,

    value: item.metric_value,

    unit: item.unit,

    financialYear: item.financial_years.label

});

const mapInvestorDocument = (document) => ({

    id: Number(document.id),

    title: document.title,

    description: document.description,

    publishedAt: document.published_at,

    type: {

        id: Number(document.investor_document_types.id),

        name: document.investor_document_types.name,

        code: document.investor_document_types.code

    },

    financialYear: document.financial_years
        ? {
            id: Number(document.financial_years.id),
            label: document.financial_years.label
        }
        : null,

    file: {

        id: Number(document.media_files.id),

        originalName: document.media_files.original_name,

        storedName: document.media_files.stored_name,

        mimeType: document.media_files.mime_type,

        extension: document.media_files.extension,

        size: Number(document.media_files.size_bytes),

        path: document.media_files.storage_path

    }

});

export {

    mapFinancialYear,

    mapInvestorHighlight,

    mapInvestorDocument

};