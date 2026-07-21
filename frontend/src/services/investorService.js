import api from "../api/api.js";

export const getFinancialYears = async () => {
    const { data } = await api.get("/investors/financial-years");
    return data.data;
};

export const getInvestorHighlights = async () => {
    const { data } = await api.get("/investors/highlights");
    return data.data;
};

export const getInvestorDocuments = async (params = {}) => {
    const { data } = await api.get("/investors/documents", {
        params,
    });
    return data.data;
};
