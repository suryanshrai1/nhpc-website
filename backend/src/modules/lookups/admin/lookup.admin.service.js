import lookupRepository from "./lookup.admin.repository.js";

class LookupService {

    async getAllLookups() {

        const [

            states,

            projectTypes,

            projectStatuses,

            capacityUnits,

            newsCategories,

            tenderCategories,

            tenderStatuses,

            employmentTypes,

            leadershipLevels,

            sustainabilityTypes,

            investorDocumentTypes,

            financialYears

        ] = await Promise.all([

            lookupRepository.getStates(),

            lookupRepository.getProjectTypes(),

            lookupRepository.getProjectStatuses(),

            lookupRepository.getCapacityUnits(),

            lookupRepository.getNewsCategories(),

            lookupRepository.getTenderCategories(),

            lookupRepository.getTenderStatuses(),

            lookupRepository.getEmploymentTypes(),

            lookupRepository.getLeadershipLevels(),

            lookupRepository.getSustainabilityTypes(),

            lookupRepository.getInvestorDocumentTypes(),

            lookupRepository.getFinancialYears()

        ]);

        return {

            states,

            projectTypes,

            projectStatuses,

            capacityUnits,

            newsCategories,

            tenderCategories,

            tenderStatuses,

            employmentTypes,

            leadershipLevels,

            sustainabilityTypes,

            investorDocumentTypes,

            financialYears

        };

    }

}

export default new LookupService();