import homepageRepository from "./homepage.repository.js";
import { mapHomepageData } from "./homepage.mapper.js";

class HomepageService {

    async getHomepage() {

        const homepageData =
            await homepageRepository.getHomepageData();

        return mapHomepageData(homepageData);

    }

}

export default new HomepageService();