import prisma from "../../../config/prisma.js";

class LookupRepository {

    getStates() {
        return prisma.states.findMany({
            where: { is_active: true },
            orderBy: { name: "asc" }
        });
    }

    getProjectTypes() {
        return prisma.project_types.findMany({
            orderBy: { name: "asc" }
        });
    }

    getProjectStatuses() {
        return prisma.project_statuses.findMany({
            orderBy: { name: "asc" }
        });
    }

    getCapacityUnits() {
        return prisma.capacity_units.findMany({
            orderBy: { name: "asc" }
        });
    }

    getNewsCategories() {
        return prisma.news_categories.findMany({
            orderBy: { name: "asc" }
        });
    }

    getTenderCategories() {
        return prisma.tender_categories.findMany({
            orderBy: { name: "asc" }
        });
    }

    getTenderStatuses() {
        return prisma.tender_statuses.findMany({
            orderBy: { name: "asc" }
        });
    }

    getEmploymentTypes() {
        return prisma.employment_types.findMany({
            orderBy: { name: "asc" }
        });
    }

    getLeadershipLevels() {
        return prisma.leadership_levels.findMany({
            orderBy: { display_order: "asc" }
        });
    }

    getSustainabilityTypes() {
        return prisma.sustainability_types.findMany({
            orderBy: { name: "asc" }
        });
    }

    getInvestorDocumentTypes() {
        return prisma.investor_document_types.findMany({
            orderBy: { name: "asc" }
        });
    }

    getFinancialYears() {
        return prisma.financial_years.findMany({
            orderBy: {
                start_year: "desc"
            }
        });
    }

}

export default new LookupRepository();